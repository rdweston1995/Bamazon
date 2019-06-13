//* Create a new Node application called `bamazonManager.js`. Running this application will:
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Robobutt23!',
    database: 'bamazon' 
 });
//  * List a set of menu options:
//    * View Products for Sale 
//    * View Low Inventory   
//    * Add to Inventory
//    * Add New Product
inquirer.prompt([
    {
        type:"list",
        message:"Menu Options:",
        choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
        name: "input"
    }
]).then(function(response){
    console.log(response.input);

    //Switch to get the user response and call the appropriate 
    switch(response.input){
        case 'View Products for Sale':
            products();
            break;
        case 'View Low Inventory':
            lowInventory();
            break;
        case 'Add to Inventory':
            addInventory();
            break;
        case 'Add New Product':
            addProduct();
            break;
    }
});

//  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function products(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        if(err) throw err;
        for (ele in res){
            console.log("| ID:\t" + res[ele].item_id + "\t || Name:\t" + res[ele].product_name + "\n| Price: $" + res[ele].price + "\t || Quantity:\t" + res[ele].stock_quantity);
            console.log("-------------------------------------------------\n");
        }
    });
}

//  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function lowInventory(){
    var query = ("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5");
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log(res);
        connection.end();
    });
}

//  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory(){
    
}

//  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProduct(){
    inquirer.prompt([
        {
            type:"input",
            message:"Product ID",
            name: "item_id"
        },{
            type:"input",
            message:"Product Name",
            name: "product_name"
        },{
            type:"input",
            message:"Department",
            name:"department"
        },{
            type:"input",
            message:"Price: $",
            name:"price"
        },{
            type:"input",
            message:"stock_quantity",
            name:"stock_quantity"
        }
    ]).then(function(err, res){
        if(err) throw err;
        var query = "INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES(" + res[0].item_id + "," + res[0].product_name + "," + res[0].department + "," + res[0].price + "," + res[0].stock_quantity + ")";
        console.log(query);
        connection.query(query, function(err, res){
            if(err) throw err;
            console.log(res);
        })
    })
}