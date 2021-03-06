require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");


//console.log(keys);

//5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.
var connection = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: keys.key.password,
   database: 'bamazon' 
});

var query = "SELECT * FROM products";
connection.query(query, function(err, res){
    if(err) throw err;

    console.table(res);

    pickProduct();
});
//6. The app should then prompt users with two messages.
function pickProduct(){
    inquirer.prompt([
        //   * The first should ask them the ID of the product they would like to buy.
        {
            type: 'input',
            message: 'Using the product ID.\n  What product would you like to buy?',
            name: 'id'
        },
        //   * The second message should ask how many units of the product they would like to buy.
        {
            type: 'input',
            messsage: 'How many units would you like to buy?',
            name: 'quantity'
        }
    ]).then(function(response){
        //console.log(response.id + " || " + response.quantity);
        //console.log(parseInt(response.quantity));
        doWeHaveEnough(response.id, parseInt(response.quantity));
    });
}

//7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
function doWeHaveEnough(id, quantity){
    //console.log(quantity);
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {item_id: id}, function(err, res){
        if(err) throw err;
        //console.log(res[0].stock_quantity);
        if(res[0].stock_quantity >= quantity){
            purchase(id, quantity, res[0].stock_quantity, res[0].price);
        }else{
            // If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
            //console.log(res.stock_quantity + " || " + quantity);
            console.log("Insufficient quantity!");
            connection.end();
        }
    });    

}
//8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
function purchase(id, quantity, stockQuantity, price){
    var updatedQuantity = stockQuantity - quantity;
    var query = "UPDATE products SET ? WHERE ?";
    //   * This means updating the SQL database to reflect the remaining quantity.
    connection.query(query, 
        [{
            stock_quantity: updatedQuantity
        },{
            item_id: id
        }], function(err, res){
        if(err) throw err;
        //   * Once the update goes through, show the customer the total cost of their purchase.
        console.log("Total Cost: $" + (price * quantity));
        //2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases 
        //   anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

        //   * Make sure your app still updates the inventory listed in the `products` column.
        var initSalesQuery = "SELECT * FROM products WHERE ?";
        connection.query(initSalesQuery, {item_id: id}, function(err, res){
            if(err) throw err;
            var totalSales = res[0].total_sales + (price * quantity);
            var updateSalesQuery = "UPDATE products SET ? WHERE ?";
            connection.query(updateSalesQuery,
                [{
                    total_sales: totalSales
                }, {
                    item_id: id
                }], function(err, res){
                    if(err) throw err;
                    //console.log(res.affectedRows + " updated row\n");
                    connection.end();
                });
        });
        
        
    });
    
}

