import { DocProfileComponent } from './docprofile/docprofile.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookappointmentComponent} from './bookappointment/bookappointment.component';
import {MyappointmentsComponent} from './myappointments/myappointments.component';
import {MydocumentsComponent} from './mydocuments/mydocuments.component';
import {MyprofileComponent} from './myprofile/myprofile.component';
import {ContactComponent} from './contact/contact.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DocnavComponent} from './docnav/docnav.component';
import {MyreviewsComponent} from './myreviews/myreviews.component';
import {DocMyAppointmentsComponent} from './doc-my-appointments/doc-my-appointments.component';
import {MydocumentsdocComponent} from './mydocumentsdoc/mydocumentsdoc.component';
import {HomeComponent} from './home/home.component';
import {SearchLayoutComponent} from './search-layout/search-layout.component';
import {SignupInComponent} from './signup-in/signup-in.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ViewDoctorDetailComponent} from './viewdocdetail/viewdocdetail.component';
import {ConfirmAppointmentComponent} from './confirmappointment/confirmappointment.component';
import {SearchResultComponent} from './search-result/search-result.component';
import { AvailableTimesComponent } from './available-times/available-times.component';
import { MypatientsComponent } from './mypatients/mypatients.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchLayoutComponent
  },
  {
    path: 'signupin',
    component: SignupInComponent
  },
  {
    path: 'forgotpass',
    component: ForgotpasswordComponent
  },
  {
    path: 'bookappointment',
    component: BookappointmentComponent
  },
  {
    path: 'myappointments',
    component: MyappointmentsComponent
  },
  {
    path: 'mydocuments',
    component: MydocumentsComponent
  },
  {
    path: 'myprofile',
    component: MyprofileComponent
  },
  {
    path: 'docprofile',
    component: DocProfileComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'docnav',
    component: DocnavComponent
  },
  {
    path: 'myreviews',
    component: MyreviewsComponent
  },
  {
    path: 'docmyappointments',
    component: DocMyAppointmentsComponent
  },
  {
    path: 'mydocumentsDoc',
    component: MydocumentsdocComponent
  },
  {
    path: 'viewdoctordetail',
    component: ViewDoctorDetailComponent
  },
  {
    path: 'confirmappointment',
    component: ConfirmAppointmentComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  {
    path: 'availability',
    component: AvailableTimesComponent
  },
  {
    path: 'mypatients',
    component: MypatientsComponent
  },
  {
    path: 'patient',
    component: PatientDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
