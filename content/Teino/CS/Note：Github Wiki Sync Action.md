
[GitHub - newrelic/wiki-sync-action: A GitHub Action that synchronizes the contents of a directory to the repository's Wiki.](https://github.com/newrelic/wiki-sync-action)

```yml
name: Documentation

# wikiとメインリポジトリを同期するGitHub Actions
# セキュリティ的に不安だったのと、どうせ同期してもGitHub Pagesがprivateでは30日しか使えないので止めた
# https://github.com/newrelic/wiki-sync-action

on:
  push:
    branches:
      - main
  repository_dispatch:
    types: [docs]
  gollum:

  workflow_dispatch:

env:
  GIT_AUTHOR_NAME: Actionbot
  GIT_AUTHOR_EMAIL: actions@github.com

jobs:
  job-sync-docs-to-wiki:
    runs-on: ubuntu-latest
    if: github.event_name != 'gollum'
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v2
      - name: Sync docs to wiki
        uses: islerfab/wiki-sync-action@master
        with:
          source: .
          destination: wiki
          token: ${{ secrets.NEWRELIC_BOT_TOKEN }}
          gitAuthorName: ${{ env.GIT_AUTHOR_NAME }}
          gitAuthorEmail: ${{ env.GIT_AUTHOR_EMAIL }}

  job-sync-wiki-to-docs:
    runs-on: ubuntu-latest
    if: github.event_name == 'gollum'
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.NEWRELIC_BOT_TOKEN }}
          ref: main
      - name: Sync Wiki to Docs
        uses: islerfab/wiki-sync-action@master
        with:
          source: wiki
          destination: .
          token: ${{ secrets.NEWRELIC_BOT_TOKEN }}
          gitAuthorName: ${{ env.GIT_AUTHOR_NAME }}
          gitAuthorEmail: ${{ env.GIT_AUTHOR_EMAIL }}
          branch: main

```
onがトリガー、
envが環境変数、
jobsで実行環境を指定し、
stepsで実際の中身を連ねていく。
といっても直書きは良くないのでusesでリポジトリを指定してそれを実行するが。

withはusesへの引数。
${{}}は変数指定。secretsと書いてある部分はリポジトリに指定したsecretから引っ張り出す。