import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { Usuario } from '@models/usuario.model';

export interface AuthState {
  usuario: Usuario | null;
}

export const initialState: AuthState = {
  usuario: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { usuario }) => ({
    ...state,
    usuario: usuario,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    usuario: null,
  }))
);
