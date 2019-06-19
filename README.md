# Bamazon

Deployment:
1. Clone repo
2. Run npm install
3. At command prompt running node and which file you want to run i.e. node bamazonCustomer

Screenshots

Technologies Used:
* NodeJS
* Javascript
* NPM inqurier
* NPM mysql
* SQL

Author:
* Robert Weston

Functionality:
* bamazonCustomer.js
    * Begins with a query to the SQL database to display the table of products that are available for purchase. Then will call pickProduct().
    * pickProduct()
        * Using inquirer will prompy the user for which product they want to purchase from the displayed table. Then will ask how many of that item that they want to purchase. Once both prompts are asked will call doWeHaveEnough() with the item number and quantity from the prompts as parameters.
    * doWeHaveEnough(id, quantity)
        * Makes a query to the SQL database to grab the specific item with the passed item id. Checks that item's stock quantity against the passed quantity to see if there's enough for the user to purchase. If there is then call product() passing the already passed id and quantity and the stock_quantity and price that was retrived with the database query. If theres not enough of the product it will notify the user and end the connection to the database.
    * purchase(id, quantity, stockQuantity, price)
        * Creates a new variable to called updatedQuantity that will store the value of the passed stockQuantity - quantity. Query the database by getting the stock_quantity of the passed id. Set the stock_quantity to be the updatedQuantity. Logs the total cost of the the quantity of the product that the user wants to purchase. Calls a new query to the database to update the total sales of that product adding the total cost from this users purchase. End the connection after the total sales has been updated.
* bamazonManager.js
    * menu()
        * First thing that will be run in this file. Using inquirer will prompt the user to choose from a list of opitions what they want to do. Runs a switch statement using the user response to then run a function that matches the corresponding response.
    * products()
        * Query the database to display a table of all the current available products. Calls menu() at the end of the query.
    * lowInventory()
        * Query the database looking for all items that are undering stock_quantity of 5. Displays all the items that fall in that search parameter. Calls menu() at the end of the query.
    * addInventory()
        * Using inquirer will prompt will ask what item id that they want to add to. Then will ask how much product they are wanting to add. Querys the database to select the product. Creates a new variable to add the current quantity to the amount being added to get the new total. Query the database again to update the stock_quantity to reflect the new current quantity. Calls menu() at the end of the query.
    * addProduct()
        * Using inqurier will prompt the user for the new item_id, product_name, department, price, and stock_quantity. Query the datebase to insert into the products table the new row that will store the user response. Calls menu() at the end of the query.
    * exit()
        * When the user is done viewing or editing the database then can exit the program and end their connection to the database.
* bamazonSupervisor.js
    * menu()
        * First thing that will be run in this file. Using inquirer will prompt the user to choose from a list of opitions what they want to do. Runs a switch statement using the user response to then run a function that matches the corresponding response. 
    * viewSales()
        * Work in progress.
    * newDepartment()
        * Using inquirer prompt the user for the new department id, name, and overHeadCosts. Query the database to insert into the departments table the new department using the user response. 
    * exit()
        * When the user is done viewing or editing the database then can exit the program and end their connection to the database.


