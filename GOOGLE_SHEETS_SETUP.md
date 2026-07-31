# Google Sheets Integration Setup

This guide will help you connect the registration form to a Google Sheet in your shared drive.

## Step 1: Create a Google Sheet

1. Go to your Google Shared Drive
2. Create a new Google Sheet named "AustroVis Registrations" (or any name you prefer)
3. Rename the sheet's first tab to `current` — this spreadsheet holds multiple tabs (e.g. past editions), and the Apps Script always reads/writes the tab named exactly `current`. Add the following headers in its first row:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Affiliation`
   - D1: `Presenter`
   - E1: `Talk Title`
   - F1: `Talk Type`
   - G1: `Description`
   - H1: `Expectations`
   - I1: `Event ID`
   - J1: `Event Title`
   - K1: `Event Date`

## Step 2: Create a Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code and paste the following:

```javascript
// AustroVis Registration Handler
// Reads/writes only the sheet tab named "current" — this spreadsheet
// keeps multiple tabs (e.g. past editions), and only "current" is live.
// Copy this entire file into the Apps Script editor, replacing everything.

function getCurrentSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('current');
  if (!sheet) {
    throw new Error('Sheet tab "current" not found');
  }
  return sheet;
}

function doGet(e) {
  try {
    var sheet = getCurrentSheet();
    var action = e.parameter.action;
    var name = e.parameter.name;

    if (action === 'get' && name) {
      var data = sheet.getDataRange().getValues();
      var headers = data[0];

      var nameCol = headers.indexOf('Name');
      var timestampCol = headers.indexOf('Timestamp');
      var affiliationCol = headers.indexOf('Affiliation');
      var presenterCol = headers.indexOf('Presenter');
      var talkTitleCol = headers.indexOf('Talk Title');
      var talkTypeCol = headers.indexOf('Talk Type');
      var descriptionCol = headers.indexOf('Description');
      var expectationsCol = headers.indexOf('Expectations');
      var eventIdCol = headers.indexOf('Event ID');
      var eventTitleCol = headers.indexOf('Event Title');
      var eventDateCol = headers.indexOf('Event Date');

      for (var i = 1; i < data.length; i++) {
        if (data[i][nameCol] === name) {
          var registration = {
            success: true,
            data: {
              name: data[i][nameCol],
              affiliation: data[i][affiliationCol],
              isPresenting: data[i][presenterCol],
              talkTitle: data[i][talkTitleCol],
              talkType: data[i][talkTypeCol],
              description: data[i][descriptionCol],
              expectations: data[i][expectationsCol],
              eventId: data[i][eventIdCol],
              eventTitle: data[i][eventTitleCol],
              eventDate: data[i][eventDateCol],
              submittedAt: data[i][timestampCol]
            }
          };

          return ContentService
            .createTextOutput(JSON.stringify(registration))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No registration found with that name'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid request'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var sheet = getCurrentSheet();
    var data = JSON.parse(e.postData.contents);
    var action = data.action || 'create';

    if (action === 'update') {
      var sheetData = sheet.getDataRange().getValues();
      var headers = sheetData[0];
      var nameCol = headers.indexOf('Name');

      for (var i = 1; i < sheetData.length; i++) {
        if (sheetData[i][nameCol] === data.name) {
          var rowNum = i + 1;

          sheet.getRange(rowNum, 1, 1, 11).setValues([[
            data.submittedAt || new Date().toISOString(),  // Timestamp
            data.name || '',                                // Name
            data.affiliation || '',                         // Affiliation
            data.isPresenting || 'No',                      // Presenter
            data.talkTitle || '',                           // Talk Title
            data.talkType || '',                            // Talk Type
            data.description || '',                         // Description
            data.expectations || '',                        // Expectations
            data.eventId || '',                             // Event ID
            data.eventTitle || '',                          // Event Title
            data.eventDate || ''                             // Event Date
          ]]);

          return ContentService
            .createTextOutput(JSON.stringify({
              success: true,
              message: 'Registration updated successfully'
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Registration not found for update'
        }))
        .setMimeType(ContentService.MimeType.JSON);

    } else {
      var sheetData = sheet.getDataRange().getValues();
      var headers = sheetData[0];
      var nameCol = headers.indexOf('Name');

      for (var i = 1; i < sheetData.length; i++) {
        if (sheetData[i][nameCol] === data.name) {
          return ContentService
            .createTextOutput(JSON.stringify({
              success: false,
              error: 'A registration with this name already exists. Please use the "Edit Existing Registration" option to update it.',
              isDuplicate: true
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }

      sheet.appendRow([
        data.submittedAt || new Date().toISOString(),  // Timestamp
        data.name || '',                                // Name
        data.affiliation || '',                         // Affiliation
        data.isPresenting || 'No',                      // Presenter
        data.talkTitle || '',                           // Talk Title
        data.talkType || '',                            // Talk Type
        data.description || '',                         // Description
        data.expectations || '',                        // Expectations
        data.eventId || '',                             // Event ID
        data.eventTitle || '',                          // Event Title
        data.eventDate || ''                             // Event Date
      ]);

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Registration created successfully'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon) and give your project a name (e.g., "AustroVis Registration Handler")

## Step 3: Deploy the Apps Script as a Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "AustroVis Registration API"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Review and authorize the permissions when prompted
6. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...`)

## Step 4: Configure Your Next.js App

1. Open the `.env.local` file in your project root
2. Replace `your_script_url_here` with the Web app URL you copied:
   ```
   GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
3. Save the file
4. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 5: Test the Integration

1. Go to `http://localhost:3000/register`
2. Fill out and submit the form
3. Check your Google Sheet - you should see a new row with the form data!

## For Production (GitHub Pages)

Since GitHub Pages only serves static files, you'll need to add the environment variable to your build:

### Option A: Use GitHub Actions Secrets

1. Go to your repository on GitHub
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Name: `GOOGLE_SHEETS_SCRIPT_URL`
5. Value: Your Apps Script Web App URL
6. Update `.github/workflows/deploy.yml` to include the environment variable:

```yaml
- name: Build with Next.js
  run: npm run build
  env:
    NODE_ENV: production
    GOOGLE_SHEETS_SCRIPT_URL: ${{ secrets.GOOGLE_SHEETS_SCRIPT_URL }}
```

### Option B: Make it public in the code (less secure)

Alternatively, since the Apps Script URL is already somewhat obfuscated and protected, you could hardcode it in the API route, but this is less secure.

## Troubleshooting

### Forms not submitting?
- Check browser console for errors
- Verify the Apps Script deployment URL is correct
- Make sure the Apps Script is deployed with "Anyone" access

### Data not appearing in Sheet?
- Check if the Apps Script is bound to the correct sheet
- Look at the Apps Script execution logs: **Apps Script Editor** > **Executions**
- Verify the sheet headers match exactly (including case)

### CORS errors?
- Make sure the Apps Script is deployed as a web app with "Anyone" access
- The Apps Script handles CORS automatically when deployed as a web app

## Security Notes

- The Apps Script URL is hard to guess but not truly secret
- For production, consider adding validation in the Apps Script
- You can add rate limiting in the Apps Script if needed
- The spreadsheet permissions control who can view the data
