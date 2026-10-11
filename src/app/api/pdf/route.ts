import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { GuidePdf } from '@/components/pdf/GuidePdf';
import { SAMPLE_GUIDE } from '@/lib/sampleGuide';
import { Guide } from '@/types/guide';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guide: Guide = body.guide || SAMPLE_GUIDE;

    const stream = await ReactPDF.renderToStream(
      React.createElement(GuidePdf, { guide }) as any
    );

    const safeTitle = (guide.title || 'stepsnap-guide')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Convert NodeJS.ReadableStream to web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new Response(webStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeTitle || 'guide'}.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error('Server PDF generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Returns sample guide PDF by default
  try {
    const stream = await ReactPDF.renderToStream(
      React.createElement(GuidePdf, { guide: SAMPLE_GUIDE }) as any
    );

    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new Response(webStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="stepsnap-sample-guide.pdf"',
      },
    });
  } catch (error: unknown) {
    console.error('Sample PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
