import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadImgService {

  constructor() {
  }

  loadImg(img: string) {
    const avatar = document.getElementsByClassName('avatar-widget-chat');
  }
}
