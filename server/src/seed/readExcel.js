const xlsx = require('xlsx');
const path = require('path');

const filePath = path.resolve(__dirname, '../../../CareerLens_Research_Data.xlsx');
const workbook = xlsx.readFile(filePath);

workbook.SheetNames.forEach(sheetName => {
  console.log(`\n--- Sheet: ${sheetName} ---`);
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  for (let i = 0; i < 6; i++) {
    if (data[i]) console.log(`Row ${i}:`, data[i]);
  }
});
