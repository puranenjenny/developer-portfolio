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
    gallery: z
      .object({
        files: z.array(z.string()).min(1),
        // Used for generated alt text until per-image descriptions are written.
        altPrefix: z.string(),
      })
      .optional(),
    group: z.enum(['featured', 'mobile', 'games', 'more', 'learning']).default('more'),
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
    progress: z.string().optional(),
    courses: z
      .array(z.object({ title: z.string(), done: z.boolean() }))
      .default([]),
    gallery: z
      .object({ files: z.array(z.string()).min(1), altPrefix: z.string() })
      .optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

export const collections = { projects, learning };
