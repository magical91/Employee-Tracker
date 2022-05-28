const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

const workPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'workOption',
            message: 'Choose an option',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
        .then(chosenOption => {
            if (chosenOption.workOption === 'View all departments') {
                return viewDepartments();
            };
            if (chosenOption.workOption === 'View all roles') {
                return viewRoles();
            };
            if (chosenOption.workOption === 'View all employees') {
                return viewEmployees();
            };
            if (chosenOption.workOption === 'Add a department') {
                return addDepartment();
            };
            if (chosenOption.workOption === 'Add a role') {
                return addRole();
            };
            if (chosenOption.workOption === 'Add an employee') {
                return addEmployee();
            };
            if (chosenOption.workOption === 'Update an employee role') {
                return updateEmployeeRole();
            };
    })
};

const viewDepartments = () => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, res) => {
        if (err) throw err
        console.log('Viewing Departments');
        console.table(res);
        return workPrompt();
    });
};

const viewRoles = () => {
    const sql = `SELECT role.*, department.name AS department_name
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
    
    db.query(sql, (err, res) => {
        if (err) throw err
        console.log('Viewing Roles');
        console.table(res);
        return workPrompt();
    });
};

const viewEmployees = () => {

}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}

workPrompt();

