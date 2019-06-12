//* Create a new Node application called `bamazonManager.js`. Running this application will:
var inquirer = require("inquirer");
var mysql = require("mysql");


//  * List a set of menu options:
//    * View Products for Sale 
//    * View Low Inventory   
//    * Add to Inventory
//    * Add New Product
inquirer.prompt([
    {
        type:"choices",
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

}

//  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function lowInventory(){

}

//  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory(){

}

//  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProduct(){

}