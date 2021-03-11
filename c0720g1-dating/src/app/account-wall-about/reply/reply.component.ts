import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../entity/comment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../security/storage.service";
import {LoadResourceService} from "../../load-resource.service";
import {CommentService} from "../comment.service";


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  page: number = 0;
  size: number = 1;
  id: number;
  idReply: number;
  account;
  iComment: IComment[];

  @Input() idComment: number;

  flagReplyReply= false;
  formGroup: FormGroup;

  constructor(private commentService: CommentService,
              private storageService: StorageService,
              private loadResourceService: LoadResourceService,
              public formBuilder:FormBuilder) {
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/content/content.js');

    // this.loadScript();
  }

  ngOnInit(): void {
    this.getAllListReply();
    this.account = this.storageService.getUser();
    this.loadScript();
  }
  onClickShowReply() {
    this.size = this.size + 2;
    this.getAllListReplySizeInComment();
    this.ngOnInit();
  }

  onClickHideReply() {
    this.size = 1;
    this.getAllListReplySizeInComment();
    this.ngOnInit();
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

  getAllListReply() {
    this.commentService.getAllReply(this.idComment, this.page).subscribe(data => {
      this.iComment = data.content;
    })
    // this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    // this.loadResourceService.loadScript('assets/js/content/content.js');
  }

  getAllListReplySizeInComment() {
    this.commentService.getAllReplySize(this.idComment, this.page, this.size).subscribe(data => {
      this.iComment = data.content;
    });
  }

  exitReply() {
    this.flagReplyReply = false;
    this.ngOnInit();
  }

  submitForReply(){
    this.commentService.saveReply(this.formGroup.value).subscribe(data =>{
      this.flagReplyReply = false;
      this.ngOnInit();
    })
  }

  getIdReply(reply: IComment) {
    this.flagReplyReply = true;
    this.idReply = reply.id;
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required]],
      accountId: [this.account.id],
      commentId: [this.idReply]
    })
  }
}
