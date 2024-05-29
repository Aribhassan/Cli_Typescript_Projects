#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
class Learner {
    fullName;
    constructor(fullName) {
        this.fullName = fullName;
    }
}
class Educator {
    learners = [];
    registerLearner(learner) {
        this.learners.push(learner);
    }
}
const educator = new Educator();
const initiateProgram = async (educator) => {
    console.log(chalk.bold.green('\t Welcome'));
    while (true) {
        const { option } = await inquirer.prompt({
            type: 'list',
            name: 'option',
            message: 'Whom do you wish to speak with or exit?',
            choices: ['Instructor', 'Learner', 'Exit']
        });
        switch (option) {
            case 'Instructor':
                console.log(chalk.green('You are now conversing with the Instructor.'));
                console.log(chalk.yellow('How can I assist you today?'));
                break;
            case 'Learner':
                const { learnerName } = await inquirer.prompt({
                    type: 'input',
                    name: 'learnerName',
                    message: 'Enter the name of the learner you wish to speak with:'
                });
                let currentLearner = educator.learners.find(learner => learner.fullName === learnerName);
                if (!currentLearner) {
                    currentLearner = new Learner(learnerName);
                    educator.registerLearner(currentLearner);
                    console.log(chalk.yellow(`Hello, I'm ${chalk.bold.green(currentLearner.fullName)}, pleased to meet you.`));
                }
                else {
                    console.log(chalk.yellow(`Hello again, I'm ${chalk.bold.green(currentLearner.fullName)}, how can I help you?`));
                }
                break;
            case 'Exit':
                console.log(chalk.bold.magenta('seeyh soon!'));
                process.exit();
        }
    }
};
initiateProgram(educator);
