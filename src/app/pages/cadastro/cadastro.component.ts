// cadastro.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Empresa, PorteEmpresa, getDescricaoPorteEmpresa } from '@models/empresa.model';
import { EmpresaService } from '@services/empresa.service';
import { LoadingService } from '@services/loading.service';
import { AlertService } from '@services/alert.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css',
    standalone: false
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  submitted = false;
  isLoading = false;  
  errorMessage: string | null = null;  
  empresa$!: Observable<Empresa | null>;

  porteEmpresaKeys: number[] = Object.keys(PorteEmpresa)
  .filter((key) => !isNaN(Number(key)) && Number(key) > 0)
  .map((key) => Number(key));

  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private alertService: AlertService
  ) {
    this.empresa$ = of(null);
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      porte: ['', Validators.required],
    });
  }

  ngOnInit(): void {    
    this.carregarEmpresa();
  }

  private carregarEmpresa(): void {
    setTimeout(() => this.loadingService.show());
    this.empresa$ = this.route.params.pipe(
      switchMap((params) => {                
        const id = params['id'] ? Number(params['id']) : null;
        setTimeout(() => this.loadingService.hide());
        return id ? this.empresaService.getEmpresa(id) : of(null);
      }),
      catchError((error) => {
        
        this.errorMessage = '';
        this.alertService.showAlert(
          'Cadastro de Empresas',
          'Não foi possível carregar os dados da empresa.',
          'error'
        );
        setTimeout(() => this.loadingService.hide());
        return of(null);
      })
    );
    this.empresa$.subscribe((empresa) => {
      if (empresa) {        
        this.cadastroForm.patchValue(empresa);
      }
      setTimeout(() => this.loadingService.hide());
    });
  }  

  onSubmit(): void {
    this.submitted = true;
  
    if (this.cadastroForm.invalid) {      
      return;
    }
  
    this.loadingService.show();    
        
    this.empresa$.pipe(first()).subscribe({
      next: (empresa) => {             
        if (empresa?.id) {        
          const empresaFormData: Empresa = { 
            ...this.cadastroForm.value,
            id: empresa.id,
            porte: Number(this.cadastroForm.value.porte),             
          };  
          console.log(empresaFormData);
          this.empresaService.updateEmpresa(empresaFormData).subscribe({
            next: () => {              
              this.alertService.showAlert(
                'Cadastro de Empresas',
                'Empresa atualizada com sucesso.',
                'success'
              );
              setTimeout(() => this.loadingService.hide());
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              this.alertService.showAlert(
                'Cadastro de Empresas',
                'Erro ao criar empresa.',
                'error'
              );
            },
          });
        } else {          
          const empresaFormData: Empresa = { 
            ...this.cadastroForm.value,            
            porte: Number(this.cadastroForm.value.porte),             
          };  
          console.log(empresaFormData);
          this.empresaService.addEmpresa(empresaFormData).subscribe({
            next: () => {              
              this.alertService.showAlert(
                'Cadastro de Empresas',
                'Empresa criada com sucesso.',
                'success'
              );
              setTimeout(() => this.loadingService.hide());
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              setTimeout(() => this.loadingService.hide());
              this.alertService.showAlert(
                'Cadastro de Empresas',
                'Erro ao criar empresa.',
                'error'
              );
            },
          });
        }
      },
    });    
  }

  async excluir(): Promise<void> {
    const confirmed = await this.alertService.showConfirmAlert(
      '',
      'Deseja realmente excluir a Empresa?',
      'warning'
    );
  
    if (confirmed) {
      this.loadingService.show();
  
      try {
        const empresa = await this.empresa$.pipe(take(1)).toPromise(); // Converte o Observable para Promise
  
        if (empresa && empresa.id) {
          await this.empresaService.deleteEmpresa(empresa.id).toPromise();
          this.alertService.showAlert(
            'Cadastro de Empresas',
            'Empresa excluída com sucesso.',
            'success'
          );
          this.router.navigate(['/dashboard']);
        } else {
          this.alertService.showAlert(
            'Cadastro de Empresas',
            'Empresa não encontrada.',
            'error'
          );
        }
      } catch (err) {
        console.error('Erro ao excluir a empresa:', err);
        this.alertService.showAlert(
          'Cadastro de Empresas',
          'Erro ao excluir empresa.',
          'error'
        );
      } finally {
        this.loadingService.hide();
      }
    }
  }

  getDescricaoPorteEmpresa = getDescricaoPorteEmpresa
}
