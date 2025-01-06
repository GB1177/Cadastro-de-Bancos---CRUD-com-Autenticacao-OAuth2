import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Banco } from 'src/app/interfaces/Bancos/banco';
import { BancoService } from 'src/app/modules/shared/services/bancos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banco-list',
  templateUrl: './banco-list.component.html',
  styleUrls: ['./banco-list.component.scss'],
})
export class BancoListComponent implements OnInit {
  public bancos: Banco[] = [];
  filteredBancos: Banco[] = [];
  selectedBancos: number[] = [];
  searchQuery = '';
  constructor(
    private bancoService: BancoService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBancos();
  }

  loadBancos(): void {
    this.bancoService.getBancos().subscribe((data) => {
      this.bancos = data;
    });
  }

  filterBancos(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredBancos = this.bancos.filter((banco) =>
      banco.descricao.toLowerCase().includes(query)
    );
  }

  toggleSelection(id: number): void {
    if (this.selectedBancos.includes(id)) {
      this.selectedBancos = this.selectedBancos.filter(
        (selectedId) => selectedId !== id
      );
    } else {
      this.selectedBancos.push(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedBancos.includes(id);
  }

  toggleSelectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    this.filteredBancos = this.filteredBancos.map((banco) => {
      return {
        ...banco,
        isSelected: isChecked,
      };
    });
    this.changeDetector.detectChanges();
  }

  excluirSelecionados(): void {
    this.bancoService.deleteBancos(this.selectedBancos).subscribe(() => {
      this.loadBancos();
      this.selectedBancos = [];
    });
  }

  novoBanco(): void {
    this.router.navigate(['/home/bancos/novo']);
  }

  verDetalheBanco(id: number): void {
    this.router.navigate([`/home/bancos/detalhe/${id}`]);
  }
}
