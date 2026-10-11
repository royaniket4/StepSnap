-- ==============================================================================
-- StepSnap Supabase Database Migration
-- Table: guides
-- Storage: screenshots bucket
-- ==============================================================================

-- 1. Create guides table
CREATE TABLE IF NOT EXISTS public.guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT DEFAULT '',
    author_name TEXT DEFAULT 'Anonymous',
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
    steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast unguessable slug lookups
CREATE INDEX IF NOT EXISTS idx_guides_slug ON public.guides(slug);
CREATE INDEX IF NOT EXISTS idx_guides_created_at ON public.guides(created_at DESC);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Public can read guides that are 'public' or 'unlisted'
CREATE POLICY "Allow public read access to published guides"
    ON public.guides
    FOR SELECT
    USING (visibility IN ('public', 'unlisted'));

-- Allow insert/update/delete via server-side service role or authenticated actions
CREATE POLICY "Allow service role full access"
    ON public.guides
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 3. Storage Bucket Configuration for Screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('screenshots', 'screenshots', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy to allow public reads from screenshots bucket
CREATE POLICY "Public Access to Screenshots"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'screenshots');

-- Policy to allow server uploads into screenshots bucket
CREATE POLICY "Service Role Uploads to Screenshots"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'screenshots');

CREATE POLICY "Service Role Deletes from Screenshots"
    ON storage.objects
    FOR DELETE
    USING (bucket_id = 'screenshots');
