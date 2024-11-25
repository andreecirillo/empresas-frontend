import { Component, OnInit } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as AuthSelectors from '@store/auth/auth.selectors';
import { AuthState } from '@store/auth/auth.reducer';
import { map, of } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LoadingService } from '@services/loading.service';
import { AlertService } from '@services/alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  usuario$: Observable<Usuario | null>;
  isLoading$: Observable<boolean>;
  isOpen = false;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private store: Store<{ auth: AuthState }>,
    private alertService: AlertService
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.usuario$ = of(null);
  }

  ngOnInit() {
    const usuarioLogado = localStorage.getItem('usuario');

    if (usuarioLogado) {
      const usuario = JSON.parse(usuarioLogado) as Usuario;
      this.store.dispatch(AuthActions.login({ usuario }));
    }

    this.usuario$ = this.store
      .select(AuthSelectors.selectUsuario)
      .pipe(map((usuario) => usuario || null));
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  async sair() {
    const confirmed = await this.alertService.showConfirmAlert(
      '',
      'Deseja realmente sair?',
      'warning'
    );
    if (confirmed) {
      this.loadingService.show();

      setTimeout(() => {
        localStorage.removeItem('usuario');
        this.store.dispatch(AuthActions.logout());
        this.loadingService.hide();
        this.router.navigate(['/']);
      }, 1000);
    }
  }
}
