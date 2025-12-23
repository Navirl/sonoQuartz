#flashcards/Program

## SOLID原則

[[ダメなソフトウェア設計]]

### SOLID本文

一つのクラスは一つの役職に対してのみ役割、責任を持つ原則。
?
Single Responsibility Principle
[SOLIDの原則: Part1 - 単一責任の原則(Single Responsibility Principle)](https://code.tutsplus.com/ja/tutorials/solid-part-1-the-single-responsibility-principle--net-36074)
[【SOLID原則】単一責任の原則 - SRP](https://zenn.dev/chida/articles/2e42d7eddcf185)
<!--SR:!2022-07-25,1,241-->


SRPによりクラスの責任が一つに絞られると何が良いか。
?
2つのチームが1つのクラスを変更することで起きる、連鎖する修正の手間が減らせる。
<!--SR:!2022-07-28,4,281-->


クラス内の変更が多い部分は、一つのクラス内で変更結果が完結するようにする原則。
?
Open/Closed Principle
[【SOLID原則】オープン・クローズドの原則 - OCP](https://zenn.dev/chida/articles/d859839928a39d)
<!--SR:!2022-07-25,1,241-->


なぜinterfaceや抽象メソッドを使うとOCPは達成できるのか。
?
処理を呼ぶ側はinterfaceや抽象メソッドを使えばよく、クラスによって変更する必要が無くなるため。
<!--SR:!2022-07-28,4,281-->


全てのメソッドの実装をOCPに沿ってはいけないのはなぜか。
?
OCPには抽象化が必要だが、抽象化には多くの作業が必要で、またクラス自体も複雑になってしまうから。
トレードオフが重要。
<!--SR:!2022-07-28,4,281-->


クラスの持つ目的が曖昧であってはならないのはなぜか。
?
目的が曖昧だと、クラスが二つ以上の責任を持ってしまうため。
<!--SR:!2022-07-28,4,281-->


サブタイプの振る舞いを決める１つの指針となる原則。
?
Liskov substitution principle
[リスコフの置換原則（LSP）をしっかり理解する - Qiita](https://qiita.com/yuki153/items/142d0d7a556cab787fad)
<!--SR:!2022-07-28,4,281-->


親クラスは子クラスと置換可能であるという原則。
?
Liskov substitution principle
[SOLID原則について簡単に書く - Qiita](https://qiita.com/yui_mop/items/93fef037a787318e7067#%E3%83%AA%E3%82%B9%E3%82%B3%E3%83%95%E3%81%AE%E7%BD%AE%E6%8F%9B%E5%8E%9F%E5%89%87liskov-substitution-principle)
<!--SR:!2022-07-28,4,281-->


コード内でクラスの型チェックなどをしている場合、違反している可能性がある原則。
?
Liskov substitution principle
[開発者が知っておくべきSOLIDの原則 | POSTD](https://postd.cc/solid-principles-every-developer-should-know/#リスコフの置換原則)
<!--SR:!2022-07-28,4,281-->


LSPが必要なのは、オブジェクト指向が継承にどのような関係を求めているからか。
?
is-a 関係
<!--SR:!2022-07-28,4,281-->


is-a 関係とは何か。
?
あるクラスAが処理できるメッセージを、別のクラスBでも処理できるとき、BからAに対して成り立つ関係。クラスBはクラスAの一種となる。
[リスコフの置換原則（LSP）をしっかり理解する - Qiita](https://qiita.com/yuki153/items/142d0d7a556cab787fad#%E3%82%B5%E3%83%96%E3%82%BF%E3%82%A4%E3%83%97%E3%81%AB%E3%81%AA%E3%82%8A%E5%BE%97%E3%82%8B%E3%81%AE%E3%81%AF%E7%B6%99%E6%89%BF%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B5%E3%83%96%E3%82%AF%E3%83%A9%E3%82%B9%E3%81%A0%E3%81%91%E3%81%A7%E3%81%AF%E7%84%A1%E3%81%84)
<!--SR:!2022-07-27,3,261-->


必要なinterfaceだけを実装する原則。
?
Interface segregation principle
[SOLID原則について簡単に書く - Qiita](https://qiita.com/yui_mop/items/93fef037a787318e7067#%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E5%88%86%E9%9B%A2%E3%81%AE%E5%8E%9F%E5%89%87interface-segregation-principle)
<!--SR:!2022-07-28,4,281-->


ISPは何をもって実現できるか。
?
interface、及び親クラスに実装した抽象メソッドなど
[開発者が知っておくべきSOLIDの原則 | POSTD](https://postd.cc/solid-principles-every-developer-should-know/#%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E5%88%86%E9%9B%A2%E3%81%AE%E5%8E%9F%E5%89%87)
<!--SR:!2022-07-28,4,281-->


抽象的なクラスに依存せよという原則。
?
Dependency inversion principle
[SOLID原則について簡単に書く - Qiita](https://qiita.com/yui_mop/items/93fef037a787318e7067#%E4%BE%9D%E5%AD%98%E6%80%A7%E9%80%86%E8%BB%A2%E3%81%AE%E5%8E%9F%E5%89%87dependency-inversion-principle)
[開発者が知っておくべきSOLIDの原則 | POSTD](https://postd.cc/solid-principles-every-developer-should-know/#依存性逆転の原則)
[iOS開発の事例に寄せたSOLID原則の解説](https://zenn.dev/k_koheyi/articles/019b6a87bc3ad15895fb#%E4%BE%9D%E5%AD%98%E6%80%A7%E9%80%86%E8%BB%A2%E3%81%AE%E5%8E%9F%E5%89%87)
<!--SR:!2022-07-28,4,281-->


上位のモジュールは下位のモジュールに依存してはならないという原則。
?
Dependency inversion principle
<!--SR:!2022-07-28,4,281-->


詳細が抽象に依存すべきであるという原則。
?
Dependency inversion principle
<!--SR:!2022-07-25,1,241-->


DIPに準じると何が良いか。
?
抽象クラスに依存するため、具象クラスに依存するより変更が少なく済む。
<!--SR:!2022-07-28,4,281-->


DIPを満たすにはどうすればよいか。
?
DIを使い、抽象クラスやinterfaceを注入する。
<!--SR:!2022-07-27,3,261-->


## 契約

事前条件が成り立つ時、==処理は正しく呼ばれている==ことが保証されます。
[契約による設計から見た例外 - Qiita](../Others/契約による設計から見た例外%20-%20Qiita.md)
<!--SR:!2022-07-28,4,281-->


事後条件が成り立つ時、==処理は正しく実装されている==ことが保証されます。
<!--SR:!2022-07-28,4,281-->


不変条件が成り立つ時、==オブジェクトは正しく実装されている==ことが保証されます。
<!--SR:!2022-07-28,4,281-->



契約による設計において、成功とは「==関係データの不変条件が常に成り立ち==、==事前条件が成り立ち==、==処理が呼ばれ==、==事後条件が成り立つ==」場合を指します。
<!--SR:!2022-07-25,1,241!2022-07-28,4,281!2022-07-25,1,241!2022-07-28,4,281-->