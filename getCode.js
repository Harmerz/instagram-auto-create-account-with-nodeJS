const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const getInstCode = async function (domain, mailName, browser) {
    const INST_CODE = `https://email-fake.com/${domain}/${mailName}`;
    let code = "";
    const page = await browser.newPage();

    console.log(INST_CODE);

    try {
        // Open the target URL in the new page
        await page.goto(INST_CODE, { waitUntil: 'networkidle2' });

        // Wait for the email table to load
        await page.waitForSelector('#email-table div h1', { timeout: 10000 });

        // Extract the code text using a selector
        const codeElement = await page.$('#email-table div h1');
        if (codeElement) {
            code = await page.evaluate(el => el.textContent, codeElement);
            console.log(code);
            code = code.replace("is your Instagram code", "").trim();
        } else {
            console.error("Code element not found");
        }
    } catch (error) {
        console.error("Error fetching the code:", error);
    } finally {
        await page.close();
        return code;
    }
};

module.exports = { getInstCode };
