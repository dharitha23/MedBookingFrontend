export class Patient {
  type: String;
  firstName: String;
  lastName: String;
  contactNumber: String;
  email: String;
  password: String;
  birthday: Date;

  constructor(type: String, firstName: String, lastName: String, contactNumber: String, email: String, password: String, birthday: Date) {
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactNumber = contactNumber;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
  }
}
