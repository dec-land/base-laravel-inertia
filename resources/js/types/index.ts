export type User = App.DTOs.User.UserData;

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User | null;
  };
  flash?: {
    success?: string | null;
    error?: string | null;
  };
};
