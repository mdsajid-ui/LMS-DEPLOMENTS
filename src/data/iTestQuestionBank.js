// Comprehensive 150+ Question Bank Dataset across 9 Applications
// Includes 10 Complex Multi-Table SQL Labs (4-5 Tables each) & 10 Complex Python Coding Labs

export const QUESTION_BANK_DATA = [
  // =========================================================================
  // 1. EXCEL AI (14 MCQs)
  // =========================================================================
  {
    id: 'qb-excel-1',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'Which Excel function combined with Copilot prompt logic is best suited for dynamic array searching across multiple criteria?',
    options: ['VLOOKUP()', 'XLOOKUP() with FILTER()', 'INDEX(MATCH())', 'CONCATENATE()'],
    correctAnswer: 1,
    explanation: 'XLOOKUP() combined with dynamic array FILTER() allows multi-criteria array evaluation without hardcoded range indexes.'
  },
  {
    id: 'qb-excel-2',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'In Excel AI Copilot, how do you specify a formula to aggregate sales for rows where status is "Closed"?',
    options: ['=SUMIF(Status, "Closed", Sales)', '=TOTAL(Sales, "Closed")', '=COUNTIF(Sales, "Closed")', '=AGGREGATE("Closed", Sales)'],
    correctAnswer: 0,
    explanation: '=SUMIF(range, criteria, sum_range) adds all sales matching the specified string criteria.'
  },
  {
    id: 'qb-excel-3',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'What is the primary advantage of LET() functions when constructing complex AI-driven spreadsheet formulas?',
    options: ['Automates chart creation', 'Assigns names to calculation results to improve readability and performance', 'Executes VBA macros', 'Protects worksheet tabs'],
    correctAnswer: 1,
    explanation: 'LET() defines intermediate variable names, reducing repeated sub-expression calculations and speeding up workbook execution.'
  },
  {
    id: 'qb-excel-4',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'Which formula dynamically sorts a table by revenue column (Column C) in descending order?',
    options: ['=SORT(A2:C100, 3, -1)', '=ORDERBY(A2:C100, "C", DESC)', '=RANK(C2:C100)', '=FILTER(A2:C100, C2:C100 > 0)'],
    correctAnswer: 0,
    explanation: '=SORT(array, sort_index, sort_order) with -1 sorts descending by the 3rd column.'
  },
  {
    id: 'qb-excel-5',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'When using Excel Power Query to unpivot columns into attribute-value pairs, which transformation step is executed?',
    options: ['Unpivot Columns', 'Transpose Matrix', 'Pivot Column', 'Group By Sum'],
    correctAnswer: 0,
    explanation: 'Unpivot Columns transforms wide-format date headers into normalized key-value attribute rows.'
  },
  {
    id: 'qb-excel-6',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'What does the Excel LAMBDA() function allow users to create?',
    options: ['Custom reusable functions without VBA code', 'Automated email alerts', 'External SQL connections', 'Pivot Table Slicers'],
    correctAnswer: 0,
    explanation: 'LAMBDA() lets users write custom formula logic and save it as a named function in Name Manager.'
  },
  {
    id: 'qb-excel-7',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'Which Excel shortcut opens the Flash Fill engine to auto-complete patterns detected in adjacent columns?',
    options: ['Ctrl + E', 'Ctrl + F', 'Ctrl + Shift + L', 'Alt + F1'],
    correctAnswer: 0,
    explanation: 'Ctrl + E triggers Flash Fill, extracting and formatting text based on AI pattern recognition.'
  },
  {
    id: 'qb-excel-8',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'What happens when a dynamic array formula in Excel encounters an occupied cell in its output spill range?',
    options: ['#SPILL! error is returned', '#VALUE! error is returned', 'Cell data is overwritten', 'Formula converts to static values'],
    correctAnswer: 0,
    explanation: 'If any cell in the required spill area contains data, Excel returns a #SPILL! error until cleared.'
  },
  {
    id: 'qb-excel-9',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'Which function calculates the weighted average of product sales given Prices in B2:B10 and Quantities in C2:C10?',
    options: ['=SUMPRODUCT(B2:B10, C2:C10) / SUM(C2:C10)', '=AVERAGE(B2:B10 * C2:C10)', '=WEIGHTED(B2:B10, C2:C10)', '=SUMIF(C2:C10, B2:B10)'],
    correctAnswer: 0,
    explanation: 'SUMPRODUCT multiplies price and quantity element-wise, then dividing by SUM(quantity) gives weighted average.'
  },
  {
    id: 'qb-excel-10',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'In Excel Copilot, which prompt command transforms raw table rows into conditional heat map formatting?',
    options: ['"Apply Data Bars and Color Scales based on percentile rank"', '"Add VBA script for heat map"', '"Convert range to image"', '"Hide low values"'],
    correctAnswer: 0,
    explanation: 'Color Scales and Data Bars are built-in conditional formatting rules applied via natural language prompts.'
  },
  {
    id: 'qb-excel-11',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'Which Excel function removes duplicate values from an array dynamically?',
    options: ['UNIQUE()', 'DISTINCT()', 'REMOVE.DUPLICATES()', 'DEDUP()'],
    correctAnswer: 0,
    explanation: 'UNIQUE() extracts distinct values from a specified range or array dynamically.'
  },
  {
    id: 'qb-excel-12',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'How do you reference a table named "SalesData" and its column "Profit" in structured table references?',
    options: ['SalesData[Profit]', 'SalesData->Profit', 'SalesData.Profit', 'SalesData{Profit}'],
    correctAnswer: 0,
    explanation: 'Structured references use TableName[ColumnName] syntax in Excel tables.'
  },
  {
    id: 'qb-excel-13',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'Which function handles errors gracefully by returning a fallback value if a calculation fails?',
    options: ['IFERROR()', 'ISERROR()', 'CATCH()', 'TRY()'],
    correctAnswer: 0,
    explanation: 'IFERROR(val, value_if_error) catches errors like #N/A, #DIV/0! and replaces them with a fallback.'
  },
  {
    id: 'qb-excel-14',
    type: 'mcq',
    domain: 'excel_ai',
    question: 'Which Power Query M formula language feature combines multiple queries by matching common key columns?',
    options: ['Merge Queries (Join)', 'Append Queries (Union)', 'Pivot Table', 'Group By'],
    correctAnswer: 0,
    explanation: 'Merge Queries performs relational JOIN operations in Excel Power Query.'
  },

  // =========================================================================
  // 2. SQL MCQs (14 MCQs)
  // =========================================================================
  {
    id: 'qb-sql-mcq-1',
    type: 'mcq',
    domain: 'sql',
    question: 'Which SQL window function computes a dense rank without skipping rank numbers when duplicate values occur?',
    options: ['DENSE_RANK()', 'RANK()', 'ROW_NUMBER()', 'PERCENT_RANK()'],
    correctAnswer: 0,
    explanation: 'DENSE_RANK() assigns consecutive rank numbers (1, 2, 2, 3) without gaps for tied values.'
  },
  {
    id: 'qb-sql-mcq-2',
    type: 'mcq',
    domain: 'sql',
    question: 'Which clause filters aggregated group results after a GROUP BY statement is executed?',
    options: ['HAVING', 'WHERE', 'ORDER BY', 'QUALIFY'],
    correctAnswer: 0,
    explanation: 'WHERE filters rows prior to aggregation, while HAVING filters aggregated group metrics after GROUP BY.'
  },
  {
    id: 'qb-sql-mcq-3',
    type: 'mcq',
    domain: 'sql',
    question: 'What type of JOIN returns all records from the left table and matched records from the right table, filling non-matches with NULL?',
    options: ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
    correctAnswer: 0,
    explanation: 'LEFT JOIN retains 100% of left table rows and injects NULL values where right table keys do not match.'
  },
  {
    id: 'qb-sql-mcq-4',
    type: 'mcq',
    domain: 'sql',
    question: 'Which statement defines a Common Table Expression (CTE) in standard ANSI SQL?',
    options: ['WITH cte_name AS (...)', 'CREATE CTE cte_name AS (...)', 'DEFINE cte_name = (...)', 'DECLARE cte_name TABLE (...)'],
    correctAnswer: 0,
    explanation: 'WITH cte_name AS (SELECT ...) introduces a temporary named result set in SQL.'
  },
  {
    id: 'qb-sql-mcq-5',
    type: 'mcq',
    domain: 'sql',
    question: 'What is the purpose of the COALESCE() function in SQL queries?',
    options: ['Returns the first non-null argument in its parameter list', 'Combines strings', 'Counts distinct rows', 'Calculates variance'],
    correctAnswer: 0,
    explanation: 'COALESCE(v1, v2, v3...) evaluates parameters left-to-right and returns the first value that is not NULL.'
  },
  {
    id: 'qb-sql-mcq-6',
    type: 'mcq',
    domain: 'sql',
    question: 'Which SQL clause restricts window function calculations to specific partitions of the dataset?',
    options: ['PARTITION BY', 'GROUP BY', 'DISTRIBUTE BY', 'CLUSTER BY'],
    correctAnswer: 0,
    explanation: 'PARTITION BY divides query result sets into partitions before window functions (OVER) are applied.'
  },
  {
    id: 'qb-sql-mcq-7',
    type: 'mcq',
    domain: 'sql',
    question: 'What is the key difference between UNION and UNION ALL in SQL query merging?',
    options: ['UNION removes duplicate rows; UNION ALL keeps duplicate rows', 'UNION ALL sorts output automatically', 'UNION is faster than UNION ALL', 'UNION ALL only works on integer columns'],
    correctAnswer: 0,
    explanation: 'UNION performs distinct deduplication across query outputs, whereas UNION ALL preserves every row.'
  },
  {
    id: 'qb-sql-mcq-8',
    type: 'mcq',
    domain: 'sql',
    question: 'Which SQL keyword is used to eliminate duplicate rows from a SELECT query result set?',
    options: ['DISTINCT', 'UNIQUE', 'DEDUP', 'GROUP'],
    correctAnswer: 0,
    explanation: 'SELECT DISTINCT removes duplicate rows from the final output table.'
  },
  {
    id: 'qb-sql-mcq-9',
    type: 'mcq',
    domain: 'sql',
    question: 'In SQL transaction management, which command saves all changes made during the active transaction permanently?',
    options: ['COMMIT', 'ROLLBACK', 'SAVEPOINT', 'RELEASE'],
    correctAnswer: 0,
    explanation: 'COMMIT writes all uncommitted transactional modifications to disk permanently.'
  },
  {
    id: 'qb-sql-mcq-10',
    type: 'mcq',
    domain: 'sql',
    question: 'Which window function fetches values from a preceding row relative to the current evaluation row?',
    options: ['LAG()', 'LEAD()', 'FIRST_VALUE()', 'NTH_VALUE()'],
    correctAnswer: 0,
    explanation: 'LAG(column, offset) accesses data from N rows prior to the current row without self-joining.'
  },
  {
    id: 'qb-sql-mcq-11',
    type: 'mcq',
    domain: 'sql',
    question: 'What does a CROSS JOIN produce when joining Table A (5 rows) and Table B (10 rows)?',
    options: ['Cartesian product of 50 rows', 'Inner match of 5 rows', 'Union of 15 rows', 'Error due to missing ON clause'],
    correctAnswer: 0,
    explanation: 'CROSS JOIN combines every row from table A with every row from table B (5 * 10 = 50 rows).'
  },
  {
    id: 'qb-sql-mcq-12',
    type: 'mcq',
    domain: 'sql',
    question: 'Which indexing data structure is most commonly utilized for fast B-tree range searches in SQL relational databases?',
    options: ['B-Tree Index', 'Hash Index', 'Inverted Index', 'BitMap Index'],
    correctAnswer: 0,
    explanation: 'B-Tree indexes maintain sorted tree nodes optimized for equality and range-based (<, >, BETWEEN) lookups.'
  },
  {
    id: 'qb-sql-mcq-13',
    type: 'mcq',
    domain: 'sql',
    question: 'Which SQL operator tests whether a subquery returns at least one row?',
    options: ['EXISTS', 'IN', 'ANY', 'CONTAINS'],
    correctAnswer: 0,
    explanation: 'EXISTS returns TRUE as soon as the inner subquery yields 1 or more matching rows.'
  },
  {
    id: 'qb-sql-mcq-14',
    type: 'mcq',
    domain: 'sql',
    question: 'Which DDL command removes a table structure and all stored data permanently from the database schema?',
    options: ['DROP TABLE', 'TRUNCATE TABLE', 'DELETE FROM', 'ALTER TABLE DROP'],
    correctAnswer: 0,
    explanation: 'DROP TABLE deletes both the schema definition and stored data permanently.'
  },

  // =========================================================================
  // 3. POWER BI (14 MCQs)
  // =========================================================================
  {
    id: 'qb-pbi-1',
    type: 'mcq',
    domain: 'power_bi',
    question: 'In Power BI DAX, which function modifies or overrides the active filter context during measure calculation?',
    options: ['CALCULATE()', 'FILTER()', 'ALL()', 'SUMX()'],
    correctAnswer: 0,
    explanation: 'CALCULATE(expression, filter1, filter2...) is the core DAX engine function that alters evaluation filter context.'
  },
  {
    id: 'qb-pbi-2',
    type: 'mcq',
    domain: 'power_bi',
    question: 'What is the key difference between Calculated Columns and DAX Measures in Power BI?',
    options: ['Calculated columns are evaluated during data refresh and stored on disk; measures are evaluated dynamically on-the-fly', 'Measures increase PBIX file size', 'Calculated columns cannot use DAX functions', 'Measures can only return integer values'],
    correctAnswer: 0,
    explanation: 'Calculated columns consume RAM/storage at refresh, whereas Measures consume CPU upon user interaction.'
  },
  {
    id: 'qb-pbi-3',
    type: 'mcq',
    domain: 'power_bi',
    question: 'Which DAX function ignores all active slicers and filters applied to a table or column?',
    options: ['ALL()', 'VALUES()', 'KEEPFILTERS()', 'SELECTEDVALUE()'],
    correctAnswer: 0,
    explanation: 'ALL(TableOrColumn) removes filter context, allowing grand total or baseline market share calculations.'
  },
  {
    id: 'qb-pbi-4',
    type: 'mcq',
    domain: 'power_bi',
    question: 'What type of DAX functions process tables row-by-row before performing final aggregation (e.g. SUMX, AVERAGEX)?',
    options: ['Iterator Functions', 'Time Intelligence Functions', 'Filter Functions', 'Statistical Functions'],
    correctAnswer: 0,
    explanation: 'Iterator "X" functions iterate row-by-row over a specified table, evaluating expression logic for each row.'
  },
  {
    id: 'qb-pbi-5',
    type: 'mcq',
    domain: 'power_bi',
    question: 'Which DAX Time Intelligence function calculates Year-to-Date cumulative metrics?',
    options: ['TOTALYTD()', 'SAMEPERIODLASTYEAR()', 'DATEADD()', 'PARALLELPERIOD()'],
    correctAnswer: 0,
    explanation: 'TOTALYTD(expression, dates_column) evaluates a cumulative measure starting from Jan 1 of current year.'
  },
  {
    id: 'qb-pbi-6',
    type: 'mcq',
    domain: 'power_bi',
    question: 'What schema architecture is strongly recommended by Microsoft for optimal Power BI performance?',
    options: ['Star Schema (Fact & Dimension tables)', 'Normalized 3NF Relational Schema', 'Flat single-table schema', 'Snowflake Schema with deep chains'],
    correctAnswer: 0,
    explanation: 'Star Schema with central Fact tables linked to single-hop Dimension tables maximizes VertiPaq engine performance.'
  },
  {
    id: 'qb-pbi-7',
    type: 'mcq',
    domain: 'power_bi',
    question: 'Which storage mode in Power BI loads data into the in-memory VertiPaq database engine for fastest performance?',
    options: ['Import Mode', 'DirectQuery Mode', 'Dual Mode', 'Live Connection'],
    correctAnswer: 0,
    explanation: 'Import Mode compresses and loads data into VertiPaq RAM, delivering sub-second visual rendering.'
  },
  {
    id: 'qb-pbi-8',
    type: 'mcq',
    domain: 'power_bi',
    question: 'Which DAX function checks if a single value is selected in a visual or slicers filter context?',
    options: ['SELECTEDVALUE()', 'ISFILTERED()', 'HASONEVALUE()', 'LOOKUPVALUE()'],
    correctAnswer: 0,
    explanation: 'SELECTEDVALUE(column, alternate_value) returns column value if exactly one distinct value exists in context.'
  },
  {
    id: 'qb-pbi-9',
    type: 'mcq',
    domain: 'power_bi',
    question: 'What does DAX DIVIDE(numerator, denominator, 0) do when denominator equals zero?',
    options: ['Returns 0 without throwing a divide-by-zero error', 'Throws a #DIV/0! error', 'Returns Infinity', 'Hides the visual element'],
    correctAnswer: 0,
    explanation: 'DIVIDE handles division safely, returning the 3rd parameter (0) instead of throwing runtime errors.'
  },
  {
    id: 'qb-pbi-10',
    type: 'mcq',
    domain: 'power_bi',
    question: 'Which feature in Power BI allows report viewers to switch visual measures or dimensions dynamically using slicers?',
    options: ['Field Parameters', 'Page Tooltips', 'Drillthrough Filters', 'Bookmarks'],
    correctAnswer: 0,
    explanation: 'Field Parameters enable users to dynamically change measure or axis fields without duplicate visuals.'
  },
  {
    id: 'qb-pbi-11',
    type: 'mcq',
    domain: 'power_bi',
    question: 'What DAX function retrieves a scalar value from a table matching one or more filter conditions?',
    options: ['LOOKUPVALUE()', 'RELATED()', 'USERELATIONSHIP()', 'EARLIER()'],
    correctAnswer: 0,
    explanation: 'LOOKUPVALUE(result_column, search_column, search_value) operates like VLOOKUP in DAX.'
  },
  {
    id: 'qb-pbi-12',
    type: 'mcq',
    domain: 'power_bi',
    question: 'Which function activates an inactive data model relationship during DAX measure execution?',
    options: ['USERELATIONSHIP()', 'RELATEDTABLE()', 'CROSSFILTER()', 'TREATAS()'],
    correctAnswer: 0,
    explanation: 'USERELATIONSHIP(col1, col2) specifies an inactive relationship to be used for a specific DAX measure.'
  },
  {
    id: 'qb-pbi-13',
    type: 'mcq',
    domain: 'power_bi',
    question: 'What is the role of the Power BI Performance Analyzer tool?',
    options: ['Measures and records query execution times for each visual element', 'Auto-corrects DAX syntax errors', 'Generates automated executive summaries', 'Exports data models to SQL Server'],
    correctAnswer: 0,
    explanation: 'Performance Analyzer logs duration metrics (DAX Query, Visual Display, Other) to diagnose bottlenecks.'
  },
  {
    id: 'qb-pbi-14',
    type: 'mcq',
    domain: 'power_bi',
    question: 'Which Time Intelligence DAX function returns the corresponding period from the prior year?',
    options: ['SAMEPERIODLASTYEAR()', 'PREVIOUSYEAR()', 'DATEADD(..., -1, YEAR)', 'Both SAMEPERIODLASTYEAR() and DATEADD(..., -1, YEAR)'],
    correctAnswer: 3,
    explanation: 'Both SAMEPERIODLASTYEAR() and DATEADD(dates, -1, YEAR) return dates shifted exactly one year backward.'
  },

  // =========================================================================
  // 4. PYTHON MCQs (14 MCQs)
  // =========================================================================
  {
    id: 'qb-py-mcq-1',
    type: 'mcq',
    domain: 'python',
    question: 'Which Python pandas method groups data and applies aggregate functions like sum or mean?',
    options: ['df.groupby()', 'df.pivot()', 'df.aggregate_by()', 'df.cluster()'],
    correctAnswer: 0,
    explanation: 'df.groupby("col").agg({"target": "sum"}) groups DataFrame rows by distinct categorical keys.'
  },
  {
    id: 'qb-py-mcq-2',
    type: 'mcq',
    domain: 'python',
    question: 'In Python, what is the output of list comprehension: [x**2 for x in range(5) if x % 2 == 0]?',
    options: ['[0, 4, 16]', '[0, 1, 4, 9, 16]', '[4, 16]', '[0, 2, 4]'],
    correctAnswer: 0,
    explanation: 'range(5) gives 0,1,2,3,4. Even numbers are 0, 2, 4. Squared values are 0**2=0, 2**2=4, 4**2=16.'
  },
  {
    id: 'qb-py-mcq-3',
    type: 'mcq',
    domain: 'python',
    question: 'Which method adds an item to the end of an existing Python list in-place?',
    options: ['list.append()', 'list.extend()', 'list.add()', 'list.push()'],
    correctAnswer: 0,
    explanation: 'list.append(element) appends a single item to the end of the list.'
  },
  {
    id: 'qb-py-mcq-4',
    type: 'mcq',
    domain: 'python',
    question: 'What is the main distinction between Python Tuples and Python Lists?',
    options: ['Tuples are immutable; lists are mutable', 'Lists are faster than tuples', 'Tuples store strings only', 'Lists cannot be nested'],
    correctAnswer: 0,
    explanation: 'Tuples (1, 2) cannot be modified after creation (immutable), whereas Lists [1, 2] allow in-place mutations.'
  },
  {
    id: 'qb-py-mcq-5',
    type: 'mcq',
    domain: 'python',
    question: 'Which pandas function reads a CSV data file directly into a DataFrame?',
    options: ['pd.read_csv()', 'pd.import_csv()', 'pd.parse_csv()', 'pd.load_csv()'],
    correctAnswer: 0,
    explanation: 'pd.read_csv("filepath.csv") parses CSV files into pandas DataFrames.'
  },
  {
    id: 'qb-py-mcq-6',
    type: 'mcq',
    domain: 'python',
    question: 'What does the dict.get(key, default) method do if key is missing from dictionary?',
    options: ['Returns the specified default value without raising KeyError', 'Raises a KeyError exception', 'Inserts key with default value into dict', 'Returns None always'],
    correctAnswer: 0,
    explanation: 'dict.get(key, default) safely returns default if key is absent.'
  },
  {
    id: 'qb-py-mcq-7',
    type: 'mcq',
    domain: 'python',
    question: 'Which NumPy method creates a 1D array of evenly spaced numbers over a specified interval?',
    options: ['np.linspace()', 'np.arrange()', 'np.step()', 'np.space()'],
    correctAnswer: 0,
    explanation: 'np.linspace(start, stop, num) generates N evenly spaced samples over [start, stop].'
  },
  {
    id: 'qb-py-mcq-8',
    type: 'mcq',
    domain: 'python',
    question: 'What keyword defines an anonymous inline function in Python?',
    options: ['lambda', 'def', 'inline', 'func'],
    correctAnswer: 0,
    explanation: 'lambda arguments: expression creates anonymous inline function objects.'
  },
  {
    id: 'qb-py-mcq-9',
    type: 'mcq',
    domain: 'python',
    question: 'In pandas, how do you drop rows containing missing (NaN) values?',
    options: ['df.dropna()', 'df.remove_nulls()', 'df.clear_na()', 'df.drop_missing()'],
    correctAnswer: 0,
    explanation: 'df.dropna() drops all rows containing one or more NaN values.'
  },
  {
    id: 'qb-py-mcq-10',
    type: 'mcq',
    domain: 'python',
    question: 'Which builtin function returns both index and item while iterating over a sequence?',
    options: ['enumerate()', 'zip()', 'map()', 'index()'],
    correctAnswer: 0,
    explanation: 'enumerate(iterable) yields (index, item) tuples during iteration.'
  },
  {
    id: 'qb-py-mcq-11',
    type: 'mcq',
    domain: 'python',
    question: 'How do you merge two pandas DataFrames df1 and df2 on a shared column "customer_id"?',
    options: ['pd.merge(df1, df2, on="customer_id")', 'df1.join_on(df2, "customer_id")', 'pd.concat([df1, df2], axis=1)', 'df1.append(df2)'],
    correctAnswer: 0,
    explanation: 'pd.merge(df1, df2, on="customer_id") performs relational database join operations.'
  },
  {
    id: 'qb-py-mcq-12',
    type: 'mcq',
    domain: 'python',
    question: 'Which exception block catches any unhandled errors in Python exception handling?',
    options: ['except Exception as e:', 'catch (Error e)', 'trap Error:', 'finally:'],
    correctAnswer: 0,
    explanation: 'try: ... except Exception as e: intercepts standard runtime exceptions.'
  },
  {
    id: 'qb-py-mcq-13',
    type: 'mcq',
    domain: 'python',
    question: 'What does *args parameter syntax allow in Python function definitions?',
    options: ['Accepts an arbitrary number of positional arguments as a tuple', 'Accepts keyword arguments only', 'Unpacks dictionary key-values', 'Enforces strict typing'],
    correctAnswer: 0,
    explanation: '*args gathers extra positional arguments passed to a function into a tuple.'
  },
  {
    id: 'qb-py-mcq-14',
    type: 'mcq',
    domain: 'python',
    question: 'Which method converts a pandas DataFrame column of string dates into datetime objects?',
    options: ['pd.to_datetime()', 'df.as_date()', 'pd.parse_date()', 'df.convert_time()'],
    correctAnswer: 0,
    explanation: 'pd.to_datetime(df["date_str"]) parses string data into pandas Timestamp format.'
  },

  // =========================================================================
  // 5. SAS MCQs (14 MCQs)
  // =========================================================================
  {
    id: 'qb-sas-1',
    type: 'mcq',
    domain: 'sas',
    question: 'Which SAS procedure calculates summary statistics like MEAN, STD, MIN, MAX across numeric variables?',
    options: ['PROC MEANS', 'PROC SUMMARY', 'PROC UNIVARIATE', 'PROC FREQ'],
    correctAnswer: 0,
    explanation: 'PROC MEANS outputs summary descriptive statistics for continuous numeric variables.'
  },
  {
    id: 'qb-sas-2',
    type: 'mcq',
    domain: 'sas',
    question: 'What is the purpose of the SET statement inside a SAS DATA step?',
    options: ['Reads observations from an existing SAS dataset', 'Creates a new variable', 'Sorts observations', 'Executes SQL code'],
    correctAnswer: 0,
    explanation: 'DATA step SET statement reads observations sequentially from one or more existing SAS datasets.'
  },
  {
    id: 'qb-sas-3',
    type: 'mcq',
    domain: 'sas',
    question: 'Which SAS procedure generates one-way and n-way frequency tables for categorical variables?',
    options: ['PROC FREQ', 'PROC TABULATE', 'PROC REPORT', 'PROC PRINT'],
    correctAnswer: 0,
    explanation: 'PROC FREQ analyzes categorical value counts and computes chi-square metrics.'
  },
  {
    id: 'qb-sas-4',
    type: 'mcq',
    domain: 'sas',
    question: 'How do you reference a macro variable named "region" in SAS macro code?',
    options: ['&region', '%region', '$region', '#region'],
    correctAnswer: 0,
    explanation: '&variable_name substitutes macro variable text values into SAS code blocks.'
  },
  {
    id: 'qb-sas-5',
    type: 'mcq',
    domain: 'sas',
    question: 'Which statement in PROC SORT specifies the sorting order variables?',
    options: ['BY variable_name;', 'ORDER BY variable_name;', 'SORTBY variable_name;', 'CLASS variable_name;'],
    correctAnswer: 0,
    explanation: 'PROC SORT requires BY var1 var2; to sort dataset observations.'
  },
  {
    id: 'qb-sas-6',
    type: 'mcq',
    domain: 'sas',
    question: 'What special missing value indicator represents missing numeric data in SAS?',
    options: ['A single period (.)', 'NULL', 'NaN', '99999'],
    correctAnswer: 0,
    explanation: 'In SAS, missing numeric values are stored as a single dot (.).'
  },
  {
    id: 'qb-sas-7',
    type: 'mcq',
    domain: 'sas',
    question: 'Which SAS PROC statement executes ANSI SQL queries directly against SAS datasets?',
    options: ['PROC SQL;', 'PROC QUERY;', 'PROC RDBMS;', 'PROC ANSI;'],
    correctAnswer: 0,
    explanation: 'PROC SQL allows users to query, join, and create SAS datasets using standard SQL syntax.'
  },
  {
    id: 'qb-sas-8',
    type: 'mcq',
    domain: 'sas',
    question: 'Which DATA step statement prevents specified variables from being written to the output dataset?',
    options: ['DROP var1 var2;', 'KEEP var1 var2;', 'DELETE var1 var2;', 'REMOVE var1 var2;'],
    correctAnswer: 0,
    explanation: 'DROP statement excludes listed variables from being saved into the resulting dataset.'
  },
  {
    id: 'qb-sas-9',
    type: 'mcq',
    domain: 'sas',
    question: 'What is the function of the FIRST.variable and LAST.variable automatic variables in SAS BY-group processing?',
    options: ['Identifies the first and last observation in each BY group', 'Counts total records', 'Ranks observations', 'Formats dates'],
    correctAnswer: 0,
    explanation: 'In BY-group processing, FIRST.var=1 flags the start of a group and LAST.var=1 flags the end.'
  },
  {
    id: 'qb-sas-10',
    type: 'mcq',
    domain: 'sas',
    question: 'Which SAS system option prints macro code expansion details to the SAS Log for debugging?',
    options: ['OPTION MPRINT SYMBOLGEN;', 'OPTION DEBUG;', 'OPTION LOGALL;', 'OPTION TRACE;'],
    correctAnswer: 0,
    explanation: 'MPRINT displays text generated by macro execution in the SAS log.'
  },
  {
    id: 'qb-sas-11',
    type: 'mcq',
    domain: 'sas',
    question: 'How do you create a temporary SAS library named "mydata" mapping to path "/folders/data"?',
    options: ['LIBNAME mydata "/folders/data";', 'FILENAME mydata "/folders/data";', 'CREATE LIB mydata = "/folders/data";', 'ASSIGN mydata "/folders/data";'],
    correctAnswer: 0,
    explanation: 'LIBNAME libref "physical-folder-path"; assigns a SAS library engine shortcut.'
  },
  {
    id: 'qb-sas-12',
    type: 'mcq',
    domain: 'sas',
    question: 'Which function converts character data strings into numeric values in SAS?',
    options: ['INPUT(char_var, informat.)', 'PUT(num_var, format.)', 'VAL(char_var)', 'NUMERIC(char_var)'],
    correctAnswer: 0,
    explanation: 'INPUT() converts character values to numeric using an informat; PUT() converts numeric to character.'
  },
  {
    id: 'qb-sas-13',
    type: 'mcq',
    domain: 'sas',
    question: 'What dataset option renames variable "old_name" to "new_name"?',
    options: ['(RENAME=(old_name=new_name))', '(CHANGE=(old_name=new_name))', '(ALIAS=(old_name=new_name))', '(SET=(old_name=new_name))'],
    correctAnswer: 0,
    explanation: 'Dataset option (RENAME=(old=new)) renames variables inline.'
  },
  {
    id: 'qb-sas-14',
    type: 'mcq',
    domain: 'sas',
    question: 'Which SAS PROC prints dataset observation rows and column variables into a readable report?',
    options: ['PROC PRINT', 'PROC LIST', 'PROC VIEW', 'PROC DISPLAY'],
    correctAnswer: 0,
    explanation: 'PROC PRINT DATA=dataset; outputs row observations to the SAS Results window.'
  },

  // =========================================================================
  // 6. MACHINE LEARNING MCQs (14 MCQs)
  // =========================================================================
  {
    id: 'qb-ml-1',
    type: 'mcq',
    domain: 'ml',
    question: 'Which metric measures the proportion of true positive predictions among all positive predictions made by a classification model?',
    options: ['Precision', 'Recall', 'Accuracy', 'F1-Score'],
    correctAnswer: 0,
    explanation: 'Precision = TP / (TP + FP). It measures accuracy of positive predictions.'
  },
  {
    id: 'qb-ml-2',
    type: 'mcq',
    domain: 'ml',
    question: 'What issue occurs when a machine learning model fits training data perfectly but fails to generalize to unseen test data?',
    options: ['Overfitting', 'Underfitting', 'Data Leakage', 'Multicollinearity'],
    correctAnswer: 0,
    explanation: 'Overfitting happens when a model learns noise in training set, resulting in low training error but high test error.'
  },
  {
    id: 'qb-ml-3',
    type: 'mcq',
    domain: 'ml',
    question: 'Which ensemble method builds multiple decision trees sequentially, with each tree correcting errors of previous trees?',
    options: ['Gradient Boosting (e.g. XGBoost)', 'Random Forest', 'Bagging Classifier', 'Extra Trees'],
    correctAnswer: 0,
    explanation: 'Boosting algorithms (XGBoost, LightGBM) train trees sequentially to minimize residual loss of prior trees.'
  },
  {
    id: 'qb-ml-4',
    type: 'mcq',
    domain: 'ml',
    question: 'What technique reduces feature dimensionality while preserving maximum dataset variance?',
    options: ['Principal Component Analysis (PCA)', 'K-Means Clustering', 'Linear Regression', 'One-Hot Encoding'],
    correctAnswer: 0,
    explanation: 'PCA transforms correlated feature spaces into orthogonal principal components maximizing variance.'
  },
  {
    id: 'qb-ml-5',
    type: 'mcq',
    domain: 'ml',
    question: 'Which cross-validation technique splits training data into K equal subsets, training K times on K-1 folds?',
    options: ['K-Fold Cross-Validation', 'Leave-One-Out', 'Stratified Shuffle Split', 'Holdout Validation'],
    correctAnswer: 0,
    explanation: 'K-Fold Cross-Validation trains on K-1 folds and tests on the remaining fold, repeating K times.'
  },
  {
    id: 'qb-ml-6',
    type: 'mcq',
    domain: 'ml',
    question: 'What regularizer adds the sum of absolute values of coefficients (L1 penalty) to regression loss functions?',
    options: ['Lasso Regression (L1)', 'Ridge Regression (L2)', 'ElasticNet', 'Huber Loss'],
    correctAnswer: 0,
    explanation: 'Lasso (L1) forces coefficient weights toward zero, performing automatic feature selection.'
  },
  {
    id: 'qb-ml-7',
    type: 'mcq',
    domain: 'ml',
    question: 'Which scikit-learn estimator method fits model parameters and transforms feature values in a single step?',
    options: ['fit_transform()', 'fit_predict()', 'predict_proba()', 'score()'],
    correctAnswer: 0,
    explanation: 'fit_transform() computes transformer parameters (e.g. mean/std) and transforms data efficiently.'
  },
  {
    id: 'qb-ml-8',
    type: 'mcq',
    domain: 'ml',
    question: 'What activation function outputs values constrained between 0 and 1, ideal for binary classification probability outputs?',
    options: ['Sigmoid', 'ReLU', 'Tanh', 'Softmax'],
    correctAnswer: 0,
    explanation: 'Sigmoid f(x) = 1 / (1 + e^-x) maps inputs to (0, 1) output probability bounds.'
  },
  {
    id: 'qb-ml-9',
    type: 'mcq',
    domain: 'ml',
    question: 'Which unsupervised learning algorithm partitions N observations into K clusters based on distance to cluster centroids?',
    options: ['K-Means Clustering', 'K-Nearest Neighbors (KNN)', 'DBSCAN', 'Hierarchical Agglomerative'],
    correctAnswer: 0,
    explanation: 'K-Means minimizes sum of squared Euclidean distances between data points and centroid centers.'
  },
  {
    id: 'qb-ml-10',
    type: 'mcq',
    domain: 'ml',
    question: 'What metric measures the harmonic mean of Precision and Recall?',
    options: ['F1-Score', 'ROC-AUC', 'Log Loss', 'Mean Absolute Error'],
    correctAnswer: 0,
    explanation: 'F1-Score = 2 * (Precision * Recall) / (Precision + Recall), balancing false positives and false negatives.'
  },
  {
    id: 'qb-ml-11',
    type: 'mcq',
    domain: 'ml',
    question: 'Which technique addresses class imbalance by creating synthetic samples of minority class instances?',
    options: ['SMOTE (Synthetic Minority Over-sampling Technique)', 'Random Undersampling', 'Feature Scaling', 'Stratified K-Fold'],
    correctAnswer: 0,
    explanation: 'SMOTE generates synthetic interpolations between feature vectors of minority class neighbors.'
  },
  {
    id: 'qb-ml-12',
    type: 'mcq',
    domain: 'ml',
    question: 'What causes Data Leakage in a machine learning pipeline?',
    options: ['Information from target labels or test sets leaking into feature engineering during training', 'Missing values in features', 'High correlation between inputs', 'Low learning rate'],
    correctAnswer: 0,
    explanation: 'Data leakage occurs when target or test information leaks into model training, producing artificially inflated metrics.'
  },
  {
    id: 'qb-ml-13',
    type: 'mcq',
    domain: 'ml',
    question: 'Which loss function is minimized when training binary classification logistic regression models?',
    options: ['Binary Cross-Entropy (Log Loss)', 'Mean Squared Error (MSE)', 'Mean Absolute Error (MAE)', 'Hinge Loss'],
    correctAnswer: 0,
    explanation: 'Binary Cross-Entropy penalizes wrong classification probability estimates for binary targets.'
  },
  {
    id: 'qb-ml-14',
    type: 'mcq',
    domain: 'ml',
    question: 'What hyperparameter in Random Forest controls the maximum depth of individual decision trees?',
    options: ['max_depth', 'n_estimators', 'min_samples_split', 'criterion'],
    correctAnswer: 0,
    explanation: 'max_depth caps decision tree growth, preventing individual tree overfitting.'
  },

  // =========================================================================
  // 7. GEN AI & AGENTIC AI MCQs (14 MCQs)
  // =========================================================================
  {
    id: 'qb-genai-1',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What architecture component allows Agentic AI systems to call external APIs, query databases, or execute python code dynamically?',
    options: ['Tool Calling / Function Calling', 'Fine-Tuning', 'Embedding Lookup', 'Temperature Scaling'],
    correctAnswer: 0,
    explanation: 'Tool/Function calling lets LLM agents emit structured JSON specifications to invoke external tools.'
  },
  {
    id: 'qb-genai-2',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What does RAG stand for in Generative AI architectures?',
    options: ['Retrieval-Augmented Generation', 'Recursive Agent Gradient', 'Random Access Generation', 'Refactored Alignment Guide'],
    correctAnswer: 0,
    explanation: 'Retrieval-Augmented Generation retrieves context chunks from vector DBs and injects them into LLM prompts.'
  },
  {
    id: 'qb-genai-3',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'Which parameter controls randomness and creativity in Large Language Model text generation?',
    options: ['Temperature', 'Top_P', 'Frequency Penalty', 'Both Temperature and Top_P'],
    correctAnswer: 3,
    explanation: 'Temperature scales logit probabilities while Top_P (nucleus sampling) limits token choice candidates.'
  },
  {
    id: 'qb-genai-4',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What vector database operations convert unstructured text documents into dense numerical vector representations?',
    options: ['Embedding Models (e.g. text-embedding-3-small)', 'Tokenizer Decoding', 'One-Hot Encoders', 'TF-IDF Vectorizer'],
    correctAnswer: 0,
    explanation: 'Embedding models map natural language text into high-dimensional semantic vector spaces.'
  },
  {
    id: 'qb-genai-5',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'In agentic workflows, what is the purpose of the ReAct (Reasoning + Acting) framework?',
    options: ['Interleaves thought reasoning steps with action tool calls and observation evaluation', 'Compresses prompt tokens', 'Fine-tunes model weights', 'Encrypts user prompts'],
    correctAnswer: 0,
    explanation: 'ReAct prompts LLMs to explicitly trace Thought -> Action -> Observation loops to solve multi-step problems.'
  },
  {
    id: 'qb-genai-6',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'Which metric measures semantic similarity between document embedding vectors in vector stores like Pinecone or Chroma?',
    options: ['Cosine Similarity', 'Euclidean Distance', 'Dot Product', 'All of the above depending on distance metric'],
    correctAnswer: 3,
    explanation: 'Vector databases support Cosine Similarity, Dot Product, and L2 Euclidean distance index metrics.'
  },
  {
    id: 'qb-genai-7',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What is "Hallucination" in Large Language Models?',
    options: ['Generating plausible-sounding but factually incorrect or ungrounded statements', 'Slowing down inference speed', 'Refusing to answer safety prompts', 'Running out of GPU memory'],
    correctAnswer: 0,
    explanation: 'Hallucination refers to LLMs confidently generating false facts not supported by context or reality.'
  },
  {
    id: 'qb-genai-8',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'Which technique provides LLMs with explicit input-output examples directly inside the prompt without modifying model weights?',
    options: ['Few-Shot Prompting', 'Fine-Tuning', 'LoRA (Low-Rank Adaptation)', 'RLHF'],
    correctAnswer: 0,
    explanation: 'Few-Shot prompting includes 2-5 demonstration input-output pairs inside the prompt payload.'
  },
  {
    id: 'qb-genai-9',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What role does a System Prompt play in conversational AI agent configurations?',
    options: ['Establishes persona, instructions, constraints, and tool usage guidelines for the assistant', 'Appends user message history', 'Stores API secret keys', 'Compiles Python code'],
    correctAnswer: 0,
    explanation: 'System prompts set overarching behavioral rules, safety boundaries, and capabilities.'
  },
  {
    id: 'qb-genai-10',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'Which framework is widely used in Python for building multi-agent graph workflows with state persistence?',
    options: ['LangGraph', 'PyTorch', 'Scikit-Learn', 'FastAPI'],
    correctAnswer: 0,
    explanation: 'LangGraph (by LangChain) models agentic workflows as stateful cyclic graphs.'
  },
  {
    id: 'qb-genai-11',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What parameter mitigates repetitive word generation by penalizing tokens based on their cumulative frequency in generated text?',
    options: ['Frequency Penalty', 'Presence Penalty', 'Temperature', 'Top_K'],
    correctAnswer: 0,
    explanation: 'Frequency Penalty reduces verbatim token repetition proportionally to prior token occurrence count.'
  },
  {
    id: 'qb-genai-12',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'In RAG pipelines, what is "Chunking"?',
    options: ['Splitting large documents into smaller overlapping text segments before embedding', 'Merging database tables', 'Quantizing model weights', 'Tokenizing words'],
    correctAnswer: 0,
    explanation: 'Chunking breaks long PDFs/articles into optimal token windows (e.g. 512 tokens with 50-token overlap).'
  },
  {
    id: 'qb-genai-13',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What technique uses Reinforcement Learning with Human Feedback to align LLMs with human intent and safety?',
    options: ['RLHF', 'LoRA', 'BERT', 'DPO'],
    correctAnswer: 0,
    explanation: 'RLHF trains reward models on human preference comparisons to fine-tune generative models.'
  },
  {
    id: 'qb-genai-14',
    type: 'mcq',
    domain: 'gen_ai',
    question: 'What does "Context Window" refer to in transformer LLM architectures?',
    options: ['Maximum number of tokens (prompt + completion) the model can process in a single request', 'Screen resolution of chatbot', 'Number of GPUs in cluster', 'Database storage limit'],
    correctAnswer: 0,
    explanation: 'Context window defines the token capacity boundary (e.g. 128k tokens in GPT-4o).'
  },

  // =========================================================================
  // 8. DATA ENGINEERING MCQs (14 MCQs)
  // =========================================================================
  {
    id: 'qb-de-1',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'In Apache Spark, what is the difference between Transformation and Action operations?',
    options: ['Transformations are lazy and return new RDDs/DataFrames; Actions trigger execution and return results to driver', 'Actions are lazy', 'Transformations write to disk immediately', 'Actions cannot use SQL'],
    correctAnswer: 0,
    explanation: 'Transformations (map, filter) build DAG execution plans lazily; Actions (count, collect, write) trigger execution.'
  },
  {
    id: 'qb-de-2',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'Which columnar file format is optimized for fast read analytical queries and compressed storage in data lakes?',
    options: ['Apache Parquet', 'CSV', 'JSON', 'XML'],
    correctAnswer: 0,
    explanation: 'Parquet organizes data columnarly, enabling projection pushdown, dictionary encoding, and high compression.'
  },
  {
    id: 'qb-de-3',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'What architecture pattern separates data ingestion into Bronze (raw), Silver (cleansed), and Gold (business analytics) layers?',
    options: ['Medallion Architecture (Delta Lake)', 'Lambda Architecture', 'Kappa Architecture', 'Monolithic Data Warehouse'],
    correctAnswer: 0,
    explanation: 'Medallion Architecture structures data quality stages progressively across Bronze, Silver, and Gold delta tables.'
  },
  {
    id: 'qb-de-4',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'In data warehousing, what is a Slowly Changing Dimension Type 2 (SCD Type 2)?',
    options: ['Tracks historical changes by creating new records with effective start/end dates and current flag', 'Overwrites existing dimension records', 'Adds new attribute columns', 'Deletes expired rows'],
    correctAnswer: 0,
    explanation: 'SCD Type 2 preserves complete historical data lineage by appending new versioned rows with timestamp ranges.'
  },
  {
    id: 'qb-de-5',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'Which distributed messaging system is commonly used for real-time streaming data ingestion?',
    options: ['Apache Kafka', 'PostgreSQL', 'Redis Cache', 'SQLite'],
    correctAnswer: 0,
    explanation: 'Apache Kafka provides partitioned, fault-tolerant publish-subscribe message streams at scale.'
  },
  {
    id: 'qb-de-6',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'What issue occurs in Spark jobs when data is unevenly distributed across cluster partitions?',
    options: ['Data Skew', 'Out of Memory Error (OOM)', 'Spill to Disk', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Data skew causes one straggler executor to process disproportionate data, leading to disk spills and OOM crashes.'
  },
  {
    id: 'qb-de-7',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'Which orchestration tool uses Directed Acyclic Graphs (DAGs) defined in Python to schedule ETL workflows?',
    options: ['Apache Airflow', 'Cron', 'Jenkins', 'Kubeflow'],
    correctAnswer: 0,
    explanation: 'Apache Airflow orchestrates complex data pipeline DAGs with task dependency scheduling.'
  },
  {
    id: 'qb-de-8',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'What is Partitioning in cloud data lakes or warehouses?',
    options: ['Dividing table data into subdirectories based on column values (e.g. year=2026/month=09/) to skip irrelevant files', 'Encrypting files', 'Duplicating tables', 'Compressing JSON'],
    correctAnswer: 0,
    explanation: 'Partitioning allows query engines to perform partition pruning, scanning only relevant directory paths.'
  },
  {
    id: 'qb-de-9',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'Which open-source storage layer brings ACID transactions, time travel, and schema enforcement to data lakes?',
    options: ['Delta Lake', 'HDFS', 'AWS S3', 'Apache Flume'],
    correctAnswer: 0,
    explanation: 'Delta Lake adds ACID transaction logs (transaction log _delta_log) on top of Parquet storage.'
  },
  {
    id: 'qb-de-10',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'What is the purpose of dbt (data build tool) in modern data stacks?',
    options: ['Transforms data inside data warehouses by running SQL SELECT models', 'Ingests data from APIs', 'Monitors server hardware', 'Generates BI dashboards'],
    correctAnswer: 0,
    explanation: 'dbt manages the "T" (Transform) in ELT, turning SQL SELECT queries into tested warehouse tables/views.'
  },
  {
    id: 'qb-de-11',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'What is a Broadcast Join in PySpark?',
    options: ['Copies a small DataFrame to all worker nodes to avoid expensive shuffle operations', 'Joins two massive tables', 'Performs outer join across clusters', 'Streams real-time events'],
    correctAnswer: 0,
    explanation: 'Broadcast Join distributes small lookup tables to executor memory, avoiding network data shuffling.'
  },
  {
    id: 'qb-de-12',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'Which SQL command creates an exact copy of a table structure without copying stored data?',
    options: ['CREATE TABLE target LIKE source;', 'CREATE TABLE target AS SELECT * FROM source;', 'COPY TABLE source TO target;', 'CLONE TABLE source;'],
    correctAnswer: 0,
    explanation: 'CREATE TABLE ... LIKE source copies table schema metadata without copying data rows.'
  },
  {
    id: 'qb-de-13',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'In distributed data processing, what is Shuffling?',
    options: ['Redistributing data across cluster worker nodes across the network during joins or aggregations', 'Randomizing rows', 'Sorting tables in-memory', 'Deleting temp files'],
    correctAnswer: 0,
    explanation: 'Shuffling transfers data partitions across physical cluster networks to align grouping keys.'
  },
  {
    id: 'qb-de-14',
    type: 'mcq',
    domain: 'data_engineering',
    question: 'What is Schema-on-Read vs Schema-on-Write?',
    options: ['Schema-on-Read validates schema when querying data (Data Lakes); Schema-on-Write validates schema during insertion (RDBMS)', 'Schema-on-Read is faster for inserts', 'Schema-on-Write does not enforce constraints', 'They are identical'],
    correctAnswer: 0,
    explanation: 'Data lakes apply schema when parsing query reads, whereas relational databases enforce schema on INSERT.'
  },

  // =========================================================================
  // 9. MLOPS & LLMOPS MCQs (14 MCQs)
  // =========================================================================
  {
    id: 'qb-mlops-1',
    type: 'mcq',
    domain: 'mlops',
    question: 'Which open-source platform manages the machine learning lifecycle, including experiment tracking, model registry, and deployment?',
    options: ['MLflow', 'Kubeflow', 'DVC', 'Airflow'],
    correctAnswer: 0,
    explanation: 'MLflow tracks experiment parameters/metrics, packages models, and manages central model registries.'
  },
  {
    id: 'qb-mlops-2',
    type: 'mcq',
    domain: 'mlops',
    question: 'What is Concept Drift in production machine learning monitoring?',
    options: ['Statistical relationship between feature inputs and target outputs changes over time', 'Distribution of input features changes', 'Server hardware slows down', 'Model files get corrupted'],
    correctAnswer: 0,
    explanation: 'Concept drift occurs when statistical mapping P(Y|X) changes, causing model accuracy decay.'
  },
  {
    id: 'qb-mlops-3',
    type: 'mcq',
    domain: 'mlops',
    question: 'Which deployment strategy routes a small percentage (e.g. 5%) of live traffic to a new model version before full rollout?',
    options: ['Canary Deployment', 'Blue/Green Deployment', 'Shadow Deployment', 'Rolling Upgrade'],
    correctAnswer: 0,
    explanation: 'Canary deployment tests new model builds on a small subset of production traffic to verify stability.'
  },
  {
    id: 'qb-mlops-4',
    type: 'mcq',
    domain: 'mlops',
    question: 'What tool brings Git-like version control to large machine learning datasets and model binary files?',
    options: ['DVC (Data Version Control)', 'Git LFS', 'Docker', 'Kubernetes'],
    correctAnswer: 0,
    explanation: 'DVC tracks data pipelines and dataset versions alongside Git source code without storing raw data in Git.'
  },
  {
    id: 'qb-mlops-5',
    type: 'mcq',
    domain: 'mlops',
    question: 'What is a Feature Store (e.g. Feast, Tecton) in MLOps architectures?',
    options: ['Central repository for storing, serving, and sharing curated ML features for training and real-time inference', 'Database for hyperparameter logs', 'UI for model visualization', 'Cloud GPU manager'],
    correctAnswer: 0,
    explanation: 'Feature stores prevent training-serving skew by serving consistent offline training features and online low-latency features.'
  },
  {
    id: 'qb-mlops-6',
    type: 'mcq',
    domain: 'mlops',
    question: 'In LLMOps monitoring, what does TTFT measure?',
    options: ['Time To First Token (latency before LLM begins streaming response)', 'Total Token Transfer', 'Training Time For Transformer', 'Test Time Fine-Tuning'],
    correctAnswer: 0,
    explanation: 'TTFT measures initial prompt processing and first token generation latency in streaming LLMs.'
  },
  {
    id: 'qb-mlops-7',
    type: 'mcq',
    domain: 'mlops',
    question: 'What deployment strategy runs a new model in parallel with the production model without serving predictions to end users?',
    options: ['Shadow Deployment', 'Canary Deployment', 'A/B Testing', 'Blue/Green Deployment'],
    correctAnswer: 0,
    explanation: 'Shadow deployment evaluates candidate models on real production requests silently without impacting user UX.'
  },
  {
    id: 'qb-mlops-8',
    type: 'mcq',
    domain: 'mlops',
    question: 'What causes Training-Serving Skew in production machine learning systems?',
    options: ['Differences between how features are calculated during training vs during real-time online serving', 'Low GPU memory', 'Network latency', 'Unused features'],
    correctAnswer: 0,
    explanation: 'Training-serving skew happens when feature pipeline logic differs between offline training and online serving.'
  },
  {
    id: 'qb-mlops-9',
    type: 'mcq',
    domain: 'mlops',
    question: 'Which containerization technology packages model binaries, dependencies, and runtime environment into portable images?',
    options: ['Docker', 'VirtualBox', 'Conda', 'Pipenv'],
    correctAnswer: 0,
    explanation: 'Docker containers encapsulate code, packages, and OS configurations for deterministic deployment.'
  },
  {
    id: 'qb-mlops-10',
    type: 'mcq',
    domain: 'mlops',
    question: 'What container orchestration platform manages scaling, self-healing, and load balancing for model container clusters?',
    options: ['Kubernetes (K8s)', 'Terraform', 'Ansible', 'Nginx'],
    correctAnswer: 0,
    explanation: 'Kubernetes automates container deployment, horizontal autoscaling, and zero-downtime rollouts.'
  },
  {
    id: 'qb-mlops-11',
    type: 'mcq',
    domain: 'mlops',
    question: 'In LLMOps, what technique reduces LLM model memory footprint by converting 16-bit floating point weights to 8-bit or 4-bit integers?',
    options: ['Quantization (e.g. INT8 / INT4 GGUF)', 'Pruning', 'Distillation', 'LoRA'],
    correctAnswer: 0,
    explanation: 'Quantization compresses model weight precision, reducing GPU memory requirements with minimal accuracy loss.'
  },
  {
    id: 'qb-mlops-12',
    type: 'mcq',
    domain: 'mlops',
    question: 'What monitoring framework is standard for collecting time-series metrics from production model endpoints?',
    options: ['Prometheus + Grafana', 'ELK Stack', 'Datadog', 'Splunk'],
    correctAnswer: 0,
    explanation: 'Prometheus scrapes metrics endpoints while Grafana visualizes real-time latency, RPS, and error rates.'
  },
  {
    id: 'qb-mlops-13',
    type: 'mcq',
    domain: 'mlops',
    question: 'What is Model Lineage in MLOps governance?',
    options: ['Audit trail recording exact dataset version, code commit, hyperparameters, and artifacts used to train a model', 'Family tree of ML algorithms', 'Parent-child class hierarchy', 'Model file folder structure'],
    correctAnswer: 0,
    explanation: 'Model lineage tracks full provenance from raw data ingestion to deployed model binaries.'
  },
  {
    id: 'qb-mlops-14',
    type: 'mcq',
    domain: 'mlops',
    question: 'Which parameter optimization tool uses Bayesian search algorithms to tune ML model hyperparameters efficiently?',
    options: ['Optuna', 'GridSearchCV', 'RandomizedSearchCV', 'Hyperopt'],
    correctAnswer: 0,
    explanation: 'Optuna uses tree-structured Parzen estimators for automated, efficient hyperparameter optimization.'
  },

  // =========================================================================
  // 10. MULTI-TABLE SQL PRACTICAL LABS (10 Complex Labs - 4-5 Tables Each)
  // =========================================================================
  {
    id: 'coding-sql-lab-1',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 1: Executive Compensation & Project Budget Audit',
    scenario: 'Perform a multi-table audit joining `employees`, `departments`, `salaries`, and `projects`.',
    instructions: [
      'Join `employees` (e) with `departments` (d), `salaries` (s), and `projects` (p).',
      'Compute `DENSE_RANK() OVER (PARTITION BY d.id ORDER BY s.amount DESC)` as `salary_rank`.',
      'Filter employees with base salary > $70,000.',
      'Order output by `department_name` ASC and `salary_rank` ASC.'
    ],
    sampleInput: 'Tables: employees, departments, salaries, projects',
    sampleOutput: 'Columns: id | name | department_name | amount | salary_rank',
    constraints: ['Inner join 4 tables', 'Use DENSE_RANK() window function', 'Filter salary > 70000'],
    tables: [
      {
        tableName: 'employees',
        columns: [
          { name: 'id', type: 'INTEGER', key: 'PK' },
          { name: 'name', type: 'VARCHAR(100)' },
          { name: 'department_id', type: 'INTEGER', key: 'FK' }
        ],
        sampleRows: [
          { id: 101, name: 'Alice Smith', department_id: 1 },
          { id: 102, name: 'Bob Jones', department_id: 1 },
          { id: 103, name: 'Charlie Brown', department_id: 2 }
        ]
      },
      {
        tableName: 'departments',
        columns: [
          { name: 'id', type: 'INTEGER', key: 'PK' },
          { name: 'department_name', type: 'VARCHAR(100)' }
        ],
        sampleRows: [
          { id: 1, department_name: 'Engineering' },
          { id: 2, department_name: 'Analytics' }
        ]
      },
      {
        tableName: 'salaries',
        columns: [
          { name: 'emp_id', type: 'INTEGER', key: 'FK' },
          { name: 'amount', type: 'DECIMAL(10,2)' }
        ],
        sampleRows: [
          { emp_id: 101, amount: '95000.00' },
          { emp_id: 102, amount: '75000.00' },
          { emp_id: 103, amount: '88000.00' }
        ]
      },
      {
        tableName: 'projects',
        columns: [
          { name: 'id', type: 'INTEGER', key: 'PK' },
          { name: 'project_name', type: 'VARCHAR(100)' },
          { name: 'department_id', type: 'INTEGER', key: 'FK' },
          { name: 'budget', type: 'DECIMAL(12,2)' }
        ],
        sampleRows: [
          { id: 501, project_name: 'AI Engine', department_id: 1, budget: '250000.00' },
          { id: 502, project_name: 'Data Warehouse', department_id: 2, budget: '180000.00' }
        ]
      }
    ],
    setupContent: `CREATE TABLE departments (id INT PRIMARY KEY, department_name VARCHAR(100));
INSERT INTO departments VALUES (1, 'Engineering'), (2, 'Analytics');

CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(100), department_id INT);
INSERT INTO employees VALUES (101, 'Alice Smith', 1), (102, 'Bob Jones', 1), (103, 'Charlie Brown', 2);

CREATE TABLE salaries (emp_id INT, amount DECIMAL(10,2));
INSERT INTO salaries VALUES (101, 95000.00), (102, 75000.00), (103, 88000.00);

CREATE TABLE projects (id INT PRIMARY KEY, project_name VARCHAR(100), department_id INT, budget DECIMAL(12,2));
INSERT INTO projects VALUES (501, 'AI Engine', 1, 250000.00), (502, 'Data Warehouse', 2, 180000.00);`,
    starterCode: '',
    solutionCode: `SELECT e.id, e.name, d.department_name, s.amount, DENSE_RANK() OVER (PARTITION BY d.id ORDER BY s.amount DESC) AS salary_rank FROM employees e JOIN departments d ON e.department_id = d.id JOIN salaries s ON e.id = s.emp_id JOIN projects p ON d.id = p.department_id WHERE s.amount > 70000 GROUP BY e.id, e.name, d.department_name, s.amount, d.id ORDER BY d.department_name, salary_rank;`
  },
  {
    id: 'coding-sql-lab-2',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 2: E-Commerce Multi-Touch Attribution & Promotion ROI',
    scenario: 'Analyze customer purchasing across `customers`, `orders`, `order_items`, `products`, and `promotions` tables.',
    instructions: [
      'Join 5 tables: `customers`, `orders`, `order_items`, `products`, `promotions`.',
      'Calculate net order spend after applying promotion discount percentage.',
      'Group total net spend by customer name and promo code.',
      'Filter for promo codes with net spend > $300.',
      'Order output by net spend DESC.'
    ],
    sampleInput: 'Tables: customers, orders, order_items, products, promotions',
    sampleOutput: 'Columns: customer_name | promo_code | total_net_spend',
    constraints: ['Join across 5 relational tables', 'Calculate discount multiplier (1 - discount_pct/100)'],
    tables: [
      {
        tableName: 'customers',
        columns: [
          { name: 'customer_id', type: 'INTEGER', key: 'PK' },
          { name: 'name', type: 'VARCHAR(100)' }
        ],
        sampleRows: [{ customer_id: 1, name: 'Acme Corp' }, { customer_id: 2, name: 'Beta Tech' }]
      },
      {
        tableName: 'orders',
        columns: [
          { name: 'order_id', type: 'INTEGER', key: 'PK' },
          { name: 'customer_id', type: 'INTEGER', key: 'FK' },
          { name: 'promo_id', type: 'INTEGER', key: 'FK' }
        ],
        sampleRows: [{ order_id: 101, customer_id: 1, promo_id: 1 }, { order_id: 102, customer_id: 2, promo_id: 2 }]
      },
      {
        tableName: 'order_items',
        columns: [
          { name: 'item_id', type: 'INTEGER', key: 'PK' },
          { name: 'order_id', type: 'INTEGER', key: 'FK' },
          { name: 'product_id', type: 'INTEGER', key: 'FK' },
          { name: 'quantity', type: 'INTEGER' }
        ],
        sampleRows: [{ item_id: 1, order_id: 101, product_id: 50, quantity: 2 }, { item_id: 2, order_id: 102, product_id: 51, quantity: 1 }]
      },
      {
        tableName: 'products',
        columns: [
          { name: 'product_id', type: 'INTEGER', key: 'PK' },
          { name: 'unit_price', type: 'DECIMAL(10,2)' }
        ],
        sampleRows: [{ product_id: 50, unit_price: '250.00' }, { product_id: 51, unit_price: '400.00' }]
      },
      {
        tableName: 'promotions',
        columns: [
          { name: 'promo_id', type: 'INTEGER', key: 'PK' },
          { name: 'promo_code', type: 'VARCHAR(50)' },
          { name: 'discount_pct', type: 'DECIMAL(5,2)' }
        ],
        sampleRows: [{ promo_id: 1, promo_code: 'SAVE10', discount_pct: '10.00' }, { promo_id: 2, promo_code: 'WINTER20', discount_pct: '20.00' }]
      }
    ],
    setupContent: `CREATE TABLE customers (customer_id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO customers VALUES (1, 'Acme Corp'), (2, 'Beta Tech');

CREATE TABLE promotions (promo_id INT PRIMARY KEY, promo_code VARCHAR(50), discount_pct DECIMAL(5,2));
INSERT INTO promotions VALUES (1, 'SAVE10', 10.00), (2, 'WINTER20', 20.00);

CREATE TABLE orders (order_id INT PRIMARY KEY, customer_id INT, promo_id INT);
INSERT INTO orders VALUES (101, 1, 1), (102, 2, 2);

CREATE TABLE products (product_id INT PRIMARY KEY, unit_price DECIMAL(10,2));
INSERT INTO products VALUES (50, 250.00), (51, 400.00);

CREATE TABLE order_items (item_id INT PRIMARY KEY, order_id INT, product_id INT, quantity INT);
INSERT INTO order_items VALUES (1, 101, 50, 2), (2, 102, 51, 1);`,
    starterCode: '',
    solutionCode: `SELECT c.name AS customer_name, pr.promo_code, SUM(i.quantity * p.unit_price * (1 - pr.discount_pct / 100)) AS total_net_spend FROM customers c JOIN orders o ON c.customer_id = o.customer_id JOIN order_items i ON o.order_id = i.order_id JOIN products p ON i.product_id = p.product_id JOIN promotions pr ON o.promo_id = pr.promo_id GROUP BY c.name, pr.promo_code HAVING SUM(i.quantity * p.unit_price * (1 - pr.discount_pct / 100)) > 300 ORDER BY total_net_spend DESC;`
  },
  {
    id: 'coding-sql-lab-3',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 3: Healthcare Hospital Admission & Specialist Billing Audit',
    scenario: 'Audit hospital billing across `patients`, `admissions`, `doctors`, and `treatments` tables.',
    instructions: [
      'Join 4 tables: `patients` (p), `admissions` (a), `doctors` (d), `treatments` (t).',
      'Calculate total billed amount per doctor specialty.',
      'Filter for specialties with total billing exceeding $5,000.',
      'Order by total billing DESC.'
    ],
    sampleInput: 'Tables: patients, admissions, doctors, treatments',
    sampleOutput: 'Columns: specialty | patient_count | total_billed',
    constraints: ['Join 4 healthcare schema tables', 'Group by specialty'],
    tables: [
      {
        tableName: 'patients',
        columns: [{ name: 'patient_id', type: 'INTEGER', key: 'PK' }, { name: 'name', type: 'VARCHAR(100)' }],
        sampleRows: [{ patient_id: 1, name: 'John Doe' }, { patient_id: 2, name: 'Jane Smith' }]
      },
      {
        tableName: 'doctors',
        columns: [{ name: 'doctor_id', type: 'INTEGER', key: 'PK' }, { name: 'specialty', type: 'VARCHAR(100)' }],
        sampleRows: [{ doctor_id: 10, specialty: 'Cardiology' }, { doctor_id: 11, specialty: 'Neurology' }]
      },
      {
        tableName: 'admissions',
        columns: [{ name: 'adm_id', type: 'INTEGER', key: 'PK' }, { name: 'patient_id', type: 'INTEGER', key: 'FK' }, { name: 'doctor_id', type: 'INTEGER', key: 'FK' }],
        sampleRows: [{ adm_id: 201, patient_id: 1, doctor_id: 10 }, { adm_id: 202, patient_id: 2, doctor_id: 11 }]
      },
      {
        tableName: 'treatments',
        columns: [{ name: 'treatment_id', type: 'INTEGER', key: 'PK' }, { name: 'adm_id', type: 'INTEGER', key: 'FK' }, { name: 'cost', type: 'DECIMAL(10,2)' }],
        sampleRows: [{ treatment_id: 301, adm_id: 201, cost: '4200.00' }, { treatment_id: 302, adm_id: 202, cost: '6500.00' }]
      }
    ],
    setupContent: `CREATE TABLE patients (patient_id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO patients VALUES (1, 'John Doe'), (2, 'Jane Smith');

CREATE TABLE doctors (doctor_id INT PRIMARY KEY, specialty VARCHAR(100));
INSERT INTO doctors VALUES (10, 'Cardiology'), (11, 'Neurology');

CREATE TABLE admissions (adm_id INT PRIMARY KEY, patient_id INT, doctor_id INT);
INSERT INTO admissions VALUES (201, 1, 10), (202, 2, 11);

CREATE TABLE treatments (treatment_id INT PRIMARY KEY, adm_id INT, cost DECIMAL(10,2));
INSERT INTO treatments VALUES (301, 201, 4200.00), (302, 202, 6500.00);`,
    starterCode: '',
    solutionCode: `SELECT d.specialty, COUNT(DISTINCT p.patient_id) AS patient_count, SUM(t.cost) AS total_billed FROM patients p JOIN admissions a ON p.patient_id = a.patient_id JOIN doctors d ON a.doctor_id = d.doctor_id JOIN treatments t ON a.adm_id = t.adm_id GROUP BY d.specialty HAVING SUM(t.cost) > 5000 ORDER BY total_billed DESC;`
  },
  {
    id: 'coding-sql-lab-4',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 4: Supply Chain Logistics & Fulfillment Bottleneck Tracking',
    scenario: 'Track shipping fulfillment across `warehouses`, `suppliers`, `inventory`, `shipments`, and `orders`.',
    instructions: [
      'Join 5 logistics tables: `warehouses` (w), `suppliers` (su), `inventory` (i), `shipments` (sh), `orders` (o).',
      'Calculate delay days between shipment date and order date.',
      'Compute average delay per warehouse region.',
      'Filter regions with average delay > 2 days.'
    ],
    sampleInput: 'Tables: warehouses, suppliers, inventory, shipments, orders',
    sampleOutput: 'Columns: warehouse_name | region | total_shipments | avg_delay_days',
    constraints: ['Join 5 supply chain tables', 'Use JULIANDAY or DATE subtraction for days difference'],
    tables: [
      {
        tableName: 'warehouses',
        columns: [{ name: 'warehouse_id', type: 'INTEGER', key: 'PK' }, { name: 'warehouse_name', type: 'VARCHAR(100)' }, { name: 'region', type: 'VARCHAR(50)' }],
        sampleRows: [{ warehouse_id: 1, warehouse_name: 'East Hub', region: 'North America' }]
      },
      {
        tableName: 'suppliers',
        columns: [{ name: 'supplier_id', type: 'INTEGER', key: 'PK' }, { name: 'name', type: 'VARCHAR(100)' }],
        sampleRows: [{ supplier_id: 10, name: 'Global Logistics' }]
      },
      {
        tableName: 'inventory',
        columns: [{ name: 'item_id', type: 'INTEGER', key: 'PK' }, { name: 'warehouse_id', type: 'INTEGER', key: 'FK' }, { name: 'supplier_id', type: 'INTEGER', key: 'FK' }],
        sampleRows: [{ item_id: 100, warehouse_id: 1, supplier_id: 10 }]
      },
      {
        tableName: 'orders',
        columns: [{ name: 'order_id', type: 'INTEGER', key: 'PK' }, { name: 'order_date', type: 'DATE' }],
        sampleRows: [{ order_id: 5001, order_date: '2026-03-01' }]
      },
      {
        tableName: 'shipments',
        columns: [{ name: 'shipment_id', type: 'INTEGER', key: 'PK' }, { name: 'order_id', type: 'INTEGER', key: 'FK' }, { name: 'item_id', type: 'INTEGER', key: 'FK' }, { name: 'ship_date', type: 'DATE' }],
        sampleRows: [{ shipment_id: 901, order_id: 5001, item_id: 100, ship_date: '2026-03-05' }]
      }
    ],
    setupContent: `CREATE TABLE warehouses (warehouse_id INT PRIMARY KEY, warehouse_name VARCHAR(100), region VARCHAR(50));
INSERT INTO warehouses VALUES (1, 'East Hub', 'North America');

CREATE TABLE suppliers (supplier_id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO suppliers VALUES (10, 'Global Logistics');

CREATE TABLE inventory (item_id INT PRIMARY KEY, warehouse_id INT, supplier_id INT);
INSERT INTO inventory VALUES (100, 1, 10);

CREATE TABLE orders (order_id INT PRIMARY KEY, order_date DATE);
INSERT INTO orders VALUES (5001, '2026-03-01');

CREATE TABLE shipments (shipment_id INT PRIMARY KEY, order_id INT, item_id INT, ship_date DATE);
INSERT INTO shipments VALUES (901, 5001, 100, '2026-03-05');`,
    starterCode: '',
    solutionCode: `SELECT w.warehouse_name, w.region, COUNT(sh.shipment_id) AS total_shipments, AVG(JULIANDAY(sh.ship_date) - JULIANDAY(o.order_date)) AS avg_delay_days FROM warehouses w JOIN inventory i ON w.warehouse_id = i.warehouse_id JOIN suppliers su ON i.supplier_id = su.supplier_id JOIN shipments sh ON i.item_id = sh.item_id JOIN orders o ON sh.order_id = o.order_id GROUP BY w.warehouse_name, w.region HAVING AVG(JULIANDAY(sh.ship_date) - JULIANDAY(o.order_date)) > 2;`
  },
  {
    id: 'coding-sql-lab-5',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 5: Commercial Bank Loan Portfolio & Risk Default Analysis',
    scenario: 'Analyze commercial loan risk across `borrowers`, `loans`, `repayments`, and `credit_scores`.',
    instructions: [
      'Join 4 banking tables: `borrowers`, `loans`, `repayments`, `credit_scores`.',
      'Calculate total loan principal minus total repaid amount as `outstanding_balance`.',
      'Filter borrowers with credit score < 650 and outstanding balance > $10,000.',
      'Order by `outstanding_balance` DESC.'
    ],
    sampleInput: 'Tables: borrowers, loans, repayments, credit_scores',
    sampleOutput: 'Columns: borrower_id | borrower_name | score | outstanding_balance',
    constraints: ['Join 4 banking tables', 'Filter credit score < 650'],
    tables: [
      {
        tableName: 'borrowers',
        columns: [{ name: 'borrower_id', type: 'INTEGER', key: 'PK' }, { name: 'name', type: 'VARCHAR(100)' }],
        sampleRows: [{ borrower_id: 1, name: 'David Miller' }]
      },
      {
        tableName: 'credit_scores',
        columns: [{ name: 'borrower_id', type: 'INTEGER', key: 'FK' }, { name: 'score', type: 'INTEGER' }],
        sampleRows: [{ borrower_id: 1, score: 610 }]
      },
      {
        tableName: 'loans',
        columns: [{ name: 'loan_id', type: 'INTEGER', key: 'PK' }, { name: 'borrower_id', type: 'INTEGER', key: 'FK' }, { name: 'principal', type: 'DECIMAL(12,2)' }],
        sampleRows: [{ loan_id: 801, borrower_id: 1, principal: '50000.00' }]
      },
      {
        tableName: 'repayments',
        columns: [{ name: 'payment_id', type: 'INTEGER', key: 'PK' }, { name: 'loan_id', type: 'INTEGER', key: 'FK' }, { name: 'amount_paid', type: 'DECIMAL(12,2)' }],
        sampleRows: [{ payment_id: 1001, loan_id: 801, amount_paid: '15000.00' }]
      }
    ],
    setupContent: `CREATE TABLE borrowers (borrower_id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO borrowers VALUES (1, 'David Miller');

CREATE TABLE credit_scores (borrower_id INT, score INT);
INSERT INTO credit_scores VALUES (1, 610);

CREATE TABLE loans (loan_id INT PRIMARY KEY, borrower_id INT, principal DECIMAL(12,2));
INSERT INTO loans VALUES (801, 1, 50000.00);

CREATE TABLE repayments (payment_id INT PRIMARY KEY, loan_id INT, amount_paid DECIMAL(12,2));
INSERT INTO repayments VALUES (1001, 801, 15000.00);`,
    starterCode: '',
    solutionCode: `SELECT b.borrower_id, b.name AS borrower_name, cs.score, SUM(l.principal) - SUM(r.amount_paid) AS outstanding_balance FROM borrowers b JOIN credit_scores cs ON b.borrower_id = cs.borrower_id JOIN loans l ON b.borrower_id = l.borrower_id JOIN repayments r ON l.loan_id = r.loan_id WHERE cs.score < 650 GROUP BY b.borrower_id, b.name, cs.score HAVING (SUM(l.principal) - SUM(r.amount_paid)) > 10000 ORDER BY outstanding_balance DESC;`
  },
  {
    id: 'coding-sql-lab-6',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 6: Enterprise SaaS Subscription MRR & Add-on Revenue',
    scenario: 'Calculate Monthly Recurring Revenue (MRR) across `accounts`, `subscriptions`, `add_ons`, and `churn_events`.',
    instructions: [
      'Join 4 SaaS tables: `accounts`, `subscriptions`, `add_ons`, `churn_events`.',
      'Compute net MRR = base subscription price + add-on price for active subscriptions.',
      'Filter for accounts with status = "ACTIVE".',
      'Order by total MRR DESC.'
    ],
    sampleInput: 'Tables: accounts, subscriptions, add_ons, churn_events',
    sampleOutput: 'Columns: company_name | plan_name | net_mrr',
    constraints: ['Join 4 SaaS tables', 'Filter status = ACTIVE'],
    tables: [
      {
        tableName: 'accounts',
        columns: [{ name: 'account_id', type: 'INTEGER', key: 'PK' }, { name: 'company_name', type: 'VARCHAR(100)' }],
        sampleRows: [{ account_id: 1, company_name: 'TechFlow' }]
      },
      {
        tableName: 'subscriptions',
        columns: [{ name: 'sub_id', type: 'INTEGER', key: 'PK' }, { name: 'account_id', type: 'INTEGER', key: 'FK' }, { name: 'plan_name', type: 'VARCHAR(50)' }, { name: 'base_mrr', type: 'DECIMAL(10,2)' }, { name: 'status', type: 'VARCHAR(20)' }],
        sampleRows: [{ sub_id: 10, account_id: 1, plan_name: 'Enterprise', base_mrr: '999.00', status: 'ACTIVE' }]
      },
      {
        tableName: 'add_ons',
        columns: [{ name: 'addon_id', type: 'INTEGER', key: 'PK' }, { name: 'sub_id', type: 'INTEGER', key: 'FK' }, { name: 'addon_mrr', type: 'DECIMAL(10,2)' }],
        sampleRows: [{ addon_id: 100, sub_id: 10, addon_mrr: '250.00' }]
      },
      {
        tableName: 'churn_events',
        columns: [{ name: 'event_id', type: 'INTEGER', key: 'PK' }, { name: 'account_id', type: 'INTEGER', key: 'FK' }, { name: 'reason', type: 'VARCHAR(200)' }],
        sampleRows: []
      }
    ],
    setupContent: `CREATE TABLE accounts (account_id INT PRIMARY KEY, company_name VARCHAR(100));
INSERT INTO accounts VALUES (1, 'TechFlow');

CREATE TABLE subscriptions (sub_id INT PRIMARY KEY, account_id INT, plan_name VARCHAR(50), base_mrr DECIMAL(10,2), status VARCHAR(20));
INSERT INTO subscriptions VALUES (10, 1, 'Enterprise', 999.00, 'ACTIVE');

CREATE TABLE add_ons (addon_id INT PRIMARY KEY, sub_id INT, addon_mrr DECIMAL(10,2));
INSERT INTO add_ons VALUES (100, 10, 250.00);

CREATE TABLE churn_events (event_id INT PRIMARY KEY, account_id INT, reason VARCHAR(200));`,
    starterCode: '',
    solutionCode: `SELECT a.company_name, s.plan_name, SUM(s.base_mrr + COALESCE(ao.addon_mrr, 0)) AS net_mrr FROM accounts a JOIN subscriptions s ON a.account_id = s.account_id LEFT JOIN add_ons ao ON s.sub_id = ao.sub_id LEFT JOIN churn_events c ON a.account_id = c.account_id WHERE s.status = 'ACTIVE' GROUP BY a.company_name, s.plan_name ORDER BY net_mrr DESC;`
  },
  {
    id: 'coding-sql-lab-7',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 7: Global Airline Flight Operations & Departure Delay Audit',
    scenario: 'Analyze flight performance across `airlines`, `airports`, `flights`, `pilots`, and `flight_logs`.',
    instructions: [
      'Join 5 aviation tables: `airlines`, `airports`, `flights`, `pilots`, `flight_logs`.',
      'Compute average delay minutes = `actual_dep - sched_dep`.',
      'Filter for airlines with average delay > 15 minutes.',
      'Order by avg_delay DESC.'
    ],
    sampleInput: 'Tables: airlines, airports, flights, pilots, flight_logs',
    sampleOutput: 'Columns: airline_name | city | avg_delay_mins',
    constraints: ['Join 5 tables', 'Calculate delay in minutes'],
    tables: [
      {
        tableName: 'airlines',
        columns: [{ name: 'airline_id', type: 'INTEGER', key: 'PK' }, { name: 'name', type: 'VARCHAR(100)' }],
        sampleRows: [{ airline_id: 1, name: 'SkyWays' }]
      },
      {
        tableName: 'airports',
        columns: [{ name: 'airport_id', type: 'INTEGER', key: 'PK' }, { name: 'city', type: 'VARCHAR(100)' }],
        sampleRows: [{ airport_id: 10, city: 'Chicago' }]
      },
      {
        tableName: 'pilots',
        columns: [{ name: 'pilot_id', type: 'INTEGER', key: 'PK' }, { name: 'name', type: 'VARCHAR(100)' }],
        sampleRows: [{ pilot_id: 100, name: 'Capt. Rogers' }]
      },
      {
        tableName: 'flights',
        columns: [{ name: 'flight_id', type: 'INTEGER', key: 'PK' }, { name: 'airline_id', type: 'INTEGER', key: 'FK' }, { name: 'airport_id', type: 'INTEGER', key: 'FK' }, { name: 'pilot_id', type: 'INTEGER', key: 'FK' }],
        sampleRows: [{ flight_id: 501, airline_id: 1, airport_id: 10, pilot_id: 100 }]
      },
      {
        tableName: 'flight_logs',
        columns: [{ name: 'log_id', type: 'INTEGER', key: 'PK' }, { name: 'flight_id', type: 'INTEGER', key: 'FK' }, { name: 'delay_mins', type: 'INTEGER' }],
        sampleRows: [{ log_id: 1001, flight_id: 501, delay_mins: 25 }]
      }
    ],
    setupContent: `CREATE TABLE airlines (airline_id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO airlines VALUES (1, 'SkyWays');

CREATE TABLE airports (airport_id INT PRIMARY KEY, city VARCHAR(100));
INSERT INTO airports VALUES (10, 'Chicago');

CREATE TABLE pilots (pilot_id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO pilots VALUES (100, 'Capt. Rogers');

CREATE TABLE flights (flight_id INT PRIMARY KEY, airline_id INT, airport_id INT, pilot_id INT);
INSERT INTO flights VALUES (501, 1, 10, 100);

CREATE TABLE flight_logs (log_id INT PRIMARY KEY, flight_id INT, delay_mins INT);
INSERT INTO flight_logs VALUES (1001, 501, 25);`,
    starterCode: '',
    solutionCode: `SELECT al.name AS airline_name, ap.city, AVG(fl.delay_mins) AS avg_delay_mins FROM airlines al JOIN flights f ON al.airline_id = f.airline_id JOIN airports ap ON f.airport_id = ap.airport_id JOIN pilots p ON f.pilot_id = p.pilot_id JOIN flight_logs fl ON f.flight_id = fl.flight_id GROUP BY al.name, ap.city HAVING AVG(fl.delay_mins) > 15 ORDER BY avg_delay_mins DESC;`
  },
  {
    id: 'coding-sql-lab-8',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 8: University Academic GPA Ranking & Honor Roll Audit',
    scenario: 'Compute GPA per student across `students`, `departments`, `courses`, and `enrollments`.',
    instructions: [
      'Join 4 academic tables: `students`, `departments`, `courses`, `enrollments`.',
      'Compute average numeric grade as GPA.',
      'Filter students with GPA >= 3.5.',
      'Order by GPA DESC.'
    ],
    sampleInput: 'Tables: students, departments, courses, enrollments',
    sampleOutput: 'Columns: student_id | student_name | dept_name | gpa',
    constraints: ['Join 4 academic tables', 'Filter GPA >= 3.5'],
    tables: [
      {
        tableName: 'students',
        columns: [{ name: 'student_id', type: 'INTEGER', key: 'PK' }, { name: 'name', type: 'VARCHAR(100)' }, { name: 'dept_id', type: 'INTEGER', key: 'FK' }],
        sampleRows: [{ student_id: 1, name: 'Emma Watson', dept_id: 1 }]
      },
      {
        tableName: 'departments',
        columns: [{ name: 'dept_id', type: 'INTEGER', key: 'PK' }, { name: 'dept_name', type: 'VARCHAR(100)' }],
        sampleRows: [{ dept_id: 1, dept_name: 'Computer Science' }]
      },
      {
        tableName: 'courses',
        columns: [{ name: 'course_id', type: 'INTEGER', key: 'PK' }, { name: 'title', type: 'VARCHAR(100)' }],
        sampleRows: [{ course_id: 101, title: 'Algorithms' }]
      },
      {
        tableName: 'enrollments',
        columns: [{ name: 'enroll_id', type: 'INTEGER', key: 'PK' }, { name: 'student_id', type: 'INTEGER', key: 'FK' }, { name: 'course_id', type: 'INTEGER', key: 'FK' }, { name: 'grade_point', type: 'DECIMAL(3,2)' }],
        sampleRows: [{ enroll_id: 50, student_id: 1, course_id: 101, grade_point: '3.90' }]
      }
    ],
    setupContent: `CREATE TABLE departments (dept_id INT PRIMARY KEY, dept_name VARCHAR(100));
INSERT INTO departments VALUES (1, 'Computer Science');

CREATE TABLE students (student_id INT PRIMARY KEY, name VARCHAR(100), dept_id INT);
INSERT INTO students VALUES (1, 'Emma Watson', 1);

CREATE TABLE courses (course_id INT PRIMARY KEY, title VARCHAR(100));
INSERT INTO courses VALUES (101, 'Algorithms');

CREATE TABLE enrollments (enroll_id INT PRIMARY KEY, student_id INT, course_id INT, grade_point DECIMAL(3,2));
INSERT INTO enrollments VALUES (50, 1, 101, 3.90);`,
    starterCode: '',
    solutionCode: `SELECT s.student_id, s.name AS student_name, d.dept_name, AVG(e.grade_point) AS gpa FROM students s JOIN departments d ON s.dept_id = d.dept_id JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id GROUP BY s.student_id, s.name, d.dept_name HAVING AVG(e.grade_point) >= 3.5 ORDER BY gpa DESC;`
  },
  {
    id: 'coding-sql-lab-9',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 9: Retail Chain Store Inventory Replenishment Audit',
    scenario: 'Identify stock shortages across `stores`, `products`, `store_inventory`, and `purchase_orders`.',
    instructions: [
      'Join 4 retail tables: `stores`, `products`, `store_inventory`, `purchase_orders`.',
      'Filter rows where `stock_qty` is less than `reorder_level`.',
      'Order by store_name ASC, stock_qty ASC.'
    ],
    sampleInput: 'Tables: stores, products, store_inventory, purchase_orders',
    sampleOutput: 'Columns: store_name | product_title | stock_qty | reorder_level',
    constraints: ['Filter stock_qty < reorder_level'],
    tables: [
      {
        tableName: 'stores',
        columns: [{ name: 'store_id', type: 'INTEGER', key: 'PK' }, { name: 'store_name', type: 'VARCHAR(100)' }],
        sampleRows: [{ store_id: 1, store_name: 'Downtown Flagship' }]
      },
      {
        tableName: 'products',
        columns: [{ name: 'product_id', type: 'INTEGER', key: 'PK' }, { name: 'product_title', type: 'VARCHAR(100)' }],
        sampleRows: [{ product_id: 10, product_title: 'Wireless Headset' }]
      },
      {
        tableName: 'store_inventory',
        columns: [{ name: 'inv_id', type: 'INTEGER', key: 'PK' }, { name: 'store_id', type: 'INTEGER', key: 'FK' }, { name: 'product_id', type: 'INTEGER', key: 'FK' }, { name: 'stock_qty', type: 'INTEGER' }, { name: 'reorder_level', type: 'INTEGER' }],
        sampleRows: [{ inv_id: 100, store_id: 1, product_id: 10, stock_qty: 3, reorder_level: 15 }]
      },
      {
        tableName: 'purchase_orders',
        columns: [{ name: 'po_id', type: 'INTEGER', key: 'PK' }, { name: 'store_id', type: 'INTEGER', key: 'FK' }, { name: 'status', type: 'VARCHAR(50)' }],
        sampleRows: [{ po_id: 999, store_id: 1, status: 'PENDING' }]
      }
    ],
    setupContent: `CREATE TABLE stores (store_id INT PRIMARY KEY, store_name VARCHAR(100));
INSERT INTO stores VALUES (1, 'Downtown Flagship');

CREATE TABLE products (product_id INT PRIMARY KEY, product_title VARCHAR(100));
INSERT INTO products VALUES (10, 'Wireless Headset');

CREATE TABLE store_inventory (inv_id INT PRIMARY KEY, store_id INT, product_id INT, stock_qty INT, reorder_level INT);
INSERT INTO store_inventory VALUES (100, 1, 10, 3, 15);

CREATE TABLE purchase_orders (po_id INT PRIMARY KEY, store_id INT, status VARCHAR(50));
INSERT INTO purchase_orders VALUES (999, 1, 'PENDING');`,
    starterCode: '',
    solutionCode: `SELECT st.store_name, p.product_title, si.stock_qty, si.reorder_level FROM stores st JOIN store_inventory si ON st.store_id = si.store_id JOIN products p ON si.product_id = p.product_id JOIN purchase_orders po ON st.store_id = po.store_id WHERE si.stock_qty < si.reorder_level GROUP BY st.store_name, p.product_title, si.stock_qty, si.reorder_level ORDER BY st.store_name, si.stock_qty;`
  },
  {
    id: 'coding-sql-lab-10',
    type: 'compiler',
    domain: 'sql',
    title: 'SQL Lab 10: Streaming Platform User Watch Time & Genre Ranking',
    scenario: 'Analyze video watch time across `users`, `subscription_plans`, `videos`, `watch_history`, and `user_ratings`.',
    instructions: [
      'Join 5 streaming platform tables.',
      'Calculate total watch hours (`SUM(watch_mins)/60.0`).',
      'Filter for users with watch hours > 10.0.',
      'Order by total_watch_hours DESC.'
    ],
    sampleInput: 'Tables: users, subscription_plans, videos, watch_history, user_ratings',
    sampleOutput: 'Columns: user_name | plan_name | genre | total_watch_hours',
    constraints: ['Join 5 tables', 'Convert minutes to hours'],
    tables: [
      {
        tableName: 'users',
        columns: [{ name: 'user_id', type: 'INTEGER', key: 'PK' }, { name: 'name', type: 'VARCHAR(100)' }, { name: 'plan_id', type: 'INTEGER', key: 'FK' }],
        sampleRows: [{ user_id: 1, name: 'Alex Johnson', plan_id: 1 }]
      },
      {
        tableName: 'subscription_plans',
        columns: [{ name: 'plan_id', type: 'INTEGER', key: 'PK' }, { name: 'plan_name', type: 'VARCHAR(50)' }],
        sampleRows: [{ plan_id: 1, plan_name: 'Premium 4K' }]
      },
      {
        tableName: 'videos',
        columns: [{ name: 'video_id', type: 'INTEGER', key: 'PK' }, { name: 'genre', type: 'VARCHAR(50)' }],
        sampleRows: [{ video_id: 50, genre: 'Sci-Fi' }]
      },
      {
        tableName: 'watch_history',
        columns: [{ name: 'watch_id', type: 'INTEGER', key: 'PK' }, { name: 'user_id', type: 'INTEGER', key: 'FK' }, { name: 'video_id', type: 'INTEGER', key: 'FK' }, { name: 'watch_mins', type: 'INTEGER' }],
        sampleRows: [{ watch_id: 100, user_id: 1, video_id: 50, watch_mins: 720 }]
      },
      {
        tableName: 'user_ratings',
        columns: [{ name: 'rating_id', type: 'INTEGER', key: 'PK' }, { name: 'user_id', type: 'INTEGER', key: 'FK' }, { name: 'video_id', type: 'INTEGER', key: 'FK' }, { name: 'score', type: 'INTEGER' }],
        sampleRows: [{ rating_id: 10, user_id: 1, video_id: 50, score: 5 }]
      }
    ],
    setupContent: `CREATE TABLE subscription_plans (plan_id INT PRIMARY KEY, plan_name VARCHAR(50));
INSERT INTO subscription_plans VALUES (1, 'Premium 4K');

CREATE TABLE users (user_id INT PRIMARY KEY, name VARCHAR(100), plan_id INT);
INSERT INTO users VALUES (1, 'Alex Johnson', 1);

CREATE TABLE videos (video_id INT PRIMARY KEY, genre VARCHAR(50));
INSERT INTO videos VALUES (50, 'Sci-Fi');

CREATE TABLE watch_history (watch_id INT PRIMARY KEY, user_id INT, video_id INT, watch_mins INT);
INSERT INTO watch_history VALUES (100, 1, 50, 720);

CREATE TABLE user_ratings (rating_id INT PRIMARY KEY, user_id INT, video_id INT, score INT);
INSERT INTO user_ratings VALUES (10, 1, 50, 5);`,
    starterCode: '',
    solutionCode: `SELECT u.name AS user_name, sp.plan_name, v.genre, SUM(wh.watch_mins) / 60.0 AS total_watch_hours FROM users u JOIN subscription_plans sp ON u.plan_id = sp.plan_id JOIN watch_history wh ON u.user_id = wh.user_id JOIN videos v ON wh.video_id = v.video_id JOIN user_ratings ur ON u.user_id = ur.user_id AND v.video_id = ur.video_id GROUP BY u.name, sp.plan_name, v.genre HAVING (SUM(wh.watch_mins) / 60.0) > 10.0 ORDER BY total_watch_hours DESC;`
  },

  // =========================================================================
  // 11. PRACTICAL PYTHON LABS (10 Complex Labs)
  // =========================================================================
  {
    id: 'coding-py-lab-1',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 1: E-Commerce Sales Aggregation & Refund Filtering',
    scenario: 'You are building a Python data pipeline to clean and aggregate daily transaction logs.',
    instructions: [
      'Write `process_sales(transactions)` accepting a list of transaction dicts.',
      'Filter out transactions where `price` <= 0.',
      'Return a dict mapping item names to their net revenue total.'
    ],
    sampleInput: '[{"item": "Laptop", "price": 1200}, {"item": "Mouse", "price": 25}, {"item": "Laptop", "price": 1200}, {"item": "Mouse", "price": -10}]',
    sampleOutput: '{"Laptop": 2400, "Mouse": 25}',
    constraints: ['Exclude price <= 0', 'Return dict with summed values'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def process_sales(transactions):
    result = {}
    for tx in transactions:
        item = tx.get("item")
        price = tx.get("price", 0)
        if price > 0:
            result[item] = result.get(item, 0) + price
    return result`
  },
  {
    id: 'coding-py-lab-2',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 2: Log Stream Error Code Frequency Analysis',
    scenario: 'Process log event strings to count occurrence frequencies of ERROR codes.',
    instructions: [
      'Write `analyze_logs(log_lines)` accepting a list of log strings.',
      'Extract status codes for lines containing "ERROR".',
      'Return a dict mapping error status codes to their frequencies.'
    ],
    sampleInput: '["INFO 200 OK", "ERROR 500 Server Error", "ERROR 404 Not Found", "ERROR 500 Timeout"]',
    sampleOutput: '{"500": 2, "404": 1}',
    constraints: ['Match ERROR lines', 'Count status code occurrences'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def analyze_logs(log_lines):
    counts = {}
    for line in log_lines:
        if "ERROR" in line:
            parts = line.split()
            if len(parts) >= 2:
                code = parts[1]
                counts[code] = counts.get(code, 0) + 1
    return counts`
  },
  {
    id: 'coding-py-lab-3',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 3: Financial Asset Peak-to-Trough Maximum Drawdown',
    scenario: 'Calculate peak-to-trough maximum percentage drawdown for daily asset price series.',
    instructions: [
      'Write `calculate_drawdown(prices)` receiving a list of daily float prices.',
      'Track peak value seen so far.',
      'Calculate drawdown percentage `(peak - current) / peak * 100.0`.',
      'Return the maximum drawdown percentage rounded to 2 decimal places.'
    ],
    sampleInput: '[100.0, 120.0, 90.0, 110.0, 80.0]',
    sampleOutput: '33.33',
    constraints: ['Return max drawdown rounded to 2 decimal places'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def calculate_drawdown(prices):
    if not prices:
        return 0.0
    peak = prices[0]
    max_dd = 0.0
    for p in prices:
        if p > peak:
            peak = p
        dd = (peak - p) / peak * 100.0
        if dd > max_dd:
            max_dd = dd
    return round(max_dd, 2)`
  },
  {
    id: 'coding-py-lab-4',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 4: Inverted Index Token Normalizer & Frequency Counter',
    scenario: 'Build an inverted search index mapping text tokens to document IDs and frequencies.',
    instructions: [
      'Write `build_index(docs)` accepting a dict mapping doc_id to text.',
      'Convert text to lowercase and remove punctuation.',
      'Return dict mapping lowercase word tokens to a dict of `{doc_id: frequency}`.'
    ],
    sampleInput: '{"doc1": "Data Science in Python", "doc2": "Python data analytics"}',
    sampleOutput: '{"data": {"doc1": 1, "doc2": 1}, "python": {"doc1": 1, "doc2": 1}}',
    constraints: ['Lowercase tokens', 'Ignore punctuation'],
    setupContent: '',
    starterCode: '',
    solutionCode: `import re

def build_index(docs):
    index = {}
    for doc_id, text in docs.items():
        words = re.findall(r'\\w+', text.lower())
        for word in words:
            if word not in index:
                index[word] = {}
            index[word][doc_id] = index[word].get(doc_id, 0) + 1
    return index`
  },
  {
    id: 'coding-py-lab-5',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 5: Clickstream Session Boundary Aggregator',
    scenario: 'Group clickstream timestamps into user sessions based on 30-minute idle gaps.',
    instructions: [
      'Write `group_sessions(events)` accepting list of dicts `{"user": u, "timestamp": unix_sec}`.',
      'Sort events by user and timestamp.',
      'Split sessions when time gap between consecutive events > 1800 seconds.',
      'Return dict mapping user to count of distinct sessions.'
    ],
    sampleInput: '[{"user": "u1", "timestamp": 1000}, {"user": "u1", "timestamp": 1200}, {"user": "u1", "timestamp": 4000}]',
    sampleOutput: '{"u1": 2}',
    constraints: ['1800s gap threshold', 'Return dict of session counts'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def group_sessions(events):
    by_user = {}
    for ev in events:
        by_user.setdefault(ev["user"], []).append(ev["timestamp"])
    
    session_counts = {}
    for user, ts_list in by_user.items():
        ts_list.sort()
        count = 1
        for i in range(1, len(ts_list)):
            if ts_list[i] - ts_list[i-1] > 1800:
                count += 1
        session_counts[user] = count
    return session_counts`
  },
  {
    id: 'coding-py-lab-6',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 6: Priority Inventory Allocation & Backorder Fulfiller',
    scenario: 'Allocate available product inventory to orders prioritized by customer VIP status and date.',
    instructions: [
      'Write `allocate_inventory(stock, orders)` where stock is dict `{item: qty}` and orders is list of dicts.',
      'Prioritize orders by VIP status (`is_vip=True` first) then order date.',
      'Fulfill orders if stock is sufficient, deducting stock.',
      'Return list of fulfilled order IDs.'
    ],
    sampleInput: 'stock={"ItemA": 5}, orders=[{"id": "o1", "item": "ItemA", "qty": 3, "is_vip": False}, {"id": "o2", "item": "ItemA", "qty": 4, "is_vip": True}]',
    sampleOutput: '["o2"]',
    constraints: ['VIP first', 'Deduct stock on fulfillment'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def allocate_inventory(stock, orders):
    sorted_orders = sorted(orders, key=lambda x: (not x.get("is_vip", False), x.get("date", "")))
    fulfilled = []
    inv = dict(stock)
    for ord in sorted_orders:
        item = ord["item"]
        qty = ord["qty"]
        if inv.get(item, 0) >= qty:
            inv[item] -= qty
            fulfilled.append(ord["id"])
    return fulfilled`
  },
  {
    id: 'coding-py-lab-7',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 7: Fraud Detection Transaction Velocity & Anomaly Scorer',
    scenario: 'Detect rapid transaction velocity anomalies indicating payment fraud.',
    instructions: [
      'Write `flag_suspicious(transactions)` accepting list of dicts `{"id": id, "user": u, "amount": amt, "ts": timestamp}`.',
      'Flag transaction if user makes > 2 transactions within a 60-second window.',
      'Return list of flagged transaction IDs.'
    ],
    sampleInput: '[{"id": "t1", "user": "u1", "ts": 10}, {"id": "t2", "user": "u1", "ts": 30}, {"id": "t3", "user": "u1", "ts": 50}]',
    sampleOutput: '["t1", "t2", "t3"]',
    constraints: ['60-second window check', 'Flag velocity violations'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def flag_suspicious(transactions):
    by_user = {}
    for tx in transactions:
        by_user.setdefault(tx["user"], []).append(tx)
    
    flagged = set()
    for user, txs in by_user.items():
        txs.sort(key=lambda x: x["ts"])
        for i in range(len(txs)):
            count = 1
            for j in range(i + 1, len(txs)):
                if txs[j]["ts"] - txs[i]["ts"] <= 60:
                    count += 1
                else:
                    break
            if count > 2:
                for k in range(i, i + count):
                    flagged.add(txs[k]["id"])
    return list(flagged)`
  },
  {
    id: 'coding-py-lab-8',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 8: Organizational Tree Hierarchy & Span of Control',
    scenario: 'Compute total direct and indirect reports for each manager in a company hierarchy.',
    instructions: [
      'Write `span_of_control(employees)` where employees is list of dicts `{"id": id, "manager_id": mgr}`.',
      'Return dict mapping manager_id to total number of direct + indirect subordinates.'
    ],
    sampleInput: '[{"id": 1, "manager_id": None}, {"id": 2, "manager_id": 1}, {"id": 3, "manager_id": 2}]',
    sampleOutput: '{1: 2, 2: 1}',
    constraints: ['Count total direct and indirect subordinates'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def span_of_control(employees):
    children = {}
    all_managers = set()
    for emp in employees:
        mgr = emp.get("manager_id")
        if mgr is not None:
            children.setdefault(mgr, []).append(emp["id"])
            all_managers.add(mgr)
            
    def get_subordinates(mgr_id):
        subs = set(children.get(mgr_id, []))
        for child in list(subs):
            subs.update(get_subordinates(child))
        return subs

    result = {}
    for mgr in all_managers:
        result[mgr] = len(get_subordinates(mgr))
    return result`
  },
  {
    id: 'coding-py-lab-9',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 9: Time-Series Resampling & Exponential Moving Average',
    scenario: 'Resample irregular time-series sensor readings and calculate exponential moving averages.',
    instructions: [
      'Write `exponential_moving_average(series, alpha=0.5)` accepting list of float values.',
      'Compute EMA: `ema[0] = series[0]`, `ema[t] = alpha * series[t] + (1 - alpha) * ema[t-1]`.',
      'Return list of EMA values rounded to 2 decimal places.'
    ],
    sampleInput: '[10.0, 20.0, 30.0], alpha=0.5',
    sampleOutput: '[10.0, 15.0, 22.5]',
    constraints: ['Round results to 2 decimal places'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def exponential_moving_average(series, alpha=0.5):
    if not series:
        return []
    ema = [series[0]]
    for i in range(1, len(series)):
        val = alpha * series[i] + (1 - alpha) * ema[-1]
        ema.append(val)
    return [round(x, 2) for x in ema]`
  },
  {
    id: 'coding-py-lab-10',
    type: 'compiler',
    domain: 'python',
    title: 'Python Lab 10: Run-Length Encoding Data Compression Engine',
    scenario: 'Implement run-length encoding (RLE) string compression and decompression utility.',
    instructions: [
      'Write `compress_rle(s)` accepting string `s`.',
      'Replace consecutive duplicate characters with the character followed by its count (e.g., "AAABBC" -> "A3B2C1").',
      'Return compressed string.'
    ],
    sampleInput: '"AAABBC"',
    sampleOutput: '"A3B2C1"',
    constraints: ['Case sensitive encoding'],
    setupContent: '',
    starterCode: '',
    solutionCode: `def compress_rle(s):
    if not s:
        return ""
    res = []
    count = 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            count += 1
        else:
            res.append(f"{s[i-1]}{count}")
            count = 1
    res.append(f"{s[-1]}{count}")
    return "".join(res)`
  }
];
