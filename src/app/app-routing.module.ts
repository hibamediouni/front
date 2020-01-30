import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharteDemoComponent } from 'charte';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: 'theme', component: CharteDemoComponent },
  { path: 'auth/logout', component: AccueilComponent },
  { path: '**', component: AccueilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
