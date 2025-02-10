---
date: 2024-02-13
tags:
  - Info
---

up:: [Linux](<../Bar/Linux.md>)

## 削除

EFIパーティションを削除。ボリュームも削除。
起動したらGRUB、パーティションは自分で割る。bootフラグはシステムパーティションに。


[How to delete a protected EFI system partition with Windows 11, 10, 8, or 7](https://www.winability.com/delete-protected-efi-disk-partition/)

### 詳しく

**まずブートローダを削除する**。
登録解除してから本体を消す。

`bcdedit /enum firmware`でブート情報を表示。
ID指定で`bcdedit /delete {ID}`を使って消去。

cmdのコマンドなのでpowershellだと`{}`がうまく使えないかも。
その場合は`--%`を使ってエスケープするといいらしい。試してない。

[WindowsとUbuntuをデュアルブートさせている時のUbuntuの削除方法 #Windows - Qiita](https://qiita.com/arkoudha/items/98136ddf1432e904d215)
[絶対に正しいコマンドラインが失敗して大いに悩む：その知識、ホントに正しい？ Windowsにまつわる都市伝説（46）（2/2 ページ） - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/1511/30/news018_2.html)

ただこの方法はファイルが残るので、結局diskpartで直接消すほうが早いかもしれない。

linuxから消す場合はefibootmgrを使用する。
`efibootmgr -c -d /dev/sda -p 1 -l \\EFI\\EndeavourOS\\grubx64.efi -L "Arch Linux"`

c create
d disk
p partition
l loader
L label

[linux - Dual boot Endeavour OS changed to EFI hard drive after BIOS update - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/678726/dual-boot-endeavour-os-changed-to-efi-hard-drive-after-bios-update)