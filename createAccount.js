const puppeteer = require('puppeteer'); 
const accountInfo = require('./accountInfoGenerator');
const verifiCode = require('./getCode');
const email = require('./createFakeMail');
const appendToJsonFile = require('./appendAccount');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

function getRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async function fakeInstagramAccount() {
  const browser = await puppeteer.launch({ headless: false }); // Set to `true` for headless mode
  const page = await browser.newPage();

  try {
    // Navigate to Instagram signup page
    await page.goto("https://www.instagram.com/accounts/emailsignup/", {
      waitUntil: 'networkidle2'
    });
    await sleep(5000);

    // Generate fake email
    const fakeMail = await email.getFakeMail();
    const name = await accountInfo.generatingName();
    const username = await accountInfo.username() + getRandomPassword(3);
    const randomPassword = getRandomPassword(10);

    console.log("Generated Account Info:", { fakeMail, name, username, randomPassword });

    // Fill out the signup form
    await page.type('input[name="emailOrPhone"]', fakeMail);
    await page.type('input[name="fullName"]', name);
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', randomPassword);

    // Click the sign-up button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const signUpButton = buttons.find(btn => btn.textContent.trim() === 'Sign up');
      if (signUpButton) {
          signUpButton.click();
      } else {
          throw new Error("Sign-up button not found.");
      }
    });
     await sleep(5000)

    // Wait for the selectors to load
    await page.waitForSelector('select[title="Month:"]');
    await page.waitForSelector('select[title="Day:"]');
    await page.waitForSelector('select[title="Year:"]');

    // Randomly select a month
    const randomMonth = getRandomInt(1, 12).toString(); // Values are 1-12
    await page.select('select[title="Month:"]', randomMonth);

    // Randomly select a day
    const randomDay = getRandomInt(1, 28).toString(); // Values are 1-28
    await page.select('select[title="Day:"]', randomDay);

    // Randomly select a year between 1990 and 2000
    const randomYear = getRandomInt(1990, 2000).toString();
    await page.select('select[title="Year:"]', randomYear);

    console.log(`Selected Date: ${randomMonth}/${randomDay}/${randomYear}`);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const signUpButton = buttons.find(btn => btn.textContent.trim() === 'Next');
      if (signUpButton) {
          signUpButton.click();
      } else {
          throw new Error("Next button not found.");
      }
    });

    await sleep(5000);

    // Wait for the verification code page to load
    await page.waitForSelector('input[name="email_confirmation_code"]', { timeout: 10000 });

    // Get the email verification code
    const [mailName, domain] = fakeMail.split('@');
    const veriCode = await verifiCode.getInstCode(domain, mailName, browser);
    console.log("Verification Code:", veriCode.slice(0,6));
    await sleep(5000);

    // Input verification code
    await page.type('input[name="email_confirmation_code"]', veriCode.slice(0,6));
    await page.keyboard.press('Enter');
    const targetUrl = "https://www.instagram.com/";

    try {
        await page.waitForFunction(
            (url) => window.location.href === url,
            { timeout: 30000 }, // Timeout in ms (30 seconds)
            targetUrl
        );
        console.log("Page redirected to:", targetUrl);
        // Save account info to JSON file
        appendToJsonFile({
            email: fakeMail,
            name: name,
            username: username,
            password: randomPassword
        }, 'accounts.json');
    } catch (error) {
      console.error("Page did not redirect to the target URL within the timeout.");
       // Extract the text content of the entire page
      const pageText = await page.evaluate(() => document.body.textContent);
      console.log("Page Text:\n", pageText.trim());
    }


  } catch (e) {
    console.error(e);
  } finally {
    // Close browser
    await browser.close();
  }
})();
