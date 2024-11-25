import { NgModule } from '@angular/core';
import {
  RouterModule,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'; // Importando a Store
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes'; // Importe suas rotas aqui
import { reducers, metaReducers } from './store';
import { provideHttpClient } from '@angular/common/http';

// Imports dos componentes (páginas)
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, // Necessário para rodar a aplicação em um ambiente de navegador
    CommonModule, // Necessário para *ngFor e *ngIf
    FormsModule, // Necessário para ngModel
    ReactiveFormsModule, // Necessário para FormGroup e formulários reativos
    RouterModule.forRoot(appRoutes),
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
