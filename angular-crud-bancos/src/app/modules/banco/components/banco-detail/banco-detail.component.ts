import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BancoService } from 'src/app/modules/shared/services/bancos.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Banco } from 'src/app/interfaces/Bancos/banco';

@Component({
  selector: 'app-banco-detail',
  templateUrl: './banco-detail.component.html',
  styleUrls: ['./banco-detail.component.scss'],
})
export class BancoDetailComponent implements OnInit {
  banco!: Banco;
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bancoService: BancoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Obtém o ID da URL
    this.bancoService.getBancoById(id).subscribe(
      (data: Banco) => {
        this.banco = data;
        if (this.podeEditar()) {
          this.isEditMode = true; // Habilita a edição para devadmin automaticamente
        }
      },
      (error) => {
        console.error('Erro ao carregar os dados do banco:', error);
        alert('Erro ao carregar os dados do banco. Verifique o ID.');
        this.router.navigate(['/home/bancos']);
      }
    );
  }

  podeEditar(): boolean {
    const userName = this.authService.getUserName();
    return userName === 'devadmin';
  }

  editarBanco(): void {
    if (this.isEditMode) {
      // Chama a função de salvar quando o modo de edição está ativado
      this.salvarBanco();
    } else {
      this.isEditMode = true; // Se o banco não estiver em edição, entra no modo de edição
    }
  }

  salvarBanco(): void {
    if (!this.isEditMode) return;

    this.bancoService.updateBanco(this.banco.id, this.banco).subscribe(
      (data) => {
        alert('Banco atualizado com sucesso!');
        this.isEditMode = false; // Desativa o modo de edição após salvar
      },
      (error) => {
        console.error('Erro ao salvar os dados do banco:', error);
        alert('Erro ao salvar os dados do banco.');
      }
    );
  }

  excluirBanco(): void {
    if (confirm('Tem certeza que deseja excluir este banco?')) {
      const id = this.banco.id;
      this.bancoService.deleteBanco(id).subscribe(
        () => {
          alert('Banco excluído com sucesso!');
          this.router.navigate(['/home/bancos']); // Redireciona para a lista de bancos
        },
        (error) => {
          console.error('Erro ao excluir o banco:', error);
          alert('Erro ao excluir o banco.');
        }
      );
    }
  }

  fechar(): void {
    this.router.navigate(['/home/bancos']);
  }
}
