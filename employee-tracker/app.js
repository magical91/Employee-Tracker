const inquirer = require('inquirer');
const db = require('./db/index');
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
                    addRole();
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
    
    db.viewDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
    workPrompt();
};

const viewRoles = () => {
    
    db.viewRoles()
        .then(([rows]) => {
            let jobTitle = rows;
            console.table(jobTitle);
        })
    workPrompt();
}

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
                    console.log(departmentNameInput)
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter the department description(Required)',
            validate: departmentTextInput => {
                if (departmentTextInput) {
                    console.log(departmentTextInput)
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
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role name(Required)',
            validate: rolePrompt => {
                if (rolePrompt) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the role salary(Required)',
            validate: rolePrompt => {
                if (rolePrompt) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(roleInput => {
        const roleTitle = roleInput.title;
        const roleSalary = roleInput.salary;

        db.viewDepartments()
            .then(([rows]) => {
                let departments = rows;

                const departmentChoices = departments.map(({ name, id }) => ({
                    name: name,
                    value: id
                }))

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'What department does this role belong to?(Required)',
                        choices: departmentChoices
                    }
                ])
                    .then((departmentChoice) => {
                        let role = {
                            title: roleTitle,
                            salary: roleSalary,
                            department_id: departmentChoice.department_id
                        }
                    
                        db.addRole(role)
                            .then(() => console.log(`Added ${roleInput.name} to the database successfully!`))
                            .then(() => workPrompt())

                    })
            })


    })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employee first name(Required)',
            validate: rolePrompt => {
                if (rolePrompt) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employee last name(Required)',
            validate: rolePrompt => {
                if (rolePrompt) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(employeeInput => {
        const employeeFirstName = employeeInput.first_name;
        const employeeLastName = employeeInput.last_name;
        db.viewRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ title, id }) => ({
                    name: title,
                    value: id
                }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'What role does this employee have?(Required)',
                        choices: roleChoices
                    }
                ])
                    .then((roleChoice) => {
                        let roleId = roleChoice.role_id;
                        db.findAllEmployees()
                            .then(([rows]) => {
                                let employees = rows;
                                const employeeChoices = employees.map(({ first_name, last_name, id }) => ({
                                    name: `${first_name} ${last_name}`,
                                    value: id
                                }))
                                inquirer.prompt([
                                    {
                                        type: 'list',
                                        name: 'manager_id',
                                        message: 'Who is this employee manager?(Required)',
                                        choices: employeeChoices
                                    }
                                ]).then((managerChoice) => {
                                    const employee = {
                                        first_name: employeeFirstName,
                                        last_name: employeeLastName,
                                        role_id: roleId,
                                        manager_id: managerChoice.manager_id
                                    }
                                    db.addEmployee(employee)
                                        .then(() => console.log(`Added ${employeeFirstName} to the database successfully!`))
                                        .then(() => workPrompt())
                                })
                            })
                    })
            })
    })
}

const updateEmployeeRole = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;

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

