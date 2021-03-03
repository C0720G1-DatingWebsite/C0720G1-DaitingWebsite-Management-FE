import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../../../entity/comment";
import {CommentService} from "../comment.service";
import {IAccount} from "../../../../entity/account";
import {IPost} from "../../../../entity/post";
import {LoadResourceService} from "../../../../load-resource.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit{

  page: number;
  id: number;
  iComments: IComment[];
  iAccount: IAccount;

  @Input()
  idPost: number;

  constructor(private commentService: CommentService,
              private loadResourceService: LoadResourceService) {
    this.loadScript();
  }

  ngOnInit(): void {
    this.getAllListCommentInPost();
  }

  getAllListCommentInPost() {
    this.commentService.getAllComment(this.idPost, this.page).subscribe(data =>{
      this.iComments = data.content;
      console.log(data.content);
    });
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
