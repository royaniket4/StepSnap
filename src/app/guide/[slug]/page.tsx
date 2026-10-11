import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuideBySlug } from '@/lib/guides';
import { GuideViewerClient } from './GuideViewerClient';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found — StepSnap',
      description: 'The requested visual guide could not be located.',
    };
  }

  return {
    title: `${guide.title} — StepSnap`,
    description: guide.summary || `Step-by-step documentation guide with ${guide.steps.length} verified steps.`,
    openGraph: {
      title: `${guide.title} — StepSnap`,
      description: guide.summary || 'Free visual step-by-step guide.',
      type: 'article',
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md text-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Guide Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            The guide <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-indigo-600">{slug}</code> could not be found or has been set to private.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back Home</span>
            </Link>
            <Link
              href="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <span>Create New Guide</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <GuideViewerClient guide={guide} />;
}