import { CSSProperties } from 'react';

export interface StoryModel {
  id: string;
  name: string;
  firstPageId: string;
  pages: PageModel[];
}

export interface PageModel {
  id: string;
  name: string;
  items: PageItemModel[];
}

export interface PageItemModel {
  id: string;
  settings: CSSProperties;
  textSettings: CSSProperties;
  text: string;
  linkedPageId: string;
}
