export class User 
{
type: String;
email: String;
password: String;
userID: Number;
constructor(type: String,email: String,password: String,userID: Number){
this.type = type;
this.email = email;
this.password = password;
this.userID = userID;
}
}