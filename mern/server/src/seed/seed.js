/**
 * Seed script — inserts the real portfolio content from the original
 * index__6.html and creates the first admin user from environment variables.
 *
 * Usage:
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=your-strong-password npm run seed
 * Or set ADMIN_PASSWORD_HASH (a bcrypt hash) instead of ADMIN_PASSWORD.
 * No projects are seeded: the CV lists no projects, so Projects starts empty
 * and is managed from the admin dashboard.
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { env } = require('../config/env');
const logger = require('../utils/logger');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Expertise = require('../models/Expertise');
const Skill = require('../models/Skill');
const Highlight = require('../models/Highlight');
const Education = require('../models/Education');
const Project = require('../models/Project');

const profileData = {
  name: 'Sheeza Ansar',
  headline: 'BS Software Engineering Graduate',
  roles: ['Software Engineer', 'Web & Mobile Developer', 'UI/UX Thinker', 'Quality-Minded Engineer'],
  lead: 'Software Engineering graduate (CGPA 3.45) with a strong foundation in web and mobile development, UI/UX and software quality — focused on building reliable, well-designed digital products.',
  summary: 'Detail-oriented Software Engineering graduate (CGPA 3.45) with training in web and mobile application development, human computer interaction and software quality engineering, and a focus on building clear, reliable and user-friendly software. Seeking a role in software development, UI/UX or quality engineering — where analytical thinking and attention to detail drive results.',
  avatarUrl: '', resumeUrl: '',
  stats: [
    { label: 'CGPA — BS SE', value: '3.45' },
    { label: 'Credit Hours', value: '118' },
    { label: 'Best SGPA', value: '3.83' },
    { label: 'A+ Subjects', value: '3' },
  ],
  facts: [
    { label: 'Degree', value: 'BS Software Engineering' },
    { label: 'University', value: 'University of Gujrat' },
    { label: 'CGPA', value: '3.45 / 4.00' },
    { label: 'Final Year Project', value: 'Grade A+' },
    { label: 'Languages', value: 'Urdu · English' },
    { label: 'Based in', value: 'Pakistan' },
    { label: 'References', value: 'Available on request' },
  ],
  social: { github: '', linkedin: '', email: '', phone: '' },
  location: 'Pakistan',
};

const expertiseData = [
  { title: 'Web Engineering', icon: 'code', description: 'Modern web application concepts and development, supported by strong grounding in object oriented programming, data structures and databases.', tags: ['Web Engineering', 'OOP', 'Databases'], order: 1 },
  { title: 'Mobile App Development', icon: 'mobile', description: 'Designing and building applications for mobile platforms, from planning and architecture through to implementation.', tags: ['Mobile Apps', 'Planning', 'Architecture'], order: 2 },
  { title: 'UI / UX & HCI', icon: 'design', description: 'User-centred design principles from Human Computer Interaction, graded A+, applied to create clear and usable interfaces.', tags: ['UI/UX', 'HCI', 'User-Centred Design'], order: 3 },
  { title: 'Quality & Project Management', icon: 'shield', description: 'Software quality engineering (A+) and project management practices that keep delivery organised, tested and dependable.', tags: ['Software Quality', 'Project Management', 'Testing'], order: 4 },
];

const skillData = [
  { name: 'Human Computer Interaction — UI/UX', category: 'Technical', level: 90, levelLabel: 'A+ Grade', description: 'UI/UX principles, graded A+ at university.', order: 1 },
  { name: 'Software Quality Engineering', category: 'Technical', level: 90, levelLabel: 'A+ Grade', description: 'Quality processes and testing fundamentals, graded A+.', order: 2 },
  { name: 'Web Engineering', category: 'Technical', level: 82, levelLabel: 'Strong', description: 'Modern web application concepts and development.', order: 3 },
  { name: 'Mobile Application Development', category: 'Technical', level: 80, levelLabel: 'Strong', description: 'Building applications for mobile platforms.', order: 4 },
  { name: 'OOP, Data Structures & Databases', category: 'Technical', level: 80, levelLabel: 'Strong', description: 'Core programming, algorithms and database systems.', order: 5 },
  { name: 'Software Project Management', category: 'Technical', level: 78, levelLabel: 'Strong', description: 'Planning, process engineering and delivery practices.', order: 6 },
  { name: 'Professional Communication', category: 'Professional', level: 88, levelLabel: 'Advanced', description: 'Clear, confident messaging and teamwork.', order: 7 },
  { name: 'Business & Technical Writing', category: 'Professional', level: 84, levelLabel: 'Advanced', description: 'Clear documentation and persuasive business writing.', order: 8 },
  { name: 'Entrepreneurship & Leadership', category: 'Professional', level: 82, levelLabel: 'Advanced', description: 'Initiative, ownership and leading projects.', order: 9 },
];

const highlightData = [
  { label: 'Best SGPA', value: '3.83', description: 'Strongest semester of the degree, with a 3.55 SGPA in another semester — consistent performance across all four years.', order: 1 },
  { label: 'Final Year Project-I', value: 'A+', description: 'Completed the Final Year Project with the highest grade — applying software engineering, planning and presentation skills end to end.', order: 2 },
  { label: 'Standout Subjects', value: 'A+', description: 'Top grades in Software Quality Engineering and Human Computer Interaction (UI/UX principles) — the subjects closest to great digital products.', order: 3 },
];

const educationData = [
  { degree: 'BS Software Engineering', institute: 'University of Gujrat — Hafiz Hayat Campus', grade: 'CGPA 3.45 / 4.00', description: 'Graduated with a CGPA of 3.45 across 118 completed credit hours, with A+ grades in Software Quality Engineering, Human Computer Interaction and Final Year Project-I.', courses: ['Web Engineering', 'Mobile Application Development', 'Software Application Development', 'Human Computer Interaction · UI/UX', 'Software Project Management', 'Business Process Engineering', 'Object Oriented Programming', 'Data Structures & Algorithms', 'Database Systems', 'Software Quality Engineering', 'Business & Technical Writing', 'Entrepreneurship & Leadership', 'Professional Practices'], order: 1 },
  { degree: 'Intermediate (HSSC) — General Science', institute: 'BISE Gujranwala', grade: '987 / 1100 · Grade A+', description: 'Intermediate in General Science, Board of Intermediate and Secondary Education, Gujranwala.', courses: [], order: 2 },
  { degree: 'Matriculation (SSC) — Science', institute: 'BISE Gujranwala', grade: '992 / 1100 · Grade A+', description: 'Matriculation in Science, Board of Intermediate and Secondary Education, Gujranwala.', courses: [], order: 3 },
];

async function seed() {
  const force = process.argv.includes('--force');
  if (env.isProd && !force) {
    throw new Error('Refusing to run the seed in production because it DELETES existing content. Re-run with --force only if you really want that.');
  }
  if (env.admin.password && env.admin.password.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters.');
  }
  if (env.admin.password && /change-me|password|12345/i.test(env.admin.password)) {
    throw new Error('ADMIN_PASSWORD looks like a placeholder. Choose a strong, unique password.');
  }
  await mongoose.connect(env.mongodbUri);
  logger.info('Connected to MongoDB for seeding.');
  await Promise.all([Profile.deleteMany({}), Expertise.deleteMany({}), Skill.deleteMany({}), Highlight.deleteMany({}), Education.deleteMany({}), Project.deleteMany({})]);
  await Profile.create(profileData);
  await Expertise.insertMany(expertiseData);
  await Skill.insertMany(skillData);
  await Highlight.insertMany(highlightData);
  await Education.insertMany(educationData);
  logger.info('Seeded profile (1), expertise (4), skills (9), highlights (3), education (3). Projects left empty — no projects in the CV.');

  if (env.admin.email && (env.admin.password || env.admin.passwordHash)) {
    const passwordHash = env.admin.passwordHash || (await bcrypt.hash(env.admin.password, 12));
    await User.findOneAndUpdate(
      { email: env.admin.email.toLowerCase() },
      { email: env.admin.email.toLowerCase(), passwordHash, role: 'admin' },
      { upsert: true, new: true },
    );
    logger.info(`Admin user ready: ${env.admin.email}`);
  } else {
    logger.warn('ADMIN_EMAIL / ADMIN_PASSWORD not set — no admin user created. Set them in server/.env and re-run the seed.');
  }
  await mongoose.disconnect();
  logger.info('Seed complete.');
}

if (require.main === module) {
  seed().catch((err) => { logger.error('Seed failed:', err.message); process.exit(1); });
}
module.exports = seed;
