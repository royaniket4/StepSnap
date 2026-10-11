'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Link2,
  Check,
  ArrowLeft,
  Calendar,
  User,
  Layers,
  Sparkles,
  Trash2,
  EyeOff,
  MoreVertical,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { Guide } from '@/types/guide';
import { DownloadPdfButton } from '@/components/pdf/DownloadPdfButton';

interface GuideViewerClientProps {
  guide: Guide;
}

export const GuideViewerClient: React.FC<GuideViewerClientProps> = ({ guide }) => {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedState, setDeletedState] = useState<string | null>(null);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleUnpublish = async () => {
    if (!window.confirm('Unpublish this guide? It will no longer be visible publicly.')) {
      return;
    }

    try {
      const res = await fetch(`/api/guides?slug=${encodeURIComponent(guide.slug)}&action=unpublish`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeletedState('This guide has been unpublished.');
      } else {
        alert('Could not unpublish guide.');
      }
    } catch {
      alert('Error unpublishing guide.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Permanently delete this guide? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/guides?slug=${encodeURIComponent(guide.slug)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeletedState('This guide has been permanently deleted.');
      } else {
        alert('Could not delete guide.');
      }
    } catch {
      alert('Error deleting guide.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (deletedState) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md text-center shadow-2xl">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-2">Notice</h2>
          <p className="text-sm text-slate-400 mb-6">{deletedState}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-md"
          >
            Return to StepSnap Home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = guide.createdAt
    ? new Date(guide.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  const steps = guide.steps || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mr-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>StepSnap</span>
            </Link>

            <span className="hidden sm:inline-block text-xs text-slate-700">/</span>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-400 truncate max-w-sm">
              {guide.title}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              id="copy-link-button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Download PDF Button */}
            <DownloadPdfButton
              guide={guide}
              size="sm"
              variant="purple"
              label="Download PDF"
            />

            {/* More Menu (Unpublish / Delete) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
                title="Manage guide"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1.5 z-40 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      handleUnpublish();
                    }}
                    className="w-full text-left px-4 py-2.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                  >
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>Unpublish Guide</span>
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => {
                      setShowMenu(false);
                      handleDelete();
                    }}
                    className="w-full text-left px-4 py-2.5 text-rose-400 hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Delete Guide</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Guide Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Cover Header Banner */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-full pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Verified Documentation
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug mb-4">
            {guide.title}
          </h1>

          {guide.summary && (
            <p className="text-base text-slate-300 leading-relaxed mb-6">
              {guide.summary}
            </p>
          )}

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 pt-5 border-t border-slate-800">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{guide.authorName || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>{steps.length} {steps.length === 1 ? 'Step' : 'Steps'}</span>
            </div>
          </div>
        </div>

        {/* Steps Stream */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id || index}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-indigo-600/30">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white">
                    {step.title}
                  </h2>
                  {step.description && (
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {step.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.imageUrl}
                    alt={step.imageAlt || step.title || `Step ${index + 1}`}
                    className="max-h-[460px] w-full object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA to Create Guide */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold mb-2 text-white">
            Need to document your own processes?
          </h3>
          <p className="text-sm text-slate-300 mb-6 max-w-lg mx-auto leading-relaxed">
            StepSnap is 100% free with zero paywalls. Upload screenshots, arrange instructions, and download publication-ready PDFs in seconds.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
          >
            Create Your First Guide — Free
          </Link>
        </div>
      </main>
    </div>
  );
};