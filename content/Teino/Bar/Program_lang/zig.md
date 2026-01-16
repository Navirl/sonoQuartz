---
date: 2026-01-16
time: 16:32
tags:
  - Bar
---

up:: [Programming](./Programming.md)

![](../../images/zig-1768555310479.png)
## hys
termuxでインストールはできなかった。まずFHS準拠じゃないので`/etc/resolv.conf`がなく名前解決が出来ない。ので`termux-chroot`でprootを起動して再度。

[error: TemporaryNameServerFailure when using package management on Termux · Issue #14636 · ziglang/zig](https://github.com/ziglang/zig/issues/14636)

[Differences from Linux - Termux Wiki](https://wiki.termux.com/wiki/Differences_from_Linux)

しかしビルドコマンドがクラッシュしたのでここまで。

```sh
thread 20476 panic: reached unreachable code
/home/.cache/zig/p/libexpat-2.7.1-1-y_akI-w7AABhqRN54g--MNNIR-zA1X2WZ36ZPriY84sb/build.zig:53:13: 0x1218cdb in build (build)
            unreachable,
            ^
/usr/lib/zig/lib/std/Build.zig:2214:33: 0x11c981f in runBuild__anon_77325 (build)
        .void => build_zig.build(b),
                                ^
/usr/lib/zig/lib/std/Build.zig:2195:29: 0x11ac567 in dependencyInner__anon_74935 (build)
        sub_builder.runBuild(bz) catch @panic("unhandled error");
                            ^
/usr/lib/zig/lib/std/Build.zig:2017:35: 0x1191f67 in dependency__anon_70217 (build)
            return dependencyInner(b, name, pkg.build_root, if (@hasDecl(pkg, "build_zig")) pkg.build_zig else null, pkg_hash, pkg.deps, args);
                                  ^
/home/hys/build.zig:12:35: 0x117646b in build (build)
    const expat_dep = b.dependency("libexpat", .{});
                                  ^
/usr/lib/zig/lib/std/Build.zig:2214:33: 0x11667fb in runBuild__anon_23444 (build)
        .void => build_zig.build(b),
                                ^
/usr/lib/zig/lib/compiler/build_runner.zig:366:29: 0x115f3e7 in main (build)
        try builder.runBuild(root);
                            ^
/usr/lib/zig/lib/std/start.zig:627:37: 0x114d6a7 in posixCallMainAndExit (build)
            const result = root.main() catch |err| {
                                    ^
???:?:?: 0x0 in ??? (???)
error: the following build command crashed:
.zig-cache/o/614da89b860f530423296b1f5fde7746/build /usr/lib/zig/zig /usr/lib/zig/lib /home/hys .zig-cache /home/.cache/zig --seed 0xd4212543 -Zb23f7176112f87e5 -Doptimize=ReleaseSafe install -p /home/.local
```

windowsでやろうとすると`error: unable to find dynamic system library 'curl' using strategy 'paths_first'. searched paths: none`で止まる。curlの挙動が違うっぽいんだけど分からん。どうしてもというならWSL出すのがいい。