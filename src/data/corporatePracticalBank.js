// Production Corporate Practical Assessment Suites
// Pre-loaded from official DV Analytics test files
export const CORPORATE_PRACTICAL_SUITES = [
  {
    "id": "suite-banking",
    "title": "Banking & Digital Payments Analytics",
    "domain": "sql",
    "badge": "SQL & SAS Corporate Lab",
    "description": "Enterprise transactional, account balance, customer segmentation, and loan risk analytics over 10,000+ financial records.",
    "tables": [
      {
        "name": "Customer",
        "columns": [
          "customer_id",
          "customer_name",
          "gender",
          "city",
          "state",
          "customer_type",
          "customer_segment",
          "registration_date"
        ],
        "rowCount": 1000
      },
      {
        "name": "Account",
        "columns": [
          "account_id",
          "customer_id",
          "account_type",
          "open_date",
          "balance",
          "status"
        ],
        "rowCount": 1550
      },
      {
        "name": "Transactions",
        "columns": [
          "transaction_id",
          "account_id",
          "transaction_date",
          "transaction_type",
          "amount",
          "channel",
          "transaction_status"
        ],
        "rowCount": 10000
      },
      {
        "name": "Loan",
        "columns": [
          "loan_id",
          "customer_id",
          "loan_type",
          "loan_amount",
          "interest_rate",
          "loan_date",
          "status"
        ],
        "rowCount": 700
      }
    ],
    "sampleData": {
      "Customer": [
        {
          "customer_id": 10001,
          "customer_name": "Aditya Bose",
          "gender": "M",
          "city": "Mumbai",
          "state": "Maharashtra",
          "customer_type": "Premium",
          "customer_segment": "SME"
        },
        {
          "customer_id": 10002,
          "customer_name": "Priya Sharma",
          "gender": "F",
          "city": "Bangalore",
          "state": "Karnataka",
          "customer_type": "Regular",
          "customer_segment": "Retail"
        }
      ],
      "Account": [
        {
          "account_id": 20001,
          "customer_id": 10001,
          "account_type": "Savings",
          "balance": 234049,
          "status": "Active"
        },
        {
          "account_id": 20002,
          "customer_id": 10002,
          "account_type": "Current",
          "balance": 541200,
          "status": "Active"
        }
      ],
      "Transactions": [
        {
          "transaction_id": 30001,
          "account_id": 20001,
          "transaction_type": "Credit",
          "amount": 25000,
          "channel": "UPI",
          "transaction_status": "Success"
        },
        {
          "transaction_id": 30002,
          "account_id": 20002,
          "transaction_type": "Debit",
          "amount": 12500,
          "channel": "NetBanking",
          "transaction_status": "Success"
        }
      ]
    },
    "questions": [
      {
        "id": "bank-sql-1",
        "number": 1,
        "title": "Find the total Transaction_Amount and number of successful transactions for each...",
        "question": "Find the total Transaction_Amount and number of successful transactions for each Payment_Mode, sorted from highest to lowest transaction amount.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Transaction Analytics"
      },
      {
        "id": "bank-sql-2",
        "number": 2,
        "title": "Calculate the month-wise total Transaction_Amount, successful transactions, and ...",
        "question": "Calculate the month-wise total Transaction_Amount, successful transactions, and transaction success rate (%) for the entire dataset.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Transaction Analytics"
      },
      {
        "id": "bank-sql-3",
        "number": 3,
        "title": "List the top 5 transactions with the highest Transaction_Amount, along with Cust...",
        "question": "List the top 5 transactions with the highest Transaction_Amount, along with Customer_Name, Account_Type, Payment_Mode, Transaction_Date, and Transaction_Status.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Transaction Analytics"
      },
      {
        "id": "bank-sql-4",
        "number": 4,
        "title": "Find the average Transaction_Amount and total number of transactions for each Tr...",
        "question": "Find the average Transaction_Amount and total number of transactions for each Transaction_Type, sorted by highest average transaction amount.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Transaction Analytics"
      },
      {
        "id": "bank-sql-5",
        "number": 5,
        "title": "Identify which Transaction_Channel generated the highest total Transaction_Amoun...",
        "question": "Identify which Transaction_Channel generated the highest total Transaction_Amount, along with the total number of transactions and successful transactions.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Transaction Analytics"
      },
      {
        "id": "bank-sql-6",
        "number": 6,
        "title": "Find the total Transaction_Amount and number of transactions contributed by each...",
        "question": "Find the total Transaction_Amount and number of transactions contributed by each Customer_Segment, and identify which segment has the highest transaction value.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-7",
        "number": 7,
        "title": "List the top 10 customers by total Transaction_Amount, along with their Customer...",
        "question": "List the top 10 customers by total Transaction_Amount, along with their Customer_Name, City, Customer_Segment, and total number of transactions.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-8",
        "number": 8,
        "title": "Calculate the average Transaction_Amount per customer by City and State, to iden...",
        "question": "Calculate the average Transaction_Amount per customer by City and State, to identify the regions with the highest average transaction value.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-9",
        "number": 9,
        "title": "Find customers who have an Active account but have completed fewer than 2 transa...",
        "question": "Find customers who have an Active account but have completed fewer than 2 transactions, identifying potentially inactive banking customers.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-10",
        "number": 10,
        "title": "Compare the average Transaction_Amount between Male, Female, and Other customers...",
        "question": "Compare the average Transaction_Amount between Male, Female, and Other customers, and show the total number of transactions for each gender group.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-11",
        "number": 11,
        "title": "Find the top 5 accounts by Account_Balance, along with Customer_Name, Account_Ty...",
        "question": "Find the top 5 accounts by Account_Balance, along with Customer_Name, Account_Type, City, and Account_Status.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-12",
        "number": 12,
        "title": "Calculate the total Account_Balance and average Account_Balance by Account_Type,...",
        "question": "Calculate the total Account_Balance and average Account_Balance by Account_Type, sorted from highest to lowest total balance.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-13",
        "number": 13,
        "title": "Find all accounts that are Active but have no successful transactions, along wit...",
        "question": "Find all accounts that are Active but have no successful transactions, along with Customer_Name, Account_Type, and Account_Balance.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-14",
        "number": 14,
        "title": "Identify the Account_Type with the highest transaction activity, showing total t...",
        "question": "Identify the Account_Type with the highest transaction activity, showing total transactions, successful transactions, and total Transaction_Amount.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-15",
        "number": 15,
        "title": "Find customers who have more than one account, displaying Customer_Name, number ...",
        "question": "Find customers who have more than one account, displaying Customer_Name, number of accounts, total Account_Balance, and Account_Type.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-16",
        "number": 16,
        "title": "Find the top 5 customers by Loan_Amount, along with Customer_Name, Loan_Type, Lo...",
        "question": "Find the top 5 customers by Loan_Amount, along with Customer_Name, Loan_Type, Loan_Status, and Interest_Rate.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-17",
        "number": 17,
        "title": "Calculate the total Loan_Amount and average Interest_Rate for each Loan_Type, so...",
        "question": "Calculate the total Loan_Amount and average Interest_Rate for each Loan_Type, sorted by highest total loan amount.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-18",
        "number": 18,
        "title": "Find customers who have an Active loan but have no successful transactions, alon...",
        "question": "Find customers who have an Active loan but have no successful transactions, along with Customer_Name, Loan_Type, and Loan_Amount.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-19",
        "number": 19,
        "title": "Identify which Customer_Segment has the highest total Loan_Amount, along with th...",
        "question": "Identify which Customer_Segment has the highest total Loan_Amount, along with the number of customers and average loan amount.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      },
      {
        "id": "bank-sql-20",
        "number": 20,
        "title": "Find the top 10 customers based on total Loan_Amount, along with their total Tra...",
        "question": "Find the top 10 customers based on total Loan_Amount, along with their total Transaction_Amount and Account_Balance.",
        "domain": "sql",
        "dataset": "Banking & Digital Payments",
        "category": "Customer & Loan Analytics"
      }
    ]
  },
  {
    "id": "suite-healthcare",
    "title": "Healthcare Hospital Analytics",
    "domain": "sql",
    "badge": "SQL Clinical Lab",
    "description": "Patient admissions, outpatient consultations, diagnostic prescriptions, and doctor revenue metrics across multi-specialty hospital operations.",
    "tables": [
      {
        "name": "Patient_Dataset",
        "columns": [
          "patient_id",
          "patient_name",
          "gender",
          "city",
          "state",
          "blood_group",
          "insurance_type",
          "age"
        ],
        "rowCount": 1000
      },
      {
        "name": "Doctor_Records",
        "columns": [
          "doctor_id",
          "doctor_name",
          "specialization",
          "department",
          "experience_years"
        ],
        "rowCount": 100
      },
      {
        "name": "Appointment_Records",
        "columns": [
          "appointment_id",
          "patient_id",
          "doctor_id",
          "appointment_date",
          "status",
          "consultation_fee",
          "diagnosis"
        ],
        "rowCount": 5000
      },
      {
        "name": "Prescription_Records",
        "columns": [
          "prescription_id",
          "appointment_id",
          "medicine_id",
          "quantity",
          "dosage_days"
        ],
        "rowCount": 10000
      },
      {
        "name": "MEDICINE",
        "columns": [
          "medicine_id",
          "medicine_name",
          "category",
          "unit_price"
        ],
        "rowCount": 100
      }
    ],
    "sampleData": {
      "Patient_Dataset": [
        {
          "patient_id": 1,
          "patient_name": "Karan Joshi",
          "gender": "M",
          "city": "Mumbai",
          "insurance_type": "Private",
          "age": 73
        },
        {
          "patient_id": 2,
          "patient_name": "Meera Sen",
          "gender": "F",
          "city": "Bhubaneswar",
          "insurance_type": "Corporate",
          "age": 42
        }
      ],
      "Doctor_Records": [
        {
          "doctor_id": 201,
          "doctor_name": "Dr. Rohan Iyer",
          "specialization": "Cardiology",
          "department": "Cardiology",
          "experience_years": 16
        }
      ],
      "Appointment_Records": [
        {
          "appointment_id": 5001,
          "patient_id": 1,
          "doctor_id": 201,
          "status": "Completed",
          "consultation_fee": 1200,
          "diagnosis": "Chest Pain"
        }
      ]
    },
    "questions": [
      {
        "id": "health-sql-1",
        "number": 1,
        "title": "Find the total number of Completed appointments and total Consultation_Fee gener...",
        "question": "Find the total number of Completed appointments and total Consultation_Fee generated by each Department, sorted from highest to lowest revenue.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-2",
        "number": 2,
        "title": "Calculate the month-wise total appointments, completed appointments, and appoint...",
        "question": "Calculate the month-wise total appointments, completed appointments, and appointment completion rate (%) for the entire hospital dataset.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-3",
        "number": 3,
        "title": "List the top 5 appointments with the highest Consultation_Fee, along with the Pa...",
        "question": "List the top 5 appointments with the highest Consultation_Fee, along with the Patient_Name, Doctor_Name, Department, Appointment_Date, and Appointment_Status.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-4",
        "number": 4,
        "title": "Find the average Consultation_Fee and average number of appointments per patient...",
        "question": "Find the average Consultation_Fee and average number of appointments per patient, broken down by Department.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-5",
        "number": 5,
        "title": "Identify which Department handled the highest number of unique patients, along w...",
        "question": "Identify which Department handled the highest number of unique patients, along with the total appointments, completed appointments, and consultation revenue generated.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-6",
        "number": 6,
        "title": "Find the total number of appointments and total consultation revenue contributed...",
        "question": "Find the total number of appointments and total consultation revenue contributed by each Insurance_Type — which insurance group generates the highest hospital revenue?",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-7",
        "number": 7,
        "title": "List the top 10 patients by total consultation spending, along with their Patien...",
        "question": "List the top 10 patients by total consultation spending, along with their Patient_Name, City, Insurance_Type, and total number of completed appointments.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-8",
        "number": 8,
        "title": "Calculate the average consultation revenue per patient by City and State, to ide...",
        "question": "Calculate the average consultation revenue per patient by City and State, to identify the most valuable patient regions.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-9",
        "number": 9,
        "title": "Find patients who have registered with the hospital but have had less than 2 com...",
        "question": "Find patients who have registered with the hospital but have had less than 2 completed appointments — potential low-engagement patients.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-10",
        "number": 10,
        "title": "Compare the average consultation fee and appointment frequency between different...",
        "question": "Compare the average consultation fee and appointment frequency between different Gender groups, and identify whether any group has higher-value or more frequent hospital visits.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-11",
        "number": 11,
        "title": "Find the top 5 doctors by total consultation revenue generated, along with their...",
        "question": "Find the top 5 doctors by total consultation revenue generated, along with their Doctor_Name, Department, Specialization, and number of completed appointments.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-12",
        "number": 12,
        "title": "Calculate the total quantity of medicines prescribed and total prescription cost...",
        "question": "Calculate the total quantity of medicines prescribed and total prescription cost by Medicine_Category, to identify the most frequently used and highest-cost medicine categories.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-13",
        "number": 13,
        "title": "List all medicines that are prescribed frequently but have a relatively low unit...",
        "question": "List all medicines that are prescribed frequently but have a relatively low unit price — showing Medicine_Name, Category, total quantity prescribed, and total prescription cost.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-14",
        "number": 14,
        "title": "Find the average quantity prescribed per medicine by Doctor_Department, and iden...",
        "question": "Find the average quantity prescribed per medicine by Doctor_Department, and identify which departments have the highest medicine usage.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-15",
        "number": 15,
        "title": "Identify the top 10 medicines by total prescription cost, along with Medicine_Na...",
        "question": "Identify the top 10 medicines by total prescription cost, along with Medicine_Name, Category, total quantity prescribed, and number of appointments in which each medicine was prescribed.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-16",
        "number": 16,
        "title": "Find the total number of appointments and total consultation revenue for each Do...",
        "question": "Find the total number of appointments and total consultation revenue for each Doctor, and identify the doctors with the highest appointment workload.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-17",
        "number": 17,
        "title": "Calculate the month-wise total consultation revenue, completed appointments, and...",
        "question": "Calculate the month-wise total consultation revenue, completed appointments, and average consultation fee for the hospital.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-18",
        "number": 18,
        "title": "Find the top 5 patients who have the highest number of hospital visits, along wi...",
        "question": "Find the top 5 patients who have the highest number of hospital visits, along with their Patient_Name, City, Insurance_Type, and total consultation revenue.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-19",
        "number": 19,
        "title": "Identify departments where the number of cancelled appointments is greater than ...",
        "question": "Identify departments where the number of cancelled appointments is greater than the average number of cancelled appointments across all departments.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-20",
        "number": 20,
        "title": "Find doctors whose completed appointment count is greater than the average compl...",
        "question": "Find doctors whose completed appointment count is greater than the average completed appointment count across all doctors. Display Doctor_Name, Department, Specialization, and completed appointment count.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Department Revenue & Appointments"
      },
      {
        "id": "health-sql-21",
        "number": 21,
        "title": "Find the total number of patients and total completed appointments for each Insu...",
        "question": "Find the total number of patients and total completed appointments for each Insurance_Type, and identify which insurance group has the highest hospital utilization.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-22",
        "number": 22,
        "title": "Find the top 10 cities based on the number of registered patients, along with th...",
        "question": "Find the top 10 cities based on the number of registered patients, along with the average patient age and number of completed appointments.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-23",
        "number": 23,
        "title": "Identify patients who have had appointments with the same doctor more than once....",
        "question": "Identify patients who have had appointments with the same doctor more than once. Display Patient_Name, Doctor_Name, and number of appointments.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-24",
        "number": 24,
        "title": "Find patients whose total consultation spending is greater than the average cons...",
        "question": "Find patients whose total consultation spending is greater than the average consultation spending per patient across the hospital.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-25",
        "number": 25,
        "title": "Compare the number of completed, cancelled, and pending appointments across diff...",
        "question": "Compare the number of completed, cancelled, and pending appointments across different patient Gender groups. Identify which gender group has the highest completion rate.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-26",
        "number": 26,
        "title": "Find the top 5 doctors based on the number of unique patients treated, along wit...",
        "question": "Find the top 5 doctors based on the number of unique patients treated, along with their Department, Specialization, and total consultation revenue.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-27",
        "number": 27,
        "title": "Calculate the total number of prescriptions, total quantity prescribed, and tota...",
        "question": "Calculate the total number of prescriptions, total quantity prescribed, and total prescription cost for each Medicine_Category. Identify the category with the highest prescription cost.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-28",
        "number": 28,
        "title": "Find medicines that have been prescribed to more than 50 different patients. Dis...",
        "question": "Find medicines that have been prescribed to more than 50 different patients. Display Medicine_Name, Category, number of patients, and total quantity prescribed.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-29",
        "number": 29,
        "title": "Identify doctors whose patients received prescriptions with a total prescription...",
        "question": "Identify doctors whose patients received prescriptions with a total prescription cost greater than the average prescription cost across all doctors. Display Doctor_Name, Department, and total prescription cost.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      },
      {
        "id": "health-sql-30",
        "number": 30,
        "title": "Find the top 10 doctors based on their total consultation revenue. Display Docto...",
        "question": "Find the top 10 doctors based on their total consultation revenue. Display Doctor_Name, Department, total completed appointments, and total Consultation_Fee.",
        "domain": "sql",
        "dataset": "Healthcare Hospital Analytics",
        "category": "Doctor Workload & Patient Retention"
      }
    ]
  },
  {
    "id": "suite-sales-master",
    "title": "Enterprise Sales & Profitability Analytics",
    "domain": "sql",
    "badge": "SQL & Excel Master Exam",
    "description": "High-volume fact-table analytics joining 60,000 sales records with 15,000 customers and product catalogs to assess profit margins and regional CAC.",
    "tables": [
      {
        "name": "SALES_MASTER",
        "columns": [
          "Order_ID",
          "Customer_ID",
          "Product_ID",
          "Quantity",
          "Unit_Price",
          "Discount_Amount",
          "Gross_Sales",
          "Net_Sales",
          "Product_Cost",
          "Profit",
          "Order_Channel"
        ],
        "rowCount": 60000
      },
      {
        "name": "CUSTOMER_MASTER",
        "columns": [
          "Customer_ID",
          "Customer_Name",
          "Gender",
          "Age",
          "Email_ID",
          "City",
          "State",
          "Customer_Segment",
          "Loyalty_Points",
          "Membership_Status"
        ],
        "rowCount": 15000
      },
      {
        "name": "PRODUCT_MASTERE",
        "columns": [
          "Product_ID",
          "Product_Name",
          "Product_Category",
          "Brand",
          "Product_Cost",
          "Selling_Price",
          "Product_Rating"
        ],
        "rowCount": 1000
      }
    ],
    "sampleData": {
      "SALES_MASTER": [
        {
          "Order_ID": "ORD0001",
          "Customer_ID": "CUST0001",
          "Product_ID": "PRD001",
          "Quantity": 2,
          "Unit_Price": 1999,
          "Gross_Sales": 3998,
          "Discount_Amount": 399.8,
          "Net_Sales": 3598.2,
          "Profit": 1198.2,
          "Order_Channel": "Mobile App"
        }
      ]
    },
    "questions": [
      {
        "id": "sales-sql-1",
        "number": 1,
        "title": "Find the total Net_Sales and Profit generated by each Order_Channel, sorted from...",
        "question": "Find the total Net_Sales and Profit generated by each Order_Channel, sorted from highest to lowest profit.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-2",
        "number": 2,
        "title": "Calculate the month-wise Gross Sales, Net Sales, and Profit Margin % (Profit/Net...",
        "question": "Calculate the month-wise Gross Sales, Net Sales, and Profit Margin % (Profit/Net_Sales) for the entire dataset.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-3",
        "number": 3,
        "title": "List the top 5 orders with the highest Discount_Amount as a percentage of Gross_...",
        "question": "List the top 5 orders with the highest Discount_Amount as a percentage of Gross_Sales, along with the customer name and product name involved.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-4",
        "number": 4,
        "title": "Find the average order value (Net_Sales) and average profit per order, broken do...",
        "question": "Find the average order value (Net_Sales) and average profit per order, broken down by Product_Category.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-5",
        "number": 5,
        "title": "Identify which Campaign_ID generated the highest total profit, along with the nu...",
        "question": "Identify which Campaign_ID generated the highest total profit, along with the number of orders and customers it influenced.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-6",
        "number": 6,
        "title": "Find the total revenue (Net_Sales) and profit contributed by each Customer_Segme...",
        "question": "Find the total revenue (Net_Sales) and profit contributed by each Customer_Segment (New, Regular, Premium, VIP) — which segment is actually most profitable?",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-7",
        "number": 7,
        "title": "List the top 10 customers by total spend (Net_Sales), along with their City, Mem...",
        "question": "List the top 10 customers by total spend (Net_Sales), along with their City, Membership_Status, and total number of orders placed.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-8",
        "number": 8,
        "title": "Calculate average Net_Sales per customer by City and State, to identify the most...",
        "question": "Calculate average Net_Sales per customer by City and State, to identify the most valuable regions.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-9",
        "number": 9,
        "title": "Find customers whose Membership_Status is \"Platinum\" but who have placed fewer t...",
        "question": "Find customers whose Membership_Status is \"Platinum\" but who have placed fewer than 2 orders — potential mismatches between loyalty tier and actual purchase behavior.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-10",
        "number": 10,
        "title": "Compare average order value between Male, Female, and Other customers, and ident...",
        "question": "Compare average order value between Male, Female, and Other customers, and identify if any gender group skews toward higher-value or higher-discount purchases.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-11",
        "number": 11,
        "title": "Find the top 5 products by total Profit generated, along with their Product_Cate...",
        "question": "Find the top 5 products by total Profit generated, along with their Product_Category and Brand.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-12",
        "number": 12,
        "title": "Calculate total Quantity sold and Profit Margin % by Product_Category, to identi...",
        "question": "Calculate total Quantity sold and Profit Margin % by Product_Category, to identify the most profitable category overall.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-13",
        "number": 13,
        "title": "List all products with Product_Status = 'Discontinued' or 'Inactive' that still ...",
        "question": "List all products with Product_Status = 'Discontinued' or 'Inactive' that still generated sales — showing how much revenue/profit they contributed before phase-out.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-14",
        "number": 14,
        "title": "Find the average Discount_Amount given per Brand, and identify which brands are ...",
        "question": "Find the average Discount_Amount given per Brand, and identify which brands are being discounted the most.",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      },
      {
        "id": "sales-sql-15",
        "number": 15,
        "title": "Identify products with a Product_Rating below 3.5 that still rank in the top 10 ...",
        "question": "Identify products with a Product_Rating below 3.5 that still rank in the top 10 by total sales — are low-rated products still selling well, and why might that be?",
        "domain": "sql",
        "dataset": "Enterprise Sales Master",
        "category": "Sales, Profit & Customer LTV"
      }
    ]
  },
  {
    "id": "suite-excel-insurance",
    "title": "Insurance Portfolio Excel Data Analytics",
    "domain": "excel",
    "badge": "Excel Corporate Lab",
    "description": "Policy underwriting, claims ratio, loss cost, and premium collection analysis using XLOOKUP, INDEX/MATCH, and dynamic array calculations.",
    "tables": [
      {
        "name": "CUSTOMER_TABLE",
        "columns": [
          "Customer_ID",
          "Customer_Name",
          "Gender",
          "DOB",
          "City",
          "State",
          "Customer_Segment",
          "Onboard_Date"
        ],
        "rowCount": 10000
      },
      {
        "name": "POLICY_MASTER_TABLE",
        "columns": [
          "Policy_ID",
          "Customer_ID",
          "Policy_Type",
          "Sum_Assured",
          "Annual_Premium",
          "Policy_Status"
        ],
        "rowCount": 10000
      },
      {
        "name": "CLAIM_Master",
        "columns": [
          "Claim_ID",
          "Policy_ID",
          "Claim_Date",
          "Claim_Type",
          "Claim_Amount",
          "Claim_Status"
        ],
        "rowCount": 10000
      },
      {
        "name": "Underwriting_Risk",
        "columns": [
          "Policy_ID",
          "Risk_Score",
          "Risk_Category",
          "Fraud_Flag"
        ],
        "rowCount": 10000
      },
      {
        "name": "Premium_Payments",
        "columns": [
          "Payment_ID",
          "Policy_ID",
          "Payment_Date",
          "Payment_Mode",
          "Premium_Amount",
          "Payment_Status"
        ],
        "rowCount": 25000
      }
    ],
    "sampleData": {
      "CUSTOMER_TABLE": [
        {
          "Customer_ID": "C001",
          "Customer_Name": "Gokul Borra",
          "Gender": "M",
          "City": "Bangalore",
          "Customer_Segment": "Retail"
        }
      ]
    },
    "questions": [
      {
        "id": "excel-ins-1",
        "number": 1,
        "title": "Find the total Premium Amount and total Premium Paid for each Policy Type, sorte...",
        "question": "Find the total Premium Amount and total Premium Paid for each Policy Type, sorted from highest to lowest Premium Paid.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-2",
        "number": 2,
        "title": "Calculate the month-wise Total Premium, Premium Paid and Collection Rate % for t...",
        "question": "Calculate the month-wise Total Premium, Premium Paid and Collection Rate % for the entire dataset.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-3",
        "number": 3,
        "title": "List the top 5 policies with the highest Claim Amount as a percentage of Premium...",
        "question": "List the top 5 policies with the highest Claim Amount as a percentage of Premium Amount, along with the Customer Name, Policy Type, and Risk Category.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-4",
        "number": 4,
        "title": "Find the average Premium Amount and average Premium Paid per policy, broken down...",
        "question": "Find the average Premium Amount and average Premium Paid per policy, broken down by Policy Type.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-5",
        "number": 5,
        "title": "Identify which Policy Type generated the highest total Premium, along with the n...",
        "question": "Identify which Policy Type generated the highest total Premium, along with the number of policies and number of customers.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-6",
        "number": 6,
        "title": "Find the total Premium  and total Claim Amount contributed by each Customer Segm...",
        "question": "Find the total Premium  and total Claim Amount contributed by each Customer Segment — which segment is generating the highest premium and which has the highest claim exposure?",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-7",
        "number": 7,
        "title": "List the top 10 customers by total Premium Paid, along with their City, State, C...",
        "question": "List the top 10 customers by total Premium Paid, along with their City, State, Customer Segment, and total number of policies.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-8",
        "number": 8,
        "title": "Calculate the average Premium Paid per customer by City and State, to identify t...",
        "question": "Calculate the average Premium Paid per customer by City and State, to identify the most valuable regions.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-9",
        "number": 9,
        "title": "How many customers are there by Gender, Age Bucket, State, and Customer Segment?...",
        "question": "How many customers are there by Gender, Age Bucket, State, and Customer Segment?",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-10",
        "number": 10,
        "title": "Compare the average Premium Amount, average Claim Amount, and Claim Ratio % acro...",
        "question": "Compare the average Premium Amount, average Claim Amount, and Claim Ratio % across different Customer Segments, and identify which segment has the highest risk.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-11",
        "number": 11,
        "title": "Find the top 5 policies by total Claim Amount, along with their Policy Type, Cus...",
        "question": "Find the top 5 policies by total Claim Amount, along with their Policy Type, Customer Name, and Risk Category.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-12",
        "number": 12,
        "title": "Calculate Total Claims, Total Claim Amount and Claim to Premium Ratio % by Polic...",
        "question": "Calculate Total Claims, Total Claim Amount and Claim to Premium Ratio % by Policy Type, to identify the policy type with the highest claim exposure.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-13",
        "number": 13,
        "title": "Identify customers who have multiple settled claims and calculate their total Cl...",
        "question": "Identify customers who have multiple settled claims and calculate their total Claim Amount.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-14",
        "number": 14,
        "title": "Find the average Claim Amount and average Risk Score by Risk Category, and ident...",
        "question": "Find the average Claim Amount and average Risk Score by Risk Category, and identify which risk category has the highest claim severity.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      },
      {
        "id": "excel-ins-15",
        "number": 15,
        "title": "Identify policies with a Risk Score below the high-risk threshold that still hav...",
        "question": "Identify policies with a Risk Score below the high-risk threshold that still have unusually high claim amounts — potential cases for further investigation.",
        "domain": "excel",
        "dataset": "Insurance Analytics Master",
        "category": "Formulas & Dynamic Arrays"
      }
    ]
  },
  {
    "id": "suite-python-supplychain",
    "title": "Python Pandas Supply Chain Analytics",
    "domain": "python",
    "badge": "Python 3.11 Lab",
    "description": "Data manipulation, cross-table merging (Sales, Customer, Vendor, Product), annual CAGR, and vendor distribution analytics.",
    "tables": [
      {
        "name": "Sales",
        "columns": [
          "Order_ID",
          "Cust_ID",
          "Prod_ID",
          "Vendor_ID",
          "Order_Date",
          "Units"
        ],
        "rowCount": 1124
      },
      {
        "name": "Customer",
        "columns": [
          "Cust_ID",
          "Gender",
          "Age"
        ],
        "rowCount": 50
      },
      {
        "name": "Product",
        "columns": [
          "Prod_ID",
          "Prod_Name",
          "Category",
          "Price"
        ],
        "rowCount": 30
      },
      {
        "name": "Vendor",
        "columns": [
          "Vendor_ID",
          "Vendor_Name",
          "Location",
          "Region"
        ],
        "rowCount": 12
      }
    ],
    "sampleData": {
      "Sales": [
        {
          "Order_ID": 1,
          "Cust_ID": "CUST_43",
          "Prod_ID": "PROD_25",
          "Vendor_ID": "V_11",
          "Units": 561
        }
      ]
    },
    "questions": [
      {
        "id": "py-pract-1",
        "number": 1,
        "title": "Merge the Sales and Product tables with the Customer, Vendor, and Time tables....",
        "question": "Merge the Sales and Product tables with the Customer, Vendor, and Time tables.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Sales Analytics"
      },
      {
        "id": "py-pract-2",
        "number": 2,
        "title": "Calculate total sales for each year....",
        "question": "Calculate total sales for each year.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Sales Analytics"
      },
      {
        "id": "py-pract-3",
        "number": 3,
        "title": "Calculate total sales for each year and determine the percentage change compared...",
        "question": "Calculate total sales for each year and determine the percentage change compared with the previous year.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Sales Analytics"
      },
      {
        "id": "py-pract-4",
        "number": 4,
        "title": "Find the top 10 orders based on sales....",
        "question": "Find the top 10 orders based on sales.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Sales Analytics"
      },
      {
        "id": "py-pract-5",
        "number": 5,
        "title": "calculate AOV (Hint: Total Sales / Number of Orders)...",
        "question": "calculate AOV (Hint: Total Sales / Number of Orders)",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Sales Analytics"
      },
      {
        "id": "py-pract-6",
        "number": 6,
        "title": "Calculate total units sold by quarter....",
        "question": "Calculate total units sold by quarter.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Sales Analytics"
      },
      {
        "id": "py-pract-7",
        "number": 7,
        "title": "Calculate total sales generated by:   Male  , Female...",
        "question": "Calculate total sales generated by:   Male  , Female",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Customer Analystics"
      },
      {
        "id": "py-pract-8",
        "number": 8,
        "title": "Find the number of unique customers in each gender....",
        "question": "Find the number of unique customers in each gender.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Customer Analystics"
      },
      {
        "id": "py-pract-9",
        "number": 9,
        "title": "Calculate total sales for every customer.Return the top 10 customers....",
        "question": "Calculate total sales for every customer.Return the top 10 customers.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Customer Analystics"
      },
      {
        "id": "py-pract-10",
        "number": 10,
        "title": "Create age groups:...",
        "question": "Create age groups:",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Customer Analystics"
      },
      {
        "id": "py-pract-11",
        "number": 11,
        "title": "Then calculate total sales for each age group....",
        "question": "Then calculate total sales for each age group.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Customer Analystics"
      },
      {
        "id": "py-pract-12",
        "number": 12,
        "title": "Calculate:Average Sales for every age group....",
        "question": "Calculate:Average Sales for every age group.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Customer Analystics"
      },
      {
        "id": "py-pract-13",
        "number": 13,
        "title": "Calculate total sales for every vendor....",
        "question": "Calculate total sales for every vendor.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Vendor Analytics"
      },
      {
        "id": "py-pract-14",
        "number": 14,
        "title": "Calculate total units sold by each vendor....",
        "question": "Calculate total units sold by each vendor.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Vendor Analytics"
      },
      {
        "id": "py-pract-15",
        "number": 15,
        "title": "Calculate each vendor's percentage contribution to total sales. Identify vendors...",
        "question": "Calculate each vendor's percentage contribution to total sales. Identify vendors contributing more than 10%",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Vendor Analytics"
      },
      {
        "id": "py-pract-16",
        "number": 16,
        "title": "Calculate vendor sales for each year....",
        "question": "Calculate vendor sales for each year.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Vendor Analytics"
      },
      {
        "id": "py-pract-17",
        "number": 17,
        "title": "Calculate total sales for each region....",
        "question": "Calculate total sales for each region.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Vendor Analytics"
      },
      {
        "id": "py-pract-18",
        "number": 18,
        "title": "Find the top 10 products based on total sales....",
        "question": "Find the top 10 products based on total sales.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Product Analytics"
      },
      {
        "id": "py-pract-19",
        "number": 19,
        "title": "Calculate total units sold for every product....",
        "question": "Calculate total units sold for every product.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Product Analytics"
      },
      {
        "id": "py-pract-20",
        "number": 20,
        "title": "Find the product generating the highest sales....",
        "question": "Find the product generating the highest sales.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Product Analytics"
      },
      {
        "id": "py-pract-21",
        "number": 21,
        "title": "Calculate each product's contribution to total sales....",
        "question": "Calculate each product's contribution to total sales.",
        "domain": "python",
        "dataset": "Retail Vendor Supply Chain",
        "category": "Product Analytics"
      }
    ]
  }
];
