#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let numberGenerate = Math.floor(Math.random() * 10+1)

do {
    var input = await inquirer.prompt([
        {
            message: chalk.blueBright("guess correct number"), type: "number", name: "guessNumber"
        }
    ]);
    
    if (input.guessNumber === numberGenerate) {
        console.log(chalk.greenBright("you guess correct number"));
    } else {
        // console.log("you guess wrong. Try again");
        if (input.guessNumber > numberGenerate) {
            console.log(chalk.red("guess number is too high"));
        } else {
            console.log(chalk.red("guess number is low"));
        }
    }

    
} while (input.guessNumber !== numberGenerate);