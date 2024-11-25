import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { authReducer } from '@store/auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
