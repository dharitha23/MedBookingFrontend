export class Rating {
  stars: number;
  message: string;
  patient_id: number;
  patient_firstname: string;
  patient_lastname: string;
  doctor_id: number;
  rating_date: Date;

  constructor(stars: number, message: string, patient_id: number, doctor_id: number, rating_date: Date) {
    this.stars = stars;
    this.message = message;
    this.patient_id = patient_id;
    this.doctor_id = doctor_id;
    this.rating_date = rating_date;
  }
}
