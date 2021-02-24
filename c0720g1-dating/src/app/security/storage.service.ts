import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  KEY = 'response';

  constructor() { }

  public saveInSessionStorage(response: any) {
    window.sessionStorage.removeItem(this.KEY);
    window.sessionStorage.setItem(this.KEY, JSON.stringify(response));
  }

  public saveInLocalStorage(response: any) {
    window.localStorage.removeItem(this.KEY);
    window.localStorage.setItem(this.KEY, JSON.stringify(response));
  }

  public getUser(): any {
    if (window.localStorage.getItem(this.KEY)) {
      return JSON.parse(window.localStorage.getItem(this.KEY));
    } else {
      return JSON.parse(window.sessionStorage.getItem(this.KEY));
    }
  }

  public logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
