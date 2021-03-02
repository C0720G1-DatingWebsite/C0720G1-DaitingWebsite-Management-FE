import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {LoadResourceService} from './load-resource.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, DoCheck {
  title = 'c0720g1-dating';

  check = false;

  @ViewChild('element', {static: true }) loginElement: ElementRef;

   constructor(private loadResourceService:LoadResourceService) {	}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.check = this.loginElement.nativeElement.nextElementSibling.localName == 'app-login';
  }
}
