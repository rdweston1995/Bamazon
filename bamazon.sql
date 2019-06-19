-- 1. Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

-- 2. Then create a Table inside of that database called `products`.
CREATE TABLE products(
    -- 3. The products table should have each of the following columns:
    --   * item_id (unique id for each product)
    item_id INT NULL,
    --   * product_name (Name of product)
    product_name VARCHAR(100) NULL,
    --   * department_name
    department_name VARCHAR(100) NULL,
    --   * price (cost to customer)
    price DECIMAL(10,4) NULL,
    --   * stock_quantity (how much of the product is available in stores)
    stock_quantity INT NULL,
    -- total_sales updates when a customer makes a purchase
    total_sales DECIMAL(10,4) NULL
);

-- 1. Create a new MySQL table called `departments`. Your table should include the following columns:
CREATE TABLE departments(
    -- department_id
    department_id INT NULL,
    -- department_name
    department_name VARCHAR(100) NULL,
    -- over_head_costs (A dummy number you set for each department)
    over_head_costs INT NULL
);

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (1101, "Trash Bags", "Cleaing Supplies", 10.99, 2000, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (1102, "Intel i7 7700k 3.4ghz 8core CPU", "Computer Parts", 400.00, 10, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (9005, "NVIDIA GeForce 1080 6gb GPU", "Computer Parts", 650.00, 15, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (6006, 'Samsung 28" 144hz Computer Monitior', "Computer Parts", 250.00, 50, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (1, "Costco Pizza", "Food", 10.50, 10000, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (2, "Costco Hot Dog Combo", "Food", 1.50, 20000, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (40, "Chicken Pot Pie", "Food", 3.99, 5000, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (666, "Bible", "Books", 6.66, 0, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES (333, "Lord of the Rings Extended Trilogy", "Works from God", 50.99, 100, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity, total_sales)
VALUES(421, "Ben & Jerry's Half Baked Ice Cream", "Food", 3.99, 50, 0);

INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (1, "Computer Parts", 50000);

INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (2, "Cleaning Supplies", 1000);

INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (3, "Food", 100000);

INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (5, "Books", 0);

INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (6, "Works from God", 100000000);

SELECT * FROM products;

SELECT * FROM departments;


