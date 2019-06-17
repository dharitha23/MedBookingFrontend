import {Injectable} from '@angular/core';

@Injectable(    )
export class ConnectcomponentService {
public selDoctorName: string;
public doctorId: Number;
public setDoctorName(value: string) {
this.selDoctorName = value;
}
public setDoctorId(value: Number) {
this.doctorId = value;
}
}

