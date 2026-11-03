import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Keeps completed work, ongoing studies and experiments clearly distinguished.
const status = z.enum(['completed', 'in-progress', 'experiment']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status,
    featured: z.boolean().default(false),
    // Marks invented sample content that must be replaced before publishing.
    placeholder: z.boolean().default(false),
    tech: z.array(z.string()).default([]),
    role: z.string().optional(),
    collaborators: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    caseStudy: z.boolean().default(false),
  }),
});

const learning = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learning' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status,
    placeholder: z.boolean().default(false),
    topics: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, learning };
