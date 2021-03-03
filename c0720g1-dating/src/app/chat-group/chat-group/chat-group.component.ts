import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MessageService} from "../message.service";
import {StorageService} from "../../security/storage.service";
import {LoadImgService} from "./load-img.service";
import {ToastrService} from "ngx-toastr";
import {Emoji} from 'emoji-mart'

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.scss']
})
export class ChatGroupComponent implements OnInit, DoCheck, AfterViewChecked {
  formGroup: FormGroup;
  message;
  username: string;
  sender: any;
  content: any;
  notification_number: number = 0;
  messageList: any;
  x: Array<any>;
  public imagePath;
  imgURL: any;
  loading: false;
  hiddenLoadMessage: any;
  limit: any;
  isUpToDate: any;
  scrolling = false;
  disableScrollDown=false;
  title = 'websocket-frontend';
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private loadResourceService: LoadResourceService,
              private messageService: MessageService,
              private tokenStorageService: StorageService,
              private loadImgService: LoadImgService,
              private toast: ToastrService,
              private formBuild: FormBuilder
  ) {
    this.loadScript();
    this.username = this.tokenStorageService.getUser().username;
    this.hiddenLoadMessage = false;
    this.limit = 5;
    this.isUpToDate = false;
    this.scrolling = false
  }

  ngAfterViewChecked(): void {
    // if (this.scrolling) {
    //   return;
    // } else {
    //   this.scrollToBottom();
    // }

  }


  ngDoCheck(): void {
    var account = this.tokenStorageService.getUser();
    document.getElementById('main-avatar9').setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');

    this.sender = this.messageService.obj_message.sender;
    this.content = this.messageService.obj_message.content;
  }

  ngOnInit(): void {
    this.scrollToBottom();
    setTimeout(function () {
    }, 700);

    window.addEventListener('scroll', this.scroll, true);
    this.messageService.getMessageList(7).subscribe((data) => {
      this.messageList = data
    });

    this.formGroup = this.formBuild.group({
        message: ['']
      }
    );

  }

  scroll = (event): void => {
    this.scrolling = true;
  };


  sendMessage() {
    console.log(this.formGroup.value.message);
    this.messageService.sendMessage(this.formGroup.value.message);
    this.messageList = this.messageService.msg;
    this.formGroup.reset();
    this.notification_number += 1;
    this.sender = this.messageService.obj_message.sender;
    this.content = this.messageService.obj_message.content;
  }

  loadScript() {
    this.loadResourceService.loadScript('assets/js/utils/app.js');
    this.loadResourceService.loadScript('assets/js/utils/page-loader.js');
    this.loadResourceService.loadScript('assets/js/vendor/simplebar.min.js');
    this.loadResourceService.loadScript('assets/js/utils/liquidify.js');
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/sidebar/sidebar.js');
    this.loadResourceService.loadScript('assets/js/global/global.popups.js');
    this.loadResourceService.loadScript('assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('assets/js/utils/svg-loader.js');
    this.loadResourceService.loadScript('assets/js/global/global.accordions.js');
    setTimeout(() => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    }, 200)
  }

  toggleEmoji() {
    var x = document.getElementById("emoji");
    if (x.style.display === "inline-block") {
      x.style.display = "none";
      console.log('none')
    } else {
      x.style.display = "inline-block";
      console.log('inline-block')
    }
  }

  addEmoji($event: any) {
    var emoji = $event.emoji.native;
    console.log($event);
    var new_message = (<HTMLInputElement>document.getElementById('input-chat')).value += emoji
    this.formGroup.setValue({
      message: new_message
    })

  }

  uploadImg() {
    document.getElementById('upload-img').click()
  }

  preview(files: FileList) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  onScroll1() {
    this.hiddenLoadMessage = true;
    console.log(this.isUpToDate)
    var that = this;
      this.limit += 5;
      console.log(this.limit);
      this.messageService.getMessageList(this.limit).subscribe((data) => {
        setTimeout(function () {
          if (that.messageList.length == data.length) {
            that.isUpToDate = true;
            that.hiddenLoadMessage = false;

          } else {
            that.isUpToDate = false;
            that.messageList = data;
            that.hiddenLoadMessage = false;
            that.scrollToBottom();
          }
        }, 1000);
      });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
