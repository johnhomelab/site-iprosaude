/* tslint:disable */
/* eslint-disable */

export interface LandingPage {
  id: number;
  title: string;
  slug: string;
  layout: (Hero | Content | Features | Form | CallToAction)[];
  updatedAt: string;
  createdAt: string;
}

export interface Hero {
  blockType: 'hero';
  heading: string;
  text?: string;
  backgroundImage?: number | Media;
}

export interface Content {
  blockType: 'content';
  columns?: {
    size?: 'oneThird' | 'half' | 'twoThirds' | 'full';
    richText?: any;
    link?: {
      type?: 'reference' | 'custom';
      url?: string;
      label?: string;
    };
  }[];
}

export interface Features {
  blockType: 'features';
  features?: {
    title?: string;
    description?: string;
  }[];
}

export interface Form {
  blockType: 'form';
  formId?: string;
}

export interface CallToAction {
  blockType: 'cta';
  text?: string;
  url?: string;
  label?: string;
  style?: 'default' | 'urgent';
}

export interface User {
  id: number;
  email: string;
  updatedAt: string;
  createdAt: string;
}

export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
}

export interface Config {
  collections: {
    'landing-pages': LandingPage;
    users: User;
    media: Media;
  };
}
