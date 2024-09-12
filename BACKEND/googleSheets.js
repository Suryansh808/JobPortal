const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

// Load OAuth2 credentials
// const credentials = require('./path/to/credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(__dirname, 'token.json');

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

const appendToSheet = async (data) => {
  const { SHEET_ID } = process.env;

  const range = 'Sheet1!A1'; // Adjust the range as needed
  const valueInputOption = 'RAW';
  const resource = {
    values: [data],
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption,
      resource,
    });
    console.log('Data successfully written to Google Sheets');
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
  }
};

module.exports = { appendToSheet };
