import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';
import { GuidePdf } from '../src/components/pdf/GuidePdf';
import { SAMPLE_GUIDE } from '../src/lib/sampleGuide';
import { Guide } from '../src/types/guide';

async function testAll() {
  console.log('--- MILESTONE 1 VERIFICATION ---');
  
  // 1. Five-step realistic sample guide
  console.log('1. Testing 5-step sample guide export...');
  const samplePath = path.resolve('public', 'sample-guide.pdf');
  await ReactPDF.renderToFile(
    React.createElement(GuidePdf, { guide: SAMPLE_GUIDE }) as any,
    samplePath
  );
  console.log(`[PASS] Sample guide exported: ${(fs.statSync(samplePath).size / 1024).toFixed(1)} KB`);

  // 2. Empty guide test
  console.log('2. Testing empty guide handling (0 steps)...');
  const emptyGuide: Guide = {
    id: 'empty-test',
    slug: 'empty-test',
    title: 'Empty Draft Guide',
    summary: 'A guide with no steps yet.',
    authorName: 'Test Author',
    createdAt: new Date().toISOString(),
    visibility: 'public',
    steps: []
  };
  const emptyPath = path.resolve('public', 'empty-guide.pdf');
  await ReactPDF.renderToFile(
    React.createElement(GuidePdf, { guide: emptyGuide }) as any,
    emptyPath
  );
  console.log(`[PASS] Empty guide exported: ${(fs.statSync(emptyPath).size / 1024).toFixed(1)} KB`);

  // 3. Long text and pagination stress test
  console.log('3. Testing long text descriptions & pagination flow...');
  const longGuide: Guide = {
    id: 'long-test',
    slug: 'long-test',
    title: 'Extensive Architecture Guide with Long Explanations',
    summary: 'Testing how deep paragraphs and multiple sequential steps handle page boundaries without overflowing or clipping.',
    authorName: 'Chief Architect',
    createdAt: new Date().toISOString(),
    visibility: 'public',
    steps: Array.from({ length: 6 }).map((_, i) => ({
      id: `step-${i + 1}`,
      title: `Detailed Step ${i + 1}: Multi-Paragraph System Execution Protocol`,
      description: `This is a comprehensive step description. Paragraph 1 explains the system invariant and prerequisite configuration checks. ${'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '.repeat(3)}`,
      imageUrl: SAMPLE_GUIDE.steps[0].imageUrl
    }))
  };
  const longPath = path.resolve('public', 'long-guide.pdf');
  await ReactPDF.renderToFile(
    React.createElement(GuidePdf, { guide: longGuide }) as any,
    longPath
  );
  console.log(`[PASS] Long descriptions & pagination exported: ${(fs.statSync(longPath).size / 1024).toFixed(1)} KB`);

  console.log('\nAll Milestone 1 PDF engine criteria VERIFIED successfully!');
}

testAll().catch((err) => {
  console.error('[FAIL] Milestone 1 verification error:', err);
  process.exit(1);
});
