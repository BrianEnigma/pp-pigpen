import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { TestAllComponent } from './test-all/test-all.component';
import { EditorComponent } from './editor/editor.component';
import { EditorGuard } from './editor/editor.guard';
import { WebmasterComponent } from './webmaster/webmaster.component';
import { WebmasterGuard } from './webmaster/webmaster.guard';
import { PlaytestingComponent } from './playtesting/playtesting.component';
import { HomeComponent } from 'src/components/home.component';
import { NotFoundResolver } from './not-found.resolver';
import { CommsComponent } from './comms/comms.component';
import { CommsGuard } from './comms/comms.guard';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { CityOpsComponent } from './city-ops/city-ops.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'testAll', component: TestAllComponent },

  // Protected
  { path: 'editor', component: EditorComponent, canActivate: [EditorGuard] },
  { path: 'webmaster', component: WebmasterComponent,  canActivate: [WebmasterGuard] },
  { path: 'comms', component: CommsComponent, canActivate: [CommsGuard] },

  // public
  { path: 'playtesting', component: PlaytestingComponent },
  { path: 'info/:slug', component: InfoComponent },
  { path: 'info', component: InfoComponent },

  // profile
  { path: 'profile/:uid', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },

  // Catch all
  { path: '**', component: HomeComponent, resolve: {void: NotFoundResolver}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
