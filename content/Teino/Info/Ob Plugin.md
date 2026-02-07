---
date: 2023-01-30
tags:
 - Info
---

up:: [Obsidian](<../Bar/GUI/Obsidian.md>)

## Graph-analysys
自動で関連ノートを探す。
[Obsidianのリンクを元にして関連ノートを見つけ出すプラグイン – ごりゅご.com](https://goryugo.com/20211115/graph-analysis/)

## Dataview
検索結果を**ファイル内の**リストやテーブルに表示する。
Javascriptが実行できるので、何か表示したいだけならプラグインを作らずともこれで間に合うことも多い。
[Dataview](https://blacksmithgu.github.io/obsidian-dataview/)

## obsidian-text-expand
検索結果に対してのリンクを一気に張る。
[mrjackphil/obsidian-text-expand: A simple text expand plugin for Obsidian.md](https://github.com/mrjackphil/obsidian-text-expand)

## typewriter-scroll
常に文章を真ん中に持ってくる。
そのせいかモバイルからだと文章選択時に勝手にどこまでも滑っていく。

## BibleGateway-to-Obsidian
毎日聖書から一つ引用してマークダウンにする。
**Ruby必須。**
[GitHub - selfire1/BibleGateway-to-Obsidian: This script adapts jgclark's BibleGateway-to-Markdown script to export for use in Obsidian.](https://github.com/selfire1/BibleGateway-to-Obsidian)

## your-papa/obsidian-Smart2Brain
[GitHub - your-papa/obsidian-Smart2Brain: An Obsidian plugin to interact with your privacy focused AI-Assistant making your second brain even smarter!](https://github.com/your-papa/obsidian-Smart2Brain)
llmと接続して検索。
最初にembeddingを行うため長い待ち時間が発生する。
また、ollmaでembeddingを行おうとすると即VRAM不足で止まる。

## linanwx/aosr
[GitHub - linanwx/aosr: Aosr is Another Obsidian plugin for Spaced Repetition.](https://github.com/linanwx/aosr)
spaced repetitionの別バージョン。
大体SRで良くないってなるが、複数行を両方にサポートするのは強い。
あとデッキ機能がある。

レビューインターフェースが標準ページで開くのもありがたい。
実はSRでもできるが。

ただタグを著しく汚染する。

また、ファイル単位のreview機能が無い。
repeatプラグインはdataviewが必要なので却下。

つまり複数行をどうしても導入したいとき以外に使う用途が無い気がする。
その複数行もspacedにあるので……

## chhoumann/quickadd
[GitHub - chhoumann/quickadd: QuickAdd for Obsidian](https://github.com/chhoumann/quickadd)

テンプレートを挿入したり、ノートから情報を読んだり、マクロ組んだりできる。
特定のフォルダに特定のテンプレートを適用して挿入できる機能が便利。

実はtemplater同様専用の構文が存在する。
LINKCURRENTなどTemplaterでは出しにくいものも使える。
テンプレートを含めることもできるが、dailynoteと連携などはできない。
[Format syntax \| QuickAdd](https://quickadd.obsidian.guide/docs/FormatSyntax?utm_source=chatgpt.com)

## SilentVoid13/Templater
[GitHub - SilentVoid13/Templater: A template plugin for obsidian](https://github.com/SilentVoid13/Templater)

独自テンプレート記法が使える。
これを使う場合、{{date}}などの元のテンプレート記法は適用されないことに注意。
## farling42/obsidian-import-json
[GitHub - farling42/obsidian-import-json: Plug-in for Obsidian.md which will create Notes from JSON files](https://github.com/farling42/obsidian-import-json)

csvとjsonをテンプレートに従い抽出。

これは[NotebookLM to PDF - Chrome Web Store](https://chromewebstore.google.com/detail/notebooklm-to-pdf/micfpbhlllbdpgdkkgdimdpmpeefoamk)を使ってnotebooklmから抽出したクイズ。
```json
{
  "quiz": [
    {
      "question": "ソースマテリアルによると、`git subtree split`コマンドの主な特徴は何ですか？",
      "answerOptions": [
        {
          "text": "指定したディレクトリを、過去のコミット履歴も含めて新しいブランチとして切り分ける。",
          "isCorrect": true,
          "rationale": "このコマンドは、単にファイルを分離するだけでなく、そのファイルの歴史も一緒に移動させるため、コンポーネントの独立性を高める際に有用です。"
        },
        {
          "text": "リポジトリの現在の状態のスナップショットのみを、新しいブランチとして作成する。",
          "isCorrect": false,
          "rationale": "この説明は、過去の履歴を考慮しない操作を示唆していますが、`git subtree split`の重要な点は履歴の維持にあります。"
        },
        {
          "text": "外部リポジトリへの参照（ポインタ）のみをリポジトリ内に保存する。",
          "isCorrect": false,
          "rationale": "外部リポジトリへの参照を保存する機能は、`git submodule`の動作に近いものです。"
        },
        {
          "text": "リモートリポジトリにのみ影響を与え、ローカルの作業ディレクトリは変更しない。",
          "isCorrect": false,
          "rationale": "`git subtree split`はローカルでブランチを作成する操作であり、直接リモートに影響を与えるわけではありません。"
        }
      ],
      "hint": "このコマンドは、単にファイルを分離するだけでなく、そのファイルの「歴史」も一緒に移動させます。"
    },
    {
      "question": "SSH接続で「Permission denied (publickey)」エラーが発生した場合、ソースマテリアルで推奨されているサーバー側のデバッグ手順は何ですか？",
      "answerOptions": [
        {
          "text": "`firewall-cmd`を使ってSSHポートを一度閉じてから再度開く。",
          "isCorrect": false,
          "rationale": "ポートの問題であれば接続自体がタイムアウトする可能性が高く、公開鍵認証エラーの直接的な原因調査にはなりません。"
        },
        {
          "text": "クライアント側で`ssh-keygen`を再度実行し、新しい鍵ペアを作成する。",
          "isCorrect": false,
          "rationale": "鍵の不一致が原因である可能性はありますが、まずサーバー側のログで原因を特定することが推奨されています。"
        },
        {
          "text": "`/etc/ssh/sshd_config`ファイルで`LogLevel`を`DEBUG`に設定し、サービスを再起動後にログを確認する。",
          "isCorrect": true,
          "rationale": "ログレベルを上げることで、認証プロセスのどの段階で失敗しているのか、より詳細な情報を得ることができます。"
        },
        {
          "text": "`chown`コマンドで`~/.ssh`ディレクトリの所有者を`root`に変更する。",
          "isCorrect": false,
          "rationale": "SSHの認証ディレクトリやファイルの所有者は、接続しようとしているユーザー自身である必要があり、`root`に変更すると問題が悪化する可能性があります。"
        }
      ],
      "hint": "問題の原因を特定するためには、まずサーバーに通常より詳細な情報を記録させる必要があります。"
    }
  ]
}

```

これに以下のようにhandlebarテンプレートを適用。
```markdown
---
tags:
  - flashcards
---
{{question}}
{{#each answerOptions}}
- [ ] {{text}}
{{/each}}
<details>
<summary>Hint</summary>
{{hint}}
</details>
?
{{#each answerOptions}}
- {{#if isCorrect}}**[✅] {{text}}**{{else}}[ ] {{text}}{{/if}}
  > *Rationale:* {{rationale}}
{{/each}}
```

すると大体以下のようになる。
これは色々足してるが。
```markdown
---
tags:
  - flashcards
  - imported/quiz
---

START
Basic
Front:
ソースマテリアルによると、`git subtree split`コマンドの主な特徴は何ですか？

- [ ] 指定したディレクトリを、過去のコミット履歴も含めて新しいブランチとして切り分ける。
- [ ] リポジトリの現在の状態のスナップショットのみを、新しいブランチとして作成する。
- [ ] 外部リポジトリへの参照（ポインタ）のみをリポジトリ内に保存する。
- [ ] リモートリポジトリにのみ影響を与え、ローカルの作業ディレクトリは変更しない。

<details>
<summary>Hint</summary>
このコマンドは、単にファイルを分離するだけでなく、そのファイルの「歴史」も一緒に移動させます。
</details>

Back:
- **[✅] 指定したディレクトリを、過去のコミット履歴も含めて新しいブランチとして切り分ける。**
  > *Rationale:* このコマンドは、単にファイルを分離するだけでなく、そのファイルの歴史も一緒に移動させるため、コンポーネントの独立性を高める際に有用です。
- [ ] リポジトリの現在の状態のスナップショットのみを、新しいブランチとして作成する。
  > *Rationale:* この説明は、過去の履歴を考慮しない操作を示唆していますが、`git subtree split`の重要な点は履歴の維持にあります。
- [ ] 外部リポジトリへの参照（ポインタ）のみをリポジトリ内に保存する。
  > *Rationale:* 外部リポジトリへの参照を保存する機能は、`git submodule`の動作に近いものです。
- [ ] リモートリポジトリにのみ影響を与え、ローカルの作業ディレクトリは変更しない。
  > *Rationale:* `git subtree split`はローカルでブランチを作成する操作であり、直接リモートに影響を与えるわけではありません。
END
```

## Make-md/makemd
[GitHub - Make-md/makemd](https://github.com/Make-md/makemd)

notionみたいな運用が出来る。
データベースであるspaceをいろいろに作ったり、タグやフォルダがspaceとして認識されたり。これを任意にjoinでくっつけて表示したりできる。
spaceをいろいろな方法で見せるのが目的なので、ブロックエディターに縛られることはない。

## xRyul/obsidian-image-converter
[GitHub - xRyul/obsidian-image-converter at 5dad8168a54dfe67f01bec890fbf0be01d40010b](https://github.com/xRyul/obsidian-image-converter/tree/5dad8168a54dfe67f01bec890fbf0be01d40010b)

画像の変換・アノテーションの追加が出来る。

(2026/01/16)
アノテーション追加後に変換で圧縮したかったので追記。バージョンアップで壊れる。

`obsidian-image-converter/src/ImageAnnotation/ImageAnnotationModal.ts`

```ts
import { ProcessSingleImageModal } from "../ProcessSingleImageModal";

//~~~中略~~~

onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
        this.cleanup();
        this.componentContainer.unload();
        super.onClose();
        new ProcessSingleImageModal(this.app,this.plugin,this.file).open();

    }

```

アノテーション後に一番上までスクロールしてしまう問題はtypewriter modeのcursor positionで対応。これに他のプラグインを使う手もあったが、typewriterだけで行けるならいいだろう。