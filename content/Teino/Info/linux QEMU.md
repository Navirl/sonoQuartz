---
date: 2024-02-16
tags:
  - Info
---

up:: [Linux](<../Bar/Linux.md>)

## QEMU
エミュレータ。

[QEMU をつかって仮想マシンを作成する #Linux - Qiita](https://qiita.com/momoto/items/b7e2a2b28f91c4cb5cec)
[To all you virt-manager and SPICE Display users out there. Finally get your clipboard sharing, dynamic resolution and other things working. : r/linux](https://www.reddit.com/r/linux/comments/asw4wk/to_all_you_virtmanager_and_spice_display_users/)

KVMはLinuxカーネルの仮想化ソリューション。
QEMUがバックエンドに使用している。

[Linux に最適な仮想マシン: KVM vs. VirtualBox vs. QEMU vs. Hyper-V](https://ja.linux-console.net/?p=12362)

VirtualBoxとの違いはあんまない。KVMとの統合はどっちもやってる。
QEMUは単体だとCUIで、GUIを使うならvirt-managerが必要っぽい。
GPUに関してVirtualBoxはPCIeパススルーが出来ないので遅くなるらしいが、一方で優れた3Dエミュレーションを持ってるからその点は強いとかでよくわからない。

初心者に優しいのはVirtualBox。

[Are KVM or Qemu an improvement over VirtualBox/VMware in terms of gaming? : r/linux\_gaming](https://www.reddit.com/r/linux_gaming/comments/le506a/are_kvm_or_qemu_an_improvement_over/)

unable to connect to libvirt 
`libvird.service`が起動してない。`systemctl start libvirtd.service`で起動する。起動時に動かしたいならenable。

[libvirt - ArchWiki](https://wiki.archlinux.jp/index.php/Libvirt)
[[SOLVED] virt-manager: Unable to connect to libvirt qemu:///system / Applications & Desktop Environments / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=273174)

この QEMU では、spice グラフィックはサポートされません
qemu-baseをアンストして、改めてqemu-fullをインストールしたら治った。
qemuはヘッドレス版と非ヘッドレス版を同時インストールできないらしい。

[QEMU - ArchWiki](https://wiki.archlinux.jp/index.php/QEMU#.E3.82.A4.E3.83.B3.E3.82.B9.E3.83.88.E3.83.BC.E3.83.AB)

カーソルトラップ
`ctrl+alt`で外せる。両方左。

[x11 - How do I get my mouse back from QEMU/KVM? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/107633/how-do-i-get-my-mouse-back-from-qemu-kvm#107634)

ゲーム

[Android gaming with Android-x86 VM + QtScrcpy keymapping : r/linuxmasterrace](https://www.reddit.com/r/linuxmasterrace/comments/ye5upk/android_gaming_with_androidx86_vm_qtscrcpy/)
[[Guide] Playing Android games on Linux PC with Android-x86 VM + QtScrcpy · Ivon's Blog](https://ivonblog.com/en-us/posts/android-x86-virgl-libhoudini/#53-booting-android-x86-vm-with-qemu-commandlines)

qtscrcpy
adb接続したデバイスを好きに操れるアプリ。
データフォルダは`/opt/qtscrcpy`。

network 'default' is not active
```
sudo virsh net-list --all
```
このコマンドにより動いていないネットワークを特定。
```
sudo virsh net-start default
```
で起動する。

自動起動したい場合は`sudo virsh net-autostart default`。

ゲンリプを動かしたかったが、ほか全てが正常に動くくせに異変解決時の移動だけできなかったので断念。
waydroidを使う。