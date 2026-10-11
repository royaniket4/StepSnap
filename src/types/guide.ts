export type GuideVisibility = 'public' | 'unlisted' | 'private';

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  summary: string;
  authorName: string;
  steps: GuideStep[];
  createdAt: string;
  visibility: GuideVisibility;
  updatedAt?: string;
}

export interface CreateGuideInput {
  title: string;
  summary: string;
  authorName: string;
  steps: Omit<GuideStep, 'id'>[];
  visibility?: GuideVisibility;
}
