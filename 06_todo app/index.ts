#! /usr/bin/env node

import inquirer from "inquirer"

interface Todo {
    id: number;
    task: string;
}

let todos: Todo[] = [];
let idCounter = 1;

async function main() {
    while (true) {
        
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Todo', 'List Todos', 'Remove Todo', 'Exit']
        });

        if (action === 'Add Todo') {
            const { task } = await inquirer.prompt({
                type: 'input',
                name: 'task',
                message: 'Enter the task:'
            });
            todos.push({ id: idCounter++, task });
            console.log('\nTodo added.\n');
        } else if (action === 'List Todos') {
            console.log('Your todos:');
            todos.forEach(todo => {
                console.log(`\n${todo.id}: ${todo.task}\n`);
            });
        } else if (action === 'Remove Todo') {
            const { id } = await inquirer.prompt({
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the todo to remove:'
            });
            todos = todos.filter(todo => todo.id !== parseInt(id, 10));
            console.log('\nTodo removed.\n');
        } else if (action === 'Exit') {
            break;
        }
    }
}
console.log(`\n\t Welcome To Syed Arib TodoApp\n`)
main();
