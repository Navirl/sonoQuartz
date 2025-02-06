---
tags:
  - Info
---

daily:: [2024-02-13](/Daily_Note/2024-02-13.md)
up:: [Linux](<../Bar/Linux.md>)
## ossetup  
手動パーティション分けを選択、efiパーティションを選択して/boot/efiにする。  
メインパーティションは/にしてよし。  

## init settings
```
sudo pacman -S brightnessctl cliphist fcitx5-configtool flatpak gnome-software gnome-system-monitor htop jdk17-openjdk lutris nvidia-prime nvtop steam obsidian vivaldi wine winetricks xed
yay -S prismlauncher-git visual-studio-code-bin docker-desktop fcitx5-mozc-ut
flatpak install com.discordapp.Discord com.microsoft.Edge
```

ビデオ、フォント、ミュージック
gamemode gitg geary gnome-clocks gnome-recipes  gnome-weather 
qemu-full
yay -S genymotion qtscrcpy

https://wiki.archlinux.jp/index.php/Mozc
[Waylandで動くタイル型ウィンドウマネージャ・swayを使う](https://zenn.dev/haxibami/articles/wayland-sway-install)

change bash settings of copy and paste
nano word wrap M-S


swapfile 
```
swapon --show
sudo dd if=/dev/zero of=/swapfile bs=1G count=16 status=progress
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

[Adding swap after installation – Discovery](https://discovery.endeavouros.com/storage-and-partitions/adding-swap-after-installation/2021/03/)

uuid
`sudo fdisk -l`
`sudo blkid /dev/`

```
sudo nano /etc/fstab

UUID=AE22EC6D22EC3BC9  /media/hdd ntfs uid=1000,gid=1001,rw,user,exec,umask=000 0 0
UUID=008C90288C901A6C /media/ssd
/swapfile none swap defaults 0 0

nano ~/.xprofile

#input method module setting
export GTK_IM_MODULE="fcitx5"
export QT_IM_MODULE="fcitx5"
export XMODIFIERS='@im=fcitx5'
```

[Arch Linuxの日本語入力をfcitxからfcitx5に切り替える | クロの思考ノート](http://note.kurodigi.com/archlinux-fcitx5/)

 vivaldi
UIの表示 / 非表示
パネルを表示 / 非表示

https://keep.google.com/
https://open.spotify.com/

🔐β 4kocTtbf50ZpQhc2kLatZkiJQ56JHkWvmLVOhxMuPfyZJ3optE8a6cqfJhjlw2IzCWcN2mm4AoAkItmfTuXnUY9YYR2MyIIPVoTqXu7AN3MEHHAPzQkJ1y2tTzxBvYi5Xo5aWAki0L/T2zzW1ECdO98= 🔐

`/home/seika/.config/vivaldi/Default`

default browser
```
xdg-mime default vivaldi-stable.desktop x-scheme-handler/https x-scheme-handler/http
```

time
```
timedatectl set-local-rtc 1
```

[Site Unreachable](https://itsfoss.com/wrong-time-dual-boot/)

ARandR
```
nano ~/.bashrc

or

nano ~/.profile

#!/bin/sh
xrandr --output eDP-1 --primary --mode 1920x1080 --pos 0x0 --rotate normal --output DP-1 --off --output HDMI-1 --off --output HDMI-1-0 --mode 1920x1080 --pos 1920x0 --rotate normal --output DP-1-0 --off --output DP-1-1 --off
```

wine

```
No arguments given, so tried to start GUI, but neither zenity
nor kdialog were found. Please install one of them if you want
a graphical interface, or run with --help for more options.
```

これが表示されたときは汎用GUIがない。
GNOME向けのzenityなりをインストールする。

```
winetricks
install wine mono
select default prefix
install font
fakejapanese

```

minecraft
lutrisから起動するのだが、なぜかどこに引数を書いてもLD_LIBRARY_PATHを読んでくれない。
仕方ないのでLutrisから個別に起動引数を設定して対処。
拡張設定だとLD_LIBRARY_PATHを入力できる専用の場所があるが、なぜかこっちからだとうまく行かないので環境変数から入力。

LD_LIBRARY_PATH='/usr/lib/jvm/java-17-openjdk/'

[shared libraries - Java symbol lookup error: /usr/lib64/jvm/java-11-openjdk-11/lib/libnio.so: undefined symbol: initInetAddressIDs - Stack Overflow](https://stackoverflow.com/questions/60414619/java-symbol-lookup-error-usr-lib64-jvm-java-11-openjdk-11-lib-libnio-so-undef)

鯖がつかない場合はポートマッピング入れすぎの可能性もある。
25565行はひとつだけ。

[Firewalld rule for Minecraft Server | Adam Young's Web Log](https://adam.younglogic.com/2015/03/firewalld-minecraft/)

```
sudo firewall-cmd --add-port 25565/tcp
```

永続化する場合は`--permanent`付けて実行後`--reload`でリロードする。
[firewall-cmdの使い方 はじめの一歩 #firewalld-cmd - Qiita](https://qiita.com/daikumatan/items/0fe4a8ee5e59965814ee)

steam
```
/home/seika/.local/share/Steam/steamapps/libraryfolders.vdf
```

```
	"1"
	{
    	"path"		"/media/hdd/Games"
    	"contentid"		"3188854882565167379"
    	"label"		""
    }
```

bindsym
`~/.config/i3/config`が設定ファイル。
クリップボードヒストリであるgreenclipの設定も無効化されてるがある。

[GitHub - erebe/greenclip: Simple clipboard manager to be integrated with rofi - Static binary available](https://github.com/erebe/greenclip)

 画面キャプチャがほしいのでflameshot。

`bindsym $mod+Shift+s exec --no-startup-id flameshot gui -p ~/画像`

[GitHub - flameshot-org/flameshot: Powerful yet simple to use screenshot software :camera\_flash:](https://github.com/flameshot-org/flameshot)

update
`sudo pacman -Syyu`
