// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import { Usuario } from '@models/usuario.model';
import { LoadingService } from '@services/loading.service';
import { AlertService } from '@services/alert.service';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let email = this.loginForm.value.email;
    let senha = this.loginForm.value.senha;

    if (email === environment.loginEmail && senha === environment.loginPassword) {
      this.loadingService.show();

      let nome = 'Admin';
      let usuario: Usuario = { nome: nome, email: email, senha };

      setTimeout(() => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.store.dispatch(AuthActions.login({ usuario }));
        this.loadingService.hide();
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.alertService.showAlert(
        'Login',
        'E-mail ou Senha incorretos.',
        'error'
      );
    }
  }
}
