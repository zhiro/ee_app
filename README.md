App has both the Front- and BackEnd logic in the same main folder.
Example database with values can be imported via \ee_app\misc\app_ee_plain.sql

If for some reason the sql restore does not work then you can use the Create table queries at the end of this file.

Be sure to update application.properties (ee_be/src/main/resources/application.properties) to match your local database server.

To access backend move to \ee_be\, run "npm install" and you can start the project via ./gradlew bootRun

For the frontend it is similar, make your way to \ee_fe\, run "npm install" followed by "npm run dev"

























CREATE TABLE customers (
    customer_id BIGSERIAL PRIMARY KEY,  -- Auto-incrementing ID
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE metering_points (
    metering_point_id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    address VARCHAR(255) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

CREATE TABLE consumption (
    consumption_id BIGSERIAL PRIMARY KEY,
    metering_point_id BIGINT NOT NULL,
    amount NUMERIC NOT NULL,
    amount_unit VARCHAR(50) NOT NULL,
    consumption_time TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY (metering_point_id) REFERENCES metering_points(metering_point_id) ON DELETE CASCADE
);

A new user can be added via a POST method against http://localhost:8080/api/customers and by providing raw data in the following format
{
    "username": "test",
    "password": "1234",
    "first_name": "Tiit",
    "last_name": "Test"
}
