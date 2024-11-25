import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '@services/empresa.service';
import { Observable } from 'rxjs';
import { getDescricaoPorteEmpresa } from '@models/empresa.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: false
})
export class DashboardComponent implements OnInit {
  empresas$!: Observable<any[]>;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresas$ = this.empresaService.getEmpresas();
  }

  getDescricaoPorteEmpresa = getDescricaoPorteEmpresa
}
