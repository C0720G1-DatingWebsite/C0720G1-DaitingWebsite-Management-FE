import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  KEY = 'response';

  constructor() { }

  public saveInSessionStorage(response: any) {
    window.sessionStorage.setItem(this.KEY, response);
  }

  public saveInLocalStorage(response: any) {
    window.localStorage.setItem(this.KEY, response);
  }

  public getResponse(): any {
    if (window.localStorage.getItem(this.KEY)) {
      return window.localStorage.getItem(this.KEY);
    } else {
      return window.sessionStorage.getItem(this.KEY);
    }
  }

  public logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
