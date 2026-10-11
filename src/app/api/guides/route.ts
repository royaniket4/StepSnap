import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateGuide, getGuideBySlug, deleteGuide, unpublishGuide } from '@/lib/guides';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Guide } from '@/types/guide';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guideData: Guide = body;

    if (!guideData.title || typeof guideData.title !== 'string') {
      return NextResponse.json(
        { error: 'Guide title is required.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(guideData.steps) || guideData.steps.length === 0) {
      return NextResponse.json(
        { error: 'At least one step instruction is required.' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            'Cloud publishing is disabled because Supabase is not configured yet. You can still export and download professional PDFs locally!',
          localOnly: true,
        },
        { status: 503 }
      );
    }

    const savedGuide = await createOrUpdateGuide(guideData);
    return NextResponse.json({ success: true, guide: savedGuide });
  } catch (error: unknown) {
    console.error('API create guide error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug query parameter required.' }, { status: 400 });
  }

  const guide = await getGuideBySlug(slug);
  if (!guide) {
    return NextResponse.json({ error: 'Guide not found.' }, { status: 404 });
  }

  return NextResponse.json({ guide });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const action = searchParams.get('action'); // 'delete' or 'unpublish'

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required.' }, { status: 400 });
  }

  try {
    if (action === 'unpublish') {
      await unpublishGuide(slug);
      return NextResponse.json({ success: true, message: 'Guide unpublished.' });
    }

    await deleteGuide(slug);
    return NextResponse.json({ success: true, message: 'Guide deleted successfully.' });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Operation failed.' },
      { status: 500 }
    );
  }
}
