import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent }, // 404 rotası
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), AuthModule, MainModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
