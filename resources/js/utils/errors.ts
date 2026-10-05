import { type AxiosError, isAxiosError } from 'axios';

export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export const isValidationError = (error: unknown): boolean =>
  isAxiosError(error) && error.response?.status === 422;

export const isNotFoundError = (error: unknown): boolean =>
  isAxiosError(error) && error.response?.status === 404;

export const isServerError = (error: unknown): boolean =>
  isAxiosError(error) && error.response != null && error.response.status >= 500;

export const isForbiddenError = (error: unknown): boolean =>
  isAxiosError(error) && error.response?.status === 403;

export const isTooManyRequestsError = (error: unknown): boolean =>
  isAxiosError(error) && error.response?.status === 429;

export const isRequestBodyTooLargeError = (error: unknown): boolean =>
  isAxiosError(error) && error.response?.status === 413;

export const isWellFormedApiError = (
  candidate: AxiosError,
): candidate is AxiosError<ApiErrorResponse> => {
  const data = candidate.response?.data;
  return typeof data === 'object' && data !== null && 'message' in data;
};

export const extractErrorMessage = (
  error: unknown,
  fallback = 'An unexpected error occurred.',
): string => {
  if (isAxiosError(error)) {
    const errorData = isWellFormedApiError(error) ? error.response?.data : undefined;
    const firstFieldError = errorData?.errors && Object.values(errorData.errors).flat()[0];

    if (firstFieldError) {
      return firstFieldError;
    }

    if (errorData?.message) {
      if (!error.response?.status || error.response.status < 500) {
        return errorData.message;
      }
    }

    switch (error.response?.status) {
      case 400:
        return 'Invalid request.';
      case 401:
        return 'You must be logged in to perform this action.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 413:
        return 'The request payload was too large.';
      case 419:
        return 'Your session has expired. Please refresh the page.';
      case 422:
        return 'The provided data was invalid.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'An internal server error occurred. Please try again later.';
      case 503:
        return 'The service is temporarily unavailable. Please try again later.';
    }

    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
