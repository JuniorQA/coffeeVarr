import type { UserLocale } from './User';

type AuthState = { user: UserLocale | undefined; error: string|null };
export default AuthState;
