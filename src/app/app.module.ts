import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DropdownModule} from 'ngx-dropdown';
import {MatExpansionModule} from '@angular/material/expansion';
import {NouisliderModule} from 'ng2-nouislider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AngularFireModule} from 'angularfire2';
// for AngularFireDatabase
import {AngularFireDatabaseModule} from 'angularfire2/database';
// for AngularFireAuth
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireAuth} from 'angularfire2/auth';


import { AppComponent } from './app.component';
import {SignupComponent} from './Components/signup/signup.component';
import {FooterComponent} from './Components/footer/footer.component';
import {LoginComponent} from './Components/login/login.component';
import {RouterModule} from '@angular/router';
import {HomepageComponent} from './Components/homepage/homepage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './Components/navbar/navbar.component';
import {HttpModule} from '@angular/http';
import {SidebarComponent} from './Components/sidebar/sidebar.component';
import {SemiFormComponent} from './Components/semi-form/semi-form.component';
import {HistoryComponent} from './Components/history/history.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {FaqComponent} from './Components/faq/faq.component';
import {SearchResultsComponent} from './Components/search-results/search-results.component';
import {HotelSearchResultComponent} from './Components/hotel-search-result/hotel-search-result.component';
import {CarSearchResultComponent} from './Components/car-search-result/car-search-result.component';
import {SemiBarComponent} from './Components/semi-bar/semi-bar.component';
import {TrainSearchResultComponent} from './Components/train-search-result/train-search-result.component';
import {FlightHomePageComponent} from './Components/flight-home-page/flight-home-page.component';
import {FlightSearchComponent} from './Components/flight-search/flight-search.component';
import {AcmeLoginComponent} from './Components/acme-login/acme-login.component';
import {AcmeSignUpComponent} from './Components/acme-sign-up/acme-sign-up.component';

import {UserService} from './Services/User/user.service';
import {FlightService} from './Services/Flight/flight.service';
import {DataService} from './Services/Data/data.service';
import {HotelService} from './Services/Hotel/hotel.service';
import {CarService} from './Services/Car/car.service';
import {TrainService} from './Services/Train/train.service';
import {environment} from '../environments/environment';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DashboardService} from './Services/Dashboard/dashboard.service';
import {CanActivate} from '@angular/router';
import {OnlyLoggedInUsersGuardService} from './Services/Guard/only-logged-in-users-guard.service';
import {AuthGuardService} from './Services/Guard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FooterComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    SidebarComponent,
    SemiFormComponent,
    HistoryComponent,
    DashboardComponent,
    FaqComponent,
    SearchResultsComponent,
    HotelSearchResultComponent,
    CarSearchResultComponent,
    SemiBarComponent,
    TrainSearchResultComponent,
    FlightHomePageComponent,
    FlightSearchComponent,
    AcmeLoginComponent,
    AcmeSignUpComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    HttpModule,
    NgbModule,
    MatInputModule,
    MatFormFieldModule,
    DropdownModule,
    BrowserModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    NouisliderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'acmeLogin', component: AcmeLoginComponent, data: {depth: 1}, canActivate: [AuthGuardService]},
      {path: 'acmeSignUp', component: AcmeSignUpComponent, data: {depth: 1}, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginComponent, data: {depth: 2}, canActivate: [AuthGuardService]},
      {path: 'signup', component: SignupComponent, data: {depth: 2}, canActivate: [AuthGuardService]},
      { path: 'home', component: HomepageComponent , data: {depth: 1}},
      {path: 'flightHome', component: FlightHomePageComponent, data: {depth: 1}},
      {
        path: 'main', component: SidebarComponent, data: {depth: 1}, canActivate: [OnlyLoggedInUsersGuardService],
        children: [
          {path: '', redirectTo: 'flightSearch', pathMatch: 'full'},
          {path: 'flightSearch', component: FlightSearchComponent},
          {path: 'dashboard/:name', component: DashboardComponent},
          {path: 'history', component: HistoryComponent},
          {path: 'faq', component: FaqComponent},
        ]
      },
      {path: 'SearchResults', component: SearchResultsComponent, data: {depth: 2}},
      {path: 'HotelSearch', component: HotelSearchResultComponent, data: {depth: 2}},
      {path: 'CarSearch', component: CarSearchResultComponent, data: {depth: 2}},
      {path: 'TrainSearch', component: TrainSearchResultComponent, data: {depth: 2}},
      { path: '', redirectTo: '/home', pathMatch: 'full'}
    ])
  ],
  providers: [UserService, FlightService, DataService, HotelService, CarService, TrainService, AuthGuardService, DashboardService, OnlyLoggedInUsersGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
