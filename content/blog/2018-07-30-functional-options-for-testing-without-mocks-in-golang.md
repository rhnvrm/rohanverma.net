+++
title = "Functional Options for testing without mocks in Golang"
date = "2018-07-30T16:55:48+00:00"
path = "blog/2018/07/30/functional-options-for-testing-without-mocks-in-golang/"

[extra]
  author = "Rohan Verma"
+++

Suppose you have a HTTP request to be sent but don&#8217;t care about the result or errors. This request is sent through a function which is usually called inside a goroutine and is not in any way a core aspect of your main logic. The only important part is forming the actual request and the payload. When you wrote this function, you did not write tests as it would be a pain to make the function return something and check it. Now that the core component is completed, you want to test that the request formed is actually in fact created properly and abides by a small set of rules expected by the reader of the payload packet.

Usually, structs are created with Option structs which hold parameters which are used inside New() constructors. These allow reducing the configurations down to initializing one config struct which can be set by the caller. Although, it is useful for the API creator, it can become cumbersome for the API user. As pointed out by [Dave Cheney][1], it obfuscates the API and causes problems with defaults.

Another way is to use Functional Options, for example

```go
type Server struct {
  logger *logrus.Logger // optional
  store databaste.Store // required
}

type ServerOption func(Server) Server

func WithLogger(logger *logrus.Logger) ServerOption {
  return func(s Server) Server {
    s.logger = logger
    return s
  }
}

func NewServer(store database.Store, options ...ServerOption) *Server {
  s := Server{store: store}
  for _, option := range options {
    s = option(s)
  }
  return &s
}

func main() {
  myServer := NewServer(myStore, WithLogger(myLogger))
}
```

In the above example, we can set the logger without having to depend on config structs and obfuscating the API.

Now that we have potentially solved configuration issues, we can move on to testing. To avoid writing mock functions, we can inject a function that actually performs the request. This way, the default method will be to use the actual implementation but the test can inject a function which simply returns the data we want to check in a way that would be easier for us to test with.

```go
// app.go
// WithRequestSender sets the RequestSender for MyStruct.
func WithRequestSender(fn func([]byte, *MyStruct)) Option {
  return func(f *MyStruct) {
    f.RequestSender = fn
  }
}

// app_Test.go
func TestMyStruct_save(t *testing.T) {
  var result string

  getResult := func(s []byte, p *MyStruct) {
    result = string(s)
  }
  p := New(
    WithLogger(log.New(os.Stdout, "TEST: ", log.Ldate|log.Ltime|log.Lshortfile)),
    WithQueueSize(1000),
    WithRequestSender(getResult),
  )

  Convey("Given some Content is created with some initial values", t, func() {
    s := Content{
      Token: 123,
    }
    Convey("When the struct is inserted into the queue and save is called", func() {
      q := *p.GetFromQueue()
      q &lt;- s
      p.save()
      Convey("Then the result created by struct to be sent to endpoint", func() {
        Convey("The result should begin with [", func() {
          So(result[0], ShouldEqual, '[')
        })
        Convey("The result should end with ]", func() {
          So(result[len(result)-1], ShouldEqual, ']')
        })
        Convey("The result should contain statement", func() {
          So(result, ShouldContainSubstring, string(MyStmt))
        })
      })
    })
  })
}
```

The above way, enables us to check data that might be coming to us in some convoluted way without ever having to write complicated unreadable code or having to modify much of the actual implementation.

 [1]: https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis