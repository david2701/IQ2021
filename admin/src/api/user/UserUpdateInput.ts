export type UserUpdateInput = {
  abonne?: string | null;
  bd?: Date | null;
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  roles?: Array<string>;
  username?: string;
};
