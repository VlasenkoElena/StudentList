import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import { MatDialog } from '../../../node_modules/@angular/material';
import { ModalComponent } from './modal/modal.component';
import { Courses } from '../models/courses.model';



@Component({
  selector: 'app-my-student',
  templateUrl: './my-student.component.html',
  styleUrls: ['./my-student.component.css']
})
export class MyStudentComponent implements OnInit {

  students: Student[];
  courses: Courses[];
  studentName: string = '';
  studentLastName: string = '';  
  student: Student;

  constructor(private studentService: StudentService,
              public dialog: MatDialog) { }

  openDialog(idx): void {
    const dialogRef = this.dialog.open( ModalComponent, {
      width: '250px',
      data: [this.students[idx], this.courses] 
    });

    dialogRef.afterClosed().subscribe(result => {
       this.getStudent();
    });
  }

  ngOnInit() {
   this.getStudent();
  }

  getStudent() {
    this.studentService.getStudentsList()
    .subscribe((students: Student[]) => {
      this.students = students;
      this.getCourses();
    });
  }
  getCourses() {
    this.studentService.getStudentCours()
    .subscribe((courses: Courses[]) => {
      console.log(courses);  
      this.courses = courses;
      this.addStudentCourses();
    })
  }

  onSubmit(form: NgForm) {
   console.log(form);
   
    const student = new Student(
      form.value.studentName,
      form.value.studentLastName,
      [form.value.idCourse]    
    )
    console.log(form.value.idCourse);
    
    this.studentService.addStudentToList(student)
     .subscribe((data: Student) => {
      let myStudent = new Student(
        data.name,
        data.lastName,
        data.courses,
        data.id);
        this.students.push(myStudent);
        this.addStudentCourses();
      });
     form.setValue({
       studentName: '',
       studentLastName: '',
       idCourse: ''
     });
  }

  addStudentCourses() {
    this.students.forEach(student => {
      //console.log(student);
      student.courses.forEach(idCourse => {
        this.courses.forEach(course => {
          //console.log(course);
          if (idCourse === course.id) {
            student.coursesObj.push(course);
            console.log(this.students);
          }
        })
      })
    })
  }

  delStudent(idx) {
    let studentIdx =  this.students[idx];
    this.studentService.deleteStudent(studentIdx)
    .subscribe(data => {
      console.log(data);
      this.students.splice(idx, 1);
    }); 
  }
}
