import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from "../comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {IComment} from "../../entity/comment";
import {StorageService} from "../../security/storage.service";
import {MessageManager} from "../message-manager";
import {LoadResourceService} from "../../load-resource.service";


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  page: number = 0;
  size: number = 1;
  id: number;
  idComment: number;
  iComments: IComment[];
  account;
  flagShow = false;
  flagEdit = false;
  flagReply = false;
  idCommentEdit: number;
  formGroup: FormGroup;


  @Input() idPost: number;

  @Output() onDeleteComment = new EventEmitter();

  constructor(private commentService: CommentService,
              private storageService: StorageService,
              private loadResourceService: LoadResourceService,
              public formBuilder: FormBuilder, public toastrService: ToastrService,
              public messageManager:MessageManager) {

    this.loadScript();
  }

  ngOnInit(): void {
    this.getAllListCommentSizeInPost();
    this.account = this.storageService.getUser();
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/content/content.js');
  }

  getAllListCommentSizeInPost() {
    this.commentService.getAllCommentSize(this.idPost, this.page, this.size).subscribe(data => {
      this.iComments = data.content;
    });
  }

  onClickShowComment() {
    this.size = this.size + 2;
    this.getAllListCommentSizeInPost();
    this.ngOnInit();
  }

  onClickHideComment() {
    this.size = 1;
    this.getAllListCommentSizeInPost();
    this.ngOnInit();
  }

  getCommentDeleteById(idComment: number) {
    this.onDeleteComment.emit(idComment);
  }

  getEditComments(comments: IComment) {
    this.flagEdit = true;
    this.idCommentEdit = comments.id;
    this.formGroup = this.formBuilder.group({
      id: [comments.id],
      content: [comments.content]
    })
  }

  getIdComment(comments: IComment) {
    this.flagReply = true;
    this.idComment = comments.id;
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required]],
      accountId: [this.account.id],
      commentId: [this.idComment]
    })
  }

  submitForReply() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      this.commentService.saveReply(this.formGroup.value).subscribe(data => {
        this.flagReply = false;
        this.ngOnInit();
        this.toastrService.success('Đăng trả lời bình luận thành công!', 'Thông báo')
      })
    }
  }

  saveComment() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      this.commentService.editComment(this.idCommentEdit, this.formGroup.value).subscribe(data => {
        this.flagEdit = false;
        this.ngOnInit();
        this.toastrService.success('Sửa bình luận thành công!', 'Thông báo')
      })
    }
  }

  exitEditComment() {
    this.flagEdit = false;
    this.ngOnInit();
  }

  exitReply() {
    this.flagReply = false;
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
}
