#!/usr/bin/env node
/**
 * Generate PDF from interactive GAPS ebook HTML
 * Usage: npm install html2pdf && node generate-pdf.js
 */

const fs = require('fs');
const path = require('path');

console.log('📄 Gerador de PDF - E-book Protocolo GAPS');
console.log('=========================================\n');

// Option 1: Using system browser print (simplest)
console.log('Para gerar o PDF de forma simples:');
console.log('1. Abra: https://receitas-gaps-production.up.railway.app/downloads/protocolo-gaps.html');
console.log('2. Pressione: Ctrl + P (Windows/Linux) ou Cmd + P (Mac)');
console.log('3. Clique em: "Salvar como PDF"');
console.log('4. Nome: Protocolo_GAPS_EBook.pdf');
console.log('\nIsso vai preservar todo o design e interatividade!\n');

// Option 2: For automated generation
console.log('Se preferir automação, instale as dependências:');
console.log('  npm install puppeteer');
console.log('  node generate-pdf.js --auto\n');

const args = process.argv.slice(2);

if (args.includes('--auto')) {
  const puppeteer = require('puppeteer');

  (async () => {
    try {
      console.log('🚀 Iniciando geração automática...\n');

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
      });

      const page = await browser.newPage();
      const htmlPath = path.join(__dirname, 'public', 'downloads', 'protocolo-gaps.html');
      const fileUrl = 'file://' + htmlPath;

      console.log('📖 Carregando HTML do ebook...');
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });

      const outputPath = path.join(__dirname, 'Protocolo_GAPS_EBook.pdf');

      console.log('🖨️  Gerando PDF...');
      await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        },
        scale: 1,
        displayHeaderFooter: true,
        headerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center;"></div>',
        footerTemplate: '<div style="font-size: 9px; width: 100%; text-align: center; color: #999;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>'
      });

      await browser.close();

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);

      console.log(`\n✅ PDF gerado com sucesso!`);
      console.log(`📁 Arquivo: ${outputPath}`);
      console.log(`📊 Tamanho: ${sizeKB} KB\n`);

    } catch (error) {
      console.error('❌ Erro ao gerar PDF:', error.message);
      process.exit(1);
    }
  })();
}
