+++
title = "Running the Buzz AppImage on NixOS"
weight = 5
template = "pages-page.html"
date = 2026-07-29
draft = false

[extra]
section_title = "TIL"
+++

I wanted to run the Buzz desktop AppImage on NixOS. `programs.appimage` does
most of the work. Some WebKit/Tauri desktop apps still need more runtime
libraries and GStreamer plugin paths in the AppImage FHS environment.

The original working notes are in
[oddship/nix-system](https://github.com/oddship/nix-system/blob/agent/appimage-support/docs/buzz-appimage-nixos.md).
The deployed implementation was merged in
[oddship/nix-system@4c26fff](https://github.com/oddship/nix-system/commit/4c26fff46f94b69e187759cd5754cf174180fbf7).
This page keeps the parts that I can reuse.

## Enable AppImage support

For recent NixOS releases, enable AppImage support and binfmt registration:

```nix
programs.appimage = {
  enable = true;
  binfmt = true;
};
```

After this, you can launch executable AppImages directly:

```bash
chmod +x Buzz_0.4.26_amd64.AppImage
./Buzz_0.4.26_amd64.AppImage
```

You can also bypass binfmt and use the configured wrapper:

```bash
/run/current-system/sw/bin/appimage-run ./Buzz_0.4.26_amd64.AppImage
```

## Add the missing runtime libraries

First, Buzz failed because it could not find a host library:

```
buzz-desktop: error while loading shared libraries: libzstd.so.1:
cannot open shared object file: No such file or directory
```

After adding `pkgs.zstd`, the next missing library was:

```
buzz-desktop: error while loading shared libraries: libelf.so.1:
cannot open shared object file: No such file or directory
```

That came from `pkgs.elfutils`.

The important lesson is that AppImages are not always fully self-contained. On
NixOS, the AppImage runs in an FHS-like environment. That environment must
contain the libraries that the binary expects to find on a conventional Linux
system.

For Buzz, the useful package set also included common WebKit/Tauri desktop
runtime packages:

```nix
programs.appimage.package = pkgs.appimage-run.override {
  extraPkgs = pkgs: with pkgs; [
    zstd
    elfutils
    webkitgtk_4_1
    libsoup_3
    glib-networking
    libayatana-appindicator
  ];
};
```

## Fix GStreamer discovery

After the ELF libraries were present, Buzz started. Then WebKit could not find
GStreamer elements:

```
GStreamer element appsink not found. Please install it.
GStreamer element appsrc not found. Please install it
GStreamer element autoaudiosink not found. Please install it
```

Use `GST_DEBUG=2` to see more detail:

```bash
GST_DEBUG=2 ./Buzz_0.4.26_amd64.AppImage
```

The plugins existed in the Nix store and in the generated FHS root. The
problem was their location in the FHS environment. On this x86_64 system, they
were under:

```
/usr/lib64/gstreamer-1.0
```

The default profile exposed `/usr/lib/gstreamer-1.0` and
`/usr/lib32/gstreamer-1.0`, but not `/usr/lib64/gstreamer-1.0`. Thus,
WebKit's subprocess could not find plugin factories such as `appsrc`,
`appsink`, and `autoaudiosink`.

The fix was to wrap `appimage-run` and set both GStreamer plugin path variables
for AppImages only:

```nix
let
  appimageRun = pkgs.appimage-run.override {
    extraPkgs = pkgs: with pkgs; [
      zstd
      elfutils
      webkitgtk_4_1
      libsoup_3
      glib-networking
      libayatana-appindicator
      gst_all_1.gstreamer
      gst_all_1.gst-plugins-base
      gst_all_1.gst-plugins-good
    ];
  };

  gstreamerPluginPath = lib.concatStringsSep ":" [
    "/usr/lib64/gstreamer-1.0"
    "/usr/lib/gstreamer-1.0"
    "/usr/lib32/gstreamer-1.0"
  ];
in
{
  programs.appimage = {
    enable = true;
    binfmt = true;
    package = pkgs.symlinkJoin {
      name = "appimage-run";
      paths = [ appimageRun ];
      buildInputs = [ pkgs.makeWrapper ];
      postBuild = ''
        wrapProgram $out/bin/appimage-run \
          --set GST_PLUGIN_SYSTEM_PATH_1_0 ${lib.escapeShellArg gstreamerPluginPath} \
          --set GST_PLUGIN_PATH ${lib.escapeShellArg gstreamerPluginPath}
      '';
    };
  };
}
```

Keep this change in the `appimage-run` wrapper. If you set
`GST_PLUGIN_SYSTEM_PATH_1_0` globally, AppImage compatibility paths enter the
whole desktop session. This can change the behavior of unrelated GTK or
GStreamer applications.

## Ghostty interaction

While Buzz was running, new Ghostty windows failed with OpenGL surface
initialization errors:

```
ghostty: renderer=OpenGL
ghostty: failed to initialize surface err=error.SystemResources
ghostty: surface failed to initialize err=error.SurfaceError
```

This did not look like a missing library or Nix evaluation issue. It looked as
if Ghostty's long-lived GTK single-instance process could not create another
OpenGL surface while Buzz/WebKit was active.

The workaround was to disable Ghostty's GTK single-instance behavior:

```nix
programs.ghostty.settings = {
  gtk-single-instance = false;
};
```

After you switch the NixOS configuration, stop the old Ghostty process once:

```bash
pkill ghostty
```

## Useful checks

Inspect WebKit and GStreamer failures:

```bash
GST_DEBUG=2 ./Buzz_0.4.26_amd64.AppImage
```

Test if WebKit compositing is involved:

```bash
WEBKIT_DISABLE_COMPOSITING_MODE=1 ./Buzz_0.4.26_amd64.AppImage
```

Inspect desktop logs:

```bash
journalctl --user --since '30 minutes ago' --no-pager |
  rg -i 'ghostty|buzz|webkit|gstreamer|gpu|egl|glx|vulkan|wayland|gtk'
```

Build the configured AppImage wrapper, then inspect it:

```bash
nix build .#nixosConfigurations.<host>.config.programs.appimage.package \
  --no-link \
  --print-out-paths

sed -n '1,20p' /nix/store/...-appimage-run/bin/appimage-run
```

One Nix flake rule: if the AppImage config is in a new module file, add it to
Git before you run `nix flake check`. Otherwise, the flake cannot see it.
