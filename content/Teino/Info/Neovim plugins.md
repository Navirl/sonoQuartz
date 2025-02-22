---
date: 2024-12-05
tags:
  - Info
---

up:: [Neovim](<../Bar/App/Neovim.md>)


## lazy.nvim
init.luaに記述、/lua/config/lazy.luaに設定。
/lua/pluginsに個々の.luaファイルを配置し、内部に以下のようにgithubリポジトリ名を配置する。
```lua
return {
  "folke/lazy.nvim"
}
```
github以外だとURLを直接書けばいい。

initで起動時のスクリプトを設定できる。以下のようにするとキーバインドなども自由に起動可能。
```lua
return {
  "folke/lazy.nvim",
  init = function()
    -- 自由記述
  end,
}
```

configでプラグインごとの設定。同じくfunction()を書くことになる。
正直役割はほぼ同じだが、configはスクリプトが読み込まれた後に動く。
[What is the difference between setting keymaps inside the the \`init\` vs \`config\` table option in Lazy.nvim plugin spec? : r/neovim](https://www.reddit.com/r/neovim/comments/17f9pqi/what_is_the_difference_between_setting_keymaps/?felosearch_translate=1)

optsなどにまとめておき、configでまとめて読むという方法がある。

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  opts = {
    --- コンフィグ
    },
  },
  config = function(_, opts)
    require("nvim-treesitter.configs").setup(opts)
  end,
}
```

これでもいい。
```lua
return {
	"nvim-lualine/lualine.nvim",
	dependencies = { "nvim-tree/nvim-web-devicons" },
	config = function()
		require("lualine").setup({
		-- 他プラグインマネージャーの設定ファイル
})
end,
}

```

/lua/plugins.luaにまとめて書く方法もある。
[📂 Structuring Your Plugins | lazy.nvim](https://lazy.folke.io/usage/structuring)

[lazyvim のプラグインイン管理](https://zenn.dev/vim_jp/articles/31e60fbf12712b)
[使い込んで厳選したNeovimプラグインたちをご紹介します](https://zenn.dev/lighttiger2505/articles/6ff89ea53a10ac#自動補完(auto-compelte))

optsにsetup用の引数を書いておけば、luaプラグインなら自動で読んでくれるらしい。
setup以外の設定はconfigで。

[lazy.nvimの使い方から起動を爆速にする方法までを解説 \| eiji.page](https://eiji.page/blog/neovim-lazy-nvim-intro/)

### プラグイン遅延読み込み
ファイルタイプ、コマンド、キー入力のタイミングで遅延して読み込みできる。
[lazyvimの遅延読み込み (lazyvim load lazy plugin)](https://zenn.dev/vim_jp/articles/609c75cea1208a)

それらのどのタイミングで読み込むかを決めるのがevent。

lazy.nvimの場合は`lazy = true`を設定しておけばとりあえず開幕読み込みは防げる。プラグインが呼ばれるまで読まれない。

開幕じゃなくちょっとしてから読んでほしいなら`event = "VeryLazy"`を置く。

遅延読み込みのコマンドは大文字始まりのみ。存在しないコマンドでもOK。

[lazy.nvimの使い方から起動を爆速にする方法までを解説 \| eiji.page](https://eiji.page/blog/neovim-lazy-nvim-intro/)

### プラグイン削除
:LazyからCleanを選択、カーソル合わせてx。
ファイルは残るので:!rmなどで消しておく。
[🚀 Usage | lazy.nvim](https://lazy.folke.io/usage)

### 起動時のアプデカット
checkerをfalseに。
```lua
require("lazy").setup({
	spec = {
		-- import your plugins
		{ import = "plugins" },
	},
	-- Configure any other settings here. See the documentation for more details.
	-- colorscheme that will be used when installing plugins.
	install = { colorscheme = { "everforest" } },
	-- automatically check for plugin updates
	checker = { enabled = false },
})
```

[lazy.nvimがnvim起動時にアップデートを始めるため、起動が遅くなって今います。アップデートを手動にするにはどうしますか。](https://felo.ai/search/gsXZeu5V2vSCxgyUhWYtwj?invite=rRKXGDWOelDkk)



## nvim-surround
[GitHub - kylechui/nvim-surround: Add/change/delete surrounding delimiter pairs with ease. Written with in Lua.](https://github.com/kylechui/nvim-surround)

選択文字列の囲み文字についてadd / delete / changeを行える。


## nvim-cmp
[GitHub - hrsh7th/nvim-cmp: A completion plugin for neovim coded in Lua.](https://github.com/hrsh7th/nvim-cmp)
補完。プラグイン式。補完する対象ごとに設定が必要。

## nvim-treesitter
[GitHub - nvim-treesitter/nvim-treesitter: Nvim Treesitter configurations and abstraction layer](https://github.com/nvim-treesitter/nvim-treesitter)
基本的な強調表示。
:TSInstallでモジュールをインストールしたうえで直接編集か:TSEnableで有効化しないと意味が無い。

## telescope.nvim
[GitHub - nvim-telescope/telescope.nvim: Find, Filter, Preview, Pick. All lua, all the time.](https://github.com/nvim-telescope/telescope.nvim)
あいまい検索。`:Telescope`。live_grep機能はripgrepに依存しているので別途インストール。

### ripgrep
全文検索。ありとあらゆるファイルのテキストを検索する。

## [formatter.nvim](https://github.com/mhartington/formatter.nvim)
フォーマッタ。
[nvim-cmp](<#nvim-cmp>)と同じくプラグイン式。ファイルタイプごとに設定が必要。

lazy.nvim用の設定が無く、なんかうまくいかなかったので[\[conform.nvim\](https://github.com/stevearc/conform.nvim)](<**[conform.nvim](https //github.com/stevearc/conform.nvim)**>)を使用している。

formatterはスタイルをチェックし、ルールに基づいてコー[\[conform.nvim\](https://github.com/stevearc/conform.nvim)](<**[conform.nvim]

linterはコードをチェックし、バグやルールに沿って書かれているかをチェックする。

[【社内勉強会③】Linter, Formatterについて Python - Qiita](https://qiita.com/Shytaani/items/acfb5ae5cc0a152e91c0)

[【社内勉強会③】Linter, Formatterについて Python - Qiita]a.vim)
かっこ補完。

## **[obsidian.nvim](https://github.com/epwalsh/obsidian.nvim)**
obsidianで出来るような操作を行う。
followlinkでリンクを開いたり、デイリーノート開いたり。

起動前にワークスペースの設定、文章の隠し度合の設定(live editorの程度)が必要。
ワークスペースはいつも通りだが、隠し度合は以下の設定をconfigなどに書く必要がある。
`vim.opt_local.conceallevel = 1`
[Additional markdown syntax not rendering · Issue 286 · epwalsh/obsidian.nvim · GitHub](https://github.com/epwalsh/obsidian.nvim/issues/286)

[Additional markdown syntax not rendering · Issue 286 · epwalsh/obsidian.nvim · GitHub]

## [plenary.nvim](https://github.com/nvim-lua/plenary.nvim)
非同期処理などを行う。
開発用の依存プラグイン。telescope.nvimなどが採用している。

## [everforest](https://github.com/sainnhe/everforest)
スキン。
lazy.nvimで使用する際はconfig\lazy.lua内の設定をちゃんと変更する。

## [spzenhan.vim](https://github.com/kaz399/spzenhan.vim)
normalモードの時だけIMEをオフにする。
設定を読み込めなかったので没。spzenhanへパスを通すのも面倒。

## [im-select.nvim](https://github.com/keaising/im-select.nvim)
normalモードの時だけ **英語キーボードに切り替える**。
記号関係でめんどくなる。
一応対策っぽいのはあるが、これはssh越しで設定する時っぽい？
[Neovimオススメ設定② 日本語入力を快適にするim-select.nvimのすすめ](https://www.runfunrun.dev/posts/nvim-japanese)

## **[spzenhan-lua](https://github.com/norikatsu/spzenhan-lua)**
spzenhanのlua版。
合ってるはずなのに動かないしエラーも出さない。

## **[jasegment.vim](https://github.com/deton/jasegment.vim)**
日本語の文節でW,E,Bを制御。
ちゃんと動く。

## **[vim-kensaku](https://github.com/lambdalisue/vim-kensaku)**
ローマ字で検索できる。
単体では動かないので別のプラグインが必要。Denoも必要。

### [denops] Failed to connect channel : Vim(let):connection failed: tcp address must be host:port

依存のdenopsのやつ。
キャッシュを以下のコマンドでアップデート。

`:call denops#cache#update(#{reload: v:true})`

[Could not connect servers on launch time with denops 7.x · Issue 401 · vim-denops/denops.vim · GitHub](https://github.com/vim-denops/denops.vim/issues/401)

[Could not connect servers on launch time with denops 7.x · Issue 401 · vim-denops/denops.vim · GitHub]
## **[vim-kensaku-search](https://github.com/lambdalisue/vim-kensaku-search)**
ローマ字でスラッシュ検索で検索できる。
リマップが要るので以下を使う。

```lua
vim.keymap.set('c', '<CR>', '<Plug>(kensaku-search-replace)', { noremap = true, silent = true })
```

なんかすぐに検索してくれない、一文字追加したりしないと動かない。

## [vim-kensaku-command](https://github.com/lambdalisue/vim-kensaku-command)
:Kensakuで検索する。
手軽で普通に使える。

## [nvim-autopairs](https://github.com/windwp/nvim-autopairs)
かっこ補完。

## **[neo-tree.nvim](https://github.com/nvim-neo-tree/neo-tree.nvim)**
ファイルブラウザ。:Neotreeで動く。

## **[vimdoc-ja](https://github.com/vim-jp/vimdoc-ja)**
helpの日本語化。
地味に重い(300msくらい)ので遅延読み込み推奨。
以下は設定例。`:Hja`を実行するとヘルプが日本語化する。
```lua
return{
	'vim-jp/vimdoc-ja',
	cmd = {"Hja"},
	lazy = true,
	init = function()
		vim.cmd('helptags ALL')
		vim.opt.helplang = 'ja,en'
	end,
} 
```

## [win-ime-con.nvim](https://github.com/pepo-le/win-ime-con.nvim)
モード変更時にIMEを切替。
pipからneovimを入れる必要があるのだが、うちの設定だとuvの関係上仮想環境を作らないとpipが使えない。
どっかにデフォルト仮想環境を作ることになりそうだが、そこにneovimを入れたりというのはまあめんどいなって。

## **[fzf-lua](https://github.com/ibhagwan/fzf-lua)**
fzfをneovim上で使う。
ファイル名だけでなくコマンドなどもfuzzy検索できる。
(fzfはピッカーでなくテキスト処理なので、実は元から)

:FzfLua commandで使用する。

## **[conform.nvim](https://github.com/stevearc/conform.nvim)**
フォーマッタ。styluaを裏で動かしている。
styluaは同じフォルダにあるstylua.tomlを元にフォーマットする。

[Luaのコードフォーマッター StyLua](https://zenn.dev/hituzi_no_sippo/articles/20210911092842-introduction_to_stylua)

公式お勧めの設定を使うと`<leader>f`にフォーマットコマンドが入る。

[conform.nvim/doc/recipes.md at master · stevearc/conform.nvim · GitHub](https://github.com/stevearc/conform.nvim/blob/master/doc/recipes.md#lazy-loading-with-lazynvim)

## **[lualine.nvim](https://github.com/nvim-lualine/lualine.nvim)**
ステータスバー。
デフォルトの設定がリポジトリにある。テーマがAutoになってるのでそれだけ変更する。

[【Neovim】lualineの表示をカスタムしてみる。Visualモードで選択された行数、文字数を表示してみる](https://zenn.dev/glaucus03/articles/ff710d27de4e55)

## **[diffview.nvim](https://github.com/sindrets/diffview.nvim)**
diffコマンドを使いやすくする。

## **[git-conflict.nvim](https://github.com/akinsho/git-conflict.nvim)**
コンフリクトを解消する。必須級。
`:Git`まで打つと補完出る。

## **[nvim-yati](https://github.com/yioneko/nvim-yati)**
treesitterの小修正。Treesitterの代わりに使う。

## [mason.nvim](https://github.com/williamboman/mason.nvim)
LSPを管理する。
LSPはlanguage server protocolの略。プロジェクトソースを解析して情報を提供するIDE用のサービスの仕様。
Microsoftが2016年から主導している。

[language server protocolについて (前編) VSCode - Qiita](https://qiita.com/atsushieno/items/ce31df9bd88e98eec5c4)

[language server protocolについて (前編) VSCode - Qiita]
DAPはDebug Adapter Protocol。これもMicrosoft主導、デバッガー用の情報提供。

[Rustのtokioを使ってLSP, DAPサーバーを書く](https://zenn.dev/myuon/articles/57f9888c7d22fa#lspとdapについて)

起動には一度どこかで`require("mason").setup()`を実行する必要がある。
なのでこう。

```lua
return {
	"williamboman/mason.nvim",
	config = function()
		require("mason").setup()
	end,
}
```

`:Mason`でインストールできるlspの一覧が見られる。

[Neovim+LSPをなるべく簡単な設定で構築する](https://zenn.dev/botamotch/articles/21073d78bc68bf)

あくまでlspを管理するだけであり、実質miseとかと変わらない。
実際にフォーマットしたりするなら別に[conform.nvim](<**[conform.nvim](https //github.com/stevearc/conform.nvim)**>)などを使用する必要がある。

rustfmtが非推奨なのは、rus[conform.nvim](<**[conform.nvim]
あとスペース消してくれないのは仕様。

[rustfmt: deprecated: rustfmt should now be installed via rustup · Issue 1429 · williamboman/mason.nvim](https://github.com/williamboman/mason.nvim/issues/1429)
[いちからvimのrust開発環境を構築していく❗️(rust.vim, coc.nvim)](https://zenn.dev/yuucu/articles/vimrc-rust-yuucu)
[rustfmt: deprecated: rustfmt should now be installed via rustup · Issue 1429 · williamboman/mason.nvim]