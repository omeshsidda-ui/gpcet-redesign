import { CONFIG } from './config.js';

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class HttpClient {
  constructor(options = {}) {
    this.userAgent = options.userAgent || CONFIG.NETWORK.USER_AGENT;
    this.maxRetries = options.maxRetries || CONFIG.NETWORK.MAX_RETRIES;
    this.timeoutMs = options.timeoutMs || CONFIG.NETWORK.TIMEOUT_MS;
    this.backoffMs = options.backoffMs || CONFIG.NETWORK.INITIAL_BACKOFF_MS;
  }

  async fetchWithRetry(url, options = {}, retries = 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    const headers = {
      'User-Agent': this.userAgent,
      'Accept': options.isJson !== false ? 'application/json, text/plain, */*' : 'text/html,application/xhtml+xml,*/*',
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle rate limits or temporary server errors
      if (response.status === 429 || (response.status >= 500 && response.status <= 599)) {
        if (retries < this.maxRetries) {
          const delay = this.backoffMs * Math.pow(2, retries);
          console.warn(`[HTTP ${response.status}] Retrying ${url} in ${delay}ms (attempt ${retries + 1}/${this.maxRetries})...`);
          await sleep(delay);
          return this.fetchWithRetry(url, options, retries + 1);
        }
        throw new Error(`HTTP ${response.status} ${response.statusText} for URL: ${url}`);
      }

      if (!response.ok) {
        const httpError = new Error(`HTTP ${response.status} ${response.statusText} for URL: ${url}`);
        httpError.status = response.status;
        throw httpError;
      }

      return response;
    } catch (err) {
      clearTimeout(timeoutId);

      // Do NOT retry client errors (404, 403, 401, etc.) except 429
      if (err.status && err.status >= 400 && err.status < 500 && err.status !== 429) {
        throw err;
      }

      if (retries < this.maxRetries) {
        const delay = this.backoffMs * Math.pow(2, retries);
        console.warn(`[Network Error: ${err.message}] Retrying ${url} in ${delay}ms (attempt ${retries + 1}/${this.maxRetries})...`);
        await sleep(delay);
        return this.fetchWithRetry(url, options, retries + 1);
      }
      throw err;
    }
  }

  async getJson(url, options = {}) {
    const response = await this.fetchWithRetry(url, { ...options, isJson: true });
    return await response.json();
  }

  async getText(url, options = {}) {
    const response = await this.fetchWithRetry(url, { ...options, isJson: false });
    return await response.text();
  }

  async getEndpointMeta(url) {
    const checkUrl = new URL(url);
    checkUrl.searchParams.set('per_page', '1');
    checkUrl.searchParams.set('page', '1');

    const response = await this.fetchWithRetry(checkUrl.toString(), { method: 'HEAD', isJson: true }).catch(async () => {
      // Fallback to GET if HEAD is not supported by endpoint
      return await this.fetchWithRetry(checkUrl.toString(), { method: 'GET', isJson: true });
    });

    const total = parseInt(response.headers.get('x-wp-total') || '0', 10);
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '0', 10);

    return { total, totalPages, status: response.status };
  }
}

export const client = new HttpClient();
