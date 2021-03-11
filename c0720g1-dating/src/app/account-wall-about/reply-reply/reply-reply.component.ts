import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../comment.service";
import {StorageService} from "../../security/storage.service";
import {LoadResourceService} from "../../load-resource.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IComment} from "../../entity/comment";

@Component({
  selector: 'app-reply-reply',
  templateUrl: './reply-reply.component.html',
  styleUrls: ['./reply-reply.component.scss']
})
export class ReplyReplyComponent implements OnInit {

  page: number = 0;
  size: number = 1;
  id: number;
  idReplyReply: number;
  account;
  iReply: IComment[];
  @Input() idReplyMulti: number;

  formGroup: FormGroup;
  flagReplyMulti = false;


  constructor(private commentService: CommentService,
              private storageService: StorageService,
              private loadResourceService: LoadResourceService,
              public formBuilder:FormBuilder) {
    this.loadScript();
  }


  ngOnInit(): void {
    this.getAllListReplyLevel();
    this.account = this.storageService.getUser();
    this.loadScript();
  }

  getAllListReplyLevel() {
    this.commentService.getAllReply(this.idReplyMulti, this.page).subscribe(data => {
      this.iReply = data.content;
      console.log('reply-lv2');
      console.log(data.content)
    })
    // this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    // this.loadResourceService.loadScript('assets/js/content/content.js');
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
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
    }, 200);
  }

  getIdReply(replyMulti: IComment) {
    this.flagReplyMulti  = true;
    this.idReplyReply = replyMulti.id;
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required]],
      accountId: [this.account.id],
      commentId: [this.idReplyReply]
    })
  }

  exitReply() {
    this.flagReplyMulti = false;
    this.ngOnInit();
  }

  submitForReply() {
    this.commentService.saveReply(this.formGroup.value).subscribe(data=>{
      this.flagReplyMulti = false;
      this.ngOnInit();
    })
  }
}
