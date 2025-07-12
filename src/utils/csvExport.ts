export interface CSVExportData {
  [key: string]: string | number;
}

export interface CSVExportOptions {
  filename?: string;
  headers?: string[];
}

export const exportToCSV = (
  data: CSVExportData[],
  options: CSVExportOptions = {}
): string => {
  const { filename = 'export', headers } = options;
  
  if (data.length === 0) {
    return '';
  }

  // Get headers from data if not provided
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = csvHeaders.join(',');
  
  // Create CSV data rows
  const dataRows = data.map(row => 
    csvHeaders.map(header => {
      const value = row[header];
      // Escape commas and quotes in values
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );
  
  // Combine header and data rows
  const csvContent = [headerRow, ...dataRows].join('\n');
  
  return csvContent;
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  // For React Native, we'll use the Share API or Alert to show the content
  // In a web environment, this would create a download link
  console.log('CSV Content:', csvContent);
  console.log('Filename:', filename);
  
  // In a real implementation, you would use:
  // - React Native: react-native-share or react-native-fs
  // - Web: create a blob and download link
};

export const formatDateForCSV = (date: Date | string): string => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export const formatCurrencyForCSV = (amount: number): string => {
  return amount.toFixed(2);
}; 