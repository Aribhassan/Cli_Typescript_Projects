#! /usr/bin/env node
import inquirer from "inquirer";
const questions = [
    {
        type: 'list',
        name: 'question1',
        message: ' \n What company was originally called "Cadabra?',
        choices: ['Amazon', 'google', 'paypal', 'microsoft'],
        answer: 'Amazon'
    },
    {
        type: 'list',
        name: 'question2',
        message: '\n How many ghosts are chasing Pac-Man at the start of each game?',
        choices: ['4', '8', '5', '1'],
        answer: '4'
    },
    {
        type: 'list',
        name: 'question3',
        message: '\n What game studio makes the Red Dead Redemption series?',
        choices: ['Rockstar game', 'Epic games', 'Ocean games', 'Unity'],
        answer: 'Rockstar game'
    }
];
let score = 0;
async function askQuestions() {
    for (const question of questions) {
        const { answer } = await inquirer.prompt([{
                type: question.type,
                name: 'answer',
                message: question.message,
                choices: question.choices
            }]);
        if (answer === question.answer) {
            score++;
        }
    }
    console.log(`Your Score: ${score} out of ${questions.length}`);
}
askQuestions();
