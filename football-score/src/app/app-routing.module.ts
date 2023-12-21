import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingComponent } from './pages/standings/standings.component';
import { FixtureComponent } from './pages/fixtures/fixtures.component';

export const routes: Routes = [
    { path: '', redirectTo: 'football/England', pathMatch: 'full' },
    { path: 'football/:country', component: StandingComponent },
    { path: 'football/:country/:teamId',  component: FixtureComponent },
    { path: '**', redirectTo: 'football/England'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}