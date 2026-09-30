// Utility for Excel Sheet generation, download, and interactive preview

export const retailSalesDataset = [
  { id: "TXN-1001", date: "2026-01-05", customer: "Priya Sharma", category: "Electronics", product: "Wireless Noise-Canceling Headphones", units: 2, price: 4999, gross: 9998, discount: 0.10, net: 8998.20, region: "Bangalore", payment: "UPI" },
  { id: "TXN-1002", date: "2026-01-07", customer: "Rahul Sen", category: "Computing", product: "Mechanical Gaming Keyboard RGB", units: 1, price: 3499, gross: 3499, discount: 0.05, net: 3324.05, region: "Bhubaneswar", payment: "Credit Card" },
  { id: "TXN-1003", date: "2026-01-10", customer: "Ananya Roy", category: "Office Tech", product: "Ergonomic Mesh Desk Chair", units: 1, price: 8990, gross: 8990, discount: 0.15, net: 7641.50, region: "Bangalore", payment: "Net Banking" },
  { id: "TXN-1004", date: "2026-01-12", customer: "Mohammed Farhan", category: "Electronics", product: "Ultra-Wide 34' Curved Monitor 4K", units: 1, price: 32999, gross: 32999, discount: 0.12, net: 29039.12, region: "Dubai", payment: "Debit Card" },
  { id: "TXN-1005", date: "2026-01-15", customer: "Deepak Patel", category: "Storage", product: "2TB NVMe PCIe 4.0 High-Speed SSD", units: 3, price: 6200, gross: 18600, discount: 0.08, net: 17112.00, region: "Bangalore", payment: "UPI" },
  { id: "TXN-1006", date: "2026-01-18", customer: "Sunita Das", category: "Peripherals", product: "Precision Wireless Ergonomic Mouse", units: 2, price: 1850, gross: 3700, discount: 0.05, net: 3515.00, region: "Bhubaneswar", payment: "UPI" },
  { id: "TXN-1007", date: "2026-01-22", customer: "Vikram Malhotra", category: "Computing", product: "Apple MacBook Pro M3 (16GB RAM)", units: 1, price: 169900, gross: 169900, discount: 0.07, net: 158007.00, region: "Bangalore", payment: "Corporate Card" },
  { id: "TXN-1008", date: "2026-01-25", customer: "Fatima Al-Zahra", category: "Office Tech", product: "Smart Height-Adjustable Standing Desk", units: 2, price: 21500, gross: 43000, discount: 0.10, net: 38700.00, region: "Dubai", payment: "Bank Wire" },
  { id: "TXN-1009", date: "2026-01-28", customer: "Amit Mohanty", category: "Electronics", product: "Noise Cancelling Studio Microphone", units: 1, price: 5499, gross: 5499, discount: 0.05, net: 5224.05, region: "Bhubaneswar", payment: "UPI" },
  { id: "TXN-1010", date: "2026-02-02", customer: "Kavita Nair", category: "Networking", product: "Wi-Fi 7 Dual-Band Gigabit Mesh Router", units: 2, price: 7800, gross: 15600, discount: 0.10, net: 14040.00, region: "Bangalore", payment: "Credit Card" },
  { id: "TXN-1011", date: "2026-02-05", customer: "Sanjay Verma", category: "Peripherals", product: "Webcam 4K HDR with Dual Mic", units: 1, price: 4200, gross: 4200, discount: 0.05, net: 3990.00, region: "Bangalore", payment: "UPI" },
  { id: "TXN-1012", date: "2026-02-08", customer: "Siddharth Rao", category: "Electronics", product: "Thunderbolt 4 Multi-Port Docking Station", units: 1, price: 12500, gross: 12500, discount: 0.10, net: 11250.00, region: "Bangalore", payment: "Debit Card" }
];

export function generateAndDownloadExcel(filename = "DV_Analytics_Retail_Sales_Master.csv") {
  const headers = ["TransactionID", "Date", "CustomerName", "Category", "Product", "UnitsSold", "UnitPrice(INR)", "GrossRevenue(INR)", "DiscountPct", "NetRevenue(INR)", "Region", "PaymentMode"];
  
  const csvRows = [
    headers.join(","),
    ...retailSalesDataset.map(row => [
      row.id,
      row.date,
      `"${row.customer}"`,
      `"${row.category}"`,
      `"${row.product}"`,
      row.units,
      row.price,
      row.gross,
      row.discount,
      row.net.toFixed(2),
      `"${row.region}"`,
      `"${row.payment}"`
    ].join(","))
  ];

  const csvString = csvRows.join("\r\n");
  const blob = new Blob(["\uFEFF" + csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

export function downloadFile(filename = "Material_Archive.zip", customContent = null, mimeType = "application/octet-stream") {
  if (filename.endsWith('.xlsx') || filename.endsWith('.csv')) {
    return generateAndDownloadExcel(filename);
  }

  let content = customContent;
  if (!content) {
    if (filename.endsWith('.zip')) {
      // Mock valid zip payload with descriptive metadata
      content = `DV Analytics Material Archive: ${filename}\r\nPackage contains datasets, solution workbooks, and slide presentations.\r\nSubject Module: DV Analytics APIDS Program\r\nStudent: SK ABDUL SAJID (Batch 202606)\r\nTimestamp: 05.06.2026\r\n`;
    } else if (filename.endsWith('.sql')) {
      content = `-- DV Analytics SQL Practice Script: ${filename}\r\n-- Subject: SQL SERVER Data Science\r\n-- Student: SK ABDUL SAJID\r\n\r\nCREATE TABLE Retail_Sales (\r\n  TransactionID VARCHAR(20) PRIMARY KEY,\r\n  OrderDate DATE,\r\n  CustomerName NVARCHAR(100),\r\n  GrossRevenue DECIMAL(10,2),\r\n  NetRevenue DECIMAL(10,2)\r\n);\r\n\r\nSELECT TransactionID, CustomerName, NetRevenue,\r\n  DENSE_RANK() OVER(ORDER BY NetRevenue DESC) as RankByRevenue\r\nFROM Retail_Sales;\r\n`;
    } else if (filename.endsWith('.py') || filename.endsWith('.ipynb')) {
      content = `# DV Analytics Python Practice Script: ${filename}\r\n# Subject: Python Programming for Data Science\r\n# Student: SK ABDUL SAJID\r\n\r\nimport numpy as np\r\nimport pandas as pd\r\n\r\ndef calculate_kpis(df):\r\n    df['NetMargin'] = df['NetRevenue'] / df['GrossRevenue']\r\n    return df.groupby('Region')['NetRevenue'].agg(['sum', 'mean'])\r\n\r\nif __name__ == '__main__':\r\n    print("DV Analytics Python Workbench Ready")\r\n`;
    } else {
      content = `DV Analytics Educational Resource: ${filename}\r\nDownloaded for SK ABDUL SAJID (Batch 202606)\r\n`;
    }
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
