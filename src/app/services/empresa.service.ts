// src/app/services/empresa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa, PorteEmpresa } from '@models/empresa.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  // Método para obter a lista de empresas e converter o `porte`
  getEmpresas(): Observable<Empresa[]> {
    return this.http
      .get<{ id: number; nome: string; porte: number }[]>(this.apiUrl)
      .pipe(
        map((response) =>
          response.map((empresa) => ({
            ...empresa,
            porte: this.convertPorteEmpresa(empresa.porte),
          }))
        )
      );
  }

  getEmpresa(id: number): Observable<Empresa> {    
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  addEmpresa(empresa: Empresa): Observable<Empresa> {    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Empresa>(this.apiUrl, empresa, { headers });
    
  }

  updateEmpresa(empresa: Empresa): Observable<Empresa> {    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Empresa>(this.apiUrl, empresa, { headers });
  }

  deleteEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método auxiliar para converter `porte` numérico em `enum`
  private convertPorteEmpresa(porte: number): PorteEmpresa {    
    switch (porte) {
      case 1:
        return PorteEmpresa.Pequeno;
      case 2:
        return PorteEmpresa.Medio;
      case 3:
        return PorteEmpresa.Grande;
      default:
        return PorteEmpresa.Desconhecido;
    }
  }
}
