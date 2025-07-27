# サウレンシリーズ文体検証システム 設計書

## 概要

サウレンシリーズの小説が既定のガイドラインに準拠しているかを自動的に検証するシステムの設計。自然言語処理とルールベースの検証を組み合わせて、文体、キャラクター性、物語構造の一貫性をチェックする。

## アーキテクチャ

### システム構成

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI Interface │───▶│  Validation     │───▶│   Report        │
│                 │    │  Engine         │    │   Generator     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Rule Modules  │
                    │                 │
                    │ • Format Check  │
                    │ • Character     │
                    │ • Relationship  │
                    │ • Structure     │
                    │ • Description   │
                    └─────────────────┘
```

### コンポーネント設計

#### 1. CLI Interface (`validate-saulen`)
- **責任**: ユーザーインターフェースとコマンド処理
- **入力**: ファイルパス、オプション
- **出力**: 色分けされた検証結果

#### 2. Validation Engine
- **責任**: 検証プロセスの統括と結果の統合
- **機能**: 
  - ファイル読み込み
  - 各ルールモジュールの実行
  - スコア算出
  - 結果の統合

#### 3. Rule Modules
各検証項目を独立したモジュールとして実装

## コンポーネントと詳細設計

### Format Checker Module

```python
class FormatChecker:
    def validate_dialogue_format(self, text: str) -> ValidationResult:
        """会話文形式の検証"""
        pattern = r'^(サウレン|you)：「.*」$'
        # 実装詳細...
    
    def validate_narrative_format(self, text: str) -> ValidationResult:
        """地の文形式の検証"""
        pattern = r'^\*.*\*$'
        # 実装詳細...
```

### Character Consistency Module

```python
class CharacterChecker:
    def validate_saulen_speech(self, dialogue: str) -> ValidationResult:
        """サウレンの台詞の一貫性チェック"""
        # 丁寧語チェック
        # 職業的表現チェック
        # 感情表現チェック
    
    def validate_you_speech(self, dialogue: str) -> ValidationResult:
        """youの台詞の一貫性チェック"""
        # 冷静な表現チェック
        # 論理的表現チェック
        # 物理的描写禁止チェック
```

### Relationship Validator Module

```python
class RelationshipValidator:
    def validate_communication_based(self, text: str) -> ValidationResult:
        """通信ベース関係性の検証"""
        # 直接接触の検出
        # 対面描写の検出
    
    def validate_trust_expression(self, text: str) -> ValidationResult:
        """信頼関係表現の検証"""
        # 信頼関係を示すキーワード検出
        # 協力関係の表現チェック
```

### Structure Analyzer Module

```python
class StructureAnalyzer:
    def validate_story_structure(self, text: str) -> ValidationResult:
        """物語構造の検証"""
        # 転送シーンの検出
        # 探索フェーズの検出
        # 発見フェーズの検出
        # 危機フェーズの検出
        # 解決/脱出フェーズの検出
    
    def validate_open_ending(self, text: str) -> ValidationResult:
        """オープンエンドの検証"""
        # 完全解決の回避チェック
        # 謎の残存チェック
```

### Description Quality Module

```python
class DescriptionQualityChecker:
    def validate_environmental_description(self, text: str) -> ValidationResult:
        """環境描写の品質チェック"""
        # 具体性の評価
        # 詩的表現の評価
        # 感覚的描写の評価
    
    def validate_scientific_accuracy(self, text: str) -> ValidationResult:
        """科学的表現の適切性チェック"""
        # 専門用語の使用チェック
        # 論理的整合性チェック
```

## データモデル

### ValidationResult

```python
@dataclass
class ValidationResult:
    rule_name: str
    score: int  # 0-100
    status: ValidationStatus  # PASS, WARNING, FAIL
    issues: List[Issue]
    suggestions: List[str]

@dataclass
class Issue:
    line_number: int
    column: int
    severity: IssueSeverity  # ERROR, WARNING, INFO
    message: str
    suggestion: str
```

### Configuration

```yaml
# validation_config.yaml
rules:
  format_check:
    enabled: true
    weight: 20
  character_consistency:
    enabled: true
    weight: 25
  relationship_validation:
    enabled: true
    weight: 20
  structure_analysis:
    enabled: true
    weight: 20
  description_quality:
    enabled: true
    weight: 15

scoring:
  pass_threshold: 80
  warning_threshold: 60

output:
  colors: true
  verbose: false
  format: "console"  # console, json, html
```

## 実装技術

### 自然言語処理
- **形態素解析**: MeCab + mecab-python3
- **感情分析**: 日本語感情極性辞書
- **文体解析**: カスタムルールベースシステム

### パターンマッチング
- **正規表現**: Python re module
- **構造解析**: カスタムパーサー
- **キーワード検出**: 辞書ベースマッチング

### レポート生成
- **コンソール出力**: Rich library (色分け、プログレスバー)
- **HTML出力**: Jinja2 templates
- **JSON出力**: 標準json module

## エラーハンドリング

### ファイル処理エラー
- ファイルが存在しない
- 読み込み権限がない
- 文字エンコーディングエラー

### 検証エラー
- 予期しない文書構造
- 解析不可能なテキスト
- ルールモジュールの実行エラー

### 設定エラー
- 設定ファイルの不正
- ルールの競合
- 重み設定の不正

## パフォーマンス考慮事項

### 最適化戦略
- **並列処理**: 独立したルールモジュールの並列実行
- **キャッシュ**: 形態素解析結果のキャッシュ
- **早期終了**: 致命的エラー検出時の早期終了

### メモリ管理
- **ストリーミング処理**: 大きなファイルの分割処理
- **リソース解放**: 適切なリソース管理

## セキュリティ考慮事項

### 入力検証
- ファイルパスの検証
- ファイルサイズ制限
- 悪意のあるコンテンツの検出

### 実行環境
- サンドボックス実行
- 権限の最小化
- ログ記録

## テスト戦略

### 単体テスト
- 各ルールモジュールの独立テスト
- エッジケースのテスト
- エラーハンドリングのテスト

### 統合テスト
- 既存小説での検証テスト
- 不正サンプルでの検証テスト
- パフォーマンステスト

### 受入テスト
- 実際のライターによる使用テスト
- 検証精度の評価
- ユーザビリティテスト

## 拡張性

### 新ルールの追加
- プラグインアーキテクチャ
- 設定ベースのルール有効化
- カスタムルールの作成支援

### 他シリーズへの対応
- 設定ファイルによるカスタマイズ
- ルールセットの切り替え
- テンプレートベースの拡張

## 運用・保守

### ログ記録
- 検証実行ログ
- エラーログ
- パフォーマンスログ

### 監視
- 検証成功率の監視
- 実行時間の監視
- エラー発生率の監視

### 更新・保守
- ルールの定期見直し
- 辞書データの更新
- パフォーマンス改善