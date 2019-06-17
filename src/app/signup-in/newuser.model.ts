export class NewUser {
  userID: number;
  type: String;
  email: String;
  password: String;

  constructor(type: String, email: String, password: String) {
    this.type = type;
    this.email = email;
    this.password = password;
  }
}
