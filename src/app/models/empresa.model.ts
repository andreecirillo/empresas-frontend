export interface Empresa {
  id?: number;
  nome: string;
  porte: PorteEmpresa;
}

export enum PorteEmpresa {
  Desconhecido = 0,
  Pequeno = 1,
  Medio = 2,
  Grande = 3,
}

export function getDescricaoPorteEmpresa(porte: PorteEmpresa): string {
  switch (porte) {
    case PorteEmpresa.Pequeno:
      return 'Pequeno';
    case PorteEmpresa.Medio:
      return 'Médio';
    case PorteEmpresa.Grande:
      return 'Grande';
    default:
      return 'Desconhecido';
  }
}
