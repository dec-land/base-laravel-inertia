declare namespace App {
  namespace DTOs {
    namespace User {
      export type UserData = {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
      };
    }
  }
}
