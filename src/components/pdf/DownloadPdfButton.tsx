'use client';

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Guide } from '@/types/guide';

interface DownloadPdfButtonProps {
  guide: Guide;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  guide,
  className = '',
  variant = 'purple',
  size = 'md',
  label = 'Download PDF Guide',
}) => {
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = async () => {
    if (status === 'generating') return;
    setStatus('generating');
    setErrorMessage(null);

    try {
      // Dynamic import to prevent SSR issues with @react-pdf/renderer
      const [{ pdf }, { GuidePdf }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./GuidePdf'),
      ]);

      const blob = await pdf(<GuidePdf guide={guide} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const safeTitle = (guide.title || 'stepsnap-guide')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      link.download = `${safeTitle || 'guide'}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: unknown) {
      console.error('Failed to generate PDF:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to export PDF');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm';
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    purple: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-indigo-100 dark:shadow-none hover:shadow-md active:scale-[0.99]',
    primary: 'bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
    outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800',
  }[variant];

  return (
    <div className="inline-flex flex-col items-start">
      <button
        type="button"
        onClick={handleDownload}
        disabled={status === 'generating'}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        id="download-pdf-button"
      >
        {status === 'generating' && (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Building PDF...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PDF Downloaded!</span>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Retry Export</span>
          </>
        )}
        {status === 'idle' && (
          <>
            <Download className="w-4 h-4 text-current opacity-90" />
            <span>{label}</span>
          </>
        )}
      </button>
      {errorMessage && (
        <span className="text-xs text-rose-500 mt-1 font-medium">{errorMessage}</span>
      )}
    </div>
  );
};

export default DownloadPdfButton;
