+++
title = "Setting SO_REUSEPORT and similar socket options in Go 1.11"
date = "2019-01-08T12:38:24+00:00"
path = "blog/2019/01/08/setting-so_reuseport-and-similar-socket-options-in-go-1-11/"

[extra]
  author = "Rohan Verma"
+++

Go recently introduced a heavily requested feature that allows programmers to set socket options before accepting and creating connections. You can find a mention of this in [Go 1.11 Release Notes][1]. Although, not many have written on this and implementing this is a bit confusing due to a change in the way one has to implement this. So I decided to share this with others who might be interested in using this feature.

By reading how support for this has been added, we can get an idea about how to go about implementing this. The release notes mention that a new [ListenConfig][2] type has been added. This type contains a Control function which needs to be implemented. This Control function should contain code to set the Socket Option.

Let us see how one would start a UDP reader that performs a callback on receiving a packet.

```go
type UDPOptions struct {
	Address         string
	MinPacketLength int
	MaxPacketLength int
}

func StartUDPReader(opt UDPOptions, callback func([]byte)) {
	addr, err := net.ResolveUDPAddr("udp", opt.Address)
	if err != nil {
		h.sysLog.Fatalf("address resoultion failed: %v", err)
	}

	conn, err := net.ListenUDP("udp", addr)
	if err != nil {
		h.sysLog.Fatalf("listen failed: %v", err)
	}

	packet := make([]byte, opt.MaxPacketLength)
	for {
		n, _, err := conn.ReadFromUDP(packet)
		if err == nil && n >= opt.MinPacketLength && n &lt;= opt.MaxPacketLength {
			callback(packet)
		}
	}
}
```

This is how the reader would look after adding SO_REUSEPORT using the new way.

```go
func StartUDPReader(opt UDPOptions, callback func([]byte)) {
	lc := net.ListenConfig{
		Control: func(network, address string, c syscall.RawConn) error {
			var opErr error
			err := c.Control(func(fd uintptr) {
				opErr = unix.SetsockoptInt(int(fd), unix.SOL_SOCKET, unix.SO_REUSEPORT, 1)
			})
			if err != nil {
				return err
			}
			return opErr
		},
	}

	lp, err := lc.ListenPacket(context.Background(), "udp", opt.Address)
	if err != nil {
		h.sysLog.Fatalf("dial failed: %v", err)
	}

	conn := lp.(*net.UDPConn)
	err = ipv4.NewPacketConn(conn).SetControlMessage(ipv4.FlagDst|ipv4.FlagInterface, true)
	if err != nil {
		h.sysLog.Fatalf("set control msg failed: %v", err)
	}

	packet := make([]byte, opt.MaxPacketLength)
	for {
		n, _, err := conn.ReadFromUDP(packet)
		if err == nil && n >= opt.MinPacketLength && n &lt;= opt.MaxPacketLength {
			callback(packet)
		}
	}
}
```

Using this approach we can reuse the port and have zero downtime, between restarts by starting the new reader before stopping the currently running reader.

 [1]: https://golang.org/doc/go1.11#net
 [2]: https://golang.org/pkg/net/#ListenConfig