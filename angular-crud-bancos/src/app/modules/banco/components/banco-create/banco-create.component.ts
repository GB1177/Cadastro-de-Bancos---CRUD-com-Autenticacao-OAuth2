import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Banco } from 'src/app/interfaces/Bancos/banco';
import { BancoService } from 'src/app/modules/shared/services/bancos.service';

@Component({
  selector: 'app-banco-create',
  templateUrl: './banco-create.component.html',
  styleUrls: ['./banco-create.component.scss'],
})
export class BancoCreateComponent {
  public banco = {
    codigo: '',
    descricao: '',
    status: {
      id: 'ativo',
      descricao: 'Ativo',
    },
    isSelected: false,
  };

  constructor(private router: Router, private bancoService: BancoService) {}

  public salvarBanco(): void {
    const bancoToSave: Banco = this.buildBancoToSave();

    this.bancoService.createBanco(bancoToSave).subscribe(
      () => {
        this.handleSuccess();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  private buildBancoToSave(): Banco {
    return {
      id: 0,
      status: {
        id: this.banco.status.id === 'ativo' ? 'A' : 'I',
        descricao: this.banco.status.descricao,
      },
      descricao: this.banco.descricao,
      codigo: this.banco.codigo.toString(),
      isSelected: this.banco.isSelected,
    };
  }

  private handleSuccess(): void {
    alert('Banco criado com sucesso!');
    this.router.navigate(['/home/bancos']);
  }

  private handleError(error: any): void {
    console.error('Erro ao criar banco:', error);
    alert('Erro ao criar o banco. Tente novamente!');
  }

  public fechar(): void {
    this.router.navigate(['/home/bancos']);
  }
}
