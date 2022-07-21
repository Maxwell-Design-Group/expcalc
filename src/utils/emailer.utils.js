// const nodemailer = require("nodemailer");

// exports.sendEmail = async () => {
//     let testAccount = await nodemailer.createTestAccount();
//     const transporter = nodemailer.createTransport({
//         host: 'in-v3.mailjet.com',
//         port: 587,
//         secureConnection: false,
//         auth: {
//             user: 'test', // generated ethereal user
//             pass: 'd4b2b2fcd315403f08a49036335e8218'  // generated ethereal password
//         },
//     });

//     // send email
//     let info = await transporter.sendMail({
//         from: 'Nidesh.k@infovision.com',
//         to: 'Usama.Shaikh@infovision.com, nideshkk@outlook.com, nidesh.k@infovision.com',
//         subject: 'Test Email Subject',
//         html: '<h1>Example HTML Message Body</h1>'
//     });
//     console.log(info);
// }
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    'd4b2b2fcd315403f08a49036335e8218',
   'cfcadf362b30553c55dd3ce614003210',
);

exports.sendEmail = async (to,clientName,base64File) => {
const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "nideshkk@outlook.com",
                Name: "Aramark"
              },
              To: [
              
                {
                    Email: to,
                    Name: clientName
                  }
              ],
              Subject: "Your Estimation!",
              TextPart: "DPlease find the attached estimation with this email!",
              HTMLPart: "<h3>From Aramark!</h3><br />",
              Attachments: [
                {
                        "ContentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Filename": "Estimate.xlsx",
                        "Base64Content": base64File
                }
        ]
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
}




