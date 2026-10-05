type ClientErrorPayload = {
  message: string;
  source: string;
  url: string;
};

const reportedMessages = new Set<string>();

export const reportClientError = (payload: ClientErrorPayload): void => {
  const key = `${payload.source}:${payload.message}`;

  if (reportedMessages.has(key)) {
    return;
  }

  reportedMessages.add(key);

  void fetch('/api/client-errors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(payload),
    credentials: 'same-origin',
    keepalive: true,
  }).catch(() => undefined);
};
