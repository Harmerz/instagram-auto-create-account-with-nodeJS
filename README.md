# Instagram Automatic Account Creator Bot Using NodeJS

An automatic bot script for creating Instagram accounts using NodeJS and Puppeteer. This version replaces Selenium with Puppeteer for enhanced performance and reliability. It also integrates [email-fake.com](https://email-fake.com/) to retrieve Instagram verification codes.

---

## Features
- **Automated Account Creation**: Automates the Instagram account creation process using Puppeteer.
- **Email Integration**: Fetches verification codes directly from [email-fake.com](https://email-fake.com/).
- **Proxy Support**: Allows the use of proxies to prevent IP bans and improve privacy.

---

## Requirements
1. **Node.js**: Install Node.js on your system.
2. **Puppeteer**: Installed as a dependency for browser automation.
3. **Proxies (Optional)**: Recommended for avoiding IP bans and ensuring better reliability.

---

## Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Harmerz/instagram-auto-create-account-with-nodeJS
cd instagram-auto-create-account-with-nodeJS
npm install
```

---

## Usage
Run the script using the following command:

```bash
node createAccount.js
```

---

## Notes
- **Switch from Selenium to Puppeteer**: This version uses Puppeteer for smoother browser automation.
- **Email Verification**: Retrieves Instagram verification codes through [email-fake.com](https://email-fake.com/).
- **Proxy Support**: To enhance performance and avoid bans, configure proxies as needed.

---

## Disclaimer
This tool is for educational purposes only. Please use it responsibly and ensure compliance with Instagram's terms of service and applicable laws.

---

## Acknowledgments
This project is adapted from the original repository: [instagram-auto-create-account-with-nodeJS](https://github.com/eaabak/instagram-auto-create-account-with-nodeJS).

Enhancements in this version include:
- Replacing Selenium with Puppeteer.
- Improved email verification handling.
- Support for proxy configuration.

---

Feel free to contribute, report issues, or suggest improvements!
