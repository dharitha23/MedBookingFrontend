export class Patient 
{
id: number;
firstName: string;
lastName: string;

constructor(id: number,firstName: string,lastName: string){
this.firstName = firstName;
this.lastName = lastName;
this.id = id;
}
}