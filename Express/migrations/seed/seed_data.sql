SET TIMEZONE='Asia/Jakarta';

-- Invoices insert
insert into invoices (invoice_no, invoice_date, customer_name, salesperson_name, payment_type, notes)
values (8, now(), 'Mark Levin', 'Clarkson', 'CASH', 'This is an Invoice');

insert into invoices (invoice_no, invoice_date, customer_name, salesperson_name, payment_type, notes)
values (9, now(), 'Richard', 'James', 'CREDIT', 'This is an Invoice');

insert into invoices (invoice_no, invoice_date, customer_name, salesperson_name, payment_type, notes)
values (10, now(), 'Jeremy', 'May', 'CREDIT', 'This is an Invoice');

insert into invoices (invoice_no, invoice_date, customer_name, salesperson_name, payment_type, notes)
values (11, now(), 'Louis', 'Hammond', 'CASH', 'This is an Invoice');

-- Products insert
insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (8, 'Redmi Buds 4 Active', 4, 1000000, 1200000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (8, 'Poco X3 Pro', 5, 17500000, 20000000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (8, 'Xiaomi 33W Charger', 3, 300000, 450000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (9, 'iPhone 16 Pro Max', 2, 43000000, 50000000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (9, 'AirPods Max 2', 3, 18000000, 21000000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (10, 'MacBook Air M1', 5, 40000000, 50000000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (10, 'UGreen USB-C Hub', 5, 1500000, 2000000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (10, 'Logitech MX Master 3s', 4, 5200000, 6000000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (11, 'iPhone SE 2022', 2, 11000000, 15000000);

insert into products (invoice_no, item_name, quantity, total_cost_of_goods_sold, total_price_sold)
values (11, 'Apple Watch SE 2022', 2, 7000000, 8000000);