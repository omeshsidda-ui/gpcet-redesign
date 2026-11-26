/**
 * RFC 9457 Problem Details for HTTP APIs
 * Standard Error Response Factory and Serializer
 */

export const PROBLEM_TYPES = {
  BAD_REQUEST: {
    type: 'https://gpcet.ac.in/problems/bad-request',
    title: 'Bad Request',
    status: 400,
    code: 'BAD_REQUEST'
  },
  UNAUTHORIZED: {
    type: 'https://gpcet.ac.in/problems/unauthorized',
    title: 'Unauthorized',
    status: 401,
    code: 'UNAUTHORIZED'
  },
  FORBIDDEN: {
    type: 'https://gpcet.ac.in/problems/forbidden',
    title: 'Forbidden',
    status: 403,
    code: 'FORBIDDEN'
  },
  NOT_FOUND: {
    type: 'https://gpcet.ac.in/problems/not-found',
    title: 'Not Found',
    status: 404,
    code: 'NOT_FOUND'
  },
  VALIDATION_FAILED: {
    type: 'https://gpcet.ac.in/problems/validation-error',
    title: 'Unprocessable Entity',
    status: 422,
    code: 'VALIDATION_FAILED'
  },
  RATE_LIMIT_EXCEEDED: {
    type: 'https://gpcet.ac.in/problems/rate-limit-exceeded',
    title: 'Too Many Requests',
    status: 429,
    code: 'RATE_LIMIT_EXCEEDED'
  },
  INTERNAL_SERVER_ERROR: {
    type: 'https://gpcet.ac.in/problems/internal-server-error',
    title: 'Internal Server Error',
    status: 500,
    code: 'INTERNAL_SERVER_ERROR'
  }
};

/**
 * @typedef {Object} ProblemErrorItem
 * @property {string} field
 * @property {string} message
 * @property {string} [code]
 */

/**
 * @typedef {Object} ProblemDetailsOptions
 * @property {number} status
 * @property {string} [title]
 * @property {string} [detail]
 * @property {string} [instance]
 * @property {string} [code]
 * @property {ProblemErrorItem[]} [errors]
 * @property {string} [type]
 */

/**
 * @typedef {Object} ProblemDetails
 * @property {string} type
 * @property {string} title
 * @property {number} status
 * @property {string} code
 * @property {string} detail
 * @property {string | undefined} instance
 * @property {ProblemErrorItem[]} [errors]
 * @property {string} timestamp
 */

/**
 * Creates an RFC 9457 Problem Details JSON payload
 * @param {ProblemDetailsOptions} options
 * @returns {ProblemDetails}
 */
export function createProblemDetails({
  status,
  title = undefined,
  detail = undefined,
  instance = undefined,
  code = undefined,
  errors = undefined,
  type = undefined
}) {
  const match = Object.values(PROBLEM_TYPES).find(p => p.status === status);
  return {
    type: type || (match ? match.type : `https://gpcet.ac.in/problems/http-${status}`),
    title: title || (match ? match.title : 'HTTP Error'),
    status,
    code: code || (match ? match.code : 'ERROR'),
    detail: detail || 'An unexpected condition was encountered.',
    instance: instance || undefined,
    ...(errors && errors.length > 0 ? { errors } : {}),
    timestamp: new Date().toISOString()
  };
}

/**
 * Format a ZodError into machine-readable field error list
 * @param {any} zodError
 * @returns {ProblemErrorItem[]}
 */
export function formatZodError(zodError) {
  if (!zodError || !Array.isArray(zodError.issues)) {
    return [{ field: 'root', message: 'Validation failed' }];
  }
  return zodError.issues.map((/** @type {any} */ issue) => ({
    field: issue.path.join('.') || 'root',
    message: issue.message,
    code: issue.code
  }));
}

/**
 * Convenience helper for validation failures (HTTP 422)
 * @param {any} zodError
 * @param {string} [instance]
 * @param {string} [detail]
 * @returns {ProblemDetails}
 */
export function validationProblem(zodError, instance = undefined, detail = 'Request parameters failed schema validation.') {
  return createProblemDetails({
    status: 422,
    detail,
    instance,
    errors: formatZodError(zodError)
  });
}

/**
 * Convenience helper for not found errors (HTTP 404)
 * @param {string} resourceName
 * @param {string} identifier
 * @param {string} [instance]
 * @returns {ProblemDetails}
 */
export function notFoundProblem(resourceName, identifier, instance = undefined) {
  return createProblemDetails({
    status: 404,
    detail: `${resourceName} with identifier '${identifier}' was not found.`,
    instance
  });
}

/**
 * Convenience helper for rate limiting (HTTP 429)
 * @param {number} [retryAfterSeconds]
 * @param {string} [instance]
 * @returns {ProblemDetails}
 */
export function rateLimitProblem(retryAfterSeconds = 60, instance = undefined) {
  return createProblemDetails({
    status: 429,
    detail: `Too many requests. Please retry in ${retryAfterSeconds} seconds.`,
    instance
  });
}

/**
 * Serializes a Problem Details object into a standard HTTP Response with RFC 9457 Content-Type
 * @param {ProblemDetails} problem
 * @returns {Response}
 */
export function toProblemResponse(problem) {
  return new Response(JSON.stringify(problem), {
    status: problem.status,
    headers: {
      'Content-Type': 'application/problem+json'
    }
  });
}
