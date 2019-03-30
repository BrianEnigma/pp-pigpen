import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DonationsListComponent } from "./components/list.component";
import { DonationsMakeComponent } from "./components/make.component";
import { DonationsComponent } from './donations.component';
import { ScriptLoaderResolver } from 'src/services/scriptLoader.resolver';

const routes: Routes = [
  {
    path: "",
    component: DonationsComponent,
    resolve: {
      preloadScripts: ScriptLoaderResolver
    },
    data: {
      preloadScripts: ["stripe"]
    },
    children: [
      { path: "make", component: DonationsMakeComponent },
      { path: "list", component: DonationsListComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationsRoutingModule { }
