import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Read the HTML ebook file
    const htmlPath = path.join(process.cwd(), 'public/downloads/protocolo-gaps.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Try to use html2pdf library if available
    try {
      const { htmlToPdf } = await import('html-to-pdf');

      const pdfBuffer = await htmlToPdf({
        content: htmlContent,
        options: {
          format: 'A4',
          margin: {
            top: 15,
            right: 15,
            bottom: 15,
            left: 15
          }
        }
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Protocolo_GAPS_EBook.pdf"');
      res.send(pdfBuffer);
      return;
    } catch (e) {
      // Fallback: return HTML with print styles
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', 'inline');

      const printReadyHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Protocolo GAPS - PDF</title>
          <script>
            window.addEventListener('load', () => {
              setTimeout(() => window.print(), 500);
            });
          </script>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .page { page-break-after: always; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;

      res.send(printReadyHTML);
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      error: 'Erro ao gerar PDF',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
