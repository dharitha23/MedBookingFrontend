import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTabsModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BookappointmentComponent} from './bookappointment/bookappointment.component';
import {MyappointmentsComponent} from './myappointments/myappointments.component';
import {MydocumentsComponent} from './mydocuments/mydocuments.component';
import {MyprofileComponent} from './myprofile/myprofile.component';
import {ContactComponent} from './contact/contact.component';
import {DocnavComponent} from './docnav/docnav.component';
import {MyreviewsComponent} from './myreviews/myreviews.component';
import {DocMyAppointmentsComponent} from './doc-my-appointments/doc-my-appointments.component';
import {HomeComponent} from './home/home.component';
import {MydocumentsdocComponent} from './mydocumentsdoc/mydocumentsdoc.component';
import {SearchComponent} from './search/search.component';
import {SignupInComponent} from './signup-in/signup-in.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ViewDoctorDetailComponent} from './viewdocdetail/viewdocdetail.component';
import {ConfirmAppointmentComponent} from './confirmappointment/confirmappointment.component';
import {AvailableTimesComponent} from './available-times/available-times.component';

import {MatDialogModule} from '@angular/material';
import { MatTableModule } from '@angular/material';

import {DocProfileComponent} from './docprofile/docprofile.component';
import {UserService} from './signup-in/user.service';

import {ToastrModule} from 'ngx-toastr';
import {SearchResultComponent} from './search-result/search-result.component';
import {FooterComponent} from './footer/footer.component';
import {SearchLayoutComponent} from './search-layout/search-layout.component';
import {DefaultNavComponent} from './default-nav/default-nav.component';
import {ConnectcomponentService} from './services/connectcomponentservice';
import {DialogComponent} from './dialog/dialog.component';
import {ModalComponent} from './modal/modal.component';
import {MypatientsComponent} from './mypatients/mypatients.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {NotesDialogComponent} from './notes-dialog/notes-dialog.component';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookappointmentComponent,
    MyappointmentsComponent,
    MydocumentsComponent,
    MyprofileComponent,
    ContactComponent,
    DocnavComponent,
    MyreviewsComponent,
    DocMyAppointmentsComponent,
    HomeComponent,
    MydocumentsdocComponent,
    SearchComponent,
    SignupInComponent,
    ForgotpasswordComponent,
    ViewDoctorDetailComponent,
    ConfirmAppointmentComponent,
    SearchResultComponent,
    FooterComponent,
    SearchLayoutComponent,
    DefaultNavComponent,
    DialogComponent,
    DocProfileComponent,
    ModalComponent,
    MypatientsComponent,
    PatientDetailComponent,
    AvailableTimesComponent,
    NotesDialogComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    MatTableModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })

  ],
  providers: [UserService, ConnectcomponentService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DialogComponent, ModalComponent, NotesDialogComponent]
})
export class AppModule {
}
