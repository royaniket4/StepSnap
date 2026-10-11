'use client';

import React, { useRef, ChangeEvent } from 'react';
import { ArrowUp, ArrowDown, Trash2, ImagePlus, RefreshCw } from 'lucide-react';
import { GuideStep } from '@/types/guide';
import { validateImageFile } from '@/lib/validation';

interface StepEditorProps {
  step: GuideStep;
  index: number;
  totalSteps: number;
  onUpdate: (updatedStep: GuideStep) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const StepEditor: React.FC<StepEditorProps> = ({
  step,
  index,
  totalSteps,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...step, title: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...step, description: e.target.value });
  };

  const handleReplaceImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateImageFile(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        onUpdate({
          ...step,
          imageUrl: reader.result as string,
          imageAlt: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="group relative bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl hover:border-slate-700 transition-all">
      {/* Step Header with Controls */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-indigo-600/30">
            {index + 1}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Instruction {index + 1} of {totalSteps}
          </span>
        </div>

        {/* Action Controls: Move Up, Move Down, Delete */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            title="Move step up"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:pointer-events-none transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onMoveDown(index)}
            disabled={index === totalSteps - 1}
            title="Move step down"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:pointer-events-none transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-800 mx-1" />
          <button
            type="button"
            onClick={() => onDelete(step.id)}
            title="Delete this step"
            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Inputs (Title & Description) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Instruction Title <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              value={step.title}
              onChange={handleTitleChange}
              placeholder="e.g., Click on Project Settings"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-slate-600 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Helpful Description & Details
            </label>
            <textarea
              rows={3}
              value={step.description}
              onChange={handleDescriptionChange}
              placeholder="Explain where to click, what fields to fill, or important caveats..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 placeholder:text-slate-600 transition-all resize-y"
            />
          </div>
        </div>

        {/* Right Screenshot Preview & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Screenshot
          </label>
          
          <input
            ref={replaceInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleReplaceImage}
            className="hidden"
          />

          {step.imageUrl ? (
            <div className="relative group/image rounded-xl overflow-hidden border border-slate-800 bg-slate-950 max-h-48 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.imageUrl}
                alt={step.imageAlt || step.title || 'Step screenshot'}
                className="max-h-48 w-full object-contain"
              />
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                <button
                  type="button"
                  onClick={() => replaceInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-indigo-500 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Replace Screenshot
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => replaceInputRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-indigo-950/20 transition-all"
            >
              <ImagePlus className="w-6 h-6 text-slate-500 mb-1.5 group-hover:text-indigo-400" />
              <span className="text-xs font-medium text-slate-400">
                Click to attach screenshot
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepEditor;