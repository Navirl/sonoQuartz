---
date: 2023-10-21
tags:
  - Bar
  - Info
---

up::

Linuxのあれやこれや。
主にwindowsとデュアルブート環境でのEndeavourOS。

## wslからmount
プロセス使用中で拒否られることがある。
まずディスクをofflineに。

```
diskpart
sel disk 0
offline disk
```

その後、`wmic diskdrive list brief`か`Get-CimInstance -query "select * from Win32_DiskDrive"`で調べたIDを元にマウント。

`sudo wsl --mount \\.\PHYSICALDRIVE0 --partition 2`

wslからlsblkで見られるようになるので、mountコマンドを使用し適当なフォルダにマウント。ファイルを弄る。

一応`sudo wsl --unmount \\.\PHYSICALDRIVE0`でアンマウントできるが、`wsl --shutdown`で落として初期状態に戻すほうが早い。

後でディスクをonlineに戻すのを忘れず。

[個人的な φ(｀д´)ﾒﾓﾒﾓ…: WSL2でデュアルブートのLinuxパーディションをマウントしてWindowsからアクセス](https://yamori-jp.blogspot.com/2022/04/wsl2linuxwindows.html)
[[WSL2] mount "The disk is in use or locked by another process" - workaround · Issue #5997 · microsoft/WSL · GitHub](https://github.com/microsoft/WSL/issues/5997)
[リダイレクト中](https://answers.microsoft.com/en-us/windows/forum/all/online-offline-a-disk-in-disk-management-w10-home/c4c472a8-7fa1-41a5-a9ad-68434b64dc35)
[Get started mounting a Linux disk in WSL 2 | Microsoft Learn](https://learn.microsoft.com/en-us/windows/wsl/wsl2-mount-disk)


## emergency mode  
/etc/fstabとかでトチると出るモード。  
wslからアタッチして原因を取り除く。

[linux init settings](<../Info/linux init settings.md>)

## rofi
追加
`/usr/share/applications`と`~/.local/share/applications`に設定ファイルが存在する。

[How to delete an unwanted item from dmenu ? : r/dmenu](https://www.reddit.com/r/dmenu/comments/auv43v/how_to_delete_an_unwanted_item_from_dmenu/?rdt=35685)
[Can't create application menu shortcuts (flatpak) - Support - Lutris Forums](https://forums.lutris.net/t/cant-create-application-menu-shortcuts-flatpak/16486)

## マルチモニター
ARandR。
裏でxrandrというコマンドを実行している。設定ファイルを出力して中を見るとxrandrのshスクリプトになっている。
なのでこれを起動オプションに加えれば最初からマルチモニターにできる。

[linux remove linux](<../Info/linux remove linux.md>)

## shutdown
コマンド。時刻を直接設定する。

[Linux のシャットダウン、電源オフ、停止、再起動コマンドについて](https://ja.linux-console.net/?p=2383)


## backlight
brightnessctlを入れて使ってる。s 10%のように使う。

## データベースをロックできません
`/var/lib/pacman/db.lck`を削除する。

## docker
pacmanでもyayのdocker-gitでも404エラーが発生しダウンロードできない。
そんなときは`sudo pacman -Syy`。repositoryを強制的に更新する。

[archlinux - Unable to install flatpak on Arch Linux - Stack Overflow](https://stackoverflow.com/questions/67212994/unable-to-install-flatpak-on-arch-linux)

dockerコマンドを使用する際は、`systemctl start docker`でdockerサービスを起動しておく。
`systemctl enable docker`でlinux起動時にdockerを一緒につけられる。

[ubuntu - docker：Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running? - Stack Overflow](https://stackoverflow.com/questions/71815092/docker-cannot-connect-to-the-docker-daemon-at-unix-var-run-docker-sock-is-th)

docker.rawが大きい問題。
仮想ディスク。docker desktopの設定から大きさを調整できる。
[Docker.raw reserving too much size · Issue #2297 · docker/for-mac · GitHub](https://github.com/docker/for-mac/issues/2297)
[macos - What is the purpose of Docker.raw file on Mac OS Catalina? - Ask Different](https://apple.stackexchange.com/questions/391377/what-is-the-purpose-of-docker-raw-file-on-mac-os-catalina)

stack remove。
`var/lib/docker`を消せば全部リセットできる。

[How to clean up Docker - Stack Overflow](https://stackoverflow.com/questions/45798076/how-to-clean-up-docker)
[Where are Docker Images Stored? Docker Container Paths Explained](https://www.freecodecamp.org/news/where-are-docker-images-stored-docker-container-paths-explained/)

## 重いファイルの検出
`du`コマンド。disk usage。
`sudo du -aBm / 2>/dev/null | sort -nr | head -n 10`などとすれば、上位十個の結果を切り出して表示できる。

[5 Methods to Track Down Large Files | FOSS Linux](https://www.fosslinux.com/132931/5-ways-to-find-large-files-in-linux.htm)
[How To Find Large Files on Linux | Tom's Hardware](https://www.tomshardware.com/how-to/find-large-files-linux)

## ファイル検索
`find . 2> /dev/null | grep qtscrcpy`
[bash - How can I get a recursive full-path listing, one line per file? - Stack Overflow](https://stackoverflow.com/questions/1767384/how-can-i-get-a-recursive-full-path-listing-one-line-per-file)

## steam
windows側とライブラリを共有する。
まずはsteamライブラリがあるディスクを特定形式でマウント。今回は`/etc/fstub`に以下の内容を追記した。
`UUID=AE22EC6D22EC3BC9                     /media/gamedisk ntfs   uid=1000,gid=1001,umask=0022 0 0`

uid, gidはid、UUIDはblkidコマンドで調べられる。ディスク名がわからない場合はfdisk -l。

[Using a NTFS disk with Linux and Windows · ValveSoftware/Proton Wiki · GitHub](https://github.com/ValveSoftware/Proton/wiki/Using-a-NTFS-disk-with-Linux-and-Windows)

`engine error paks/Win64/charm_hat_main_gibraltar.rpak`が出ることがある。
1660TiはNV160 Turingのはず。

[CodeNames](https://nouveau.freedesktop.org/CodeNames.html)

[linux i3 shortcuts](<../Info/linux i3 shortcuts.md>)
z
## mpv
[MPV(動画再生ソフト)のキーボード操作方法](https://yutarine.blogspot.com/2018/02/mpv.html)

## Androidエミュ
Genymotion、qemuでx86、waydroidが大体主流。
理論上は直接Android実行するwaydroidが一番早い。

[Currently the best option for running android games on Linux? : r/linux\_gaming](https://www.reddit.com/r/linux_gaming/comments/q7u38b/currently_the_best_option_for_running_android/)
[Play Android Games on Linux : r/linux\_gaming](https://www.reddit.com/r/linux_gaming/comments/vtdt6h/play_android_games_on_linux/)

キーマップが欲しい場合、Linux上から入力を反映させるQtscrcpyというものがある。
[Genshin Impact on waydroid? : r/linux\_gaming](https://www.reddit.com/r/linux_gaming/comments/v9dqwi/genshin_impact_on_waydroid/)


## waydroid
linuxのandroidエミュ。
Anboxの後継。
androidとlinuxを完全融合したwaydroid-linuxというのもある。
現在(2023年11月25日)**Nvidiaに対応していない**。一応ソフトウェアレンダリングにすれば動くには動く。つまりNvidiaを使わなければ。

動かすにはzenカーネルとwayland環境が必須。

[Waydroid - ArchWiki](https://wiki.archlinux.org/title/Waydroid)

`waydroid init`で最小構成が動く。
GAPPがほしいなら`-s GAPPS`。

基本的に`waydroid show-full-ui`で画面が開く。
止めたいときは`waydroid session stop`。

`sytemctl stop waydroid-container`でサービスごと止める方法もある。

### wifiがつながらない
表記的につながってないのは仕様。
内部的にもつながらないのは、nftable、つまりfirewallあたりで止められてる。
だからポート開放なりで通るはずだが、通らなかったのでfirewallを止める。

`​sudo systemctl restart waydroid-container.service`
`sudo systemctl stop nftables.service`
`sudo systemctl start iptables.service`

[Help, i can't connect waydroid to internet : r/waydroid](https://www.reddit.com/r/waydroid/comments/z57rx7/help_i_cant_connect_waydroid_to_internet/)
[Cannot turn wifi on · Issue #166 · waydroid/waydroid · GitHub](https://github.com/waydroid/waydroid/issues/166)
[Android networking (except for DNS) does not work with nftables, but works with iptables · Issue #105 · waydroid/waydroid · GitHub](https://github.com/waydroid/waydroid/issues/105)
[Networking Issues - Waydroid](https://docs.waydro.id/debugging/networking-issues)
[way-firewalld.sh](https://github.com/Quackdoc/waydroid-scripts/blob/main/way-firewalld.sh)
[networking - No network in Waydroid: network is unreachable - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/722660/no-network-in-waydroid-network-is-unreachable)
[DebianにWaydroidで爆速快適なAndroidを使ってみる webzoit.net](https://webzoit.net/hp/it/internet/homepage/env/os/bsd_unix_linux/debian/etc/lineageos_based_android_using_waydroid_on_debian_amd64.html#wifi_bluetooth_problem)

Google play certification
[Google Play Certification - Waydroid](https://docs.waydro.id/faq/google-play-certification)

Networking Issues
[Networking Issues - Waydroid](https://docs.waydro.id/debugging/networking-issues)

share clipboard
```
sudo pacman -S wl-clipboard python-pyclip
```

Extras(arm translation)
[GitHub - casualsnek/waydroid\_script: Python Script to add OpenGapps, Magisk, libhoudini translation library and libndk translation library to waydroid !](https://github.com/casualsnek/waydroid_script)

## zenカーネル
linuxカーネルの別バージョン。
公式で作ってるらしい。

[Arch Linuxで入手できる様々な最適化カーネル - みくにまるのブログ](https://mikunimaru.hatenablog.jp/entry/2021/06/13/122354)
[Kernel - ArchWiki](https://wiki.archlinux.org/title/Kernel)

EOSに入れるときは`sudo pacman -S linux-zen linux-zen-headers`でインストールしたあと、`sudo grub-mkconfig -o /boot/grub/grub.cfg`でgrubの設定を作り直す。
あとはgrubから選択する。一度選択するとデフォルトになる。

[How to switch from Hardened to Zen Kernel? - General system / Kernel, boot, graphics & hardware - EndeavourOS](https://forum.endeavouros.com/t/how-to-switch-from-hardened-to-zen-kernel/31583)

## wayland
ディスプレイサーバー。
linuxはカーネル、ディスプレイサーバー、デスクトップ環境という三段階でGUI環境を作っている。長らくディスプレイサーバーはx11というものしかなかった。そこを置き換えるもの。

[Linuxでよく聞く「Xとは？」とX11のインストール方法](https://eng-entrance.com/linux-gui-x11)
[X Window System - Wikipedia](https://ja.wikipedia.org/wiki/X_Window_System)
[Wayland - Wikipedia](https://ja.wikipedia.org/wiki/Wayland)
[Are we Wayland yet?](https://arewewaylandyet.com)
[GitHub - solarkraft/awesome-wlroots: A curated list of tools and compositors for wlroots](https://github.com/solarkraft/awesome-wlroots)

`sudo pacman -S plasma-wayland-session`でインストール可能。ログアウト後のログイン画面で選択できる。

[How to switch to wayland in KDE Plasma - Desktop Environments / Plasma - EndeavourOS](https://forum.endeavouros.com/t/how-to-switch-to-wayland-in-kde-plasma/21957)

それだけだとデスクトップ環境がないので真っ暗な画面が出る。
plasmashellの起動というので詰まるらしい。ターミナルで起動すると`starting invalid corona "org.kde.plasma.desktop"`というエラーが出る。
`sudo pacman -S plasma-desktop`。これでインストールされる環境はkde-plasma。kdeはgnomeと対になるデスクトップ環境ファミリー。kdeのほうが重い。実際多く使われている環境はplasma。

[Unable to start plasmashell in Arch Linux - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/658772/unable-to-start-plasmashell-in-arch-linux)
[Site Unreachable](https://kde.org/products/)

`alt+space`でkrunnerという検索機能が使える。

[KDE Wayland black screen : r/kde](https://www.reddit.com/r/kde/comments/q8nwty/kde_wayland_black_screen/)

`alt+tab`でウィンドウを切り替えられる。


### 環境変数
waylandでは`.profile`から環境変数を読まなくなっている。
代わりに`~/.config/environment.d/envvars.conf`で読んでくれるが、そこに直接書き込むとi3環境と共存するときにちょっと面倒。
なので`.profile`を読むように設定する。

[Wayland環境での.profile代替手段　デスクトップ・ログイン時の環境変数と自動実行 - Technically Impossible](https://impsbl.hatenablog.jp/entry/AutoStartAndEnvvarsOnWayland)

### マルチモニター
multiple display。waylandではxrandrは使えない。あれはx11というウィンドウシステムを提供する表示プロトコルに則っていたものであり、waylandはまさにそれを置き換えているので使えない。

[X Window System - Wikipedia](https://ja.wikipedia.org/wiki/X_Window_System)

なので`wlr-randr`を使う。
GUIがほしいなら、`kscreen`をインストールして設定から。

[Using Multiple Monitors with Different Resolutions on Wayland Linux | by Wainaina Gichuhi | Medium](https://medium.com/@muffwaindan/using-multiple-monitors-with-different-resolutions-on-wayland-linux-530ef23fc5eb)
[Xrandr equivalent on wayland? : r/wayland](https://www.reddit.com/r/wayland/comments/kuiqcl/xrandr_equivalent_on_wayland/)

そもそもモニターを検知しない場合は、nvidiaGPUが画面出力として働いてない。
`/etc/default/grub`の`GRUB_CMDLINE_LINUX_DEFAULT=`に`nvidia_drm.modeset=1`を追加して`grub-mkconfig -o /boot/grub/grub.cfg`。

[[SOLVED] External monitor not detected under Wayland (KDE Plasma) / Newbie Corner / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=287510)
[Nvidia | Hyprland Wiki](https://wiki.hyprland.org/Nvidia/)

cliphist
`wl-paste --watch cliphist store`で起動。
wofiなら`cliphist list | wofi --show dmenu | cliphist decode | wl-copy`で一覧が出る。

履歴は`/home/seika/.cache/cliphist/db`にある。
平文。clipmanならアプリ指定で弾くこともできるが。

[Keeping secrets secret with keepassxc, clipman and swaywm or i3wm : r/swaywm](https://www.reddit.com/r/swaywm/comments/ljl0dh/keeping_secrets_secret_with_keepassxc_clipman_and/)
[GitHub - chmouel/clipman: A simple clipboard manager for Wayland](https://github.com/chmouel/clipman)
[AUR (en) - clipman](https://aur.archlinux.org/packages/clipman)

## wifiが動かない  
そんな時のためのCLI接続。
nmcliコマンドを使う。

`nmcli d wifi list`
`nmcli d wifi connect <SSID> password <password>`

[Arch Linux インストール俺々式完全版 #Linux - Qiita](https://qiita.com/TsutomuNakamura/items/b60518f8788e5e998744)

## 通信端点が接続されていません
なにかの拍子にマウントが外れると出る。
`lsblk`や`umount`を使ってマウントし直す。

[linux QEMU](<../Info/linux QEMU.md>)

## Hyprland  
GNOMEやKDE以外のwaylandで珍しくNvidiaをサポートして……ないけど動作報告があるWaylandコンポジター。

[https://wiki.hyprland.org/](https://wiki.hyprland.org/)

```
sudo pacman -S hyprland

settings

~/.config/hypr/hyprland.conf
```

アプリ-ランチャーのショートカットがデフォルトでwofiに、ファイルマネージャーがDolphinに入っている。 ターミナルはkitty。

[cheatsheet.md](https://github.com/quantumfate/hypr/blob/main/cheatsheet.md)

yellow warning
remove `autogenerated=1`

lost mouse cursor
This is only issue of Nvidia. Please read link and write this to settings file.
```
env = LIBVA_DRIVER_NAME,nvidia
env = XDG_SESSION_TYPE,wayland
env = GBM_BACKEND,nvidia-drm
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
env = WLR_NO_HARDWARE_CURSORS,1
```

[Nvidia | Hyprland Wiki](https://wiki.hyprland.org/Nvidia/#how-to-get-hyprland-to-possibly-work-on-nvidia)

Electron fix
```
sudo pacman -S qt5-wayland qt5ct libva
yay -S libva-nvidia-driver-git

~/.config/electron-flags.conf
--enable-features=WaylandWindowDecorations
--ozone-platform-hint=auto

```

[Wayland - ArchWiki](https://wiki.archlinux.org/title/Wayland)

shortcut
```
win+c
close window
win+m
logout
win+q
kitty
win+r
wofi --show drun
win+v
togglesplit
win+v
togglefloating
```

キーボード配列
~/.config/hypr/hyprland.conf で kb_layout の行を直す。
```
input {
    kb_layout = jp
}
```

[Arch LinuxとHyprlandをインストールする #archLinux - Qiita](https://qiita.com/k0kubun/items/f80817d34a3eba5122bc)

waybar
```
sudo pacman -S waybar mpd
sudo systemctl enable mpd
sudo systemctl start mpd

nano ./.config/hypr/hyprland.conf
exec-once = waybar
```

[Arch LinuxとHyprlandをインストールする #archLinux - Qiita](https://qiita.com/k0kubun/items/f80817d34a3eba5122bc)

fcitx5
```
exec-once = fcitx5 -r -d

env = GTK_IM_MODULE,fcitx5
env = QT_IM_MODULE,fcitx5
```

[Using Fcitx 5 on Wayland - Fcitx](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland)
[Can't make fcitx5 work with electron apps(chrome) on sway. gtk4 doesn't help. · fcitx/fcitx5 · Discussion #536 · GitHub](https://github.com/fcitx/fcitx5/discussions/536)
[Chromium/Electron(Ozone) Apps doesn't work with fcitx5 · Issue #381 · fcitx/fcitx5 · GitHub](https://github.com/fcitx/fcitx5/issues/381)

## kitty
Cとpythonでできてるconsole。よく比較されるAlacrittyはRust。Alaは使ったときフォントレンダリングが変だった過去がある。

[Why does Alacritty terminal gets more attention than Kitty? · Issue #2701 · kovidgoyal/kitty · GitHub](https://github.com/kovidgoyal/kitty/issues/2701)
[Rust maintainer perfectionism · GitHub](https://gist.github.com/ctrlcctrlv/978b3ee4f55d4b4ec415a985e01cb1c9)
[GPUベースのターミナルソフトKittyの使い方](https://zenn.dev/minefuto/articles/7c8e269ae57d83)

kittyで使えるフォントは少ない。`kitty + list-fonts --psnames`を打つことで使えるフォントが表示される。これを`ctrl+shift+f2`で開く設定ファイルに書き込む。設定ファイルは`~/.config/kitty/kitty.conf`。

[高速で機能的なGPUベースのターミナルエミュレーターkittyを使ってみる](https://arimasou16.com/blog/2021/05/07/00391/)
[GPUベースのターミナルソフトKittyの使い方](https://zenn.dev/minefuto/articles/7c8e269ae57d83)
[ねこが居る会社でkittyを使う #Terminal - Qiita](https://qiita.com/TAKUYA_1228/items/92fad09fedac4cc4403d)

## change locale
`localectl set-locale ja_JP.UTF-8`
[How to change language - General system / Newbie - EndeavourOS](https://forum.endeavouros.com/t/how-to-change-language/16238)

## nvidia driver install 
`nvidia-inst -p -n`
p=install prime
n=install nouveau

[New Nvidia driver installer, nvidia-inst – Discovery](https://discovery.endeavouros.com/nvidia/new-nvidia-driver-installer-nvidia-inst/2022/03/)

## .desktop
`/usr/share/applications/`

## Sway
use sway-git.
sway don't supprts proprietary nvidia drivers.

but if you start from sway edition, you will don't use terminal as in black screen.
so use `tty`, this is like virtual desktop, you can use commands same terminal's it.
after login, type `ctrl+alt+f3`, this shortcut open tty3. Of course you can use tty4, 5, and so on.
You type `yay -S sway-git`, and `sway --unsupported-gpu`, that's end.

[Black screen after Sway Install - Desktop Environments / All WMs - EndeavourOS](https://forum.endeavouros.com/t/black-screen-after-sway-install/30392)

Use sway-git.
Sway doesn't support Nvidia proprietary drivers.

But if you start from the sway edition, you will not use the terminal because it goes into a black screen.
So use `tty`, this is like a virtual desktop, you can use the same commands as in the terminal.
After login, type `ctrl+alt+f3`, this shortcut will open tty3. Of course you can use tty4, 5 and so on.
You type `yay -S sway-git` and `sway --unsupported-gpu' and that's it.

## sway-git
If you want to install only sway-git, first, install the sway edition without sway.
Then install sway-git from tty and edit the sddm's environment file. Please read the sddm section in Arch wiki.
The **local** environment file is `/etc/sddm.conf.d/10-wayland.conf`. You can copy the default file from `/usr/lib/sddm/sddm.conf.d/default.conf`.

```
[General]
DisplayServer=wayland
[Wayland]
CompositorCommand=sway --unsupported-gpu
```

[SDDM - ArchWiki](https://wiki.archlinux.jp/index.php/SDDM#Wayland_.E3.81.A7.E5.8B.95.E3.81.8B.E3.81.99)

## waylandかx11か調べる
`loginctl`
`loginctl show-session <SESSION_ID> -p Type`

or

`echo $XDG_SESSION_TYPE`

or

`loginctl show-session $(loginctl | grep $(whoami) | awk '{print $1}') -p Type`

or

`loginctl show-session "$XDG_SESSION_ID" -p Type`

[WaylandまたはX11が使用されているかどうかを知る方法](https://qastack.jp/unix/202891/how-to-know-whether-wayland-or-x11-is-being-used)

## 結局
……いろいろ試したけど、swayそのものが**Nvidia公式ドライバーをサポートしてない**のがでかい。それとマルチモニターにNvidiaを使用する都合上、出力した方のモニターが灰色にちらつく。画面更新が間に合ってない。sway-gitでも結果は同じ。

[Home · swaywm/sway Wiki · GitHub](https://github.com/swaywm/sway/wiki)

Intelの方で画面出力すれば治るかもしれないが、どうせゲームとかでNvidiaを使うため、Nvidiaのバグを抱えたままにはしたくない。というわけでSwayは見送り。GNOMEは性に合わなかったので、結局KDE使いながらi3引きこもりルートな感じ。



## autoremove
`pacman -R $(pacman -Qtdq)`

[how i can "apt-get autoremove" and "autoclean" like debian based? / Newbie Corner / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=50055)

[linux ReviOS AtlasOS](<../Info/linux ReviOS AtlasOS.md>)

## ubuntu version
`lsv_release -a`
`cat /etc/issue`
`cat /etc/os-release`

[Ubuntuのバージョン確認｜4つの方法をコマンド・画像付きで解説](https://itc.tokyo/linux/ubuntu-check-version/)

## PATH
`export PATH=path:$PATH`。
アンストする場合は`export ${PATH%:path}`。これはsubstringを使用した形式。
まあ、bashrcにでも書きこまないと消えるPATHにそこまで本気出すかという問題はあるが。

[How to remove a path from system path(\`$PATH\`) using terminal commands? - Ask Ubuntu](https://askubuntu.com/questions/433329/how-to-remove-a-path-from-system-pathpath-using-terminal-commands)

## chmodが通っても変更されない
FATファイルシステムだと通らない。
元々所有権の概念が無いWindowsがベースだからという話。
[Linuxの権限確認と変更(chmod)（超初心者向け） #Linuxコマンド - Qiita](https://qiita.com/shisama/items/5f4c4fa768642aad9e06)
[linux - chmod でアクセス権限の変更ができない - スタック・オーバーフロー](https://ja.stackoverflow.com/questions/74055/chmod-でアクセス権限の変更ができない)

## 無効または破損したパッケージ
PGP署名が通らないので、署名を司る`archlinux-keyring`パッケージを更新する。

[Arch Linux の「無効または破損したパッケージ (PGP 署名)」エラーを修正](https://ja.linux-terminal.com/?p=5420)

## ユーザー追加
標準のuseraddを使う。-dでホームディレクトリ、-mでユーザー名、-pでパス。-Gでグループも指定できる。
ホームディレクトリ付け忘れたらmkhomedir_helper。ユーザーを指定する。
パス付け忘れたらpasswd。

ユーザー一覧は`cut -d: -f1 /etc/passwd`。

ユーザーを消す場合はuserdel。-rを付けるとついでにホームディレクトリを消去する。