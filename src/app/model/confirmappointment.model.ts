import { Time } from '@angular/common';

export class ConfirmAppointment {
    appt_Status: String ;
    address: String ;
    appt_Date: Date ;
    slot_Id: Number;
    patient_Id: Number ;
    doctor_Id: Number ;
    problemDesc: String;
    phoneNumber: String;
    startTimeSlot: Time;
    Appt_id: Number;
}
