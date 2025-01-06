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
  banco = {
    codigo: '',
    descricao: '',
    status: {
      id: 'ativo', // Definindo um valor id (pode ser 'ativo' ou 'inativo')
      descricao: 'Ativo', // Definindo a descrição do status
    },
    isSelected: false, // Certifique-se de incluir o campo isSelected, se necessário
  };

  constructor(private router: Router, private bancoService: BancoService) {}

  salvarBanco(): void {
    // Ajuste: criar o objeto completo de banco de acordo com a estrutura do Swagger
    const bancoToSave: Banco = {
      id: 0, // Definindo um valor de id 0 conforme esperado
      status: {
        id: this.banco.status.id === 'ativo' ? 'A' : 'I', // status é um objeto, com id e descricao
        descricao: this.banco.status.descricao, // Manter a descrição do status
      },
      descricao: this.banco.descricao, // Usar a descrição fornecida
      codigo: this.banco.codigo.toString(), // Garantir que o código seja uma string
      isSelected: this.banco.isSelected, // Adicionando o isSelected, conforme definido na interface
    };


    this.bancoService.createBanco(bancoToSave).subscribe(
      (response) => {
        alert('Banco criado com sucesso!');
        this.router.navigate(['/home/bancos']);
      },
      (error) => {
        console.error('Erro ao criar banco:', error);
        alert('Erro ao criar o banco. Tente novamente!');
      }
    );
  }

  fechar(): void {
    this.router.navigate(['/home/bancos']);
  }
}
