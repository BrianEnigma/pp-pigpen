import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";
import { MenuItem } from "primeng/api";
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: "app-user-auth",
  template: `
  <p-toolbar>
    <div class="ui-toolbar-group-right">
      <div *ngIf="(us.isSignedIn | async); else showLogin">
        <p-splitButton icon="pi pi-lock" (onClick)="us.signOut()" [model]="items"></p-splitButton>
      </div>
      <ng-template #showLogin>
        <p-button (click)="us.signIn()" label="Sign In"></p-button>
      </ng-template>
    </div>
  </p-toolbar>
  `,
  styles: []
})
export class UserAuthComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(public us: UserService, public notify: NotifyService) {
  }

  ngOnInit(): void {
    this.items = [{
      label: "Sign Out",
      icon: "pi pi-unlock",
      command: () => {
        this.us.signOut();
      }
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => {
        this.profile();
      }
    }
  ];

  }

  profile() {
    this.notify.error("Not Implemented", "Sorry, user profiles are not yet implemented");
  }
}
