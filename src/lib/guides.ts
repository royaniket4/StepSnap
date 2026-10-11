import { Guide, GuideStep } from '@/types/guide';
import { SAMPLE_GUIDE } from '@/lib/sampleGuide';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { generateUnguessableSlug } from '@/lib/validation';

/**
 * Uploads a base64 or binary image into Supabase Storage
 */
async function uploadScreenshotIfBase64(
  supabase: ReturnType<typeof getServerSupabase>,
  imageDataUrl: string,
  guideSlug: string,
  stepId: string
): Promise<string> {
  // If already a remote URL, return as-is
  if (!imageDataUrl.startsWith('data:')) {
    return imageDataUrl;
  }

  const matches = imageDataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return imageDataUrl;
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');
  const extension = mimeType.split('/')[1] || 'png';
  const fileName = `${guideSlug}/${stepId}.${extension}`;

  const { error } = await supabase.storage
    .from('screenshots')
    .upload(fileName, buffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    console.error('Storage upload warning:', error);
    // Return original data URL as fallback
    return imageDataUrl;
  }

  const { data: publicUrlData } = supabase.storage
    .from('screenshots')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

/**
 * Fetch a guide by its public slug
 */
export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  if (slug === SAMPLE_GUIDE.slug || slug === 'sample' || slug === 'demo') {
    return SAMPLE_GUIDE;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      summary: data.summary || '',
      authorName: data.author_name || 'Anonymous',
      visibility: data.visibility,
      steps: (data.steps || []) as GuideStep[],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (err) {
    console.error('Error fetching guide by slug:', err);
    return null;
  }
}

/**
 * Persist or update a guide in the database
 */
export async function createOrUpdateGuide(guide: Guide): Promise<Guide> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Cloud publishing requires Supabase. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  const supabase = getServerSupabase();
  const slug = guide.slug || generateUnguessableSlug(guide.title);

  // Upload screenshots to Supabase Storage if in base64 format
  const processedSteps: GuideStep[] = [];
  for (const step of guide.steps) {
    let imageUrl = step.imageUrl;
    if (imageUrl && imageUrl.startsWith('data:')) {
      imageUrl = await uploadScreenshotIfBase64(supabase, imageUrl, slug, step.id);
    }
    processedSteps.push({
      ...step,
      imageUrl,
    });
  }

  const record = {
    slug,
    title: guide.title,
    summary: guide.summary || '',
    author_name: guide.authorName || 'Anonymous',
    visibility: guide.visibility || 'public',
    steps: processedSteps,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('guides')
    .upsert(record, { onConflict: 'slug' })
    .select()
    .single();

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    summary: data.summary || '',
    authorName: data.author_name || 'Anonymous',
    visibility: data.visibility,
    steps: (data.steps || []) as GuideStep[],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Delete a guide
 */
export async function deleteGuide(slug: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from('guides').delete().eq('slug', slug);
  if (error) {
    throw new Error(error.message);
  }
  return true;
}

/**
 * Unpublish a guide (set visibility to private)
 */
export async function unpublishGuide(slug: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const supabase = getServerSupabase();
  const { error } = await supabase
    .from('guides')
    .update({ visibility: 'private' })
    .eq('slug', slug);

  if (error) {
    throw new Error(error.message);
  }
  return true;
}
