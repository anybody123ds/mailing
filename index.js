import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {swaggerDocument} from "./swagger.js";
import {createServer} from "http";
import {createTransport} from "nodemailer";

// App initialization
const app = express();
const server = createServer(app);

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Mailer");
});

app.post("/send-jackpot", async (req, res) => {
  const {emails} = req.body; // Extract the array of email addresses from the request body

  // Check if the emails string exists and is not empty
  if (!emails || emails.trim() === "") {
    return res.status(400).send("No email addresses provided");
  }

  let emailArray;

  // Check if the emails string contains multiple addresses separated by commas
  if (emails.includes(",")) {
    // Split the string of email addresses by commas and trim any leading/trailing spaces
    emailArray = emails.split(",").map((email) => email.trim());
  } else {
    // If there's only one email address, create an array with that single address
    emailArray = [emails.trim()];
  }
  // Check if the resulting array is empty after splitting
  if (emailArray.length === 0) {
    return res.status(400).send("No valid email addresses provided");
  }
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  var transporter = createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "80844c587e5e7ec3bdf8ad9d598dd349",
    },
  });
  try {
    await Promise.all(
      emailArray.map(async (email, index) => {
        const mailOptions = {
          from: "Jackpot Lottery<winningteam@jackpot.foundation>",
          to: email,
          subject:
            "Congratulations! You've Won the Jackpot Powerball Lottery for this season!",
          headers: {
            "X-Mailtrap-Category": "Primary",
          },
          html: `
		  <html lang="en">

		  <head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Congratulations</title>
			  <style>
				  * {
					  padding: 0;
					  margin: 0;
				  }
		  
				  .nav {
					  background: #0a142f;
					  padding: 16px;
					  color: white;
				  }
		  
				  .container {
					  background: #0a142f;
					  padding: 16px;
					  color: white;
					  display: flex;
					  align-items: center;
				  }
		  
				  main {
					  max-width: 960px;
					  margin: 16px auto;
					  padding: 24px 0;
				  }
		  
				  .container p {
					  font-size: 20px;
					  font-weight: 700;
					  color: white;
					  margin-left: 16px;
					  padding-left: 16px;
				  }
			  </style>
		  </head>
		  
		  <body>
			  <nav class="">
				  <div class="container">
					  <img src="http://jackpot.foundation/images/logo.png" alt="" width="100">
					  <p>CONGRATULATIONS!!!</p>
				  </div>
			  </nav>
			  <main style="margin: 20px 24px;">
				  <p>Dear winner,
				  <br>
				  We are thrilled to inform you that you are the lucky winner of the Jackpot Powerball Lottery! On behalf of the entire Jackpot family, we extend our warmest congratulations to you.
				  <br> <br>
				  After careful selection, you have been randomly  chosen as the grand prize winner in your state, entitling you to a life-changing sum of money., and we couldn't be happier to share this incredible news with you.
				  <br><br>
					  Your winning ticket number is jCKPTPWRBLL24031122345114470, and the jackpot prize stands at an astounding $250,000. This remarkable achievement is a testament to your luck and our commitment to providing thrilling opportunities for our players.
					  <br> <br>
					  We understand the magnitude of this moment and the impact it will have on your life. Rest assured, our team is dedicated to ensuring a seamless and secure claiming process for your prize. Please respond to this email at your earliest convenience to initiate the necessary steps to claim your winnings.
					  <br> <br>
					  Once again, congratulations on this monumental win! We look forward to accompanying you on this exciting journey ahead.
					 <br><br><br>
					  Best regards,<br>
					  Winning Team Department & Claims.<br>
					  JackPot Lottery Inc .<br>
					  JackPot.com<br>
					  JackPot.foundation<br>
				  </p>
			  </main>
			  <footer class="nav">
				  <p class="footer-text" style="text-align: center;margin: 10px 0 20px 0;">© 2024 Jackpot.com. All rights
					  reserved.</p>
				  <a style="text-align: center; text-decoration: underline; color: #fff; margin-bottom: 8px;"
					  href="__unsubscribe_url__">unsubscribe</a>
		  
				  <div style="margin-left: 5px; margin-top: 8px; max-width: 1024px;
						  margin: 0 auto; font-size: 14px; color: #fff;">
					  <p class="footer-text">All trademarks remain the property of their rightful owners. Jackpot.com is an
						  independent lottery courier service and is not affiliated or associated with the Multi-State Lottery
						  Association or any State Lottery.</p><br>
					  <p class="footer-text"><b>Play Responsibly</b><br>You must be 18 or older to order a lottery ticket. Please
						  play responsibly. If you or someone you know has a gambling problem, call 1800-GAMBLER; residents of New
						  York call the HOPE line at 1-877-8-HOPENY (1-877-846-7369) or text HOPENY (467369).</p>
				  </div>
			  </footer>
		  </body>
		  
		  </html>		  `,
        };
        await delay(index * 12000); // Delay 20 seconds for each email

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent to :", email);
          }
        });
      })
    );
    return res.status(200).send("Emails sent");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
});

// app.post("/test-jackpot", async (req, res) => {
//   const {emails} = req.body; // Extract the array of email addresses from the request body

//   // Check if the emails array exists and is not empty
//   if (!emails || emails.length === 0) {
//     return res.status(400).send("No email addresses provided");
//   }

//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   var transporter = createTransport({
//     host: "live.smtp.mailtrap.io",
//     port: 587,
//     auth: {
//       user: "api",
//       pass: "80844c587e5e7ec3bdf8ad9d598dd349",
//     },
//   });
//   try {
//     await Promise.all(
//       emails.map(async (email, index) => {
//         const mailOptions = {
//           from: "Jackpot Lottery<support@jackpot.foundation>",
//           to: email,
//           subject: "Unleash Your Winning Potential with Jackpot.com Lottery!",
//           headers: {
//             "X-Mailtrap-Category": "Primary",
//           },
//           html: "",
//         };
//         await delay(index * 20000); // Delay 20 seconds for each email

//         transporter.sendMail(mailOptions, function (err, info) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Email sent to :", email);
//           }
//         });
//       })
//     );
//     return res.status(200).send("Emails sent");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Something went wrong");
//   }
// });

app.post("/send-cruise", async (req, res) => {
  const {emails} = req.body; // Extract the array of email addresses from the request body

  // Check if the emails string exists and is not empty
  if (!emails || emails.trim() === "") {
    return res.status(400).send("No email addresses provided");
  }

  let emailArray;

  // Check if the emails string contains multiple addresses separated by commas
  if (emails.includes(",")) {
    // Split the string of email addresses by commas and trim any leading/trailing spaces
    emailArray = emails.split(",").map((email) => email.trim());
  } else {
    // If there's only one email address, create an array with that single address
    emailArray = [emails.trim()];
  }

  // Check if the resulting array is empty after splitting
  if (emailArray.length === 0) {
    return res.status(400).send("No valid email addresses provided");
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  var transporter = createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "c5cb1e325f051059ea8be7bd3cb27a5d",
    },
  });
  try {
    await Promise.all(
      emailArray.map(async (email, index) => {
        const mailOptions = {
          from: "Cruiserims<support@cruiserims.com>",
          to: email,
          subject:
            "Exciting Career Opportunities at CruiseRims Car Rim Manufacturing Company!",
          headers: {
            "X-Mailtrap-Category": "Primary",
          },
          html: `
		  <!DOCTYPE html>
		  <html lang="en">
		  
		  <head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Offer</title>
			  <style>
				  * {
					  padding: 0;
					  margin: 0;
					  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
				  }
		  
				  header {
					  max-width: 1024px;
					  margin: 0 auto;
					  display: flex;
					  flex-wrap: wrap;
					  padding: 40px;
					  gap: 40px;
				  }
		  
				  .heading {
					  border-left: 2px solid black;
					  padding-left: 16px;
		  
				  }
		  
				  .heading h4 {
					  font-weight: 600;
				  }
		  
				  .container {
					  max-width: 1024px;
					  margin: 0 auto;
					  display: flex;
					  align-items: center;
					  gap: 40px;
				  }
		  
		  
				  main {
					  max-width: 960px;
					  margin: 0 auto;
					  padding: 24px 16px;
				  }
		  
				  .container p {
					  font-size: 28px;
					  font-weight: 700;
				  }
			  </style>
		  </head>
		  
		  <body>
			  <header>
				  <div class="heading">
					  <h4>Phone Number</h4>
					  <p>(765) 360-9240</p>
				  </div>
				  <div class="heading">
					  <h4>Address</h4>
					  <p>6722 Commerce Street, Springfield , Virginia USA.</p>
				  </div>
				  <div class="heading">
					  <h4>Email</h4>
					  <p>hr@cruiserims.com</p>
				  </div>
				  <div class="heading">
					  <h4>Website</h4>
					  <p>http://www.cruiserims.com/</p>
				  </div>
		  
			  </header>
			  <main>
				  <p>
					  Hello,
					  <br> <br> <br>
					  I hope this email finds you well. We are thrilled to announce that CruiseRims Car Rim Manufacturing Company
					  is expanding its team and currently has several open positions available. If you are passionate about
					  joining a dynamic and innovative company in the automotive industry, we encourage you to apply for one of
					  the following roles:
					  <br><br>
					  1. Remote Personal Assistant to Head of Position
					  <br> <br>
					  2. Data Entry Clerk
					  <br> <br>
					  3. Remote Payroll Assistant
					  <br> <br>
					  4. Financial Clerk
					  <br> <br>
					  5. Remote Office Assistant II
					  <br> <br>
		  
					  At CruiseRims, we pride ourselves on fostering a collaborative work environment where creativity and
					  dedication are valued. As part of our team, you will have the opportunity to contribute to the success of
					  our company while advancing your career in a supportive and growth-oriented setting.
		  
					  <br> <br>
		  
					  If you are interested in any of these positions, please review the job descriptions and send a mail with a
					  response and your resume / cv to ( hr@cruiserims.com ). we will also be excited to give you more information
					  on responsibilities, qualifications, and how to apply.
					  <br> <br>
		  
		  
					  We believe that diversity drives innovation, and we welcome applicants from all backgrounds to join our
					  team. If you know someone who would be a great fit for one of these roles, please feel free to share this
					  email with them.
					  <br> <br>
		  
		  
					  Thank you for considering CruiseRims Car Rim Manufacturing Inc as your next career destination. We look
					  forward to receiving your application and potentially welcoming you to our team!
		  
		  
					  <br> <br>
					  Best regards,<br><br>
					  Human Resource Management,<br><br>
					  <a href="mailto:hr@cruiserims.com">hr@cruiserims.com</a>
					  <br><br> <a href="http://www.cruiserims.com/">www.cruiserims.com</a><br><br>
					  CruiseRims Car Rim Manufacturing Inc.
					  <br><br>
					  6722 Commerce Street, Springfield , Virginia USA.
				  </p>
		  
				  <div style="margin-top: 40px;">
					  <img src="http://jackpot.foundation/images/cruiser.jpg" alt="" width="150">
		  
				  </div>
			  </main>
			  <footer class="nav">
				  <a style="text-align: center; text-decoration: underline; margin-bottom: 8px;"
					  href="__unsubscribe_url__">unsubscribe</a>
		  
				  <p class="footer-text" style="text-align: center;margin: 10px 0 20px 0; font-weight: 600;">© 2024
					  CruiserRimscom. All rights
					  reserved.</p>
			  </footer>
		  </body>
		  
		  </html>			`,
        };

        await delay(index * 12000); // Delay 20 seconds for each email

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent to :", email);
          }
        });
      })
    );
    return res.status(200).send("Emails sent");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
});

// Swagger API Documentation
const specs = swaggerJSDoc(swaggerDocument);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
