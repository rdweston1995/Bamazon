require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: keys.key.password,
    database: 'bamazon' 
 });

connection.connect(function(err){
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    menu();
})

// menu();
//3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:
function menu(){
    inquirer.prompt([
        {
            type: 'list',
            message:'Menu Options:',
            choices: ['View Departments', 'View Product Sales by Department', 'Create New Department', 'Exit'],
            name: 'menuInput'
        }
    ]).then(function(res){
        switch(res.menuInput){
            // View all the departments
            case 'View Departments':
                viewDepartments();
                break;
            // View Product Sales by Department
            case 'View Product Sales by Department':
                viewSales();
                break;
            // Create New Department
            case 'Create New Department':
                newDepartment();
                break;
            case 'Exit':
                exit();
                break;
        }
    });
}

function viewDepartments(){
    var query = "SELECT * FROM departments";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.table(res);
        menu();
    });
}

//4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. 
//   Use the table below as a guide.
function viewSales(){
    //var query = "SELECT products.total_sales FROM products INNER JOIN departments ON products.department_name=departments.department_name"
    //var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs FROM departments INNER JOIN products ON products.department_name=departments.department_name GROUP BY department_name";
    var query = "SELECT * FROM departments";
    //var query = "SELECT products.total_sales FROM products INNER JOIN departments ON products.department_name=departments.department_name";
    connection.query(query, function(err, res){
        if(err) throw err;
        var query = "SELECT total_sales FROM products GROUP BY department_name";
        console.log("| department_id | department_name \t| over_head_costs | product_sales | total_profit |");
        console.log("| ------------- | --------------------- | --------------- | ------------- | ------------ |")
        connection.query(query, function(err, response){
            if(err) throw err;
            for(ele in res){
                var total_profit = response[ele].total_sales - res[ele].over_head_costs;

                if(res[ele].department_name.length < 6){
                    console.log("| " + res[ele].department_id + "\t\t| " + res[ele].department_name + "\t\t\t| $" + res[ele].over_head_costs+"\t  | $" + response[ele].total_sales + "\t  | $" + total_profit + "\t |");
                }else if(res[ele].department_name.length < 12){
                    console.log("| " + res[ele].department_id + "\t\t| " + res[ele].department_name + "\t\t| $" + res[ele].over_head_costs+"\t  | $" + response[ele].total_sales + "\t  | $"+ total_profit + "\t |");
                }else{
                    console.log("| " + res[ele].department_id + "\t\t| " + res[ele].department_name + "\t| $" + res[ele].over_head_costs+"\t  | $" + response[ele].total_sales + "\t  | $"+ total_profit + "\t |");
                }
            }
            //console.log("test");
            //exit();
            //connection.end();
            menu();
        })
    });
}

//5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` 
//   should not be stored in any database. You should use a custom alias.

//6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

//   * Hint: You may need to look into aliases in MySQL.

//   * Hint: You may need to look into GROUP BYs.

//   * Hint: You may need to look into JOINS.

//   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

function newDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Department ID: ',
            name: 'id'
        },{
            type: 'input',
            message: 'Department Name: ',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Over head costs: ',
            name: 'overHeadCosts'
        }
    ]).then(function(res){
        console.log(res);
        var query = "INSERT INTO departments(department_id, department_name, over_head_costs) VALUES(" + res.id + ", '" + res.name + "', " + res.overHeadCosts + ")";
        console.log(query);
        connection.query(query, function(err, res){
            if(err) throw err;
            console.log(res.afftedRows + " row updated\n");
            menu();
        })
    })
}

function exit(){
    console.log("=============== EXITING ===============");
    connection.end();
}

