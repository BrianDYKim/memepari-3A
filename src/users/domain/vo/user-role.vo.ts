const role = {
  ADMIN: 'Admin',
  USER: 'User',
};

export type Role = typeof role[keyof typeof role];
