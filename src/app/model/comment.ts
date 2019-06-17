export class Comment {
  id: number;
  appt_id: number;
  comm_message: string;
  appt_date: Date;

  constructor(appt_id: number, comm_message: string) {
    this.appt_id = appt_id;
    this.comm_message = comm_message;
  }

}
