export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  user: String,
  config: Object,
  create_time: String
}
