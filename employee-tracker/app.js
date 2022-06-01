const inquirer = require('inquirer');
const db = require('./db/index');
require('console.table');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

const departmentArr = [];

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
                'Exit',
            ]
        }
    ])
        .then(chosenOption => {
            switch (chosenOption.workOption) {
                case 'View all departments':
                    viewDepartments();
                    break;
                
                case 'View all roles':
                    viewRoles();
                    break;
                
                case 'View all employees':
                    viewEmployees();
                    break;
                
                case 'Add a department':
                    addDepartment();
                    break;
                
                case 'Add a role':
                    addRole;
                    break;
                
                case 'Add an employee':
                    addEmployee();
                    break;
                
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
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
    
    
};

const viewEmployees = () => {

    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees)
        })
    .then(()=> workPrompt() )
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the department name(Required)',
            validate: departmentNameInput => {
                if (departmentNameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(departmentInput =>{ 

        db.addDepartment(departmentInput)
            .then(() => console.log(`Added ${departmentInput.name} to the database successfully!`))
            .then(() => workPrompt())  
             
    })
    
};

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;

            console.log("EMPLOYEESSS", employees)

            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([{
                type: "list",
                name: 'employeeId',
                message: "What employee's role would you like to update?",
                choices: employeeChoices
            }])
                .then((answer) => {
                    let employeeId = answer.employeeId;

                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;

                            const roleChoices = roles.map(({ title, id }) =>({
                                name: title,
                                value: id
                            }))

                            inquirer.prompt([{
                                type: "list",
                                name: "roleId",
                                message: "What role would you like to assign this employee?",
                                choices: roleChoices
                            }])
                                .then((answer) => {
                                    let roleId = answer.roleId
                                    
                                    db.updateEmployeeRole(employeeId, roleId)
                                        .then(() => console.log(`Updated the employee's role successfully!`))
                                        .then(()=> workPrompt())
                            })
                    })

            })
    })
}

workPrompt();

