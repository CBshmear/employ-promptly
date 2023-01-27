USE company_db;

INSERT INTO departments  (department_name)
VALUES ("Service"),
       ("Sales"),
       ("DevOps"),
       ("Custodial");

INSERT INTO roles (title, salary,department_id)
VALUES ("Service Tech", 80000, 1),
       ("Sales Lead", 40000, 2),
       ("Janitor", 30000, 4);


INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Connor","Beer",1),
       ("Jimmy", "Johnson",3),
       ("Johnny", "Cochrane", 3);