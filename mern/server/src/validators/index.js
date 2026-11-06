const { z } = require('zod');
const nonEmpty = (label) => z.string().trim().min(1, `${label} is required`).max(300);
// Only http(s) URLs: z.string().url() alone accepts javascript: and data: URLs (stored-XSS risk when rendered in href/src).
const httpUrl = z.string().trim().max(2048).url('Must be a valid URL').refine((u) => /^https?:\/\//i.test(u), 'URL must start with http:// or https://');
const optionalUrl = httpUrl.or(z.literal('')).default('');
const short = (max = 200) => z.string().trim().max(max);
const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid id');
const loginSchema = z.object({ email: z.string().trim().max(254).email('Enter a valid email address'), password: z.string().min(1, 'Password is required').max(128) });
const profileSchema = z.object({
  name: nonEmpty('Name'), headline: short(200).default(''), roles: z.array(short(80)).max(10).default([]),
  lead: short(600).default(''), summary: short(3000).default(''), avatarUrl: optionalUrl, resumeUrl: optionalUrl,
  stats: z.array(z.object({ label: nonEmpty('Stat label').max(80), value: nonEmpty('Stat value').max(80) })).max(12).default([]),
  facts: z.array(z.object({ label: nonEmpty('Fact label').max(80), value: nonEmpty('Fact value').max(200) })).max(20).default([]),
  social: z.object({ github: optionalUrl, linkedin: optionalUrl, email: z.string().trim().max(254).email().or(z.literal('')).default(''), phone: z.string().trim().max(30).regex(/^[0-9+()\-\s]*$/, 'Invalid phone number').default('') }).default({}),
  location: short(100).default('Pakistan'),
});
const expertiseSchema = z.object({ title: nonEmpty('Title'), icon: z.string().default('code'), description: z.string().trim().min(1, 'Description is required').max(1500), tags: z.array(short(60)).max(15).default([]), order: z.number().int().min(-1000).max(100000).default(0) });
const skillSchema = z.object({ name: nonEmpty('Name'), category: z.enum(['Technical', 'Professional']), level: z.number().min(0).max(100).default(80), levelLabel: z.string().default('Strong'), description: short(1500).default(''), order: z.number().int().min(-1000).max(100000).default(0) });
const highlightSchema = z.object({ label: nonEmpty('Label'), value: nonEmpty('Value'), description: z.string().trim().min(1, 'Description is required').max(1500), order: z.number().int().min(-1000).max(100000).default(0) });
const educationSchema = z.object({ degree: nonEmpty('Degree'), institute: nonEmpty('Institute'), startYear: z.number().int().optional(), endYear: z.number().int().optional(), grade: short(100).default(''), description: z.string().default(''), courses: z.array(short(120)).max(40).default([]), order: z.number().int().min(-1000).max(100000).default(0) });
const projectSchema = z.object({ title: nonEmpty('Title'), slug: z.string().trim().toLowerCase().max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug may only contain lowercase letters, numbers and hyphens').optional(), summary: z.string().trim().min(1, 'Summary is required').max(500), description: z.string().max(10000).default(''), stack: z.array(short(60)).max(30).default([]), images: z.array(httpUrl).max(10).default([]), liveUrl: optionalUrl, repoUrl: optionalUrl, featured: z.boolean().default(false), order: z.number().int().min(-1000).max(100000).default(0) });
const messageSchema = z.object({ name: z.string().trim().min(1, 'Name is required').max(100), email: z.string().trim().email('Enter a valid email address'), subject: z.string().trim().min(1, 'Subject is required').max(150), body: z.string().trim().min(1, 'Message is required').max(5000) });
const messageStatusSchema = z.object({ status: z.enum(['new', 'read', 'replied']) });
const idParam = z.object({ id: objectId });
const slugParam = z.object({ slug: z.string().trim().toLowerCase().max(120).regex(/^[a-z0-9-]+$/) });
module.exports = { loginSchema, profileSchema, expertiseSchema, skillSchema, highlightSchema, educationSchema, projectSchema, messageSchema, messageStatusSchema, idParam, slugParam };
