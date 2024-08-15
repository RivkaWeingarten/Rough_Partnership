
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
// import { db } from '@/lib/db.js'; // Adjust the relative path if necessary
import { fileURLToPath } from 'url';
const parseDate = (dateString) => {
  // Example parsing function for MM/DD/YYYY format
  const [month, day, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};
// console.log('Current directory:', __dirname);
// console.log('Resolved path:', path.resolve(__dirname, '../../lib/db'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { db } from '../../lib/db.js'; // Adjust the relative path if necessary

const importRapCsv = async () => {
  const csvFilePath = path.join(__dirname, '..', '..', 'psRapList.csv'); // Adjust path if necessary
  const records = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      records.push(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      
      // Insert records into the database
      for (const record of records) {
        try {
          await db.PSRap.update({
            where: { shape_color_clarity_size: record['Shape-Color-Clarity'] }, 
            data: {
              shape_color_clarity_size: record['Shape-Color-Clarity'],
              list: parseFloat(record['List']),
              listDate: parseDate(record['Date']),
              // map other columns accordingly
            },
          });
        } catch (error) {
          console.error('Error inserting record:', error);
        }
      }
      
      await db.$disconnect();
      console.log('Data successfully imported');
    });
};

importRapCsv();
