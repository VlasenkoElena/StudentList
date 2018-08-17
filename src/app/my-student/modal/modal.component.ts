import { Component, OnInit, Inject } from '@angular/core';
import { MyStudentComponent } from '../my-student.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { Courses } from '../../models/courses.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
student: Student;
courses: Courses[];

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<MyStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
      this.student = data;
    }

  editStudent(student: Student) { 
    let stud = this.student;
    console.log(stud);
    
    this.studentService.editStudent(stud)
     .subscribe((data: Student) => {
       let editSt = new Student (
         data.name,
         data.lastName,
         data.courses,
         data.id
       )
       console.log(editSt);
       this.dialogRef.close(); 
     })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.studentService.getStudentCours()
    .subscribe((courses: Courses[]) => {
      console.log(courses);  
      this.courses = courses;
  })
 }
}
