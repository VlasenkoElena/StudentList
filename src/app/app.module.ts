import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material'


import { AppComponent } from './app.component';
import { MyStudentComponent } from './my-student/my-student.component';
import { FormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { StudentService } from './services/student.service';
import { ModalComponent } from './my-student/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MyStudentComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ],
  entryComponents: [ModalComponent],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
