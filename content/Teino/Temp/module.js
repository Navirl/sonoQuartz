module.exports = async (params) => {
    const {
        app,
        quickAddApi: { suggester, yesNoPrompt },
    } = params;
    const csv = app.vault.getAbstractFileByPath("table-export-002.csv");
    const j = app.vault
        .read(csv)
        .then((item) => {
            const arr = [];
            item.split(/\n/)
                .filter((v, i) => i !== 0)
                .forEach((v) => {
                    arr.push(v.split(",")[1]);
                });
            //     return arr;
            // })
            // .then((item) => {
            // const str = "Daily_Note/2023-02-06.md";
            // const strPath = app.vault.getAbstractFileByPath(str);
            // console.log(strPath);
            // app.vault.delete(app.vault.getAbstractFileByPath(arr[0]));
            arr.filter((v) => app.vault.getAbstractFileByPath(v) !== null)
                .forEach((v) => {
                    app.vault.delete(app.vault.getAbstractFileByPath(v));
                });
            // console.log(arr);
        });
};
