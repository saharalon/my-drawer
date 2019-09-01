import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrawerComponent } from './components/drawer/drawer.component';

const routes: Routes = [
  { path: '', component: DrawerComponent },
  { path: ':drawingId', component: DrawerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
