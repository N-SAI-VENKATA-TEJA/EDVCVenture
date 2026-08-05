import * as xlsx from 'xlsx';
import path from 'path';

const filePath = path.resolve(__dirname, '../../../CareerLens_Research_Data.xlsx');
const workbook = xlsx.readFile(filePath);

console.log('Sheet Names:');
console.log(workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
  console.log(`\n--- Sheet: ${sheetName} ---`);
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  console.log('Headers:', data[0]);
  console.log('First Row:', data[1]);
});
