export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File): FileValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file format "${file.type || 'unknown'}". Allowed formats: PNG, JPG, WebP, GIF, SVG.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeMb} MB). Maximum allowed size is 10 MB per screenshot.`,
    };
  }

  return { valid: true };
}

export function generateStepId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `step_${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  }
  return `step_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateUnguessableSlug(title: string): string {
  const base = slugify(title) || 'untitled-guide';
  const entropy = Math.random().toString(36).substring(2, 8);
  return `${base.slice(0, 48)}-${entropy}`;
}
