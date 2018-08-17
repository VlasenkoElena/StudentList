export class Student {
    name: string;
    lastName: string;
    courses: [number];
    coursesStrings: string[] = [];
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