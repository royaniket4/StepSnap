'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MousePointerClick,
  Layers,
  Share2,
  Lock,
  Zap,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { SAMPLE_GUIDE } from '@/lib/sampleGuide';
import { DownloadPdfButton } from '@/components/pdf/DownloadPdfButton';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* 1. NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              StepSnap<span className="text-indigo-500">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#sample-guide" className="hover:text-white transition-colors">
              Example Guide
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              Why StepSnap
            </a>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy & Scope
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/sample-guide.pdf"
              download="stepsnap-sample-guide.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sample PDF</span>
            </a>

            <Link
              href="/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all active:scale-[0.98]"
            >
              <span>Create Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>100% Free Scribe Alternative • Zero Subscriptions</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
            Turn Screenshots Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Step-by-Step Guides.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload screenshots, arrange numbered instructions, and generate professional PDF guides or publish shareable public links. No watermarks, no account required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/create"
              id="hero-create-button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all active:scale-[0.98]"
            >
              <MousePointerClick className="w-4 h-4" />
              <span>Create Your First Guide</span>
            </Link>

            <DownloadPdfButton
              guide={SAMPLE_GUIDE}
              size="lg"
              variant="outline"
              label="Download Sample 5-Step PDF"
              className="w-full sm:w-auto bg-slate-900/80 border-slate-800 hover:bg-slate-800 text-slate-200"
            />
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Publication-Grade PDFs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Local Offline-Ready Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Forever</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Document Mockup */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-14">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-5 shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-slate-500 text-[11px]">stepsnap-preview.pdf</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 font-semibold text-[10px]">
                  5 Steps Verified
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-5 p-4 sm:p-6 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                  Featured Sample
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  How to Configure a Custom Domain & SSL on Vercel
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clean editorial typography, automatic table of contents, and crisp screenshot embeds formatted specifically for A4 printable documentation.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href={`/guide/${SAMPLE_GUIDE.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="md:col-span-7 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SAMPLE_GUIDE.steps[0].imageUrl}
                  alt="StepSnap Sample Screenshot Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE-STEP PRODUCT EXPLANATION */}
      <section id="how-it-works" className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
              Three-Step Workflow
            </h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              From Raw Screenshots to Polished Guides in Seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl relative group hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800/60 text-indigo-400 font-black text-lg flex items-center justify-center mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Drop Screenshots</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Drag and drop your workflow screenshots. StepSnap automatically validates formats and organizes them into an editable queue.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl relative group hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800/60 text-indigo-400 font-black text-lg flex items-center justify-center mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Annotate & Reorder</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Add titles, tips, and descriptions for each step. Easily reorder instructions with one click to perfect your tutorial flow.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl relative group hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800/60 text-indigo-400 font-black text-lg flex items-center justify-center mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Export PDF or Share</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate a professional A4 PDF with table of contents and page numbers, or publish directly to a clean public URL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXAMPLE GUIDE PREVIEW */}
      <section id="sample-guide" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
                Live Example
              </h2>
              <p className="text-3xl font-extrabold text-white tracking-tight">
                Inspect a Complete 5-Step Guide
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/guide/${SAMPLE_GUIDE.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <span>Open Public View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <DownloadPdfButton
                guide={SAMPLE_GUIDE}
                size="sm"
                variant="purple"
                label="Download Sample PDF"
              />
            </div>
          </div>

          <div className="space-y-4">
            {SAMPLE_GUIDE.steps.map((step, idx) => (
              <div
                key={step.id}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-start gap-6 hover:border-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-base font-bold text-white">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="w-full md:w-56 shrink-0 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPARISON SECTION */}
      <section id="comparison" className="py-24 bg-slate-900/30 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
              Clear Comparison
            </h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Why Choose StepSnap Over Paid Tools
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4">Feature</th>
                  <th className="py-4 px-4 text-indigo-400 font-bold">StepSnap</th>
                  <th className="py-4 px-4 text-slate-500">Paid Scribe / Competitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Cost & Plans</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">100% Free Forever</td>
                  <td className="py-4 px-4 text-slate-500">$29 – $49/mo per user</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">PDF Exports</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">Full PDF with no watermarks</td>
                  <td className="py-4 px-4 text-slate-500">Paywalled or heavy branding</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Account Requirement</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">None for local editor & PDF</td>
                  <td className="py-4 px-4 text-slate-500">Mandatory sign-in & team invite</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Browser Extension</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">Not required (privacy-safe)</td>
                  <td className="py-4 px-4 text-slate-500">Requires recording extension</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Data Privacy</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">Screenshots stay in your browser</td>
                  <td className="py-4 px-4 text-slate-500">Stored on 3rd-party servers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PRIVACY & PRODUCT LIMITATIONS */}
      <section id="privacy" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Privacy & Scope Transparency</h3>
                <p className="text-xs text-slate-400">Our honest commitment to users</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-400 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  Local-First Security
                </h4>
                <p>
                  When building guides, all images are processed locally within your browser using FileReader and client-side rendering. Your screenshots are never transmitted anywhere until you choose to publish them.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Manual Capture Model
                </h4>
                <p>
                  StepSnap intentionally avoids invasive background browser recording extensions in this release. You have 100% control over the exact screenshots and sensitive data included in your documentation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Public URL Notice: </span>
              Guides published to public links generate unguessable URLs. They are not indexed with passwords or ACL unless custom access controls are configured on your deployment.
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="font-bold text-slate-300">StepSnap</span>
            <span>— Free Scribe Alternative</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/create" className="hover:text-slate-300 transition-colors">
              Create Guide
            </Link>
            <Link href={`/guide/${SAMPLE_GUIDE.slug}`} className="hover:text-slate-300 transition-colors">
              Sample Guide
            </Link>
            <a href="/sample-guide.pdf" download className="hover:text-slate-300 transition-colors">
              Download Sample PDF
            </a>
          </div>

          <div>
            Built with Next.js, React PDF & Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  );
}