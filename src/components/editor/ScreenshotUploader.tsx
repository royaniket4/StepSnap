'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, AlertCircle, FileImage, Loader2 } from 'lucide-react';
import { validateImageFile, generateStepId } from '@/lib/validation';
import { GuideStep } from '@/types/guide';

interface ScreenshotUploaderProps {
  onStepsAdded: (newSteps: GuideStep[]) => void;
  className?: string;
}

export const ScreenshotUploader: React.FC<ScreenshotUploaderProps> = ({
  onStepsAdded,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsProcessing(true);
    setErrors([]);
    const newErrors: string[] = [];
    const validSteps: GuideStep[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const validation = validateImageFile(file);

      if (!validation.valid) {
        newErrors.push(`${file.name}: ${validation.error}`);
        continue;
      }

      try {
        const dataUrl = await readFileAsDataUrl(file);
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]+/g, ' ')
          .replace(/^[0-9]+\s*/, '')
          .trim();
        const initialTitle = cleanName
          ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
          : `Step Instruction`;

        validSteps.push({
          id: generateStepId(),
          title: initialTitle,
          description: '',
          imageUrl: dataUrl,
          imageAlt: file.name,
        });
      } catch {
        newErrors.push(`Failed to read file: ${file.name}`);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    if (validSteps.length > 0) {
      onStepsAdded(validSteps);
    }

    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragging
            ? 'border-indigo-500 bg-indigo-950/30 ring-4 ring-indigo-500/10'
            : 'border-slate-800 bg-slate-950 hover:border-indigo-500/50 hover:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'].join(',')}
          onChange={handleFileChange}
          className="hidden"
          id="screenshot-file-input"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              {isProcessing
                ? 'Processing uploaded screenshots...'
                : 'Drop screenshots here or click to browse'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports PNG, JPG, WebP up to 10MB each. Multiple files supported.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-800 shadow-sm">
            <FileImage className="w-3.5 h-3.5 text-indigo-400" />
            <span>Select files from device</span>
          </div>
        </div>
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="mt-3 p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/60">
          <div className="flex items-center gap-2 text-rose-300 text-xs font-bold mb-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>Files could not be uploaded:</span>
          </div>
          <ul className="text-xs text-rose-400 list-disc list-inside space-y-0.5">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScreenshotUploader;