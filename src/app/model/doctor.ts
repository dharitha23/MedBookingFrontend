import {Rating} from './rating-review';

export class Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone_number: string;
  speciality: string;
  address: string;
  latitude: string;
  longitude: string;
  profile_pic_path: string;
  total_ratings: number;
  stars_avg: number;
  rating_reviews: Rating[];
}
