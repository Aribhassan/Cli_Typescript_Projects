#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
async function startGame() {
    console.log(chalk.bgGreen("Welcome to the Cave Adventure Game!"));
    const firstOption = await inquirer.prompt([
        {
            type: 'list',
            name: 'direction',
            message: chalk.yellow(' \n You are at the entrance of a dark cave. where u wanna go left or right?'),
            choices: ['Left', 'Right'],
        },
    ]);
    if (firstOption.direction === 'Left') {
        const leftChoice = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: chalk.yellow('\n If you go to the left, you find a river there. Do you wanna cross it or walk along it?'),
                choices: ['Cross', 'Walk along'],
            },
        ]);
        if (leftChoice.action === 'Cross') {
            console.log(chalk.red('\n You try to cross the river, but the current is too strong. You get swept away and the game ends.'));
            let restartingGame = await inquirer.prompt({
                name: "restart", type: "confirm", default: "yes", message: "Try again?"
            });
            if (restartingGame.restart) {
                startGame();
            }
        }
        else {
            console.log(chalk.green('\n You walk along the river and find a hidden treasure. You win!'));
        }
    }
    else {
        const rightChoice = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: chalk.yellow('\n You walk to the right and encounter a sleeping dragon. Do you want to sneak past it or attack it?'),
                choices: ['Sneak past', 'Attack'],
            },
        ]);
        if (rightChoice.action === 'Sneak past') {
            console.log(chalk.green('\n You successfully sneak past the dragon and find an exit. You win!'));
        }
        else {
            console.log(chalk.red('\n You try to attack the dragon, but it wakes up and breathes fire. You lose.'));
            let restartingGame = await inquirer.prompt({
                name: "restart", type: "confirm", default: "yes", message: "Try again?"
            });
            if (restartingGame.restart) {
                startGame();
            }
        }
    }
}
startGame();
