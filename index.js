const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'zebulon_saturn@hotmail.com',
        pass: '}K#JmEUXnbR+8ic'
    }
});

var mailOptions = {
    from: 'zebulon_saturn@hotmail.com',
    to: 'yliesk8@gmail.com',
    subject: 'SEAS',
    text: 'Le bob est dispo !'
};

function check() {
    (async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto("https://zebulon-saturn-shop.myshopify.com/products/bucket-hat");

        const text = await page.$eval(".btn", el => el.textContent);

        console.log(text);

        if (!text.includes("Épuisé")) {
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

        } else {
            await browser.close();
            setTimeout(() => {
                check();
            }, 60000);
        };

    })();
};

check();