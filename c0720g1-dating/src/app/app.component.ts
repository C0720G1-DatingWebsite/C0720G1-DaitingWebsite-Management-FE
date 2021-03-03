import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {StorageService} from "./security/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, DoCheck {
  title = 'c0720g1-dating';

  check = false;

  @ViewChild('element', {static: true}) loginElement: ElementRef;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // let nameComponent = this.loginElement.nativeElement.nextElementSibling.localName;
    // this.check = nameComponent == 'app-login' || nameComponent == 'app-block-account';

    let account = this.storageService.getUser();
    this.check = account == null;
  }

}
