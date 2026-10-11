import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';
import { GuidePdf } from '../src/components/pdf/GuidePdf';
import { SAMPLE_GUIDE } from '../src/lib/sampleGuide';

async function main() {
  console.log('Starting PDF generation test with SAMPLE_GUIDE...');
  const outputPath = path.resolve('public', 'sample-guide.pdf');
  
  // Render to file
  await ReactPDF.renderToFile(
    React.createElement(GuidePdf, { guide: SAMPLE_GUIDE }) as any,
    outputPath
  );
  
  const stats = fs.statSync(outputPath);
  console.log(`Success! PDF created at ${outputPath}`);
  console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
}

main().catch((err) => {
  console.error('PDF generation error:', err);
  process.exit(1);
});
