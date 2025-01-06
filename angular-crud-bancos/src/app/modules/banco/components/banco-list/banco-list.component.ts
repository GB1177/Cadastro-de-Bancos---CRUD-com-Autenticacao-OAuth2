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
  public filteredBancos: Banco[] = [];
  public selectedBancos: number[] = [];
  public searchQuery = '';

  constructor(
    private bancoService: BancoService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBancos();
  }

  private loadBancos(): void {
    this.bancoService.getBancos().subscribe((data) => {
      this.bancos = data;
    });
  }

  public filterBancos(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredBancos = this.bancos.filter((banco) =>
      banco.descricao.toLowerCase().includes(query)
    );
  }

  public toggleSelection(id: number): void {
    const index = this.selectedBancos.indexOf(id);
    if (index > -1) {
      this.selectedBancos.splice(index, 1);
    } else {
      this.selectedBancos.push(id);
    }
  }

  public isSelected(id: number): boolean {
    return this.selectedBancos.includes(id);
  }

  public toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedBancos = isChecked
      ? [...new Set([...this.selectedBancos, ...this.getBancoIds()])]
      : [];
    this.changeDetector.detectChanges();
  }

  private getBancoIds(): number[] {
    return this.bancos.map((banco) => banco.id);
  }

  public excluirSelecionados(): void {
    this.bancoService.deleteBancos(this.selectedBancos).subscribe(() => {
      this.loadBancos();
      this.selectedBancos = [];
    });
  }

  public novoBanco(): void {
    this.router.navigate(['/home/bancos/novo']);
  }

  public verDetalheBanco(id: number): void {
    this.router.navigate([`/home/bancos/detalhe/${id}`]);
  }

  public isSelectAllChecked(): boolean {
    return this.bancos.every((banco) => this.isSelected(banco.id));
  }
}
