import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const CONFIG = {
  BASE_URL: 'https://www.gpcet.ac.in',
  API_BASE: 'https://www.gpcet.ac.in/wp-json/wp/v2',
  ENDPOINTS: {
    pages: 'https://www.gpcet.ac.in/wp-json/wp/v2/pages',
    media: 'https://www.gpcet.ac.in/wp-json/wp/v2/media',
    posts: 'https://www.gpcet.ac.in/wp-json/wp/v2/posts',
    portfolio: 'https://www.gpcet.ac.in/wp-json/wp/v2/avada_portfolio',
    faqs: 'https://www.gpcet.ac.in/wp-json/wp/v2/avada_faq',
    homepage: 'https://www.gpcet.ac.in/'
  },
  PATHS: {
    root: rootDir,
    cache: path.resolve(rootDir, 'cache'),
    content: path.resolve(rootDir, 'content'),
    data: path.resolve(rootDir, 'src', 'data'),
    assets: path.resolve(rootDir, 'public', 'assets')
  },
  NETWORK: {
    PER_PAGE: 100, // WordPress REST API maximum items per page
    DELAY_MS: 350,  // Polite pacing between batch calls
    MAX_RETRIES: 4,
    INITIAL_BACKOFF_MS: 1000,
    TIMEOUT_MS: 40000,
    USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 (GPCET-Redesign-Research)'
  },
  DEPARTMENTS: [
    { code: 'cse', name: 'Computer Science and Engineering', homeSlug: 'cse_home', intake: 360 },
    { code: 'ai', name: 'CSE - Artificial Intelligence', homeSlug: 'ai_home', intake: 180 },
    { code: 'ece', name: 'Electronics and Communication Engineering', homeSlug: 'ece_home', intake: 180 },
    { code: 'eee', name: 'Electrical and Electronics Engineering', homeSlug: 'eee_home', intake: 60 },
    { code: 'me', name: 'Mechanical Engineering', homeSlug: 'me_home', intake: 60 },
    { code: 'civil', name: 'Civil Engineering', homeSlug: 'civil_home-2', intake: 60 },
    { code: 'hs', name: 'Humanities and Sciences', homeSlug: 'hs_home', intake: null },
    { code: 'mba', name: 'Master of Business Administration', homeSlug: 'mba_home', intake: 120 }
  ]
};
