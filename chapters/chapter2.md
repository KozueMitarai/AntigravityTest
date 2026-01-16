# 第2章：Mermaid.js 基礎のエッセンス

## 4大ダイアグラムの使い分け

Mermaid.jsには多くの図解モードがありますが、まずは以下の4つを押さえるだけで実務の8割はカバーできます。

### 1. フローチャート (`graph`)
プロセスの進み方や条件分岐を記述します。

```mermaid
graph TD
    Start[開始] --> IsAI{AIを使う?}
    IsAI -- Yes --> Fast[爆速で完成]
    IsAI -- No --> Slow[手作業で調整]
    Fast --> End[完了]
    Slow --> End
```

### 2. シーケンス図 (`sequenceDiagram`)
オブジェクト間やシステム間のやり取りを時系列で記述します。

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant A as AI助理
    participant M as Mermaid.js
    
    U->>A: 図解案を依頼
    A->>M: コードを生成
    M-->>A: SVGを描画
    A-->>U: 完成した図を提示
```

### 3. 状態遷移図 (`stateDiagram-v2`)
「状態」がいかに変化するかを記述します。

```mermaid
stateDiagram-v2
    [*] --> 構想中
    構想中 --> 執筆中: プロンプト入力
    執筆中 --> 検証中: 執筆完了
    検証中 --> 公開済: 検証OK
    検証中 --> 執筆中: 修正指示
```

### 4. ガントチャート (`gantt`)
タスクのスケジュールを可視化します。

```mermaid
gantt
    title ドキュメント作成スケジュール
    dateFormat  YYYY-MM-DD
    section 執筆
    第1章           :a1, 2026-01-16, 1d
    第2章           :after a1, 1d
    section 検証
    自動テスト実行   :2026-01-16, 2d
```

## AIに正確なコードを書かせるコツ

AIに依頼する際は、「どの図を使いたいか」を明示すると精度が上がります。
例：「システム間のAPI連携を説明したいので、**シーケンス図**でMermaidコードを書いてください」
