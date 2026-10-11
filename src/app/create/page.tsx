'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  RotateCcw,
  Sparkles,
  Share2,
  Layers,
  Eye,
  Edit3,
  Columns,
  ArrowLeft,
  Check,
  AlertTriangle,
  Loader2,
  FileText,
} from 'lucide-react';
import { Guide, GuideStep } from '@/types/guide';
import { SAMPLE_GUIDE } from '@/lib/sampleGuide';
import { generateStepId, generateUnguessableSlug } from '@/lib/validation';
import { ScreenshotUploader } from '@/components/editor/ScreenshotUploader';
import { StepEditor } from '@/components/editor/StepEditor';
import { GuidePreview } from '@/components/editor/GuidePreview';
import { DownloadPdfButton } from '@/components/pdf/DownloadPdfButton';

const STORAGE_KEY = 'stepsnap_guide_draft_v1';

export default function CreateGuidePage() {
  const [guide, setGuide] = useState<Guide>({
    id: 'local-draft',
    slug: 'my-step-guide',
    title: '',
    summary: '',
    authorName: '',
    steps: [],
    createdAt: new Date().toISOString(),
    visibility: 'public',
  });

  const [viewMode, setViewMode] = useState<'edit' | 'split' | 'preview'>('edit');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  // Restore draft from localStorage on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.steps) && parsed.steps.length > 0) {
          setGuide(parsed);
          return;
        }
      }
      setGuide(SAMPLE_GUIDE);
    } catch {
      setGuide(SAMPLE_GUIDE);
    }
  }, []);

  // Save to localStorage when guide changes
  useEffect(() => {
    try {
      if (guide.steps.length > 0 || guide.title.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(guide));
      }
    } catch {
      // Ignore quota error with big screenshots
    }
  }, [guide]);

  const handleLoadSample = () => {
    if (guide.steps.length > 0 && !window.confirm('Replace current editor content with the 5-step sample guide?')) {
      return;
    }
    setGuide(SAMPLE_GUIDE);
    setPublishMessage({ type: 'info', text: 'Loaded 5-step realistic sample guide.' });
    setTimeout(() => setPublishMessage(null), 3500);
  };

  const handleClear = () => {
    if (window.confirm('Clear all steps and start fresh?')) {
      setGuide({
        id: `guide_${Date.now()}`,
        slug: 'my-step-guide',
        title: '',
        summary: '',
        authorName: '',
        steps: [],
        createdAt: new Date().toISOString(),
        visibility: 'public',
      });
      localStorage.removeItem(STORAGE_KEY);
      setPublishMessage(null);
      setPublishedUrl(null);
    }
  };

  const handleAddStep = () => {
    const newStep: GuideStep = {
      id: generateStepId(),
      title: `Step ${guide.steps.length + 1}`,
      description: '',
      imageUrl: '',
    };
    setGuide((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
  };

  const handleStepsUploaded = (newSteps: GuideStep[]) => {
    setGuide((prev) => ({
      ...prev,
      steps: [...prev.steps, ...newSteps],
    }));
  };

  const handleUpdateStep = (updatedStep: GuideStep) => {
    setGuide((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === updatedStep.id ? updatedStep : s)),
    }));
  };

  const handleDeleteStep = (id: string) => {
    setGuide((prev) => ({
      ...prev,
      steps: prev.steps.filter((s) => s.id !== id),
    }));
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setGuide((prev) => {
      const copy = [...prev.steps];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return { ...prev, steps: copy };
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= guide.steps.length - 1) return;
    setGuide((prev) => {
      const copy = [...prev.steps];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return { ...prev, steps: copy };
    });
  };

  const handlePublish = async () => {
    if (!guide.title.trim()) {
      alert('Please enter a guide title before publishing.');
      return;
    }
    if (guide.steps.length === 0) {
      alert('Please add at least one step before publishing.');
      return;
    }

    setIsPublishing(true);
    setPublishMessage(null);

    try {
      const payloadGuide = {
        ...guide,
        slug: guide.slug || generateUnguessableSlug(guide.title),
      };

      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadGuide),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish guide');
      }

      const publicUrl = `/guide/${data.guide.slug}`;
      setPublishedUrl(publicUrl);
      setPublishMessage({
        type: 'success',
        text: 'Guide published successfully! Shareable public URL created.',
      });
    } catch (err: unknown) {
      console.error('Publish error:', err);
      setPublishMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Publishing failed. Local PDF download remains functional.',
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mr-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                StepSnap<span className="text-indigo-500">.</span>
              </span>
            </div>

            <span className="hidden sm:inline-block text-xs text-slate-600">|</span>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-400 truncate max-w-xs">
              {guide.title || 'Untitled Draft'}
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'edit'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'split'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'preview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all shadow-xs disabled:opacity-50"
            >
              {isPublishing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              )}
              <span>Publish</span>
            </button>

            <DownloadPdfButton
              guide={guide}
              size="sm"
              variant="purple"
              label="Export PDF"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Alerts / Banner Notifications */}
        {publishMessage && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm ${
              publishMessage.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                : publishMessage.type === 'error'
                ? 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                : 'bg-indigo-950/40 border-indigo-800/80 text-indigo-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {publishMessage.type === 'success' && <Check className="w-4 h-4 text-emerald-400" />}
              {publishMessage.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
              {publishMessage.type === 'info' && <Sparkles className="w-4 h-4 text-indigo-400" />}
              <span>{publishMessage.text}</span>
            </div>

            {publishedUrl && (
              <Link
                href={publishedUrl}
                target="_blank"
                className="inline-flex items-center gap-1 font-bold text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-500 transition-colors shrink-0 shadow-sm"
              >
                Open Guide &rarr;
              </Link>
            )}
          </div>
        )}

        {/* View Mode Layouts */}
        <div
          className={`grid gap-8 ${
            viewMode === 'split'
              ? 'grid-cols-1 lg:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {/* EDITOR COLUMN */}
          {(viewMode === 'edit' || viewMode === 'split') && (
            <div className="space-y-6">
              {/* Guide Metadata Configuration Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Guide Overview
                  </h2>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleLoadSample}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Load 5-Step Sample
                    </button>
                    <span className="text-slate-800">|</span>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Clear
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Guide Title <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={guide.title}
                    onChange={(e) => setGuide((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., How to Configure Custom Domains on Vercel"
                    className="w-full px-4 py-2.5 text-base font-semibold bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-slate-600 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Summary & Executive Overview
                    </label>
                    <textarea
                      rows={2}
                      value={guide.summary}
                      onChange={(e) => setGuide((prev) => ({ ...prev, summary: e.target.value }))}
                      placeholder="Brief context explaining what this tutorial achieves..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 placeholder:text-slate-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={guide.authorName}
                      onChange={(e) => setGuide((prev) => ({ ...prev, authorName: e.target.value }))}
                      placeholder="e.g., Alex Rivera"
                      className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Screenshot Dropzone */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-3">
                  Upload Screenshots
                </h3>
                <ScreenshotUploader onStepsAdded={handleStepsUploaded} />
              </div>

              {/* Step Sequence List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Instructions</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                      {guide.steps.length}
                    </span>
                  </h3>

                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Manual Step</span>
                  </button>
                </div>

                {guide.steps.length === 0 ? (
                  <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
                    <p className="text-sm font-semibold text-slate-300">
                      No steps in this guide yet
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      Drag and drop your screenshots above or click Add Manual Step to begin.
                    </p>
                    <button
                      type="button"
                      onClick={handleLoadSample}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Try 5-Step Sample Guide
                    </button>
                  </div>
                ) : (
                  guide.steps.map((step, index) => (
                    <StepEditor
                      key={step.id}
                      step={step}
                      index={index}
                      totalSteps={guide.steps.length}
                      onUpdate={handleUpdateStep}
                      onDelete={handleDeleteStep}
                      onMoveUp={handleMoveUp}
                      onMoveDown={handleMoveDown}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* PREVIEW COLUMN */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="space-y-6">
              <GuidePreview guide={guide} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}