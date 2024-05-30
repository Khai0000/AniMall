import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
    '48d1c441d851954f48aa80050caeb3b3',
   'fbde35fafe369cbec50934a5f79a630d'
);

export const scheduleAppointment = async (req, res) => {
  const { email, serviceName, serviceDate,serviceTime } = req.body;
  try {
    const dateObj = new Date(serviceDate);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}`;

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "animallpublic@gmail.com",
            Name: "Animall",
          },
          To: [
            {
              Email: email,
              Name: "Our VIP Customer",
            },
          ],
          Subject: "Service Appointment Reminder",
          HTMLPart: `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                    color: #333;
                    text-align: center;
                  }
                  p {
                    color: #666;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Service Appointment Reminder</h1>
                  <p>This is a reminder for your service appointment <strong>"${serviceName}"</strong> on ${formattedDate} at ${serviceTime}.</p>
                  <p>Please ensure to arrive on time and bring any necessary documents.</p>
                  <p>Thank you for choosing Animall!</p>
                </div>
              </body>
            </html>
          `,
        },
      ],
    });

    const result = await request;
    console.log("Email reminder sent:", result.body);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error scheduling reminder:", error);
    res.status(500).json({ message: "Failed to schedule reminder" });
  }
};