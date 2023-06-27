const n=require("nodemailer");
function sendOtp(mail) {
    otp=Math.floor(Math.random()*(9999-1000)+1000);
    var cred = n.createTransport({
        auth: {
            user: "nagendra10082003@gmail.com",
            pass: "uqzoessqcaedjepr"
        },
        service: "gmail",
    })
    var clients = {
        from: "nagendra10082003@gmail.com",
        to: mail,
        subject: "authentication",
        html: "<p>Hi" + mail + "your 4 digit otp is</p><h1 style='text-transform:uppercase;letter-spacing:1em;'>" + otp + "</h1>"


    }
cred.sendMail(clients,(err, info) => {
        if (err){
            return null
        };

        return otp;
       
    });
  }
module.exports=sendOtp;