import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './textbox/text.component';
import { LoaderComponent } from './loader/loader.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TextComponent,
    LoaderComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, ButtonComponent,TextComponent, LoaderComponent,FormComponent]
})
export class AppModule { }