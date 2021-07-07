export class User {
  branch: string;
  id: number;
  language: string;
  status: number;
  userName: string;
  userPin: number;
  userType: string;

  constructor() {
    this.branch = "";
    this.id = 0;
    this.language = "";
    this.status = 0;
    this.userName = "";
    this.userPin = 0;
    this.userType = "";
  }
}
