const connection = require("./connection");

class Db {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id"
        )
    }

    findAllRoles() {
        return this.connection.promise().query(
            'SELECT * From role'
        )
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]
        );
    }

    viewDepartments() {
        return this.connection.promise().query(
            `SELECT * FROM department`
        )
    }

    viewRoles() {
        return this.connection.promise().query(
            `SELECT role.*, department.name AS department
            FROM role
            LEFT JOIN department ON role.department_id = department.id`
        )
    }

    addDepartment(department) {
        console.log("department making its way to db", department)
        return this.connection.promise().query(
            `INSERT INTO department SET ?`, department
        )
    };

    addRole(role) {
        return this.connection.promise().query(
            `INSERT INTO role SET ?`, role
        )
    };

    addEmployee(employee) {
        return this.connection.promise().query(
            `INSERT INTO employee SET ?`, employee
        )
    };
}

module.exports = new Db(connection)