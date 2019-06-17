export class Doctor 
{
type: String;
firstName: String;
lastName: String;
speciality: String;
contactNumber: String;
address: String;
latitude: String;
longitude: String;
email: String;
password: String;
constructor(type: String,firstName: String,lastName: String,speciality: String,contactNumber: String,address: String,latitude: String,longitude: String,email: String,password: String){
this.type = type;
this.firstName = firstName;
this.lastName = lastName;
this.speciality = speciality;
this.contactNumber = contactNumber;
this.address = address;
this.latitude = latitude;
this.longitude = longitude;
this.email = email;
this.password = password;
}
}