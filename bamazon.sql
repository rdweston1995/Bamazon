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
    stock_quantity INT NULL
);

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (1101, "Trash Bags", "Cleaing Supplies", 10.99, 2000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (1102, "Intel i7 7700k 3.4ghz 8core CPU", "Computer Parts", 400.00, 10);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (9005, "NVIDIA GeForce 1080 6gb GPU", "Computer Parts", 650.00, 15);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (6006, 'Samsung 28" 144hz Computer Monitior', "Computer Parts", 250.00, 50);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Costco Pizza", "Food", 10.50, 10000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Costco Hot Dog Combo", "Food", 1.50, 20000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (40, "Chicken Pot Pie", "Food", 3.99, 5000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (666, "Bible", "Books", 6.66, 0);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (333, "Lord of the Rings Extended Trilogy", "Works from God", 50.99, 100);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(421, "Ben & Jerry's Half Baked Ice Cream", "Food", 3.99, 50);

SELECT * FROM products;

