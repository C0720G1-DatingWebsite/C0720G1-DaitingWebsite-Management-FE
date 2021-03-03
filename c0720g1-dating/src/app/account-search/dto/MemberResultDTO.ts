export class MemberResultDTO {
  id: number;
  fullName: string;
  avatar: string;
  backgroundImage: string;
  accountDescribe: string;
  postCount: number;
  friendCount: number;
  likeCount: number;


  constructor(id: number, fullName: string, avatar: string, backgroundImage: string, accountDescribe: string, postCount: number, friendCount: number, likeCount: number) {
    this.id = id;
    this.fullName = fullName;
    this.avatar = avatar;
    this.backgroundImage = backgroundImage;
    this.accountDescribe = accountDescribe;
    this.postCount = postCount;
    this.friendCount = friendCount;
    this.likeCount = likeCount;
  }
}
