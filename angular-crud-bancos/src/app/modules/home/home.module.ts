  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';
  import { HomeComponent } from './home/home.component';
  import { BancoListComponent } from '../banco/components/banco-list/banco-list.component';
  import { FormsModule } from '@angular/forms';
import { BancoCreateComponent } from '../banco/components/banco-create/banco-create.component';
import { BancoDetailComponent } from '../banco/components/banco-detail/banco-detail.component';

  @NgModule({
    declarations: [
      HomeComponent,
      BancoListComponent,
      BancoCreateComponent,
      BancoDetailComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild([
        {
          path: '',
          component: HomeComponent,
          children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'bancos', component: BancoListComponent },
            { path: 'bancos/novo', component: BancoCreateComponent },
            { path: 'bancos/detalhe/:id', component: BancoDetailComponent },
          ],
        },
      ]),
    ],
  })
  export class HomeModule {}
