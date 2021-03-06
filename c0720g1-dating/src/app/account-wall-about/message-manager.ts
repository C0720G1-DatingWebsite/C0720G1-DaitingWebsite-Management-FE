import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageManager {
  constructor(public toastrService: ToastrService) {
  }

  showMessageCreateNotRole() {
    this.toastrService.error("Thêm mới thất bại. Bạn đang cố phá hoại", "Thông báo");
  }
}
