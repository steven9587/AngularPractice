import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './manage/todo/todo.component';
import { HeaderComponent } from './manage/todo/header/header.component';
import { SectionComponent } from './manage/todo/section/section.component';
import { FooterComponent } from './manage/todo/footer/footer.component';
import { TodoInfoModalComponent } from './manage/todo/section/todo-info-model/todo-info-modal.component';
import { MenuComponent } from './shared/menu/menu.component';
import { Header2Component } from './shared/header2/header2.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './manage/home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
    TodoInfoModalComponent,
    MenuComponent,
    Header2Component,
    HomeComponent,
    NotfoundComponent,
    LoginComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
