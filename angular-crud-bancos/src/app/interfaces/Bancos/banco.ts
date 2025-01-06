export interface Banco {
  id: number;
  status: {
    id: string;
    descricao: string;
  };
  descricao: string;
  codigo: string;
  isSelected: boolean;
}
