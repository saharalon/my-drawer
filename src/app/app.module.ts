import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { MatButtonModule } from '@angular/material/button';
import { DndModule } from 'ngx-drag-drop';
import { DrawingService } from './services/drawing.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DndModule,
    MatSnackBarModule
  ],
  providers: [
    DrawingService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
