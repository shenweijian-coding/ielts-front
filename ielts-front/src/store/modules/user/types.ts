export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id: String,
  phone_number: Object,
  password: String,
  created_at: String,
  updated_at: String,
  session_ids: String
}
