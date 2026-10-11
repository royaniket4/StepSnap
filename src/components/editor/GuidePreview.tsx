'use client';

import React from 'react';
import { Guide } from '@/types/guide';
import { DownloadPdfButton } from '@/components/pdf/DownloadPdfButton';
import { FileText, Calendar, User, Layers, Sparkles } from 'lucide-react';

interface GuidePreviewProps {
  guide: Guide;
}

export const GuidePreview: React.FC<GuidePreviewProps> = ({ guide }) => {
  const steps = guide.steps || [];
  const formattedDate = guide.createdAt
    ? new Date(guide.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Draft';

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Preview Header & Export Action */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-800/60">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Document Preview</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                Print Ready
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Live layout as rendered in final PDF export
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DownloadPdfButton guide={guide} size="sm" variant="purple" />
        </div>
      </div>

      {/* Document Canvas */}
      <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
        {/* Document Header Card */}
        <div className="border border-slate-800 rounded-2xl p-6 sm:p-8 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            StepSnap Guide
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
            {guide.title || 'Untitled Guide'}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {guide.summary || 'Add a summary to introduce this guide to your readers.'}
          </p>

          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-900">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{guide.authorName || 'Anonymous Author'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>{steps.length} {steps.length === 1 ? 'Step' : 'Steps'}</span>
            </div>
          </div>
        </div>

        {/* Steps Stream */}
        <div className="space-y-6">
          {steps.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
              <p className="text-sm font-semibold text-slate-300">
                No steps added yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Upload screenshots or add instructions above to preview them here.
              </p>
            </div>
          ) : (
            steps.map((step, index) => (
              <div
                key={step.id || index}
                className="border border-slate-800 rounded-2xl p-5 sm:p-6 bg-slate-950 shadow-md space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-indigo-600/30">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-white">
                      {step.title || `Step ${index + 1}`}
                    </h2>
                    {step.description && (
                      <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
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
                      alt={step.imageAlt || step.title || `Step ${index + 1} screenshot`}
                      className="max-h-[380px] w-full object-contain"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidePreview;