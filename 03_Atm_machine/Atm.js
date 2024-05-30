#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let balance = 10000;
let myPin = 1255;
let inputPin = await inquirer.prompt([
    {
        message: chalk.blueBright("\nEnter pin number (pass:1255)"), type: "number", name: "askForPin"
    }
]);
if (inputPin.askForPin === myPin) {
    console.log(chalk.green("\n login successfully"));
    let inputOption = await inquirer.prompt([
        {
            message: chalk.blueBright("\nServices"), type: "list", choices: ["balance_inquiry", "withdrawal", "Transfer"], name: "Services"
        },
    ]);
    if (inputOption.Services === "balance_inquiry") {
        console.log(chalk.greenBright("\n balance: $"), chalk.yellow(balance));
    }
    else if (inputOption.Services === "withdrawal") {
        let askingWithdrawalAmount = await inquirer.prompt([
            {
                message: chalk.blueBright("\nEnter Withdrawal Amount:"), type: "number", name: "Withdrawal_Amount"
            }
        ]);
        let WithdrawalAmount = askingWithdrawalAmount.Withdrawal_Amount;
        if (askingWithdrawalAmount.Withdrawal_Amount < balance) {
            console.log(chalk.greenBright("\n Now your balance after withdrawal: $"), chalk.yellow(balance - askingWithdrawalAmount.Withdrawal_Amount));
        }
        else {
            console.log(chalk.red("\n Insufficient funds. Your current balance is $"), chalk.yellow(balance));
        }
    }
    else if (inputOption.Services === "Transfer") {
        let askingAccountNumber = await inquirer.prompt([
            {
                message: chalk.blueBright("\nEnter Account Number"), type: "number", name: "Account_Number"
            }
        ]);
        let accountNumber = askingAccountNumber.Account_Number;
        if (accountNumber !== "") {
            let amountForTransaction = await inquirer.prompt([
                { message: chalk.blueBright("\nEnter amount"), type: "number", name: "Transaction_Amount" }
            ]);
            let transactionAmount = amountForTransaction.Transaction_Amount;
            if (amountForTransaction.Transaction_Amount < balance) {
                console.log(chalk.greenBright("\n now your balance is: $"), chalk.yellow(balance - amountForTransaction.Transaction_Amount), chalk.greenBright("\n accountNumber: "), chalk.yellow(accountNumber), chalk.greenBright("\n transactionAmount: $"), chalk.yellow(transactionAmount));
            }
            else {
                console.log(chalk.red("\n Insufficient funds. Your current balance is $"), chalk.yellow(balance));
            }
        }
        else {
            console.log(chalk.red("Invalid account number. Please try again."));
        }
    }
    else {
        console.log(chalk.red("Invalid Pin"));
    }
}
