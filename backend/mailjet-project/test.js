import Mailjet from "node-mailjet";
import dotenv from 'dotenv';


dotenv.config();

const mailjet = Mailjet.apiConnect(
    '48d1c441d851954f48aa80050caeb3b3',
   'fbde35fafe369cbec50934a5f79a630d'
);

const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
    "Messages":[
        {
          "From": {
            "Email": "animallpublic@gmail.com",
            "Name": "amiaa"
          },
          "To": [
            {
              "Email": "22004812@siswa.um.edu.my",
              "Name": "amiaa"
            }
          ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
