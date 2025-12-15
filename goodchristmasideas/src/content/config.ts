import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.string(),
    budget: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  guides,
};
