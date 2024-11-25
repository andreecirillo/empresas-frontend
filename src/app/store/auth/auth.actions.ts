import { Usuario } from '@models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Auth] Init');

export const login = createAction(
  '[Auth] Login',
  props<{ usuario: Usuario }>()
);

export const logout = createAction('[Auth] Logout');
