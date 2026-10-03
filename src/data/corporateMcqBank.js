// Corporate MCQ Assessment Question Bank
// Pre-loaded from official corporate Excel test files
export const CORPORATE_MCQ_BANK = [
  {
    "id": "mcq-sql-1",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which query correctly excludes employee IDs that appear in the exclusion list, while safely handling NULL values?",
    "options": [
      "SELECT *\r\nFROM (VALUES (1),(2),(3),(4)) AS E(emp_id)\r\nWHERE emp_id NOT IN (\r\n    SELECT emp_id\r\n    FROM (VALUES (3),(NULL)) AS X(emp_id)\r\n);",
      "SELECT *\r\nFROM (VALUES (1),(2),(3),(4)) AS E(emp_id)\r\nWHERE NOT EXISTS (\r\n    SELECT 1\r\n    FROM (VALUES (3),(NULL)) AS X(emp_id)\r\n    WHERE X.emp_id = E.emp_id\r\n);",
      "SELECT *\r\nFROM (VALUES (1),(2),(3),(4)) AS E(emp_id)\r\nWHERE emp_id NOT IN (\r\n    SELECT emp_id\r\n    FROM (VALUES (3)) AS X(emp_id)\r\n);",
      "SELECT *\r\nFROM (VALUES (1),(2),(3),(4)) AS E(emp_id)\r\nWHERE emp_id <> ALL (\r\n    SELECT emp_id\r\n    FROM (VALUES (3),(NULL)) AS X(emp_id)\r\n);"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-2",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Which query correctly calculates both RANK and DENSE_RANK for salary in descending order?",
      "SELECT salary,\r\n       ROW_NUMBER() OVER(ORDER BY salary DESC) AS rnk,\r\n       DENSE_RANK() OVER(ORDER BY salary DESC) AS drnk\r\nFROM Employees;",
      "SELECT salary,\r\n       RANK() OVER(ORDER BY salary DESC) AS rnk,\r\n       DENSE_RANK() OVER(ORDER BY salary DESC) AS drnk\r\nFROM Employees;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-3",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT salary,\r\n       RANK(salary) OVER(ORDER BY salary DESC) AS rnk,\r\n       DENSE_RANK(salary) OVER(ORDER BY salary DESC) AS drnk\r\nFROM Employees;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly filters rows before aggregation and then keeps products whose filtered total is at least 300?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-4",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT product, SUM(amount) AS total_amount\r\nFROM Sales\r\nWHERE amount >= 100\r\nGROUP BY product\r\nHAVING SUM(amount) >= 300;",
    "options": [
      "SELECT product, SUM(amount) AS total_amount\r\nFROM Sales\r\nWHERE SUM(amount) >= 300\r\nGROUP BY product\r\nHAVING amount >= 100;",
      "SELECT product, SUM(amount) AS total_amount\r\nFROM Sales\r\nGROUP BY product\r\nHAVING SUM(amount) >= 300;",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-5",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which query correctly returns customers who have no matching orders?",
    "options": [
      "SELECT c.customer_id\r\nFROM Customers c\r\nINNER JOIN Orders o\r\n    ON c.customer_id = o.customer_id\r\nWHERE o.order_id IS NULL;",
      "SELECT c.customer_id\r\nFROM Customers c\r\nLEFT JOIN Orders o\r\n    ON c.customer_id = o.customer_id\r\nWHERE o.order_id IS NULL;",
      "SELECT c.customer_id\r\nFROM Customers c\r\nLEFT JOIN Orders o\r\n    ON c.customer_id = o.customer_id\r\nWHERE c.customer_id IS NULL;",
      "SELECT c.customer_id\r\nFROM Customers c\r\nWHERE c.customer_id IN (\r\n    SELECT customer_id FROM Orders\r\n);"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-6",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Which query correctly returns employees whose salary is greater than the average salary of their own department?",
      "SELECT emp_id, dept, salary\r\nFROM Employees\r\nWHERE salary > (SELECT AVG(salary) FROM Employees);",
      "SELECT emp_id, dept, salary\r\nFROM Employees e\r\nWHERE salary > (\r\n    SELECT AVG(salary)\r\n    FROM Employees x\r\n    WHERE x.dept = e.dept\r\n);"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-7",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT emp_id, dept, salary\r\nFROM Employees\r\nGROUP BY dept, emp_id, salary\r\nHAVING salary > AVG(salary);",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly calculates a running salary total that restarts for every department and follows employee ID order?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-8",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT emp_id, dept, salary,\r\n       SUM(salary) OVER(\r\n           PARTITION BY dept\r\n           ORDER BY emp_id\r\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\r\n       ) AS running_total\r\nFROM Employees;",
    "options": [
      "SELECT emp_id, dept, salary,\r\n       SUM(salary) OVER(\r\n           PARTITION BY dept\r\n           ORDER BY salary DESC\r\n       ) AS running_total\r\nFROM Employees;",
      "SELECT emp_id, dept, salary,\r\n       SUM(salary) OVER(\r\n           ORDER BY dept, salary\r\n       ) AS running_total\r\nFROM Employees;",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-9",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which query correctly counts all employee rows and separately counts employees whose manager_id is NOT NULL?",
    "options": [
      "SELECT COUNT(*) AS total_rows,\r\n       COUNT(*) AS manager_count\r\nFROM Employees;",
      "SELECT COUNT(*) AS total_rows,\r\n       COUNT(manager_id) AS manager_count\r\nFROM Employees;",
      "SELECT COUNT(manager_id) AS total_rows,\r\n       COUNT(*) AS manager_count\r\nFROM Employees;",
      "SELECT COUNT(DISTINCT manager_id) AS total_rows,\r\n       COUNT(*) AS manager_count\r\nFROM Employees;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-10",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Which query correctly returns distinct values from multiple result sets while removing duplicates?",
      "SELECT 10 AS value\r\nUNION ALL SELECT 20\r\nUNION ALL SELECT 10\r\nUNION ALL SELECT 30;",
      "SELECT 10 AS value\r\nUNION SELECT 20\r\nUNION SELECT 10\r\nUNION SELECT 30;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-11",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT 10 AS value\r\nINTERSECT SELECT 20\r\nINTERSECT SELECT 10\r\nINTERSECT SELECT 30;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly returns the previous month's sales for every month?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-12",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT month, sales,\r\n       LAG(sales,1) OVER(ORDER BY month) AS previous_sales\r\nFROM MonthlySales;",
    "options": [
      "SELECT month, sales,\r\n       FIRST_VALUE(sales) OVER(ORDER BY month) AS previous_sales\r\nFROM MonthlySales;",
      "SELECT month, sales,\r\n       LAG(sales,1) OVER(ORDER BY sales) AS previous_sales\r\nFROM MonthlySales;",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-13",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which query correctly returns employees in the top 2 salary ranks within each department, keeping ties?",
    "options": [
      "SELECT *\r\nFROM (\r\n    SELECT *,\r\n           ROW_NUMBER() OVER(\r\n               PARTITION BY dept ORDER BY salary DESC\r\n           ) AS rnk\r\n    FROM Employees\r\n) x\r\nWHERE rnk <= 2;",
      "SELECT *\r\nFROM (\r\n    SELECT *,\r\n           DENSE_RANK() OVER(\r\n               PARTITION BY dept ORDER BY salary DESC\r\n           ) AS rnk\r\n    FROM Employees\r\n) x\r\nWHERE rnk <= 2;",
      "SELECT TOP 2 *\r\nFROM Employees\r\nORDER BY salary DESC;",
      "SELECT *\r\nFROM (\r\n    SELECT *,\r\n           DENSE_RANK() OVER(\r\n               ORDER BY salary DESC\r\n           ) AS rnk\r\n    FROM Employees\r\n) x\r\nWHERE rnk <= 2;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-14",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Which query correctly returns employees whose salary is greater than the overall company average?",
      "SELECT emp_id, salary\r\nFROM Employees\r\nWHERE salary > (\r\n    SELECT AVG(salary)\r\n    FROM Employees\r\n);",
      "SELECT emp_id, salary\r\nFROM Employees\r\nWHERE salary > (\r\n    SELECT MAX(salary)\r\n    FROM Employees\r\n);"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-15",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT emp_id, salary\r\nFROM Employees\r\nWHERE salary >= (\r\n    SELECT AVG(salary)\r\n    FROM Employees\r\n    GROUP BY dept\r\n);",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which correlated query correctly returns the highest-paid employee(s) in each department, including ties?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-16",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *\r\nFROM Employees\r\nWHERE salary = (\r\n    SELECT MAX(salary)\r\n    FROM Employees\r\n);",
    "options": [
      "SELECT *\r\nFROM Employees e\r\nWHERE salary > (\r\n    SELECT MAX(salary)\r\n    FROM Employees x\r\n    WHERE x.dept = e.dept\r\n);",
      "SELECT TOP 1 *\r\nFROM Employees\r\nORDER BY salary DESC;",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-17",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which query correctly returns departments that have no employee earning above 80000?",
    "options": [
      "SELECT DISTINCT dept\r\nFROM Employees\r\nWHERE salary <= 80000;",
      "SELECT dept\r\nFROM Employees\r\nGROUP BY dept\r\nHAVING MAX(salary) <= 80000;",
      "SELECT dept\r\nFROM Employees\r\nGROUP BY dept\r\nHAVING MIN(salary) <= 80000;",
      "SELECT dept\r\nFROM Employees\r\nWHERE NOT EXISTS (\r\n    SELECT 1\r\n    FROM Employees x\r\n    WHERE x.salary > 80000\r\n);"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-18",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Which query correctly returns the employee whose salary ranks 4th using RANK(), where duplicate salaries consume rank positions?",
      "SELECT *\r\nFROM (\r\n    SELECT *,\r\n           RANK() OVER(ORDER BY salary DESC) AS rnk\r\n    FROM Employees\r\n) x\r\nWHERE rnk = 4;",
      "SELECT *\r\nFROM (\r\n    SELECT *,\r\n           DENSE_RANK() OVER(ORDER BY salary DESC) AS rnk\r\n    FROM Employees\r\n) x\r\nWHERE rnk = 4;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-19",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT TOP 4 *\r\nFROM Employees\r\nORDER BY salary DESC;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly calculates a running total of salary separately by department?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-20",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT emp_id, dept, salary,\r\n       SUM(salary) OVER(\r\n           PARTITION BY dept\r\n           ORDER BY emp_id\r\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\r\n       ) AS running_total\r\nFROM Employees;",
    "options": [
      "SELECT emp_id, dept, salary,\r\n       SUM(salary) OVER(\r\n           PARTITION BY dept\r\n           ORDER BY salary DESC\r\n       ) AS running_total\r\nFROM Employees;",
      "SELECT emp_id, dept, salary,\r\n       SUM(salary) OVER(\r\n           ORDER BY dept, salary\r\n       ) AS running_total\r\nFROM Employees;",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-21",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which query correctly returns the salary immediately preceding each employee when employees are ordered by salary, with emp_id used as the tie-breaker?",
    "options": [
      "SELECT emp_id, salary,\r\n       LAG(salary) OVER(\r\n           ORDER BY salary, emp_id\r\n       ) AS previous_salary\r\nFROM Employees;",
      "SELECT emp_id, salary,\r\n       LEAD(salary) OVER(\r\n           ORDER BY salary\r\n       ) AS previous_salary\r\nFROM Employees;",
      "SELECT emp_id, salary,\r\n       LAG(salary) OVER(\r\n           ORDER BY emp_id\r\n       ) AS previous_salary\r\nFROM Employees;",
      "SELECT emp_id, salary,\r\n       FIRST_VALUE(salary) OVER(\r\n           ORDER BY salary\r\n       ) AS previous_salary\r\nFROM Employees;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-22",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A",
    "options": [
      "Option A",
      "Which query correctly returns the second-highest DISTINCT salary?",
      "SELECT MAX(salary)\r\nFROM Employees\r\nWHERE salary < (\r\n    SELECT MAX(salary)\r\n    FROM Employees\r\n);",
      "SELECT TOP 2 salary\r\nFROM Employees\r\nORDER BY salary DESC;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-23",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT salary\r\nFROM Employees\r\nORDER BY salary DESC\r\nOFFSET 2 ROWS FETCH NEXT 1 ROW ONLY;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly returns the second salary rank in each department while keeping all employees tied at that rank?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-24",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *\r\nFROM (\r\n    SELECT *,\r\n           ROW_NUMBER() OVER(\r\n               PARTITION BY dept ORDER BY salary DESC\r\n           ) AS rnk\r\n    FROM Employees\r\n) x\r\nWHERE rnk = 2;",
    "options": [
      "SELECT *\r\nFROM (\r\n    SELECT *,\r\n           RANK() OVER(\r\n               ORDER BY salary DESC\r\n           ) AS rnk\r\n    FROM Employees\r\n) x\r\nWHERE rnk = 2;",
      "SELECT TOP 2 *\r\nFROM Employees\r\nORDER BY salary DESC;",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-25",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which stored procedure correctly uses an OUTPUT parameter to return total salary?",
    "options": [
      "CREATE PROCEDURE GetTotalSalary\r\n    @TotalSalary INT OUTPUT\r\nAS\r\nBEGIN\r\n    SELECT @TotalSalary = SUM(salary)\r\n    FROM Employees;\r\nEND;",
      "CREATE PROCEDURE GetTotalSalary\r\n    @TotalSalary INT\r\nAS\r\nBEGIN\r\n    SELECT @TotalSalary = SUM(salary)\r\n    FROM Employees;\r\nEND;",
      "CREATE PROCEDURE GetTotalSalary\r\n    @TotalSalary OUTPUT\r\nAS\r\nBEGIN\r\n    SELECT SUM(salary) AS @TotalSalary\r\n    FROM Employees;\r\nEND;",
      "CREATE PROCEDURE GetTotalSalary\r\nAS\r\nBEGIN\r\n    SELECT @TotalSalary = SUM(salary)\r\n    FROM Employees;\r\nEND;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-26",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A",
    "options": [
      "Option A",
      "Which stored procedure correctly uses a default department parameter when no value is supplied?",
      "CREATE PROCEDURE GetDeptEmployees\r\n    @Dept VARCHAR(10) = 'IT'\r\nAS\r\nBEGIN\r\n    SELECT *\r\n    FROM Employees\r\n    WHERE dept = @Dept;\r\nEND;",
      "CREATE PROCEDURE GetDeptEmployees\r\n    @Dept VARCHAR(10) DEFAULT 'IT'\r\nAS\r\nBEGIN\r\n    SELECT *\r\n    FROM Employees\r\n    WHERE dept = @Dept;\r\nEND;"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-27",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "CREATE PROCEDURE GetDeptEmployees\r\n    @Dept = 'IT'\r\nAS\r\nBEGIN\r\n    SELECT * FROM Employees WHERE dept = @Dept;\r\nEND;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly returns customers whose total purchase is greater than the average total purchase across all customers?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-28",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "WITH CustomerTotals AS (\r\n    SELECT customer_id, SUM(amount) AS total_amount\r\n    FROM Orders\r\n    GROUP BY customer_id\r\n)\r\nSELECT *\r\nFROM CustomerTotals\r\nWHERE total_amount > (\r\n    SELECT AVG(total_amount)\r\n    FROM CustomerTotals\r\n);",
    "options": [
      "SELECT customer_id, SUM(amount) AS total_amount\r\nFROM Orders\r\nWHERE SUM(amount) > (SELECT AVG(amount) FROM Orders)\r\nGROUP BY customer_id;",
      "SELECT customer_id, SUM(amount) AS total_amount\r\nFROM Orders\r\nGROUP BY customer_id\r\nHAVING SUM(amount) > (\r\n    SELECT AVG(amount)\r\n    FROM Orders\r\n);",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-29",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM (SELECT *,RANK() OVER(PARTITION BY dept ORDER BY salary DESC) rnk FROM Employees)x WHERE rnk<=2;",
    "options": [
      "SELECT TOP 2 * FROM Employees ORDER BY salary DESC;",
      "SELECT * FROM Employees WHERE salary IN (SELECT TOP 2 salary FROM Employees ORDER BY salary DESC);",
      "SELECT * FROM (SELECT *,ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) rn FROM Employees)x WHERE rn<=2;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-30",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM Employees e WHERE salary >= (SELECT MAX(salary) FROM Employees WHERE dept=e.dept);",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Latest order for every customer, exactly one row per customer?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-31",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT TOP 1 * FROM Orders ORDER BY order_date DESC;",
    "options": [
      "SELECT * FROM Orders WHERE order_date=(SELECT MAX(order_date) FROM Orders);",
      "SELECT * FROM (SELECT *,RANK() OVER(ORDER BY order_date DESC) rn FROM Orders)x WHERE rn=1;",
      "SELECT customer_id,MAX(order_date) FROM Orders GROUP BY customer_id;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-32",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT email FROM Customers WHERE email=email GROUP BY email;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Third-highest DISTINCT salary without window functions?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-33",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT TOP 3 salary FROM Employees ORDER BY salary DESC;",
    "options": [
      "SELECT MAX(salary) FROM Employees WHERE salary<(SELECT MAX(salary) FROM Employees);",
      "SELECT MIN(salary) FROM Employees;",
      "SELECT salary FROM Employees ORDER BY salary DESC OFFSET 3 ROWS FETCH NEXT 1 ROW ONLY;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-34",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT c.* FROM Customers c CROSS JOIN Orders o WHERE o.order_id IS NULL;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly returns employees whose salary is strictly greater than the maximum salary in HR?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-35",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *\r\nFROM Employees\r\nWHERE salary >= (\r\n    SELECT MAX(salary)\r\n    FROM Employees\r\n    WHERE dept = 'HR'\r\n);",
    "options": [
      "SELECT *\r\nFROM Employees\r\nWHERE salary = (\r\n    SELECT MAX(salary)\r\n    FROM Employees\r\n    WHERE dept = 'HR'\r\n);",
      "SELECT *\r\nFROM Employees\r\nWHERE salary > (\r\n    SELECT AVG(salary)\r\n    FROM Employees\r\n    WHERE dept = 'HR'\r\n);",
      "SELECT *\r\nFROM Employees\r\nWHERE salary > ALL (\r\n    SELECT salary\r\n    FROM Employees\r\n    WHERE dept <> 'HR'\r\n);",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-36",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT customer_id,SUM(amount) FROM Sales GROUP BY customer_id ORDER BY sale_date;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Salary of the previous employee when ordered by salary DESC?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-37",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *,LEAD(salary) OVER(ORDER BY salary DESC) previous_salary FROM Employees;",
    "options": [
      "SELECT *,LAG(salary) OVER(PARTITION BY salary ORDER BY employee_id) previous_salary FROM Employees;",
      "SELECT *,LAG(salary) OVER(ORDER BY salary ASC) previous_salary FROM Employees;",
      "SELECT *,FIRST_VALUE(salary) OVER(ORDER BY salary DESC) previous_salary FROM Employees;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-38",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *,100.0*SUM(salary) OVER(PARTITION BY dept)/salary pct FROM Employees;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Rows where current salary is greater than previous salary within same department?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-39",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM Employees WHERE salary>LAG(salary) OVER(PARTITION BY dept ORDER BY emp_id);",
    "options": [
      "SELECT * FROM (SELECT *,LEAD(salary) OVER(PARTITION BY dept ORDER BY emp_id) prev_salary FROM Employees)x WHERE salary>prev_salary;",
      "SELECT * FROM Employees e WHERE salary>(SELECT MAX(salary) FROM Employees);",
      "SELECT * FROM (SELECT *,LAG(salary) OVER(ORDER BY salary) prev_salary FROM Employees)x WHERE salary>prev_salary;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-40",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT customer_id,MAX(order_date) FROM Orders GROUP BY customer_id;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Products priced above the average price of their own category?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-41",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM Products p WHERE price>(SELECT AVG(price) FROM Products x WHERE x.category_id=p.category_id);",
    "options": [
      "SELECT * FROM Products p WHERE price>(SELECT AVG(price) FROM Products x WHERE x.category_id<>p.category_id);",
      "SELECT category_id,AVG(price) FROM Products GROUP BY category_id;",
      "SELECT * FROM Products WHERE price>MAX(price);",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-42",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT dept FROM Employees GROUP BY dept HAVING AVG(salary)>=30000;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Top-selling product in each category by TOTAL sales amount?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-43",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM (SELECT category_id,product_id,SUM(amount) total_sales,RANK() OVER(PARTITION BY category_id ORDER BY SUM(amount) DESC) rnk FROM Sales GROUP BY category_id,product_id)x WHERE rnk=1;",
    "options": [
      "SELECT product_id,MAX(amount) FROM Sales GROUP BY product_id;",
      "SELECT * FROM Sales WHERE amount=(SELECT MAX(amount) FROM Sales);",
      "SELECT category_id,MAX(SUM(amount)) FROM Sales GROUP BY category_id;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-44",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM Employees e WHERE salary=(SELECT MIN(salary) FROM Employees x WHERE x.dept<>e.dept);",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Keep the lowest emp_id for each email, without deleting data?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-45",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT DISTINCT email,MIN(emp_id) FROM Employees GROUP BY email;",
    "options": [
      "SELECT * FROM Employees WHERE emp_id=MIN(emp_id);",
      "SELECT * FROM Employees GROUP BY email;",
      "SELECT * FROM (SELECT *,RANK() OVER(ORDER BY emp_id) rn FROM Employees)x WHERE rn=1;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-46",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT customer_id,FIRST_VALUE(amount),LAST_VALUE(amount) FROM Transactions GROUP BY customer_id;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Customers whose TOTAL purchase is greater than the average TOTAL purchase across customers?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-47",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "WITH CustomerTotals AS (SELECT customer_id,SUM(amount) total_amount FROM Orders GROUP BY customer_id) SELECT * FROM CustomerTotals WHERE total_amount>(SELECT AVG(total_amount) FROM CustomerTotals);",
    "options": [
      "SELECT customer_id,SUM(amount) total_amount FROM Orders WHERE SUM(amount)>(SELECT AVG(amount) FROM Orders) GROUP BY customer_id;",
      "SELECT customer_id,SUM(amount) total_amount FROM Orders GROUP BY customer_id HAVING SUM(amount)>(SELECT AVG(amount) FROM Orders);",
      "SELECT customer_id,AVG(amount) total_amount FROM Orders GROUP BY customer_id HAVING total_amount>(SELECT AVG(amount) FROM Orders);",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-48",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT dept, MAX(salary)\r\nFROM Employees\r\nGROUP BY dept;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly returns customers whose latest order amount is greater than 10,000?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-49",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT customer_id\r\nFROM Orders\r\nGROUP BY customer_id\r\nHAVING MAX(amount) > 10000;",
    "options": [
      "SELECT customer_id\r\nFROM (\r\n    SELECT *,\r\n           ROW_NUMBER() OVER(\r\n               PARTITION BY customer_id\r\n               ORDER BY order_date DESC\r\n           ) rn\r\n    FROM Orders\r\n) x\r\nWHERE rn = 1\r\n  AND amount > 10000;",
      "SELECT customer_id\r\nFROM Orders\r\nWHERE order_date = (\r\n    SELECT MAX(order_date)\r\n    FROM Orders\r\n)\r\nAND amount > 10000;",
      "SELECT customer_id\r\nFROM Orders\r\nORDER BY order_date DESC\r\nOFFSET 0 ROWS FETCH NEXT 1 ROW ONLY;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-50",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "WITH T AS (\r\n    SELECT customer_id,\r\n           SUM(amount) total_amount\r\n    FROM Orders\r\n    GROUP BY customer_id\r\n)\r\nSELECT *\r\nFROM T\r\nWHERE total_amount > ALL(\r\n    SELECT total_amount\r\n    FROM T\r\n);",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly returns the third order placed by each customer, based on order_date?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-51",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT TOP 3 * FROM Orders\r\nORDER BY order_date;",
    "options": [
      "SELECT * FROM (\r\n    SELECT *,\r\n           RANK() OVER(\r\n               ORDER BY order_date\r\n           ) rn\r\n    FROM Orders\r\n) x\r\nWHERE rn = 3;",
      "SELECT customer_id, MIN(order_date)\r\nFROM Orders\r\nGROUP BY customer_id;",
      "SELECT * FROM Orders\r\nWHERE order_date = (\r\n    SELECT MAX(order_date) FROM Orders\r\n);",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-52",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *,\r\n       salary - FIRST_VALUE(salary) OVER(\r\n           PARTITION BY dept ORDER BY salary\r\n       ) AS salary_diff\r\nFROM Employees;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly returns departments where the average salary is above the overall company average?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-53",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT dept\r\nFROM Employees\r\nGROUP BY dept\r\nHAVING AVG(salary) > (\r\n    SELECT AVG(salary)\r\n    FROM Employees\r\n);",
    "options": [
      "SELECT dept\r\nFROM Employees\r\nWHERE salary > (\r\n    SELECT AVG(salary) FROM Employees\r\n)\r\nGROUP BY dept;",
      "SELECT dept, AVG(salary)\r\nFROM Employees\r\nWHERE AVG(salary) > (\r\n    SELECT AVG(salary) FROM Employees\r\n);",
      "SELECT dept\r\nFROM Employees\r\nGROUP BY dept\r\nHAVING MAX(salary) > (\r\n    SELECT AVG(salary) FROM Employees\r\n);",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-54",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT customer_id, MAX(order_id)\r\nFROM Orders\r\nGROUP BY customer_id;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly finds employees whose salary is duplicated within their department?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-55",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM Employees e\r\nWHERE EXISTS (\r\n    SELECT 1\r\n    FROM Employees x\r\n    WHERE x.dept = e.dept\r\n      AND x.salary = e.salary\r\n      AND x.emp_id <> e.emp_id\r\n);",
    "options": [
      "SELECT salary\r\nFROM Employees\r\nGROUP BY salary\r\nHAVING COUNT(*) > 1;",
      "SELECT * FROM Employees\r\nWHERE salary = (\r\n    SELECT MAX(salary)\r\n    FROM Employees\r\n);",
      "SELECT * FROM Employees\r\nGROUP BY dept, salary\r\nHAVING COUNT(*) > 1;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-56",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *,\r\n       SUM(amount) OVER(\r\n           PARTITION BY product_id\r\n           ORDER BY sale_date\r\n       ) AS moving_avg\r\nFROM Sales;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly returns customers who placed an order in BOTH 2024 and 2025?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-57",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT customer_id\r\nFROM Orders\r\nWHERE YEAR(order_date) = 2024\r\n   OR YEAR(order_date) = 2025;",
    "options": [
      "SELECT DISTINCT customer_id\r\nFROM Orders\r\nWHERE YEAR(order_date) = 2024\r\nAND YEAR(order_date) = 2025;",
      "SELECT customer_id\r\nFROM Orders\r\nGROUP BY customer_id\r\nHAVING MIN(YEAR(order_date)) = 2024;",
      "SELECT customer_id\r\nFROM Orders\r\nWHERE order_date BETWEEN '2024-01-01' AND '2025-12-31';",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-58",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM EmployeeHistory ORDER BY change_date DESC;",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly returns the second-highest salary in each department, including ties?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-59",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM (\r\n    SELECT *,\r\n           ROW_NUMBER() OVER(\r\n               PARTITION BY dept ORDER BY salary DESC\r\n           ) rn\r\n    FROM Employees\r\n) x\r\nWHERE rn = 2;",
    "options": [
      "SELECT * FROM Employees\r\nWHERE salary = (\r\n    SELECT MAX(salary) FROM Employees\r\n);",
      "SELECT dept, MAX(salary)\r\nFROM Employees\r\nGROUP BY dept;",
      "SELECT * FROM Employees\r\nWHERE salary IN (\r\n    SELECT TOP 2 salary\r\n    FROM Employees\r\n    ORDER BY salary DESC\r\n);",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-60",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "WITH T AS (\r\n    SELECT customer_id,\r\n           SUM(amount) total_amount\r\n    FROM Orders\r\n    GROUP BY customer_id\r\n)\r\nSELECT *\r\nFROM T\r\nWHERE total_amount > ALL(\r\n    SELECT total_amount\r\n    FROM T\r\n);",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Which query correctly finds consecutive duplicate status records for the same customer?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-61",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM CustomerStatus\r\nWHERE status = LAG(status) OVER(\r\n    PARTITION BY customer_id ORDER BY event_time\r\n);",
    "options": [
      "SELECT customer_id, status\r\nFROM CustomerStatus\r\nGROUP BY customer_id, status\r\nHAVING COUNT(*) > 1;",
      "SELECT * FROM (\r\n    SELECT *,\r\n           LEAD(status) OVER(\r\n               PARTITION BY customer_id ORDER BY event_time\r\n           ) prev_status\r\n    FROM CustomerStatus\r\n) x\r\nWHERE status = prev_status;",
      "SELECT DISTINCT customer_id\r\nFROM CustomerStatus\r\nWHERE status = status;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-62",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT *,\r\n       CUME_DIST() OVER(\r\n           ORDER BY salary\r\n       ) pct_rank\r\nFROM Employees;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly returns employees whose salary increased compared with their immediately previous salary record?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-63",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM (\r\n    SELECT *,\r\n           LEAD(salary) OVER(\r\n               PARTITION BY emp_id ORDER BY effective_date\r\n           ) previous_salary\r\n    FROM SalaryHistory\r\n) x\r\nWHERE salary > previous_salary;",
    "options": [
      "SELECT * FROM SalaryHistory\r\nWHERE salary > LAG(salary) OVER(\r\n    PARTITION BY emp_id ORDER BY effective_date\r\n);",
      "SELECT * FROM SalaryHistory s\r\nWHERE salary > (\r\n    SELECT MAX(salary)\r\n    FROM SalaryHistory x\r\n    WHERE x.emp_id = s.emp_id\r\n);",
      "SELECT emp_id, MAX(salary)\r\nFROM SalaryHistory\r\nGROUP BY emp_id;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-64",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT dept\r\nFROM Employees\r\nGROUP BY dept\r\nHAVING COUNT(salary) >= 2\r\n   AND MAX(salary) >= 50000;",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly returns the latest salary record for each employee, even if salary itself has duplicate values?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-65",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM SalaryHistory\r\nWHERE salary = (\r\n    SELECT MAX(salary) FROM SalaryHistory\r\n);",
    "options": [
      "SELECT emp_id, MAX(effective_date)\r\nFROM SalaryHistory\r\nGROUP BY emp_id;",
      "SELECT * FROM (\r\n    SELECT *,\r\n           RANK() OVER(\r\n               PARTITION BY salary ORDER BY effective_date DESC\r\n           ) rn\r\n    FROM SalaryHistory\r\n) x\r\nWHERE rn = 1;",
      "SELECT TOP 1 * FROM SalaryHistory\r\nORDER BY effective_date DESC;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-66",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT product_id, SUM(amount)\r\nFROM Sales\r\nHAVING SUM(amount) > (\r\n    SELECT AVG(amount) FROM Sales\r\n);",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Which query correctly returns the top 3 salary bands in each department, keeping all employees tied within a band?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-67",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SELECT * FROM (\r\n    SELECT *,\r\n           ROW_NUMBER() OVER(\r\n               PARTITION BY dept ORDER BY salary DESC\r\n           ) band\r\n    FROM Employees\r\n) x\r\nWHERE band <= 3;",
    "options": [
      "SELECT TOP 3 * FROM Employees\r\nORDER BY salary DESC;",
      "SELECT * FROM (\r\n    SELECT *,\r\n           RANK() OVER(\r\n               ORDER BY salary DESC\r\n           ) band\r\n    FROM Employees\r\n) x\r\nWHERE band <= 3;",
      "SELECT dept, TOP 3 salary\r\nFROM Employees\r\nGROUP BY dept, salary;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-68",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Employees contains employee records and Departments contains department records. Only employees whose department exists should appear. Which JOIN type is most appropriate?",
    "options": [
      "LEFT JOIN",
      "FULL OUTER JOIN",
      "INNER JOIN",
      "CROSS JOIN"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-69",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "C",
    "options": [
      "Option A",
      "Two systems contain Customer [customer_id] and CRM_Customer [customer_key]. The business documentation states customer_id maps to customer_key. What should be used to join them?",
      "customer_id = customer_id",
      "customer_id = customer_key"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-70",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "name = customer_key",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Ordermaster contains order_id and product_id. Products contains product_id. One product can appear on many ordermaster. What type of relationship exists between Products and ordermaster?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-71",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "One-to-many",
    "options": [
      "Many-to-one only from both directions",
      "Many-to-many",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-72",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Students and Courses are connected through StudentCourse(student_id, course_id). A student can take many courses and a course can have many students. What table is required to model the relationship?",
    "options": [
      "A bridge/junction table",
      "A self-join table",
      "A calendar table only",
      "A single primary-key column"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-73",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A",
    "options": [
      "Option A",
      "You need records present in Dataset A but missing from Dataset B. Which pattern best represents this requirement?",
      "LEFT JOIN A to B and WHERE B.key IS NULL",
      "INNER JOIN A to B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-74",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "CROSS JOIN A to B",
    "options": [
      "LEFT JOIN",
      "Option B",
      "A",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-75",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "INNER JOIN",
    "options": [
      "LEFT JOIN",
      "RIGHT JOIN",
      "CROSS JOIN",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-76",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Table E contains 10 records and Table F contains 6 records. There are 4 matching records between the two tables. You need to return all 10 records from Table E,  and include the matching information from Table F. The unmatched records from Table E must also remain. Which JOIN should be used?",
      "INNER JOIN",
      "LEFT JOIN with E on the left"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-77",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "FULL OUTER JOIN",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Table A contains 1,000 customer records and Table B contains 850 customer records. Their customer IDs have 700 matches. You need a data comparison report that shows the 700 matching customers, the 300 customers found only in A, and the 150 customers found only in B. Which JOIN should be used?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-78",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "LEFT JOIN",
    "options": [
      "FULL OUTER JOIN",
      "CROSS JOIN",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-79",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A company has 12 departments and 95 employees. Only 9 departments currently have employees. You need a report containing all 12 departments, including the 3 departments with zero employees. Which JOIN should be used, and which table should be on the LEFT side?",
    "options": [
      "INNER JOIN with Employees on the LEFT",
      "LEFT JOIN with Departments on the LEFT",
      "LEFT JOIN with Employees on the LEFT",
      "Bridge table with Department on the LEFT"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-80",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "System A uses account_id and System B uses acct_key. Documentation confirms they are the same business key. Which mapping is correct?",
      "account_id = account_id",
      "account_id = acct_key"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-81",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "acct_key = account_name",
    "options": [
      "Option A",
      "B",
      "Option C",
      "StudentCourse(student_id, course_id) is a bridge table. You need the number of distinct courses taken by each student. Which technique is required?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-82",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "COUNT(DISTINCT course_id)",
    "options": [
      "COUNT(*) without GROUP BY",
      "SUM(course_id)",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-83",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "An order can have multiple payment records. You need one row per order with total paid amount. What should you do after joining?",
    "options": [
      "GROUP BY order_id and aggregate payment amount",
      "Use CROSS JOIN",
      "Use DISTINCT without aggregation",
      "Use RIGHT JOIN only"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-84",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A",
    "options": [
      "Option A",
      "Customers are LEFT Joined to Orders. You want customers with no orders. Which condition identifies unmatched rows?",
      "Orders.customer_id IS NOT NULL",
      "Orders.order_id IS NULL"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-85",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Orders.amount IS NOT NULL",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Orders has multiple rows per customer. You need customers with only their latest order. What should happen before the final customer join?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-86",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Cross join all orders",
    "options": [
      "Join all orders and use DISTINCT blindly",
      "Remove duplicate customers",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-87",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Which column is the best candidate for a PRIMARY KEY in an Employees table where every employee must be uniquely identified?",
    "options": [
      "department_id",
      "employee_name",
      "employee_id",
      "salary"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-88",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "C",
    "options": [
      "Option A",
      "A PRIMARY KEY column must uniquely identify each row. Which situation violates the normal PRIMARY KEY requirement?",
      "The key is indexed",
      "The key contains unique values"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-89",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "The key is referenced by another table",
    "options": [
      "Option A",
      "C",
      "Option C",
      "Salaries are 100000, 100000, 90000, 80000. Which window function gives ranks 1,1,3,4?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-90",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "DENSE_RANK()",
    "options": [
      "RANK()",
      "NTILE(4)",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-91",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "An employee's salary should be compared with the previous employee's salary after ordering by salary descending. Which function is designed for this?",
    "options": [
      "LEAD()",
      "LAG()",
      "FIRST_VALUE()",
      "NTILE()"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-92",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "You need the top 2 distinct salary levels in every department, including all employees tied at those levels. Which window function is most appropriate?",
      "ROW_NUMBER()",
      "RANK()"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-93",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "LAG()",
    "options": [
      "Option A",
      "C",
      "Option C",
      "Employees has 1,000 rows and Departments has 20 rows. Every employee belongs to one department, but 3 departments currently have no employees. You need all 20 departments in the result. Which join is appropriate?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-94",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "LEFT JOIN with Departments on the left",
    "options": [
      "RIGHT JOIN with Employees on the left",
      "CROSS JOIN",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-95",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Customers has 2,000 rows and Orders has 8,000 rows. Some customers have multiple orders and some have none. You need exactly one row per customer with total order amount. Which approach is correct?",
    "options": [
      "INNER JOIN + GROUP BY order_id",
      "LEFT JOIN + GROUP BY customer_id",
      "RIGHT JOIN + GROUP BY order_id",
      "CROSS JOIN + DISTINCT"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-96",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Employees has multiple rows per department. You need the highest-paid employee in each department, including all employees tied for the highest salary. Which function should be used?",
      "ROW_NUMBER()",
      "DENSE_RANK()"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-97",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "LAG()",
    "options": [
      "Option A",
      "C",
      "Option C",
      "You need a running total that restarts for every department. Which expression is correct?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-98",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "SUM(salary) OVER(PARTITION BY dept ORDER BY emp_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
    "options": [
      "SUM(salary) OVER(PARTITION BY dept)",
      "SUM(salary) GROUP BY dept",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-99",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A LEFT JOIN is used from Customers to Orders. You want all customers, but only PAID order details when available. Where should the PAID condition normally be placed to preserve customers with no paid orders?",
    "options": [
      "WHERE Orders.status='PAID'",
      "ON Customers.customer_id=Orders.customer_id AND Orders.status='PAID'",
      "HAVING Orders.status='PAID'",
      "GROUP BY Orders.status"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-100",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "B",
    "options": [
      "Option A",
      "Employees(emp_id, dept_id) and Departments(dept_id) exist. dept_id is unique in Departments but repeats in Employees. What is the relationship type from Departments to Employees?",
      "One-to-one",
      "One-to-many"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-101",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Many-to-many",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Orders(order_id, customer_id) references Customers(customer_id). A new order has customer_id=999, but no customer 999 exists. What does a FOREIGN KEY constraint normally prevent?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-102",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Insertion of the order with an invalid customer reference",
    "options": [
      "Duplicate customer names",
      "Deletion of all orders",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-103",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "You need to compare each employee's salary with the average salary of their department without collapsing rows. Which function can calculate the department average as a window value?",
    "options": [
      "AVG(salary) OVER(PARTITION BY dept)",
      "AVG(salary) GROUP BY dept",
      "AVG(salary) WHERE dept",
      "COUNT(salary) OVER(ORDER BY dept)"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-104",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A",
    "options": [
      "Option A",
      "A company has 5 products and 4 regions. Management wants every possible product-region combination for a planning exercise, even when no sales exist between them. Which JOIN should be used?",
      "INNER JOIN",
      "LEFT JOIN"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-105",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "CROSS JOIN",
    "options": [
      "Option A",
      "D",
      "Option C",
      "Orders contains 20,000 records and Customers contains 5,000 records. You need every customer in the final result, including customers who have never placed an order. The query must have Orders as the LEFT table. Which JOIN should be used?"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-106",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "LEFT JOIN",
    "options": [
      "RIGHT JOIN",
      "CROSS JOIN",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-107",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "Employees have the following salaries:\r\n100000, 90000, 90000, 80000, 70000\r\nWhich query correctly returns the rank of each employee based on salary in descending order, where employees with the same salary receive the same rank and gaps appear after ties?",
    "options": [
      "RANK() OVER (ORDER BY salary DESC)",
      "DENSE_RANK() OVER (ORDER BY salary DESC)",
      "ROW_NUMBER() OVER (ORDER BY salary DESC)",
      "NTILE(5) OVER (ORDER BY salary DESC)"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-sql-108",
    "subject": "SQL",
    "difficulty": "Intermediate",
    "question": "A",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Standard SQL query evaluation and set-theory execution rule."
  },
  {
    "id": "mcq-excel-109",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Excel was first introduced in which Year?",
    "options": [
      "1980",
      "1982",
      "1985",
      "1990"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-110",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Workbook is a cell, Worksheet is a formula",
    "options": [
      "Workbook is a single sheet, Worksheet is the entire file",
      "There is no difference",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-111",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "500",
    "options": [
      "C",
      "Option B",
      "What happens if you enter a font size greater than 409 in Excel?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-112",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Excel crashes",
    "options": [
      "Excel converts it to 500",
      "The font disappears",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-113",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "8",
    "options": [
      "B",
      "Option B",
      "What is the maximum number of rows in a modern Excel worksheet?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-114",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "65536",
    "options": [
      "1048576",
      "2000000",
      "Option C",
      "C"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-115",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "32768",
    "options": [
      "C",
      "Option B",
      "What is the last column in a modern Excel worksheet?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-116",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "XFD",
    "options": [
      "ZZZ",
      "IV",
      "Option C",
      "A"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-117",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Excel deletes the previous row",
    "options": [
      "B",
      "Option B",
      "If you have 100,000 customer records and want to highlight customers whose premium is greater than ₹50,000. Which feature should you use?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-118",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Freeze Panes",
    "options": [
      "Format Cells",
      "Protect Sheet",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-119",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Paste Special",
    "options": [
      "B",
      "Option B",
      "If you want to keep the first row visible while scrolling through thousands of records. What should you use?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-120",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Advanced Filter",
    "options": [
      "Text to Columns",
      "Format Cells",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-121",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Paste Formatting",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-122",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Remove Duplicates",
    "options": [
      "A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-123",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "If you have a very large dataset that exceeds the worksheet row limit. Which approach is most appropriate?",
    "options": [
      "Increase Excel's row limit",
      "Use Power Query, Power BI, or a database",
      "Increase font size",
      "Use Freeze Panes"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-124",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B",
    "options": [
      "What is the primary purpose of Format Cells in Excel?",
      "Option B",
      "To delete cells",
      "To change the appearance and data format of cells"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-125",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "To create a new worksheet",
    "options": [
      "Option A",
      "B",
      "Option C",
      "What is Conditional Formatting used for?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-126",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A",
    "options": [
      "Which option is used to protect an Excel worksheet?",
      "Option B",
      "Review → Protect Sheet",
      "Data → Protect Data"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-127",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "View → Lock Sheet",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-128",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "What is the main purpose of Protect Sheet?",
    "options": [
      "To remove formulas",
      "To delete a worksheet",
      "To increase worksheet size",
      "To prevent unauthorized changes to worksheet contents"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-129",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=10+5",
    "options": [
      "10+5 as text",
      "Nothing",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-130",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Only displayed values",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-131",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Cell A1 contains =B1+C1. If you use Paste Special → Values, what will be pasted?",
    "options": [
      "=B1+C1",
      "The calculated result",
      "B1 and C1 separately",
      "The formula as text"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-132",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Delete the row",
    "options": [
      "Convert it into a chart",
      "Option B",
      "A",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-133",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "If you have monthly sales data arranged horizontally from January to December. You want to display the months vertically. Which Excel feature should you use?",
    "options": [
      "Paste Formulas",
      "Conditional Formatting",
      "Paste Transpose",
      "Paste Values"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-134",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "E1:G1 will contain 10, 20, 30",
    "options": [
      "E1 will contain 60",
      "None Of Above",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-135",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "To delete columns",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-136",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Home → Formatting",
    "options": [
      "B",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-137",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Which Text to Columns option splits data based on characters such as comma, tab, or space?",
    "options": [
      "Fixed Width",
      "Delimited",
      "Formula",
      "Conditional"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-138",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B",
    "options": [
      "Option A",
      "Option B",
      "What does the Fixed Width option do in Text to Columns?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-139",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Splits data at positions specified by the user",
    "options": [
      "Removes spaces automatically",
      "Converts text into formulas",
      "Option C",
      "A"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-140",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Remove Duplicates",
    "options": [
      "Fixed Width",
      "Option B",
      "D",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-141",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Both A and C",
    "options": [
      "D",
      "Option B",
      "Option C",
      "Which feature allows text to be displayed in multiple lines within the same cell?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-142",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B",
    "options": [
      "Option A",
      "Merging cells means:",
      "Option C",
      "A) Dividing one cell into many"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-143",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B) Joining multiple cells into one",
    "options": [
      "D) Applying a border",
      "Option B",
      "B",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-144",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "C) Conditional Formatting",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-145",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "To remove repeated values in Excel, we use:",
    "options": [
      "A) Data Validation",
      "B) Remove Duplicates",
      "C) Clear Formatting",
      "D) Sorting"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-146",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B",
    "options": [
      "Option A",
      "Which shortcut is used to save a workbook?",
      "Option C",
      "A)Ctrl + A"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-147",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B) Ctrl + S",
    "options": [
      "D) Ctrl + P",
      "Option B",
      "B",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-148",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "D) .pptx",
    "options": [
      "A",
      "Option B",
      "Option C",
      "In Excel (Windows default), which date is considered as serial number 1?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-149",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A",
    "options": [
      "Option A",
      "Option B",
      "Which option is used to import .CSV files into Excel?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-150",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Insert → From Text/CSV",
    "options": [
      "Data → From Excel",
      "Review → Import",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-151",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "File → Open → Access",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-152",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Which of the following is not a valid Excel export format?",
    "options": [
      ".CSV",
      ".XLSX",
      ".XLSB",
      ".PDF"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-153",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Power Query",
    "options": [
      "Conditional Formatting",
      "Data Validation",
      "Option C",
      "A"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-154",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Data Validation",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-155",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Which chart is used to show trends over time?",
    "options": [
      "Pie Chart",
      "Bar Chart",
      "Line Chart",
      "Donut Chart"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-156",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "You want to compare trends",
    "options": [
      "You want to show composition across categories",
      "Option B",
      "D",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-157",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Only available in Power BI",
    "options": [
      "B",
      "Option B",
      "Which chart type allows combining two chart types in one?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-158",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Combo Chart",
    "options": [
      "Area Chart",
      "Speedometer Chart",
      "Option C",
      "A"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-159",
    "subject": "Excel",
    "difficulty": "Core",
    "question": ".CSV",
    "options": [
      ".TXT",
      "Option B",
      "C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-160",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Speedometer",
    "options": [
      "A",
      "Option B",
      "Option C",
      "To visualize percentage contribution of each item:"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-161",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A",
    "options": [
      "Option A",
      "Option B",
      "Which chart allows showing multiple time-series together?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-162",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Histogram",
    "options": [
      "Doughnut Chart",
      "Line Chart",
      "Option C",
      "D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-163",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "C) 2016",
    "options": [
      "Option A",
      "D",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-164",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "In Excel, cell B3 refers to",
    "options": [
      "A) Column B, Row 3",
      "B) Column 3, Row B",
      "C) Column B, Row 2",
      "D) Column 2, Row B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-165",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A) Row",
    "options": [
      "C) Range",
      "D) Field",
      "Option C",
      "C"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-166",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "C) Document",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-167",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A table row in Excel usually represents:",
    "options": [
      "A) Formula",
      "B) Record",
      "C) Column",
      "D) Function"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-168",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "C",
    "options": [
      "Option A",
      "You have a Customer_ID in cell A2 and customer details are stored in another table in columns H:J. You want to return the customer's name from column I. Which formula is appropriate?",
      "Option C",
      "A. =VLOOKUP(A2,H:J,2,FALSE)"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-169",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B. =VLOOKUP(A2,H:J,3,FALSE)",
    "options": [
      "D. Both A and C",
      "Option B",
      "D",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-170",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "D. =VLOOKUP(A2,Policy_Master!A:E,5,\"FALSE\")",
    "options": [
      "A",
      "Option B",
      "Option C",
      "You have the following data in Policy_Master:"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-171",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A",
    "options": [
      "Option A",
      "A report has Policy_ID in A2 and the user selects Premium_Amount in B1. The Policy Master table is on another worksheet. Why is MATCH used inside VLOOKUP?",
      "Option C",
      "A. To find the row containing the Policy ID"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-172",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B. To dynamically find the column number of Premium_Amount",
    "options": [
      "D. To sort the Policy Master table",
      "Option B",
      "B",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-173",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "D. =VLOOKUP(A2,Sales_Master!F:A,MATCH(B1,Sales_Master!A1:F1,0),FALSE)",
    "options": [
      "A",
      "Option B",
      "Option C",
      "Use this table for the questions:"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-174",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B. =VLOOKUP(G2,F:J,MATCH(H1,F1:J1,0),0)",
    "options": [
      "D. =VLOOKUP(H2,F:J,MATCH(G2,F1:J1,0),0)",
      "Option B",
      "B",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-175",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "C. =XLOOKUP(F:F,G2,G:G)",
    "options": [
      "Option A",
      "A",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-176",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "What is a major advantage of XLOOKUP over VLOOKUP?",
    "options": [
      "A. XLOOKUP can only search from left to right",
      "B. XLOOKUP can return values from columns to the left or right of the lookup column",
      "C. XLOOKUP cannot search another worksheet",
      "D. XLOOKUP only works with numbers"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-177",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=IF(value_if_true,condition,value_if_false)",
    "options": [
      "=IF(condition)",
      "Option B",
      "A",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-178",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=IF(100>A1,\"Yes\",\"No\")",
    "options": [
      "B",
      "Option B",
      "Option C",
      "Which formula performs an exact match using VLOOKUP?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-179",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "C",
    "options": [
      "Option A",
      "What does #N/A usually indicate in a VLOOKUP formula?",
      "Option C",
      "Invalid syntax"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-180",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Division by zero",
    "options": [
      "Wrong worksheet",
      "Option B",
      "C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-181",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=HLOOKUP(A1,B1:F5,3,'FALSE')",
    "options": [
      "B",
      "Option B",
      "Option C",
      "Which formula correctly uses XLOOKUP to find an employee's salary?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-182",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A",
    "options": [
      "Option A",
      "Which XLOOKUP formula displays \"Not Found\" when the lookup value doesn't exist?",
      "Option C",
      "=IFERROR(XLOOKUP(A2,B2:B20,C2:C20),\"Not Found\")"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-183",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=XLOOKUP(A2,B2:B20,\"Not Found\",C2:C20)",
    "options": [
      "=XLOOKUP(A2,B2:B20,C2:C20,\"Not Found\")",
      "Option B",
      "D",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-184",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "",
    "options": [
      "Option A",
      "=IF(A2>100000 AND B2>10),\"High Value\",\"Low Value\")",
      "=IF(AND(A2>100000,B2>10),\"High Value\",\"Low Value\")",
      "=IF(OR(A2>100000,B2>10),\"High Value\",\"Low Value\")"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-185",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=IF(A2>100000,IF(B2>10,\"Low Value\",\"High Value\"),\"High Value\")",
    "options": [
      "B",
      "Option B",
      "Cell A2 contains:Bangalore, Karnataka You want to replace Bangalore with Bengaluru. Which formula is correct?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-186",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A. =SUBSTITUTE(A2,\"Bangalore\",\"Bengaluru\")",
    "options": [
      "C. =SUBSTITUTE(A2,Bangalore,Bengaluru)",
      "D. =SUBSTITUTE(\"Bangalore\",\"Bengaluru\",A2)",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-187",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=CONCATENATE(A2,-,B2)",
    "options": [
      "B",
      "Option B",
      "Which function in Excel returns the current date and time?",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-188",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "TODAY()",
    "options": [
      "DATE()",
      "TIME()",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-189",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "00/01/1900",
    "options": [
      "B",
      "Option B",
      "Option C",
      "What does the DAY() function return if applied to 2025-10-09?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-190",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "C",
    "options": [
      "Option A",
      "Which function is used to calculate the number of working days between two dates, excluding weekends?",
      "Option C",
      "DAYS360()"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-191",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "NETWORKDAYS()",
    "options": [
      "EOMONTH()",
      "Option B",
      "B",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-192",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Oct",
    "options": [
      "D",
      "Option B",
      "Option C",
      "EOMONTH(\"2025-10-09\",2) will return:"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-193",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "D",
    "options": [
      "Option A",
      "Which function converts all letters in a cell to uppercase?",
      "Option C",
      "PROPER()"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-194",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "LOWER()",
    "options": [
      "EXACT()",
      "Option B",
      "C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-195",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "8",
    "options": [
      "A",
      "Option B",
      "Option C",
      "Which function replaces a part of text with another text?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-196",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A",
    "options": [
      "Option A",
      "How do you combine text from two cells in Excel?",
      "Option C",
      "&"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-197",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "CONCAT()",
    "options": [
      "SUM()",
      "Option B",
      "C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-198",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "EXACT()",
    "options": [
      "A",
      "Option B",
      "Option C",
      "Which function calculates the average of a range?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-199",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "D",
    "options": [
      "Option A",
      "What does ISNUMBER(\"123\") return?",
      "Option C",
      "TRUE"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-200",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "FALSE",
    "options": [
      "123",
      "Option B",
      "A",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-201",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "SUM()",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-202",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Which function calculates the remainder after division?",
    "options": [
      "MOD()",
      "DELTA()",
      "POWER()",
      "SQRT()"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-203",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=COUNTIF(A2:A100,\">50000\")",
    "options": [
      "=SUMIF(A2:A100,\">50000\")",
      "=COUNT(A2:A100,\">50000\")",
      "Option C",
      "A"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-204",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=SUMIFS(A2:A100,\">50000\",B2:B100,\">5\")",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-205",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Which formula calculates the total revenue for products belonging to the \"Bakery\" category?",
    "options": [
      "Option A",
      "=SUMIF(A2:A100,\"Bakery\",B2:B100)",
      "=SUMIFS(A2:A100,\"Bakery\",B2:B100)",
      "=COUNTIF(A2:A100,\"Bakery\",B2:B100)"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-206",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=SUM(A2:A100,\"Bakery\")",
    "options": [
      "A",
      "Option B",
      "Option C",
      "What is the primary purpose of a Pivot Table in Excel?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-207",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "B",
    "options": [
      "Option A",
      "Which formula calculates total revenue for the \"Bakery\" category where Units Sold are greater than 100?",
      "Data is arranged as follows:Column:A-Category,B-Units_Sold and C-Revenue",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-208",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=SUMIF(A2:A100,\"Bakery\",B2:B100,\">100\")",
    "options": [
      "=COUNTIFS(A2:A100,\"Bakery\",B2:B100,\">100\")",
      "=SUMIFS(C2:C100,A2:A100,Bakery,B2:B100,\">100\")",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-209",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Filters",
    "options": [
      "Option A",
      "D",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-210",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Dimension fields are usually:",
    "options": [
      "Numeric data",
      "Text or categorical data",
      "Calculated data",
      "Chart elements"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-211",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Filtering only",
    "options": [
      "Performing numeric calculations like sum or average",
      "Adding slicers",
      "Option C",
      "C"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-212",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Pivot Chart",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-213",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Summarize Values By is used for:",
    "options": [
      "Changing how data is calculated (Sum, Count, Avg, etc.)",
      "Formatting the Pivot Table",
      "Changing data source",
      "Filtering rows"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-214",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Format numbers",
    "options": [
      "Insert charts",
      "Sort fields alphabetically",
      "Option C",
      "B"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-215",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "It adds a new worksheet",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-216",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "To filter only values",
    "options": [
      "A",
      "Option B",
      "Option C",
      "Calculated Fields are used to:"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-217",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "A",
    "options": [
      "Option A",
      "Where can you find the option to add a Calculated Field?",
      "Option C",
      "Data → Formulas"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-218",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Insert → New Field",
    "options": [
      "View → Layout",
      "Option B",
      "C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-219",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Creating pivot charts",
    "options": [
      "B",
      "Option B",
      "Option C",
      "What is a Pivot Data Model?"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-220",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "D",
    "options": [
      "Option A",
      "Option B",
      "% of Grand Total shows:",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-221",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Each item’s share of total data",
    "options": [
      "Difference from average",
      "None",
      "Option C",
      "A"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-222",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Text to Columns",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-223",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Which combination is most useful for creating an interactive Excel dashboard?",
    "options": [
      "Slicers + PivotTables + KPI calculations",
      "Text to Columns + Remove Duplicates",
      "Freeze Panes + Font Size",
      "Paste Special + Page Layout"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-224",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "Use only Freeze Panes",
    "options": [
      "Slicer connected to the report with KPI calculations",
      "Use Text to Columns",
      "Option C",
      "C"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-excel-225",
    "subject": "Excel",
    "difficulty": "Core",
    "question": "=TODAY()-A2",
    "options": [
      "Option A",
      "B",
      "Option C",
      "Option D"
    ],
    "correct": 1,
    "explanation": "Standard Microsoft Excel calculation and interface standard."
  },
  {
    "id": "mcq-sas-226",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "WORK.EMP contains ID, NAME and SALARY.\r\nRequired result: create WORK.OUT containing only SALARY and NAME.",
    "options": [
      "data out(keep=salary name);\r\nset emp;\r\nrun;",
      "data out(drop=id);\r\nset emp;\r\nrun;",
      "data out;\r\nset emp;\r\nrename salary=name;\r\nrun;",
      "data out;\r\nset emp;\r\nkeep id;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-227",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "WORK.EMP contains ID, NAME and DEPT.\r\nRequired result: rename DEPT to DEPARTMENT in the output dataset.",
      "data out;\r\nset emp;\r\ndept=department;\r\nrun;",
      "data out;\r\nset emp;\r\nrename department=dept;\r\nrun;",
      "data out(rename=(dept=department));\r\nset emp;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-228",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nhaving salary > 50000;\r\nrun;",
    "options": [
      "Option A",
      "A",
      "WORK.EMP contains SALARY.\r\nRequired result: create BONUS = 10% of SALARY using an IF/THEN statement.",
      "data out;\r\nset emp;\r\nif salary then bonus=salary*10;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-229",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nif salary > 0 bonus=salary*0.10;\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nif salary > 0 then bonus=salary*0.10;\r\nrun;",
      "Option B",
      "B",
      "WORK.EMP contains SALARY.\r\nRequired result:\r\nSALARY >= 70000 -> 'HIGH'\r\nSALARY >= 50000 and < 70000 -> 'MEDIUM'\r\notherwise -> 'LOW'."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-230",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nif salary >= 70000 then band='HIGH';\r\nif salary >= 50000 then band='MEDIUM';\r\nelse band='LOW';\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nif salary < 50000 then band='LOW';\r\nelse band='HIGH';\r\nrun;",
      "data out;\r\nset emp;\r\nif salary >= 70000 then band='HIGH';\r\nelse if salary >= 50000 then band='MEDIUM';\r\nelse band='LOW';\r\nrun;",
      "Option C",
      "D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-231",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nupper_name=upcase(name);\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nupper_name=uppercase(name);\r\nrun;",
      "data out;\r\nset emp;\r\nupper_name=ucase(name);\r\nrun;",
      "data out;\r\nset emp;\r\nupper_name=up(name);\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-232",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "WORK.EMP contains NAME values such as 'Asha Kumar'.\r\nRequired result: create FIRST_NAME containing the first word.",
    "options": [
      "data out;\r\nset emp;\r\nfirst_name=scan(name,2);\r\nrun;",
      "data out;\r\nset emp;\r\nfirst_name=scan(name,1);\r\nrun;",
      "data out;\r\nset emp;\r\nfirst_name=substr(name,2);\r\nrun;",
      "data out;\r\nset emp;\r\nfirst_name=word(name,1);\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-233",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "B",
    "options": [
      "WORK.EMP contains FIRST_NAME and LAST_NAME.\r\nRequired result: create FULL_NAME with one blank between the two names.",
      "data out;\r\nset emp;\r\nfull_name=catx(' ',first_name,last_name);\r\nrun;",
      "data out;\r\nset emp;\r\nfull_name=cats(first_name,last_name);\r\nrun;",
      "data out;\r\nset emp;\r\nfull_name=sum(first_name,last_name);\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-234",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nname_len=lenchar(name);\r\nrun;",
    "options": [
      "Option A",
      "C",
      "WORK.SALES contains AMOUNT.\r\nRequired result: create AMOUNT_ROUND rounded to the nearest 100.",
      "data out;\r\nset sales;\r\namount_round=round(amount,100);\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-235",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset sales;\r\namount_round=ceil(amount,100);\r\nrun;",
    "options": [
      "data out;\r\nset sales;\r\namount_round=amount/100;\r\nrun;",
      "Option B",
      "A",
      "WORK.SALES contains A and B.\r\nRequired result: create TOTAL that treats missing A or B as zero when adding them."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-236",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset sales;\r\ntotal=a+b;\r\nrun;",
    "options": [
      "data out;\r\nset sales;\r\ntotal=add(a,b);\r\nrun;",
      "data out;\r\nset sales;\r\ntotal=sum(a,b);\r\nrun;",
      "Option C",
      "D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-237",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "DATE_CHAR contains '13/08/2026'.\r\nRequired result: convert it into a numeric SAS date using the DDMMYY format.",
    "options": [
      "data out;\r\nset source;\r\ndate_num=convert(date_char,ddmmyy10.);\r\nrun;",
      "data out;\r\nset source;\r\ndate_num=put(date_char,ddmmyy10.);\r\nrun;",
      "data out;\r\nset source;\r\ndate_num=input(date_char,date9.);\r\nrun;",
      "data out;\r\nset source;\r\ndate_num=input(date_char,ddmmyy10.);\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-238",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "D",
    "options": [
      "WORK.EMP contains a numeric SAS variable JOIN_DATE.\r\nRequired result: display it as 13-Aug-2026.",
      "data out;\r\nset emp;\r\nformat join_date date9.;\r\nrun;",
      "data out;\r\nset emp;\r\njoin_date=put(join_date,date9.);\r\nrun;",
      "data out;\r\nset emp;\r\nformat join_date ddmmyy10.;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-239",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nage=intnx('year',date_of_birth,today());\r\nrun;",
    "options": [
      "Option A",
      "B",
      "WORK.SALES contains JAN, FEB and MAR columns.\r\nRequired result: transpose these columns into observations using PROC TRANSPOSE.",
      "proc transpose data=sales out=out;\r\nvar jan feb mar;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-240",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc transpose data=sales out=out;\r\nrows jan feb mar;\r\nrun;",
    "options": [
      "proc transpose data=sales out=out;\r\nby jan feb mar;\r\nrun;",
      "Option B",
      "A",
      "WORK.A contains three observations and WORK.B contains two observations with the same structure.\r\nRequired result: stack all observations vertically into WORK.OUT."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-241",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nmerge a b;\r\nrun;",
    "options": [
      "data out;\r\nset a b;\r\nrun;",
      "proc sql;\r\nselect * from a inner join b;\r\nquit;",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-242",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc sort data=a; by dept_id; run;\r\nproc sort data=b; by dept_id; run;\r\ndata out;\r\nmerge a b;\r\nby dept_id;\r\nrun;",
    "options": [
      "data out;\r\nset a b;\r\nby dept_id;\r\nrun;",
      "proc sort data=a b; by dept_id; run;\r\ndata out;\r\nmerge a b;\r\nrun;",
      "data out;\r\nmerge a b;\r\nwhere dept_id;\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-243",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "WORK.A and WORK.B contain the same variable ID.\r\nRequired result: create OUT containing observations from A followed by observations from B.",
    "options": [
      "data out;\r\nset a;\r\nmerge b;\r\nrun;",
      "data out;\r\nmerge a b;\r\nby id;\r\nrun;",
      "proc sql;\r\nselect * from a join b on a.id=b.id;\r\nquit;",
      "data out;\r\nset a b;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-244",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "D",
    "options": [
      "WORK.EMP contains DEPT and SALARY.\r\nRequired result: calculate the average SALARY by DEPT using PROC MEANS.",
      "proc means data=emp mean;\r\nclass dept;\r\nvar salary;\r\nrun;",
      "proc means data=emp;\r\nvar dept;\r\nclass salary;\r\nrun;",
      "proc means data=emp;\r\nby salary;\r\nvar dept;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-245",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc means data=emp;\r\ntables dept;\r\nrun;",
    "options": [
      "Option A",
      "C",
      "WORK.EMP contains SALARY.\r\nRequired result: create a dataset OUT containing summary statistics from PROC MEANS.",
      "proc means data=emp;\r\noutput data=out;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-246",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc means data=emp noprint;\r\nvar salary;\r\noutput out=out mean=avg_salary sum=total_salary;\r\nrun;",
    "options": [
      "proc summary data=emp;\r\nsave out;\r\nrun;",
      "Option B",
      "C",
      "WORK.EMP contains 10 observations.\r\nRequired result: create OUT containing only the first 5 observations."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-247",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp(firstobs=5);\r\nrun;",
    "options": [
      "data out;\r\nset emp(obs=5);\r\nrun;",
      "data out;\r\nset emp;\r\nif _N_ > 5;\r\nrun;",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-248",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\ninitial=substr(name,1,1);\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\ninitial=substr(name,2,1);\r\nrun;",
      "data out;\r\nset emp;\r\ninitial=scan(name,2);\r\nrun;",
      "data out;\r\nset emp;\r\ninitial=first(name);\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-249",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "WORK.EMP contains STATUS values 'Active' and 'Inactive'.\r\nRequired result: create STATUS_CODE=1 for Active and 0 otherwise.",
    "options": [
      "data out;\r\nset emp;\r\nstatus_code=ifc(status='Active',1,0);\r\nrun;",
      "data out;\r\nset emp;\r\nif status='Active' status_code=1;\r\nelse status_code=0;\r\nrun;",
      "data out;\r\nset emp;\r\nif status='Active' then status_code=1;\r\nelse status_code=0;\r\nrun;",
      "data out;\r\nset emp;\r\nif status='Active' then status_code='1';\r\nelse status_code='0';\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-250",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "C",
    "options": [
      "WORK.EMP contains SALARY.\r\nRequired result: calculate the square of SALARY in SALARY_SQ.",
      "data out;\r\nset emp;\r\nsalary_sq=salary**2;\r\nrun;",
      "data out;\r\nset emp;\r\nsalary_sq=salary^2;\r\nrun;",
      "data out;\r\nset emp;\r\nsalary_sq=salary*2;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-251",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset sales;\r\nrunning_total+0;\r\nrun;",
    "options": [
      "Option A",
      "C",
      "WORK.EMP is sorted by DEPT.\r\nRequired result: create FLAG=1 only on the first observation of every department.",
      "data out;\r\nset emp;\r\nby dept;\r\nif first.dept then flag=1;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-252",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nby first.dept;\r\nflag=1;\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nif last.dept then flag=1;\r\nrun;",
      "Option B",
      "A",
      "WORK.EMP is sorted by DEPT.\r\nRequired result: output only the last observation of each department."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-253",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nby dept;\r\nif last.dept;\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nby dept;\r\nif first.dept;\r\nrun;",
      "data out;\r\nset emp;\r\nlast.dept=1;\r\nrun;",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-254",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nseq+1;\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nby dept;\r\nif first.dept then seq=0;\r\nseq+1;\r\nrun;",
      "data out;\r\nset emp;\r\nby dept;\r\nif last.dept then seq=0;\r\nseq+1;\r\nrun;",
      "data out;\r\nset emp;\r\nby dept;\r\nseq=_N_;\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-255",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "WORK.SALES contains AMOUNT.\r\nRequired result: create OUT with only observations where AMOUNT is not missing.",
    "options": [
      "data out;\r\nset sales;\r\nif not missing(amount);\r\nrun;",
      "data out;\r\nset sales;\r\nif missing(amount);\r\nrun;",
      "data out;\r\nset sales;\r\nwhere amount=.;\r\nrun;",
      "data out;\r\nset sales;\r\namount ne .;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-256",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "WORK.EMP contains CITY.\r\nRequired result: create CITY_UPPER and remove leading/trailing blanks while converting CITY to uppercase.",
      "data out;\r\nset emp;\r\ncity_upper=strip(up(city));\r\nrun;",
      "data out;\r\nset emp;\r\ncity_upper=uppercase(trim(city));\r\nrun;",
      "data out;\r\nset emp;\r\ncity_upper=upcase(strip(city));\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-257",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nfull_name=trim(first_name)+trim(last_name);\r\nrun;",
    "options": [
      "Option A",
      "B",
      "WORK.EMP contains DATE1 and DATE2 as numeric SAS dates.\r\nRequired result: calculate the number of days between DATE1 and DATE2.",
      "data out;\r\nset emp;\r\ndays=date2-date1;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-258",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\ndays=year(date2)-year(date1);\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\ndays=input(date2,date1);\r\nrun;",
      "Option B",
      "A",
      "WORK.EMP contains a character DATE_CHAR such as '2026-08-13'.\r\nRequired result: create a numeric SAS date using the YYMMDD10. informat."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-259",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\ndate=put(date_char,yymmdd10.);\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\ndate=input(date_char,yymmdd10.);\r\nrun;",
      "data out;\r\nset emp;\r\ndate=convert(date_char,yymmdd10.);\r\nrun;",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-260",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\ninformat time_value time8.;\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nformat time_value time8.;\r\nrun;",
      "data out;\r\nset emp;\r\ntime_value=put(time_value,time8.);\r\nrun;",
      "data out;\r\nset emp;\r\nformat time_value date9.;\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-261",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "WORK.EMP contains NAME.\r\nRequired result: create LAST_NAME containing the second word of a two-word name.",
    "options": [
      "data out;\r\nset emp;\r\nlast_name=scan(name,2);\r\nrun;",
      "data out;\r\nset emp;\r\nlast_name=scan(name,1);\r\nrun;",
      "data out;\r\nset emp;\r\nlast_name=substr(name,1);\r\nrun;",
      "data out;\r\nset emp;\r\nlast_name=word(name,2);\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-262",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "WORK.EMP contains SALARY.\r\nRequired result: create SALARY_K equal to SALARY divided by 1000.",
      "data out;\r\nset emp;\r\nsalary_k=salary-1000;\r\nrun;",
      "data out;\r\nset emp;\r\nsalary_k=salary*1000;\r\nrun;",
      "data out;\r\nset emp;\r\nsalary_k=salary/1000;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-263",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc sql;\r\nselect dept,sum(salary)\r\nfrom emp;\r\nquit;",
    "options": [
      "Option A",
      "A",
      "WORK.EMP contains DEPT and SALARY.\r\nRequired result: display only departments whose total salary is greater than 100000 using PROC SQL.",
      "proc sql;\r\nselect dept,salary\r\nfrom emp\r\nhaving salary > 100000;\r\nquit;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-264",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc sql;\r\nselect dept,sum(salary) as total_salary\r\nfrom emp\r\ngroup by dept\r\nhaving calculated total_salary > 100000;\r\nquit;",
    "options": [
      "proc sql;\r\nselect dept,sum(salary)\r\nfrom emp\r\nwhere sum(salary)>100000\r\ngroup by dept;\r\nquit;",
      "Option B",
      "C",
      "WORK.EMP contains DEPT and SALARY.\r\nRequired result: create a summary dataset with department and average salary using PROC SUMMARY."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-265",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc summary data=emp;\r\nvar dept;\r\noutput out=out mean=avg_salary;\r\nrun;",
    "options": [
      "proc summary data=emp;\r\nclass salary;\r\nvar dept;\r\noutput out=out mean=avg_salary;\r\nrun;",
      "proc summary data=emp;\r\nby dept;\r\noutput out=out mean=avg_salary;\r\nrun;",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-266",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data work.emp;\r\nset source.emp;\r\nrun;",
    "options": [
      "data emp;\r\nset source.emp;\r\nrun;",
      "create temp emp;\r\nset source.emp;\r\nrun;",
      "data temporary.emp;\r\nset source.emp;\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-267",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Which code correctly creates a permanent dataset in library MYLIB?",
    "options": [
      "data mylib.emp;\r\nset work.emp;\r\nrun;",
      "data work.mylib.emp;\r\nset emp;\r\nrun;",
      "create mylib.emp;\r\nset emp;\r\nrun;",
      "data permanent.emp;\r\nset mylib;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-268",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "Which code correctly assigns a SAS library MYLIB to a folder?",
      "library mylib '/folders/mydata';",
      "libname mylib '/folders/mydata';",
      "libref mylib '/folders/mydata';"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-269",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "PROC TRANSPOSE",
    "options": [
      "Option A",
      "C",
      "Which code correctly displays the variables and observations in WORK.EMP?",
      "proc print data=work.emp;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-270",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "print work.emp;\r\nrun;",
    "options": [
      "proc show data=work.emp;\r\nrun;",
      "Option B",
      "A",
      "Which code correctly imports an Excel file into SAS?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-271",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc import infile='/folders/mydata/emp.xlsx'\r\nout=work.emp\r\ndbms=excel;\r\nrun;",
    "options": [
      "data work.emp;\r\ninfile '/folders/mydata/emp.xlsx';\r\nrun;",
      "proc excel import='/folders/mydata/emp.xlsx'\r\nout=work.emp;\r\nrun;",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-272",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc csv export data=work.emp\r\noutfile='/folders/mydata/emp.csv';\r\nrun;",
    "options": [
      "proc export data=work.emp\r\nfile='/folders/mydata/emp.csv'\r\ntype=csv;\r\nrun;",
      "proc export data=work.emp\r\noutfile='/folders/mydata/emp.csv'\r\ndbms=csv\r\nreplace;\r\nrun;",
      "export data=work.emp to csv;\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-273",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Which code correctly reads a comma-delimited text file with a header row?",
    "options": [
      "data emp;\r\ninfile '/folders/mydata/emp.csv' delimiter='comma';\r\ninput id name salary;\r\nrun;",
      "data emp;\r\ninput id name salary;\r\ninfile '/folders/mydata/emp.csv' header;\r\nrun;",
      "data emp;\r\nset '/folders/mydata/emp.csv';\r\nrun;",
      "data emp;\r\ninfile '/folders/mydata/emp.csv' dsd firstobs=2;\r\ninput id name :$30. salary;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-274",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "D",
    "options": [
      "Which code correctly writes a DATA step output observation to an external text file?",
      "proc export file='/folders/mydata/output.txt';\r\nset emp;\r\nrun;",
      "data output.txt;\r\nset emp;\r\nwrite id name salary;\r\nrun;",
      "data _null_;\r\nfile '/folders/mydata/output.txt';\r\nset emp;\r\nput id name salary;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-275",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\ndelete id;\r\nrun;",
    "options": [
      "Option A",
      "B",
      "Which code correctly keeps only NAME and SALARY in OUT?",
      "data out(keep=name salary);\r\nset emp;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-276",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out(drop=name salary);\r\nset emp;\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nretain name salary;\r\nrun;",
      "Option B",
      "A",
      "Which code correctly renames NAME to EMP_NAME?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-277",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nrename emp_name=name;\r\nrun;",
    "options": [
      "data out(rename=(name=emp_name));\r\nset emp;\r\nrun;",
      "data out;\r\nset emp;\r\nemp_name=name;\r\nrun;",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-278",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nset emp;\r\nhaving dept='IT';\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nif dept='IT';\r\nrun;",
      "data out;\r\nset emp;\r\nfilter dept='IT';\r\nrun;",
      "data out;\r\nset emp;\r\nwhere dept='IT';\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-279",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Which code correctly uses IF/THEN/ELSE to create a PASS flag when SCORE >= 50?",
    "options": [
      "if score >= 50 then flag='PASS';\r\nelse flag='FAIL';",
      "if score >= 50 flag='PASS';\r\nelse flag='FAIL';",
      "if score >= 50 then flag=PASS;\r\nelse flag=FAIL;",
      "if score > 50 then flag='PASS';\r\nelse flag='FAIL';"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-280",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "Which SAS code correctly removes duplicate observations based on EMP_ID?",
      "proc sort data=employee out=emp_unique; by emp_id; run;",
      "proc duplicate data=employee out=emp_unique; by emp_id; run;",
      "data emp_unique; set employee; delete duplicate; run;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-281",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data output; set employee; having salary > 50000; run;",
    "options": [
      "Option A",
      "A",
      "Which code correctly merges EMP and DEPT by DEPT_ID?",
      "proc merge data=emp dept;\r\nby dept_id;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-282",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nmerge emp dept;\r\nwhere dept_id;\r\nrun;",
    "options": [
      "proc sort data=emp; by dept_id; run;\r\nproc sort data=dept; by dept_id; run;\r\ndata out;\r\nmerge emp dept;\r\nby dept_id;\r\nrun;",
      "Option B",
      "D",
      "Which code correctly creates a left-style merge that keeps all EMP observations and matching DEPT data?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-283",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "data out;\r\nmerge emp dept(in=d);\r\nby dept_id;\r\nif d;\r\nrun;",
    "options": [
      "data out;\r\nset emp dept;\r\nif e;\r\nrun;",
      "data out;\r\nmerge emp dept;\r\nwhere emp.dept_id=dept.dept_id;\r\nrun;",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-284",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Which code correctly defines a macro variable RATE as 10%?",
    "options": [
      "%let rate=0.10;",
      "%macro rate=0.10;",
      "let rate=0.10;",
      "%set rate=0.10;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-285",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "Which code correctly writes a macro variable RATE to the SAS log?",
      "put &rate;",
      "%put &rate;",
      "%print &rate;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-286",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "%macro report;\r\nproc print data=emp;\r\nrun;\r\nend report;",
    "options": [
      "Option A",
      "C",
      "Which code correctly creates a parameterized macro that accepts a dataset name?",
      "%macro report(data=);\r\nproc print data=&data;\r\nrun;\r\n%mend report;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-287",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "%macro report;\r\ndata=&data;\r\n%mend;",
    "options": [
      "%define report(data=);\r\nproc print data=&data;\r\nrun;",
      "Option B",
      "A",
      "Which code correctly calls the parameterized macro REPORT with EMP as the dataset?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-288",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "%call report(data=emp)",
    "options": [
      "%report(data=emp);",
      "%run report emp;",
      "Option C",
      "C"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-289",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "%macro test;\r\n%do i=1 %to 5;\r\n%put &i;\r\n%end;\r\n%mend;\r\n%test;",
    "options": [
      "%macro test;\r\ndo i=1 to 5;\r\n%put i;\r\nend;\r\n%mend;\r\n%test;",
      "%macro test;\r\n%loop i=1 %to 5;\r\n%put &i;\r\n%endloop;\r\n%mend;",
      "%macro test;\r\n%for i=1 %to 5;\r\n%put &i;\r\n%next;\r\n%mend;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-290",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Which SAS code correctly converts the character value SALARY_CHAR into a numeric value?",
    "options": [
      "salary = numeric(salary_char);",
      "salary = input(salary_char, 8.);",
      "salary = convert(salary_char, 8.);",
      "salary = put(salary_char, 8.);"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-291",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "B",
    "options": [
      "Which SAS code correctly calculates the average salary by department?",
      "proc means data=employee;\r\n    calculate mean(salary);\r\nrun;",
      "proc average data=employee;\r\n    var salary;\r\nrun;",
      "proc means data=employee;\r\n    salary mean;\r\nrun;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-292",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "total=0;\r\ndo i=1 to 5;\r\ntotal+ i;\r\nend;",
    "options": [
      "Option A",
      "D",
      "Which code correctly uses DO WHILE to continue while COUNT is less than 5?",
      "do while(count < 5);\r\ncount+1;\r\nend;"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-293",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "while(count < 5) do;\r\ncount+1;\r\nend;",
    "options": [
      "do until(count < 5);\r\ncount+1;\r\nend;",
      "Option B",
      "A",
      "Which code correctly identifies the first record in each DEPT group?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-294",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc sort data=emp; by dept; run;\r\ndata out;\r\nset emp;\r\nby dept;\r\nif first.dept;\r\nrun;",
    "options": [
      "proc sort data=emp; by dept; run;\r\ndata out;\r\nset emp;\r\nif first.dept;\r\nrun;",
      "data out;\r\nset emp;\r\nby first.dept;\r\nrun;",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-295",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "proc sort data=emp; by dept; run;\r\ndata out;\r\nset emp;\r\nby dept;\r\nif last.dept;\r\nrun;",
    "options": [
      "data out;\r\nset emp;\r\nif last.dept;\r\nrun;",
      "proc sort data=emp; by dept; run;\r\ndata out;\r\nset emp;\r\nif first.dept;\r\nrun;",
      "data out;\r\nset emp;\r\nby last.dept;\r\nrun;",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-296",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Which SAS library is temporary and normally cleared when the SAS session ends?",
    "options": [
      "SASUSER",
      "SASHELP",
      "WORK",
      "PERMANENT"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-297",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "C",
    "options": [
      "Which SAS library is commonly used to store permanent user-created datasets?",
      "WORK",
      "A user-defined library such as MYLIB",
      "TEMP"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-298",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "MAKE",
    "options": [
      "Option A",
      "A",
      "Which statement is commonly used to read an existing SAS dataset into a DATA step?",
      "SET"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-299",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "GET",
    "options": [
      "FETCH",
      "Option B",
      "A",
      "Which procedure is used to inspect the contents and attributes of a SAS dataset?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-300",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "PROC CONTENTS",
    "options": [
      "PROC TRANSPOSE",
      "PROC MACRO",
      "Option C",
      "B"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-301",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Create macros",
    "options": [
      "Sort a dataset",
      "Import external files into SAS datasets",
      "Merge only SAS datasets",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-302",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "What is the main purpose of PROC EXPORT?",
    "options": [
      "Write a SAS dataset to an external file format",
      "Create a temporary library",
      "Create an array",
      "Identify FIRST. and LAST."
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-303",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "Which statement is commonly used to read raw text data inside a DATA step?",
      "READFILE",
      "IMPORT",
      "INFILE"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-304",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "WRITEFILE with PRINT",
    "options": [
      "Option A",
      "A",
      "What is the purpose of KEEP, DROP and RENAME?",
      "Create SQL joins"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-305",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Append datasets",
    "options": [
      "Control variables included or named in the output dataset",
      "Option B",
      "D",
      "What is the main difference between WHERE and IF in a DATA step?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-306",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "IF always runs before SET",
    "options": [
      "WHERE can only filter character values",
      "There is no difference",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-307",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Join columns using a key",
    "options": [
      "Add observations from one dataset to the end of another dataset",
      "Transpose rows to columns",
      "Create a macro",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-308",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "What is the purpose of the BY statement DATA step MERGE?",
    "options": [
      "Input datasets must be sorted or indexed by the BY variable(s)",
      "Both datasets must have the same number of observations",
      "Both datasets must have identical variable names",
      "Only one dataset can contain the BY variable"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-309",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "A",
    "options": [
      "Which SAS functions are used for character, numeric and date/time processing?",
      "Only PROC functions",
      "Only SQL functions",
      "Only macro functions"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-310",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "To rename variables",
    "options": [
      "Option A",
      "A",
      "What is the purpose of a DO loop in SAS?",
      "Export a dataset"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-311",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Create a permanent library",
    "options": [
      "Repeat statements for a controlled number of iterations or while/until a condition is met",
      "Option B",
      "D",
      "What are FIRST.variable and LAST.variable?"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-312",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Permanent dataset variables",
    "options": [
      "Macro variables",
      "SQL functions",
      "Option C",
      "A"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-313",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "Only transpose datasets",
    "options": [
      "Only import Excel files",
      "Only define macros",
      "Perform SQL querying, joins, aggregation and table creation/manipulation",
      "Option D"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-314",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "What is a SAS macro mainly used for?",
    "options": [
      "Sorting data",
      "Storing observations permanently",
      "Automating and generating reusable SAS code",
      "Replacing every DATA step"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-sas-315",
    "subject": "SAS",
    "difficulty": "Advanced",
    "question": "C",
    "options": [
      "What does %LET do in SAS macro programming?",
      "Creates or assigns a macro variable",
      "Creates a SAS dataset",
      "Starts a DATA step"
    ],
    "correct": 0,
    "explanation": "SAS Data step & Proc execution engine standard syntax rule."
  },
  {
    "id": "mcq-py-316",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code executes successfully?",
    "options": [
      "student1 = 25\r\nprint(student1)",
      "1student = 25\r\nprint(1student)",
      "1student = 25\r\nprint(1student)",
      "student name = 25\r\nprint(student name)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-317",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code executes without raising a NameError?",
    "options": [
      "value = 50\r\nprint(Value)",
      "value = 50\r\nprint(value)",
      "Value = 50\r\nprint(value)",
      "VALUE = 50\r\nprint(Value)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-318",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "name = \"  Python  \"\r\nprint(len(name))",
    "options": [
      "name = \"  Python  \"\r\nname = len(name.strip)\r\nprint(name)",
      "name = \"  Python  \"\r\nprint(name.strip(len(name)))",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-319",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "a = \"A\"\r\nb = \"B\"\r\nc = \"C\"\r\nprint(a + \"_\" + b + \"_\" + c)",
    "options": [
      "a = \"A\"\r\nb = \"B\"\r\nc = \"C\"\r\nprint(a + \"_\" + b + c)",
      "a = \"A\"\r\nb = \"B\"\r\nc = \"C\"\r\nprint(a + \"_\" + \"_\" + b + c)",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-320",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "name = \"Ganesh Rath\"\r\nprint(name.find(\"a\", 2))",
    "options": [
      "name = \"Ganesh Rath\"\r\nprint(name.find(2, \"a\"))",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-321",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "name[2:4]",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-322",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "age = [10, 20, 30]\r\nage[0:1] = 100",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-323",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "age = [10, 20]\r\nage.insert(90)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-324",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "age = [10, 20, [90, 95]]\r\nprint(age[-2][-1])",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Which code inserts 99 at index 1?"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-325",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "age = [10, 20, 30, 40]\r\nage.pop(30)",
    "options": [
      "age = [10, 20, 30, 40]\r\nage.delete(30)",
      "age = [10, 20, 30, 40]\r\nage.pop()",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-326",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "region = (\"E\", \"W\", \"N\", \"S\")\r\na, b, c = region",
    "options": [
      "region = (\"E\", \"W\", \"N\", \"S\")\r\na, b, c, d, e = region",
      "region = (\"E\", \"W\", \"N\", \"S\")\r\na, b, *c=region",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-327",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "x = {1:\"blr\", 9:\"Bombay\"}\r\nx[\"9\"] = \"Bhopal\"",
    "options": [
      "x = {1:\"blr\", 9:\"Bombay\"}\r\nx.value(9) = \"Bhopal\"",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-328",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "x[\"h\":99]",
    "options": [
      "x.insert(\"h\", 99)",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-329",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "lst = [90, 90, 80, 80, 76]\r\nresult = lst.remove_duplicates()",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-330",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code correctly creates a DataFrame with three columns?",
    "options": [
      "import pandas as pd\r\n\r\ndf = pd.DataFrame({\r\n    \"ID\": [\"S1\", \"S2\"],\r\n    \"Age\": [20, 30],\r\n    \"Gender\": [\"M\", \"F\"]\r\n})",
      "import pandas as pd\r\n\r\ndf = DataFrame({\r\n    \"ID\": [\"S1\", \"S2\"],\r\n    \"Age\": [20, 30],\r\n    \"Gender\": [\"M\", \"F\"]\r\n})",
      "import pandas as pd\r\n\r\ndf = pd.dataframe({\r\n    \"ID\": [\"S1\", \"S2\"],\r\n    \"Age\": [20, 30],\r\n    \"Gender\": [\"M\", \"F\"]\r\n})",
      "import pandas as pd\r\n\r\ndf = pd.DataFrame(\r\n    \"ID\": [\"S1\", \"S2\"],\r\n    \"Age\": [20, 30]\r\n)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-331",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "[10, 30, 40]",
    "options": [
      "[100, 20, 40]",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-332",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "A TypeError occurs because the tuple itself is immutable",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-333",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code correctly creates a DataFrame containing only CUSTOMER_ID and Company?",
    "options": [
      "df = med_2025['CUSTOMER_ID', 'Company']",
      "df = med_2025[['CUSTOMER_ID', 'Company']]",
      "df = med_2025[['CUSTOMER_ID'] + 'Company']",
      "df = med_2025['CUSTOMER_ID']['Company']"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-334",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "numeric = df.select_dtypes(exclude=['int64', 'float64'])",
    "options": [
      "numeric = df.select_numeric()",
      "numeric = df[['int64', 'float64']]",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-335",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "scores.remove(30)",
    "options": [
      "scores.remove(2)",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-336",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Variables must contain _",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-337",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "You need the first 10 rows of a DataFrame. Which code is correct?",
    "options": [
      "df.iloc[:10]",
      "df.iloc[:11]",
      "df.loc[:11]",
      "df.iloc[1:10]"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-338",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.iloc[:,6:13:2]",
    "options": [
      "df.iloc[6:13,2]",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-339",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.loc[20:24]",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-340",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.columns('Cust_num','age','default','balance')",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-341",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code correctly selects the required rows and columns?\r\n\r\nRequirement: rows 2000 to 2500, columns Cust_num, age, default, and balance.",
    "options": [
      "df[['Cust_num','age','default','balance']][20000:2601]",
      "df[['Cust_num','age','default','balance']][2000:2000]",
      "df[2000:2500][['Cust_num','age','default','balance']]",
      "df.iloc[2000:2500,['Cust_num','age','default','balance']]"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-342",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df[df['Company']==('APPOLO','GENO','GSK')]",
    "options": [
      "df[df['Company'].in(['APPOLO','GENO','GSK'])]",
      "df[df['Company'].isin('APPOLO','GENO','GSK')]",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-343",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df[df['Company'].isin(['APPOLO','GENO','GSK'])]",
    "options": [
      "df[df['Company']!=['APPOLO','GENO','GSK']]",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-344",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df[\r\n    (df['GENDER']=='Male') &\r\n    (df['Age']>45) &\r\n    (df['Company']==['APPOLO','GSK','GENO'])\r\n]",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-345",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code selects ages from 30 to 60 including both boundaries?",
    "options": [
      "df[df['Age'].between(30,60,inclusive=True)]",
      "df[df['Age'].between(30,60,inclusive=False)]",
      "df[(df['Age']>30)&(df['Age']<60)]",
      "df[df['Age'].between(30,61,inclusive=False)]"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-346",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df[df['TOWN'].str.contains('Blackburn',na=False)]",
    "options": [
      "df[df['TOWN'].str.startswith('Blackburn',na=False)]",
      "df[df['TOWN']=='Blackburn',na=False]",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-347",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df['Company'].nunique()",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-348",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "def odd_even(x):\r\n    if x % 2 == 0:\r\n        print(x*2, 'the number is even')\r\n    else:\r\n        print(x+10, 'the number is odd')\r\n\r\nodd_even(21)",
    "options": [
      "42 the number is even",
      "31 the number is odd",
      "21 the number is odd",
      "11 the number is odd"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-349",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "def age_bucket(x):\r\n    if x <= 30:\r\n        return 'young-age'\r\n    elif x <= 40:\r\n        return 'mid-young-age'\r\n    elif x <= 50:\r\n        return 'mid-age'\r\n    elif x <= 60:\r\n        return 'mid-old-age'\r\n    else:\r\n        return 'old-age'\r\n\r\nprint(age_bucket(45))",
    "options": [
      "def age_bucket(x):\r\n    if x <= 30:\r\n        return 'young-age'\r\n    elif x <= 40:\r\n        return 'mid-young-age'\r\n    elif x <= 50:\r\n        return 'mid-age'\r\n    if x <= 60:\r\n        return 'mid-old-age'\r\n    else:\r\n        return 'old-age'\r\n\r\nprint(age_bucket(45))",
      "def age_bucket(x):\r\n    if x <= 30:\r\n        return 'young-age'\r\n    elif x <= 40:\r\n        return 'mid-young-age'\r\n    elif x <= 50:\r\n        return 'mid-age'\r\n    elif x <= 60:\r\n        return 'mid-old-age'\r\n    else:\r\n        return 'old-age'\r\n\r\nprint(age_bucket_1(45))",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-350",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Student descending, subject ascending, year ascending",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-351",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.std('Age')",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-352",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code calculates customer count for every company?",
    "options": [
      "df['CUSTOMER_ID'].groupby(df['Company']).count()",
      "df.groupby('CUSTOMER_ID')['Company'].count()",
      "df['Company'].count('CUSTOMER_ID')",
      "df.groupby('Company').count('CUSTOMER_ID')"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-353",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which version correctly applies two conditions to a Pandas Series?",
    "options": [
      "df[(df['Age']>=30) and (df['Age']<=60)]",
      "df[(df['Age']>=30) & (df['Age']<=60)]",
      "df[(df['Age']>=30) && (df['Age']<=60)]",
      "df[df['Age']>=30 and df['Age']<=60]"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-354",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "nameage(age=15,name='Chandan')",
    "options": [
      "nameage(name='Chandan',15)",
      "nameage('Chandan',age=)",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-355",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.loc[\r\n    df['GENDER']=='Female',\r\n    'max spent'\r\n] = df.loc[\r\n    df['GENDER']=='Female',\r\n    'max spent'\r\n].fillna(50)",
    "options": [
      "df.loc[df['GENDER']=='Female'].fillna(50)",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-356",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.apply['Age'](age_bucket)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-357",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.unpivot(\r\n    id_vars=['STU_NAME','YEAR','COMPANY']\r\n)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-358",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code creates a deep copy of dummy?",
    "options": [
      "check = dummy.copy(deep=True)",
      "check = dummy.copy(deep=False)",
      "check = dummy.deepcopy()",
      "check = dummy.deepcopy()"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-359",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "med_all = pd.concat(\r\n    [med_appolo, med_cipla, med_geno]\r\n).reset_index(drop=True)",
    "options": [
      "med_all = pd.merge(\r\n    [med_appolo, med_cipla, med_geno]\r\n)",
      "med_all = pd.concat(\r\n    med_appolo, med_cipla, med_geno\r\n)",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-360",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "It creates a fresh sequential index",
    "options": [
      "It converts columns into rows",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-361",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "pd.concat([table1, table2]).drop_duplicates()",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-362",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "pd.merge(\r\n    stu_education,\r\n    stu_experience,\r\n    on='STU_ID',\r\n    how='left'\r\n)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Suppose the left DataFrame has STU_ID and the right DataFrame has STU_IDS."
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-363",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "pd.merge(df1,df2,on='ID',how='inner')",
    "options": [
      "pd.merge(df1,df2,on='ID',how='right')",
      "pd.merge(df1,df2,on='ID',how='outer')",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-364",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "result = pd.merge(\r\n    perf_01,\r\n    perf_02,\r\n    on='ACCOUNT_NUMBER',\r\n    how='right'\r\n)",
    "options": [
      "result = perf_01[\r\n    perf_01['STATUS_y'].isnull()\r\n]",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-365",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "pd.merge(\r\n    stu_education,\r\n    stu_experience,\r\n    on='STU_ID',\r\n    how='inner'\r\n)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-366",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "pd.concat(\r\n    [prod_units,prod_price],\r\n    axis=1\r\n)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-367",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Both DataFrames contain a column called STATUS. Which code explicitly names the duplicate columns?",
    "options": [
      "pd.merge(\r\n    perf_01,\r\n    perf_02,\r\n    on='ACCOUNT_NUMBER',\r\n    suffixes=('_left','_right')\r\n)",
      "pd.merge(\r\n    perf_01,\r\n    perf_02,\r\n    on='ACCOUNT_NUMBER',\r\n    suffix=('_left','_right')\r\n)",
      "pd.merge(\r\n    perf_01,\r\n    perf_02,\r\n    on='ACCOUNT_NUMBER',\r\n    names=('_left','_right')\r\n)",
      "pd.merge(\r\n    perf_01,\r\n    perf_02,\r\n    on='ACCOUNT_NUMBER',\r\n    rename=('_left','_right')\r\n)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-368",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "pd.concat([df1,df2],axis=0)",
    "options": [
      "pd.merge([df1,df2],axis=1)",
      "pd.append([df1,df2],axis=1)",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-369",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "laptop_sales.groupby(\r\n    'COUNTRY'\r\n).sum('UNITS_SOLD')",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-370",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "laptop_sales_v1['MS'] = (\r\n    laptop_sales_v1['UNITS_SOLD'] -\r\n    laptop_sales_v1['TOTAL_UNITS_SOLD']\r\n)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-371",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which lambda returns \"EVEN\" for even numbers and \"ODD\" otherwise?",
    "options": [
      "odd_even = lambda y: 'EVEN' if y%2==0 else 'ODD'",
      "odd_even = lambda y:  if y%2==0 retun 'EVEN' else 'ODD'",
      "odd_even = lambda y: 'EVEN' if y%2!=0 else 'ODD'",
      "odd_even = lambda y: 'EVEN' if y/2==0 else 'ODD'"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-372",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "med_2025.groupby(\r\n    ['Company','GENDER'],\r\n    as_index=False\r\n).agg(\r\n    BASE=('CUSTOMER_ID','count')\r\n)",
    "options": [
      "med_2025.groupby(\r\n    ['Company','GENDER']\r\n).count('CUSTOMER_ID')",
      "med_2025['CUSTOMER_ID'].count(\r\n    ['Company','GENDER']\r\n)",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-373",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "summary1['BASE'].apply(\r\n    lambda x: x*100/x.sum()\r\n)",
    "options": [
      "summary1.groupby('Company')['BASE'].sum()",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-374",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "med_2025.groupby(\r\n    'Company',\r\n    as_index=False\r\n).agg(\r\n    CUST_BASE=('CUSTOMER_ID','sum'),\r\n    TOTAL_SALES=('Spent amount','count'),\r\n    TOTAL_TRIPS=('NO_OF_TRIPS','mean')\r\n)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-375",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "pd.concat([emp_manager,emp_manager])",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-376",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "med_2025['Company'].length_flag()",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-377",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Suppose:\r\n\r\nID\r\n1\r\n2\r\n2\r\n3\r\n\r\nWhat remains after:\r\n\r\ndf.drop_duplicates(keep='first')",
    "options": [
      "1\r\n2\r\n3",
      "2\r\n3",
      "1\r\n2\r\n2\r\n3",
      "1\r\n3"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-378",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "True",
    "options": [
      "NaN",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-379",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code ranks customer_base in ascending order?",
    "options": [
      "med_summary['ranking'] = med_summary['customer_base'].rank()",
      "med_summary['ranking'] = med_summary['customer_base'].sort()",
      "med_summary['ranking'] = rank(med_summary['customer_base'])",
      "med_summary['ranking'] = med_summary.rank('customer_base')"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-380",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Find the correct syntax",
    "options": [
      "med_summary['ranking'] = ( med_summary['customer_base'] .rank(type='dense') )",
      "med_summary['ranking'] = ( med_summary['customer_base'] .rank(type='dense') )",
      "med_summary['ranking'] = ( med_summary['customer_base'] .rank(method='dense') )",
      "med_summary['ranking'] = (\r\n    med_summary['customer_base']\r\n    .rank(dense=True)\r\n)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-381",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "You need to rank companies separately within every STATE_CODE.\r\n\r\nWhich solution is correct?",
    "options": [
      "med_summary['ranking'] = (\r\n    med_summary['customer_base']\r\n    .rank(method='dense', ascending=False)\r\n)",
      "med_summary['ranking'] = (\r\n    med_summary.groupby('STATE_CODE')['customer_base']\r\n    .rank(method='dense', ascending=False)\r\n)",
      "med_summary['ranking'] = (\r\n    med_summary.groupby('STATE_CODE')['customer_base']\r\n    .rank(method='dense', ascending=False)\r\n)",
      "med_summary['ranking'] = (\r\n    med_summary['STATE_CODE']\r\n    .rank(method='dense', ascending=False)\r\n)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-382",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df['rank'] = df['customer_base'].rank(method='min')",
    "options": [
      "df['rank'] = df['customer_base'].rank(type='max')",
      "df['rank'] = df['customer_base'].agg(method='max')",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-383",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df['cumulative'] = df['customer_base'].sum()",
    "options": [
      "df['cumulative'] = ( df.groupby('customer_base')['STATE_CODE'] .cumsum() )",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-384",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df.groupby('STATE_CODE').head()",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-385",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "highest = df[df['customer_base'] == 1]",
    "options": [
      "Option A",
      "Option B",
      "Which code prints:\r\n\r\n0\r\n1\r\n2\r\n3\r\n4",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-386",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "for i in range(0,4):\r\n    print(i)",
    "options": [
      "for i in range(0,5):\r\n    print(i)",
      "for i in range(0,5):\r\n    print(i)",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-387",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "for x in range(-12,10,-2):\r\n    print(x)",
    "options": [
      "for x in range(12,10,2): print(x)",
      "for x in range(-12,-10,2):\r\n    print(x)",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-388",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "for x in ['python']:\r\n    print(x)",
    "options": [
      "for x in string('python'):\r\n    print(x)",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-389",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "for x in range(1,11):\r\n    if x = 6:\r\n        break",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-390",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code converts:\r\n\r\nbishnupriya\r\n\r\ninto:\r\n\r\nBishnupriya",
    "options": [
      "x.str.upper()",
      "x.str.upper()",
      "x.str.lower()",
      "x.str.proper()"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-391",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Given:\r\n\r\nFull_name = 'Ankit Kumar Mishra'\r\n\r\nWhich code correctly separates the three components?",
    "options": [
      "first_name, middle_name, last_name = Full_name.split()",
      "first_name = Full_name.split()[1]",
      "first_name, middle_name = Full_name.split()",
      "Full_name.split('_')"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-392",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code correctly creates the middle_name column?",
    "options": [
      "stu_name['middle_name'] = (\r\n    stu_name['NAME']\r\n    .apply(lambda x: x.split('_')[1])\r\n)",
      "stu_name['middle_name'] = (\r\n    stu_name['NAME']\r\n    .apply(lambda x: x.split('_')[0])\r\n)",
      "stu_name['middle_name'] = (\r\n    stu_name['NAME']\r\n    .split('_')[1]\r\n)",
      "stu_name['middle_name'] = (\r\n    stu_name['NAME']\r\n    .apply(split('_')[1])\r\n)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-393",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code retrieves the hour from current_date?",
    "options": [
      "current_date.hour",
      "current_date.hour()",
      "current_date.time.hour()",
      "dt.hour(current_date)"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-394",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "Which code returns the full weekday name such as Thursday?",
    "options": [
      "current_date.strftime(\"%A\")",
      "current_date.strftime(\"%a\")",
      "current_date.strftime(\"%w\")",
      "current_date.strftime(\"%u\")"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-395",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "df['NAME'].str.upper()",
    "options": [
      "df['NAME'].str.title()",
      "df['NAME'].upper()",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-396",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "days_diff = end_date - start_date.days",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-397",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "end_date = relativedelta(start_date, years=4)",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  },
  {
    "id": "mcq-py-398",
    "subject": "Python",
    "difficulty": "Intermediate",
    "question": "manager wants to see how customer counts accumulate as companies are processed within each state.\r\nWhich approach should be used?",
    "options": [
      "df.groupby('STATE_CODE')['customer_base'].sum()",
      "df.groupby('STATE_CODE')['customer_base'].cumsum()",
      "df.groupby('STATE_CODE')['customer_base'].rank()",
      "df.groupby('STATE_CODE')['customer_base'].mean()"
    ],
    "correct": 0,
    "explanation": "Python language semantics, Pandas operations, and vectorized indexing rule."
  }
];
