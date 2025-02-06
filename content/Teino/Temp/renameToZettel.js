// ファイル名を変更する関数
async function renameFile(oldName, newName) {
  // ファイルのパスを取得
  let filePath = app.vault.getAbstractFileByPath(oldName);
  // ファイルが存在するかチェック
  if (filePath) {
    // ファイル名を変更
    await app.vault.rename(filePath, newName);
    // 変更したファイルを返す
    return app.vault.getAbstractFileByPath(newName);
  } else {
    // ファイルが存在しない場合はエラーを出力
    console.error("File not found: " + oldName);
    return null;
  }
}

// エイリアスを追加する関数
async function addAlias(file, alias) {
  // ファイルが存在するかチェック
  if (file) {
    // ファイルの内容を取得
    let fileContent = await app.vault.read(file);
    // YAMLフロントマターの開始と終了の位置を検索
    let start = fileContent.indexOf("---");
    let end = fileContent.indexOf("---", start + 1);
    // YAMLフロントマターが存在するかチェック
    if (start >= 0 && end >= 0) {
      // YAMLフロントマターの内容を取得
      let yaml = fileContent.substring(start + 3, end).trim();
      // YAMLフロントマターにaliasesキーが存在するかチェック
      if (yaml.includes("aliases:")) {
        // aliasesキーの位置と改行の位置を検索
        let key = yaml.indexOf("aliases:");
        let line = yaml.indexOf("\n", key);
        // aliasesキーの値にエイリアスを追加
        yaml = yaml.substring(0, line) + "\n" + " - " + alias + yaml.substring(line);
      } else {
        // aliasesキーが存在しない場合は、新たに作成してエイリアスを設定
        yaml += "\naliases:\n - " + alias;
      }
      // YAMLフロントマターの内容を更新
      fileContent =
        fileContent.substring(0, start + 3) +
        "\n" +
        yaml +
        "\n" +
        fileContent.substring(end);
      // ファイルの内容を書き込み
      await app.vault.modify(file, fileContent);
    } else {
      // YAMLフロントマターが存在しない場合は、新たに作成してエイリアスを設定
      fileContent = "---\naliases:\n - " + alias + "\n---\n" + fileContent;
      // ファイルの内容を書き込み
      await app.vault.modify(file, fileContent);
    }
  } else {
    // ファイルが存在しない場合はエラーを出力
    console.error("File not found: " + file.path);
  }
}

  // 現在の日付と時刻を既定の形式で取得する関数
function makeDate() {
  // 現在の日付と時刻を取得
  let currentdate = new Date();

  // 年、月、日、時、分、秒をそれぞれ取得
  let year = currentdate.getFullYear();
  let month = currentdate.getMonth() + 1; // 月は0から始まるので+1する
  let day = currentdate.getDate();
  let hour = currentdate.getHours();
  let minute = currentdate.getMinutes();
  let second = currentdate.getSeconds();

  // 一桁の場合は先頭に0を付ける
  month = ("0" + month).slice(-2);
  day = ("0" + day).slice(-2);
  hour = ("0" + hour).slice(-2);
  minute = ("0" + minute).slice(-2);
  second = ("0" + second).slice(-2);

  // 形式に合わせて文字列にする
  return year + month + day + "T" + hour + minute + second + ".md";
}

module.exports = async () => {
  // 現在開いているファイルを取得
  let file = this.app.workspace.getActiveFile();

  // ファイルが存在しない場合は終了
  if (!file) return;

  // 元のファイル名（拡張子あり）と新しいファイル名（拡張子は.mdとする）を指定
  let oldName = file.name;
  // 形式に合わせて文字列にする
  let newName = makeDate();

  // ファイル名を変更し、変更したファイルを取得
  file = await renameFile(file.path, newName);

  // 元のファイル名（拡張子なし）をエイリアスとして追加
  await addAlias(file, oldName.replace(".md", ""));
};
