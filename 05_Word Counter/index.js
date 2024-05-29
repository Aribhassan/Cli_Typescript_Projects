#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgBlue("---------------------WELCOME---------------------"));
async function restart() {
    let user = await inquirer.prompt([{
            name: "sentence", type: "input", message: chalk.yellow("type or paste your text here")
        }]);
    let wordCount = user.sentence.split(' ');
    console.log(`words: ${wordCount.length}`);
    let confirming = await inquirer.prompt([{
            name: "confirm", type: "confirm", default: "yes", message: chalk.yellow("count words again?")
        }]);
    if (confirming.confirm) {
        restart();
    }
}
restart();
