# StepSnap — Free Scribe Alternative

StepSnap is a production-quality, privacy-first alternative to paid step-by-step documentation tools like Scribe. It allows users to manually upload screenshots, arrange them into numbered instructions, generate professional A4 PDF guides, and publish guides to shareable public URLs.

---

## 🌟 Key Features

- **100% Free Forever**: No $29/mo subscriptions, paywalls, or AI credits required.
- **Publication-Ready PDF Engine**: Built using `@react-pdf/renderer` with:
  - Professional editorial cover page
  - Automatic Table of Contents
  - Numbered step badges and clean typography
  - High-resolution screenshot embeds preserving aspect ratio
  - Dynamic page numbering (`Page X of Y`) and subtle StepSnap header/footer
  - Automatic page break handling without text or image clipping
- **Local-First Privacy Architecture**: Works offline without any cloud configuration. Screenshots are read directly in the browser via `FileReader` and exported directly into PDFs.
- **Intuitive Visual Editor**:
  - Drag-and-drop multiple screenshots simultaneously
  - Reorder steps up and down with instant visual feedback
  - Title and detailed context editing per instruction
  - Live side-by-side or tabbed guide preview
  - Auto-draft preservation via `localStorage`
- **Cloud Publishing (Optional)**:
  - Free Supabase PostgreSQL persistence
  - Supabase Storage for hosted screenshot CDN delivery
  - Unguessable public URLs (`/guide/[slug]`)
  - One-click copy link and remote PDF download

---

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **PDF Engine**: React PDF (`@react-pdf/renderer`)
- **Icons**: Lucide React
- **Database & Storage**: Supabase (PostgreSQL & Storage) with zero-cloud local fallback
- **Runtime**: Node.js 20+

---

## 📁 Project Structure

```
stepsnap/
├── public/
│   ├── sample/                # Realistic 5-step sample screenshots
│   └── sample-guide.pdf       # Pre-rendered 5-step sample PDF export
├── src/
│   ├── app/
│   │   ├── page.tsx           # SaaS Landing page with hero & previews
│   │   ├── layout.tsx         # Root layout with SEO metadata
│   │   ├── create/page.tsx    # Interactive Guide Editor & Live Preview
│   │   ├── guide/[slug]/      # Public guide viewer with copy link & PDF export
│   │   └── api/
│   │       ├── guides/        # Guide CRUD route handler
│   │       └── pdf/           # Server-side PDF export stream
│   ├── components/
│   │   ├── editor/
│   │   │   ├── ScreenshotUploader.tsx
│   │   │   ├── StepEditor.tsx
│   │   │   └── GuidePreview.tsx
│   │   ├── pdf/
│   │   │   ├── GuidePdf.tsx   # Reusable PDF document component
│   │   │   └── DownloadPdfButton.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client & fallback detector
│   │   ├── guides.ts          # Guide persistence & storage uploads
│   │   ├── sampleGuide.ts     # Realistic 5-step sample guide
│   │   └── validation.ts      # MIME & file validation helpers
│   └── types/
│       └── guide.ts           # Shared TypeScript interfaces
├── supabase/
│   └── migrations/
│       └── 20241011_init.sql  # Database schema & storage RLS policies
├── .env.example
└── README.md
```

---

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Visit `/` for the landing page and 5-step sample preview.
- Visit `/create` to build new guides, reorder steps, and export PDFs.
- Click **"Download Sample PDF"** to test the export engine immediately.

---

## ☁️ Cloud Publishing Setup (Optional)

StepSnap works completely offline for local PDF exports without Supabase. To enable public shareable URLs:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the SQL Editor and execute `supabase/migrations/20241011_init.sql`.
3. Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Restart your Next.js server. Guides can now be published to public URLs.

---

## 🧪 PDF Engine Verification

You can verify the PDF export engine directly via the test script:

```bash
npx tsx scripts/verify-milestone1.ts
```

This verifies:
1. 5-step realistic sample guide export (196 KB)
2. Empty guide graceful fallback (5 KB)
3. Deep multi-paragraph text and page break flow (57 KB)

---

## 🛡️ Scope & Honest Disclosures

- **Manual Capture Model**: Unlike Scribe, StepSnap does not currently use an invasive background browser extension. You manually upload screenshots, ensuring sensitive passwords and customer data are never accidentally recorded.
- **Unguessable URLs**: Published guides receive high-entropy unguessable slugs (`slug-xxxxxx`). They are publicly accessible to anyone with the link unless additional authentication is configured.