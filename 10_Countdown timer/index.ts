#! /usr/bin/env node

import inquirer from "inquirer";


// Main function to prompt user and start countdown
const startCountdown = async () => {
    const answers = await inquirer.prompt([
      {
        type: 'number',
        name: 'seconds',
        message: 'Enter the number of seconds for the countdown:',
        validate: (input) => {
          if (isNaN(input) || input <= 0) {
            return 'Please enter a positive number.';
          }
          return true;
        }
      }
    ]);

// Function to perform the countdown
const countdown = (seconds: number) => {
  const interval = setInterval(() => {
    if (seconds > 0) {
        process.stdout.write(`\r Time left: ${seconds--}sec`);
    } else {
      clearInterval(interval);
      console.log('\nTime\'s up!');
    }
  }, 1000);
};
countdown(answers.seconds);
}
startCountdown();

