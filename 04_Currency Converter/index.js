#! /usr/bin/env node
import inquirer from "inquirer";
async function restart() {
    const currency = {
        USD: 1,
        PKR: 278,
        RUB: 90.33,
        GBP: .79,
        INR: 83.32,
    };
    let userInput = await inquirer.prompt([
        {
            name: "baseCurrency", type: "list", message: "Enter Currency:", choices: ["USD", "PKR", "RUB", "GBP", "INR"]
        },
        {
            name: "convertingCurrency", type: "list", message: "Enter Converting Currency:", choices: ["USD", "PKR", "RUB", "GBP", "INR"]
        },
        {
            name: "amount", type: "number", message: "Enter Amount"
        }
    ]);
    if (userInput.amount !== Number) {
        let fromAmount = currency[userInput.baseCurrency];
        let toAmount = currency[userInput.convertingCurrency];
        let amount = userInput.amount;
        let baseAmount = amount / fromAmount;
        let exchangeAmount = baseAmount * toAmount;
        console.log(exchangeAmount);
    }
    else {
        console.log("u need to insert amount");
    }
    let restarting = await inquirer.prompt([{
            name: "restart", type: "confirm", default: "yes", message: "try again?"
        }]);
    if (restarting.restart) {
        restart();
    }
}
restart();
