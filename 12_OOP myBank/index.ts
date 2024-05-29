#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"


class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    contact: number;
    accNumber: number;

    constructor(firstName: string, lastName: string, gender: string, age: number, contact: number, accNumber: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.contact = contact;
        this.accNumber = accNumber;
    }
}

// Bank class
class Bank {
    accountNum: number;
    balance: number;
    withdrawal: number;
    deposit: number;

    constructor(accountNum: number, initialBalance: number = 0, withdrawal: number = 0, deposit: number = 0) {
        this.accountNum = accountNum;
        this.balance = initialBalance;
        this.withdrawal = withdrawal;
        this.deposit = deposit;
    }

    deposits(amount: number): void {
        if (amount > 0) {
            let yourAmount = amount;
            if (amount > 100) {
                yourAmount -= this.deposit;
            }
            this.balance += yourAmount;
            console.log(`Deposited: $${amount}. New balance: $${this.balance}`);
        } else {
            console.log(chalk.bgRed('\n Deposit amount must be positive.'));
        }
    }

    withdraw(amount: number) {
        if (amount > 0 && amount <= this.balance) {
            let finalAmount = amount;
            if (amount > 100) {
                finalAmount += this.withdrawal;
            }
            this.balance -= finalAmount;
            console.log(chalk.yellow(`\n Withdrew: $${amount}. New balance: $${this.balance}`));
        } else {
            console.log(chalk.bgRed('\n Insufficient balance or invalid amount.'));
        }
    }

    checkBalance(): void {
        console.log(chalk.yellow(`\n Current balance: $${this.balance}`));
    }
}

const customers: { [key: number]: { customer: Customer, bank: Bank } } = {};

// Get a customer info 
async function customerInfo() {
    const info = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Enter your first name'
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter your last name'
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age',
            validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid age.')
        },
        {
            type: 'input',
            name: 'gender',
            message: 'Enter your gender'
        },
        {
            type: 'input',
            name: 'mobileNum',
            message: 'Enter your mobile number',
            validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid mobile number.')
        },
        {
            type: 'input',
            name: 'accNum',
            message: 'Enter your account number',
            validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid account number.')
        },
        {
            type: 'input',
            name: 'initialBalance',
            message: 'Enter the initial balance for the account',
            validate: (value) => !isNaN(value) && value >= 0 ? true : chalk.bgRed('\n Please enter a valid balance.')
        }
    ]);

    const customer = new Customer(info.firstname, info.lastname, info.gender, parseInt(info.age), parseInt(info.mobileNum), parseInt(info.accNum));
    const bank = new Bank(parseInt(info.accNum), parseFloat(info.initialBalance));

    console.log(chalk.bgGreen('\n Account created successfully!'));
    console.table(customer)
    console.log(`\n Welcome ${customer.firstName}, your current balance is: ${bank.balance}`);

    customers[customer.accNumber] = { customer, bank };

    return { customer, bank };
}

// main function 
async function strt() {
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Select One Option You Want To Perform',
                choices: ['Create Account', 'Deposit', 'Withdraw', 'Show Balance', 'Exit']
            }
        ]);

        if (choice === 'Create Account') {
            console.log('Fill Information To Create Account ');
            await customerInfo();
        } else if (choice === 'Deposit') {
            const { accNum } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'accNum',
                    message: 'Enter your Account Number',
                    validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid account number.')
                }
            ]);

            if (customers[accNum]) {
                const { amount } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter the amount to deposit',
                        validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid amount.')
                    }
                ]);
                customers[accNum].bank.deposits(parseFloat(amount));
            } else {
                console.log('Invalid Account number');
            }
        } else if (choice === 'Withdraw') {
            const { accNum } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'accNum',
                    message: 'Enter your Account Number',
                    validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid account number.')
                }
            ]);

            if (customers[accNum]) {
                const { amount } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter the amount to withdraw',
                        validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid amount.')
                    }
                ]);
                customers[accNum].bank.withdraw(parseFloat(amount));
            } else {
                console.log(chalk.bgRed('Invalid Account number'));
            }
        } else if (choice === 'Show Balance') {
            const { accNum } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'accNum',
                    message: 'Enter your Account Number',
                    validate: (value) => !isNaN(value) && value > 0 ? true : chalk.bgRed('\n Please enter a valid account number.')
                }
            ]);

            if (customers[accNum]) {
                customers[accNum].bank.checkBalance();
            } else {
                console.log(chalk.bgRed('\n Invalid Account number'));
            }
        } else if (choice === 'Exit') {
            console.log('\n \t thanks for using!');
            break;
        }
    }
}

strt();
