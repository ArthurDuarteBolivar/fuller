import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { SobreComponent } from '../../sobre/sobre.component';
import { FooterComponent } from '../../footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialExampleModule } from 'src/angular.material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from 'src/app/pages/module/pages/pages.module';
import { DialogComponent } from '../../dialog/dialog.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SobreComponent,
    FooterComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialExampleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PagesModule
  ],
  exports: [
    NavBarComponent,
    SobreComponent,
    FooterComponent,
  ],
})
export class ComponentsModule { }
