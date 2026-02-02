import type { CollectionConfig } from 'payload';
import { Hero } from '../blocks/Hero';
import { Content } from '../blocks/Content';
import { Features } from '../blocks/Features';
import { Form } from '../blocks/Form';
import { CallToAction } from '../blocks/CallToAction';

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        Hero,
        Content,
        Features,
        Form,
        CallToAction,
      ],
    },
  ],
};
