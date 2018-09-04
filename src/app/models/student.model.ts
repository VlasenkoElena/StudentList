import { Courses } from "./courses.model";

export class Student {
    name: string;
    lastName: string;
    courses: [number];
    coursesObj: Courses[] = [];
    id?: number;

    constructor (name: string,
                 lastName: string,
                 courses: [number],
                 id?: number) {
        this.name = name;
        this.lastName = lastName;
        this.courses = courses;
        this.id = id;
    }
}