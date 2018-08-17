import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';
import { Courses } from '../models/courses.model';

@Injectable()
export class StudentService {

  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}  
  constructor(private http: HttpClient) { }

  getStudentsList(): Observable<Student[]>{
    return this.http.get<Student[]>('https://immense-crag-96291.herokuapp.com/v1/student/')
    .pipe(map(data => {
      return data.map(student => {
        let myStudent = new Student(
             student.name,
             student.lastName,
             student.courses,
             student.id)
        return myStudent
      })
    }))
  } 
  
  getStudentCours(): Observable<Courses[]> {
    return this.http.get<Courses[]>('https://immense-crag-96291.herokuapp.com/v1/courses/')
    .pipe(map(data => {
      return data.map(courses => {
        let myCourses = new Courses(
             courses.name,
             courses.id)
        return myCourses
      })
    }))
  }

  addStudentToList(student: Student)  {
    let body = JSON.stringify(student);
    console.log(body);
     return this.http.post('https://immense-crag-96291.herokuapp.com/v1/student/', body, this.headers );
  }

  deleteStudent(studentIdx): Observable<any> {
  let studentId = studentIdx.id;
  console.log(studentId);
    return this.http.delete('https://immense-crag-96291.herokuapp.com/v1/student/'+`${studentId}/`,  this.headers);
  }

  editStudent(stud: Student){
    let studId = stud.id;
    let body = JSON.stringify(stud);
    return this.http.put('https://immense-crag-96291.herokuapp.com/v1/student/'+`${studId}/`, body, this.headers)
  }
}
