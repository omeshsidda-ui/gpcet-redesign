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
 * Creates an RFC 9457 Problem Details JSON payload
 */
export function createProblemDetails({
  status,
  title,
  detail,
  instance,
  code,
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
 */
export function formatZodError(zodError) {
  if (!zodError || !Array.isArray(zodError.issues)) {
    return [{ field: 'root', message: 'Validation failed' }];
  }
  return zodError.issues.map(issue => ({
    field: issue.path.join('.') || 'root',
    message: issue.message,
    code: issue.code
  }));
}

/**
 * Convenience helper for validation failures (HTTP 422)
 */
export function validationProblem(zodError, instance, detail = 'Request parameters failed schema validation.') {
  return createProblemDetails({
    status: 422,
    detail,
    instance,
    errors: formatZodError(zodError)
  });
}

/**
 * Convenience helper for not found errors (HTTP 404)
 */
export function notFoundProblem(resourceName, identifier, instance) {
  return createProblemDetails({
    status: 404,
    detail: `${resourceName} with identifier '${identifier}' was not found.`,
    instance
  });
}

/**
 * Convenience helper for rate limiting (HTTP 429)
 */
export function rateLimitProblem(retryAfterSeconds = 60, instance) {
  return createProblemDetails({
    status: 429,
    detail: `Too many requests. Please retry in ${retryAfterSeconds} seconds.`,
    instance
  });
}
