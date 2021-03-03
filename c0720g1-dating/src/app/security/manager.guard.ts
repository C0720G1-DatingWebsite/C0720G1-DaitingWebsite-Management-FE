import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.storageService.getUser();

    if (user == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (user.roleList[2] === 'ROLE_MANAGER') {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
  }

}
