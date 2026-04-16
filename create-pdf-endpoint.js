/**
 * Simple script to generate PDF from HTML using browser automation
 * Run with: npm install puppeteer && node create-pdf-endpoint.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  let browser;
  try {
    console.log('🚀 Iniciando geração de PDF...\n');

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set larger viewport to match print layout
    await page.setViewport({ width: 1200, height: 1600 });

    const htmlPath = path.join(__dirname, 'public/downloads/protocolo-gaps.html');
    const fileUrl = `file://${htmlPath}`;

    console.log('📖 Carregando HTML do ebook...');
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a bit for any animations to settle
    await page.waitForTimeout(1000);

    const outputPath = path.join(__dirname, 'public/downloads/Protocolo_GAPS_EBook.pdf');

    console.log('🖨️  Convertendo para PDF (isso pode levar alguns segundos)...');

    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm'
      },
      printBackground: true,
      scale: 0.9,
      displayHeaderFooter: false
    });

    await browser.close();

    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    const sizeKB = (stats.size / 1024).toFixed(0);

    console.log(`\n✅ PDF gerado com sucesso!\n`);
    console.log(`📁 Arquivo: ${outputPath}`);
    console.log(`📊 Tamanho: ${sizeKB} KB (${sizeMB} MB)\n`);
    console.log('📲 Link de download:');
    console.log('   https://receitas-gaps-production.up.railway.app/downloads/Protocolo_GAPS_EBook.pdf\n');

  } catch (error) {
    console.error('\n❌ Erro ao gerar PDF:');
    console.error(error.message);
    process.exit(1);
  }
}

generatePDF();
