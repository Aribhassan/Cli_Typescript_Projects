#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

class Student {
  private static idCounter = 10000;
  public name:string;
  public id: string;
  public courses: Course[];
  public balance: number;
  private static generateStudentID(): string {
    return (this.idCounter++).toString();
  }

  constructor( name: string) {
    this.name = name
    this.id = Student.generateStudentID();
    this.courses = [];
    this.balance = 0;
  }

  enroll(course: Course) {
    this.courses.push(course);
    this.balance += course.fee;
  }

  viewBalance(): number {
    return this.balance;
  }

  payTuition(amount: number) {
    if (amount > this.balance) {
      console.log(chalk.green(`Paid amount exceeds the balance. Current balance is ${this.balance}` ))
    } else {
      this.balance -= amount;
      console.log(chalk.green(`Payment successful! Remaining balance is ${this.balance}`))
    }
  }

  showStatus() {
    console.log("------------------------------------");
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Courses Enrolled: ${this.courses.map(course => course.name).join(", ")}`);
    console.log(`Balance: ${this.balance}`);
    console.log("------------------------------------");
  }
}

interface Course{
  name: string,
  fee: number
};

class StudentManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [
    { name: "AI", fee: 500 },
    { name: "Web Development", fee: 500 },
    { name: "Graphic Designing", fee: 500 }
  ];

  addStudent(name: string): Student {
    const student = new Student(name);
    this.students.push(student);
    return student;
  }

  findStudentByID(id: string): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  enrollStudent(id: string, courseName: string) {
    const student = this.findStudentByID(id);
    if (!student) {
      console.log(chalk.bgRed("Student not found!"));
      return; 
    }
    const course = this.courses.find(course => course.name === courseName);
    if (!course) {
      console.log(chalk.bgRed("Student not found!"));
      return;
    }
    student.enroll(course);
    console.log(`Enrolled in course: ${courseName}`);
  }

  viewStudentBalance(id: string) {
    const student = this.findStudentByID(id);
    if (!student) {
      console.log(chalk.bgRed("Student not found!"));
      return;
    }
    console.log(`Balance for student ${id}: ${student.viewBalance()}`);
  }

  payStudentTuition(id: string, amount: number) {
    const student = this.findStudentByID(id);
    if (!student) {
      console.log(chalk.bgRed("Student not found!"));
      return;
    }
    student.payTuition(amount);
  }

  showStudentStatus(id: string) {
    const student = this.findStudentByID(id);
    if (!student) {
      console.log(chalk.bgRed("Student not found!"));
      return;
    }
    student.showStatus();
  }

  async start() {
    while (true) {
      let {system} = await inquirer.prompt({
        name: 'system', type: 'list', message: 'Choose the option:', choices: [
          'Add Student',
          'Enroll Student in Course',
          'View Student Balance',
          'Pay Tuition Fees',
          'Show Student Status',
          'Exit'
        ]
      });

      switch (system) {
        case 'Add Student':
          await this.handleAddStudent();
          break;
        case 'Enroll Student in Course':
          await this.handleEnrollStudent();
          break;
        case 'View Student Balance':
          await this.handleViewStudentBalance();
          break;
        case 'Pay Tuition Fees':
          await this.handlePayTuitionFees();
          break;
        case 'Show Student Status':
          await this.handleShowStudentStatus();
          break;
        case 'Exit':
          console.log(chalk.red('Exited'));
          return;
      
    }
  }
}

  async handleAddStudent() {
    const  {name}  = await inquirer.prompt({
      name: 'name',
      type: 'input',
      message: 'Enter student name:'
    });
    const student = this.addStudent(name);
    console.log(`Student added with ID: ${student.id}`);
  }

  async handleEnrollStudent() {
    const {id} = await inquirer.prompt({
      name: 'id',
      type: 'input',
      message: 'Enter student ID:'
    });

    const {courseName} = await inquirer.prompt({
      name: 'courseName',
      type: 'list',
      message: 'Select course to enroll:',
      choices: this.courses.map(course => course.name)
    });

    this.enrollStudent(id, courseName);
  }

  async handleViewStudentBalance() {
    const {id} = await inquirer.prompt({
      name: 'id',
      type: 'input',
      message: 'Enter student ID:'
    });

    this.viewStudentBalance(id);
  }

  async handlePayTuitionFees() {
    const { id } = await inquirer.prompt({
      name: 'id',
      type: 'input',
      message: 'Enter student ID:'
    });

    const { amount } = await inquirer.prompt({
      name: 'amount',
      type: 'input',
      message: 'Enter amount to pay:',
      validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a valid amount'
    });

    this.payStudentTuition(id, parseFloat(amount));
  }

  async handleShowStudentStatus() {
    const { id } = await inquirer.prompt({
      name: 'id',
      type: 'input',
      message: 'Enter student ID:'
    });

    this.showStudentStatus(id);
  }
}

// Start the system
const sys = new StudentManagementSystem();
sys.start();



