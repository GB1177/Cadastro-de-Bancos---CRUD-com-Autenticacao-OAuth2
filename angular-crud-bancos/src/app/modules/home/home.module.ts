  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';
  import { HomeComponent } from './home/home.component';
  import { BancoListComponent } from '../banco/components/banco-list/banco-list.component';
  import { FormsModule } from '@angular/forms';

  @NgModule({
    declarations: [HomeComponent, BancoListComponent],
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
          ],
        },
      ]),
    ],
  })
  export class HomeModule {}
