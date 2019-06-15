var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Robobutt23!',
    database: 'bamazon' 
 });

 menu();
//3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:
function menu(){
    inquirer.prompt([
        {
            type: 'list',
            message:'Menu Options:',
            choices: ['View Product Sales by Department', 'Create New Department', 'Exit'],
            name: 'menuInput'
        }
    ]).then(function(res){
        switch(res.menuInput){
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
   

//4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. 
//   Use the table below as a guide.
function viewSales(){

}
//| department_id | department_name | over_head_costs | product_sales | total_profit |
//| ------------- | --------------- | --------------- | ------------- | ------------ |
//| 01            | Electronics     | 10000           | 20000         | 10000        |
//| 02            | Clothing        | 60000           | 100000        | 40000        |

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
        })
    })
}

function exit(){
    console.log("=============== EXITING ===============");
    connection.end();
}