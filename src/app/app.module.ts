import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService }       from './data-service.service';

import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FileUploadModule } from 'ng2-file-upload';
import { FiledetailComponent } from './filedetail/filedetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    FiledetailComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    FileUploadModule
  ],

  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

