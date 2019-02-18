import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify.service';

@Injectable({
  providedIn: 'root'
})

export class WebmasterGuard implements CanActivate {
  constructor(
    private auth: UserService,
    private router: Router,
    private notify: NotifyService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.auth.isWebmaster) {
      return true;
    }
    const signedIn = await this.auth.isSignedIn;
    if (!this.auth.isWebmaster) {
      this.notify.error("Denied", "You must be a webmaster to access that page!");
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
