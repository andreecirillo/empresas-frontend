import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectUsuario = createSelector(
  (state: { auth: AuthState }) => state.auth,
  (authState: AuthState) => authState.usuario
);
