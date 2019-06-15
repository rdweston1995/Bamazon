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
 menu();
//  * List a set of menu options:
//    * View Products for Sale 
//    * View Low Inventory   
//    * Add to Inventory
//    * Add New Product
function menu(){
    inquirer.prompt([
        {
            type:"list",
            message:"Menu Options:",
            choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
            name: "input"
        }
    ]).then(function(response){
        //console.log(response.input);
    
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
            case 'Exit':
                exit();
                break;
        }
    });
}


//  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function products(){
    console.log("=============== AVAILABLE PRODUCTS ===============");
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        if(err) throw err;
        for (ele in res){
            console.log("-------------------------------------------------");
            console.log("| ID:\t" + res[ele].item_id + "\t || Name:\t" + res[ele].product_name + "\n| Price: $" + res[ele].price + "\t || Quantity:\t" + res[ele].stock_quantity + "");    
        }
        //connection.end();
        menu();
    });
}

//  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function lowInventory(){
    console.log("=============== LOW INVENTORY ===============");
    var query = ("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5");
    connection.query(query, function(err, res){
        if(err) throw err;
        //console.log(res);
        console.log("-------------------------------------------------");
        console.log("| ID:\t" + res[0].item_id + "\t || Name:\t" + res[0].product_name +"\n| Price: $" + res[0].price + "\t || Quantity:\t" + res[0].stock_quantity)
        //connection.end();
        menu();
    });
}

//  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory(){
    console.log("=============== ADD NEW INVENTORY ===============");
    inquirer.prompt([
        {
            type: 'input',
            message: 'What product are you adding inventory too? (ID) ',
            name: 'id'
        },{
            type: 'input',
            message: 'How much product are you adding? ',
            name: 'newProduct'
        }
    ]).then(function(res){
        var query = "SELECT * FROM products WHERE ?"
        connection.query(query, {item_id: res.id}, function(err, response){
            if(err) throw err;
            var newProductTotal = parseInt(res.newProduct) + response[0].stock_quantity;
            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [{stock_quantity: newProductTotal},{item_id: res.id}], function(err, response){
                if(err) throw err;
                console.log(response.affectedRows + " products updated!\n");
            });
            //connection.end();
            menu();
        })
    })
}

//  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProduct(){
    console.log("=============== ADD NEW PRODUCT ===============");
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
    ]).then(function(res){
        var query = "INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES(" + parseInt(res.item_id) + "," + res.product_name + ",'" + res.department + "'," + parseFloat(res.price) + "," + parseInt(res.stock_quantity) + ")";
        console.log(query);
        connection.query(query, function(err, res){
            if(err) throw err;
            console.log(res);
            //connection.end();
            menu();
        })
    })
    
}

function exit(){
    console.log("=============== EXITING ===============");
    connection.end();
}