import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../../../entity/comment";
import {CommentService} from "../comment.service";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  page: number = 0;
  id: number;
  iComment: IComment[];
  @Input()
  idComment: number;

  @Output()
  eventEmitter = new EventEmitter();

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.getAllListReply();
  }

  getAllListReply() {
    console.log("test"+this.idComment);
    this.commentService.getAllReply(this.idComment, this.page).subscribe(data => {
      this.iComment = data.content;
      console.log()
      console.log('reply');
      console.log( data.content)
    })
  }
}
