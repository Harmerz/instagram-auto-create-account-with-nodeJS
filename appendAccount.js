const fs = require('fs');

/**
 * Appends account info to a JSON file.
 * @param {Object} accountInfo - The account info object to write.
 * @param {string} filePath - The file path of the JSON file.
 */
function appendToJsonFile(accountInfo, filePath = 'accounts.json') {
    // Read the existing JSON file or initialize an empty array if it doesn't exist
    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        if (fileContents.trim()) {
            data = JSON.parse(fileContents);
        }
    }

    // Append the new account info
    data.push(accountInfo);

    // Write the updated array back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
}

module.exports = appendToJsonFile;
