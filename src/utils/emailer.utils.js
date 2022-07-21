const nodemailer = require("nodemailer");

exports.sendEmail = async () => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secureConnection: false,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass  // generated ethereal password
        },
    });

    // send email
    let info = await transporter.sendMail({
        from: 'Nidesh.k@infovision.com',
        to: 'Usama.Shaikh@infovision.com, nideshkk@outlook.com, nidesh.k@infovision.com',
        subject: 'Test Email Subject',
        html: '<h1>Example HTML Message Body</h1>'
    });
    console.log(info);
}