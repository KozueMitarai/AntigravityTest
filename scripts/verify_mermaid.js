const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyMermaid(mermaidCode, outputFilename) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Mermaid.jsを読み込むためのシンプルなHTML
    const content = `
    <!DOCTYPE html>
    <html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
        <script>mermaid.initialize({ startOnLoad: true });</script>
    </head>
    <body>
        <div class="mermaid">
            \${mermaidCode}
        </div>
    </body>
    </html>
    `;

    await page.setContent(content);

    // Mermaidの描画を待機
    try {
        await page.waitForSelector('svg', { timeout: 10000 });
        const element = await page.$('.mermaid');
        await element.screenshot({ path: outputFilename });
        console.log(\`Success: Screenshot saved to \${outputFilename}\`);
    } catch (e) {
        console.error(\`Error: Mermaid rendering failed for \${outputFilename}\`, e);
        process.exit(1);
    }

    await browser.close();
}

// コマンドライン引数からコードとファイル名を取得
const code = process.argv[2];
const output = process.argv[3];

if (code && output) {
    verifyMermaid(code, output).catch(console.error);
} else {
    console.log('Usage: node verify_mermaid.js "mermaid_code" "output_path"');
}
