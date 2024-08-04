# Anki Word Adder

## 概要
Anki Word Adderは、ウェブページ上の英単語を簡単にAnkiに追加できるChrome拡張機能です。

## 特徴
- ウェブページ上の単語を選択して右クリックでAnkiに追加
- 単語の意味をWordsAPIにより取得
- 指定デッキに(英単語, 意味)のカードを追加

## 使い方
1. Chromeで任意のウェブページを開きます。
2. 単語を選択し、右クリックメニューから「Ankiに追加」を選択します。
3. Ankiにカードが追加されます。

## 設定
拡張機能のオプションページで以下の設定が可能です:
- デフォルトのデッキ
- カードのテンプレート
- 自動取得する情報の種類

## 貢献
バグ報告や機能リクエストは、[Issues](https://github.com/yourusername/anki-word-adder/issues)ページで受け付けています。プルリクエストも歓迎します。

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 以下、開発用
### manifest.jsonの設定
[参考ページ](https://qiita.com/shiro1212/items/12f0a767494a7b2ab0b3)
- iconは公開時に入れたい
- 