# 第4章：JavaScriptによる自動生成の実装例

## 動的な図解：プログラムとMermaidの融合

JavaScriptを使うと、データに基づいて図解を自動生成したり、ユーザーの操作に応じて図を更新したりすることが可能になります。

## JSONデータから図を生成する

例えば、以下のような組織データ構造があるとします。

```javascript
const orgData = {
    name: "CEO",
    children: [
        { name: "営業部", children: [{ name: "営業課" }] },
        { name: "技術部", children: [{ name: "開発課" }, { name: "インフラ課" }] }
    ]
};
```

これをMermaidの `graph` 形式に変換する簡単な関数を書いてみます。

```javascript
function generateMermaid(node, parentName = null) {
    let lines = [];
    if (parentName) {
        lines.push(`    ${parentName} --> ${node.name}`);
    }
    if (node.children) {
        node.children.forEach(child => {
            lines = lines.concat(generateMermaid(child, node.name));
        });
    }
    return lines;
}

const mermaidCode = "graph TD\n" + generateMermaid(orgData).join("\n");
console.log(mermaidCode);
```

## ブラウザでの動的レンダリング

ブラウザ上でMermaidコードを書き換えた瞬間に図を更新するには、`mermaid.render` 関数を使用します。

```javascript
import mermaid from 'mermaid';

const code = "graph LR; A-->B";
const element = document.getElementById('graph-container');

const { svg } = await mermaid.render('graph-id', code);
element.innerHTML = svg;
```

このように、JavaScriptを仲介役にすることで、**「生きたドキュメント」**を作成することができるようになります。
AIにこのような「変換スクリプト」を書かせるのも、非常に効果的な活用法の一つです。
