const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "diet.tracker.api@gmail.com",
    subject: "Thanks for joining Diet Tracker!",
    text: `Welcome to the app, ${name}! We are very excited to help you get and stay fit by keeping a track of your daily calorie consumpsion.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "diet.tracker.api@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}! I hope to see you back sometime soon`,
  });
};

module.exports = {
  sendWelcomEmail,
  sendCancelationEmail,
};
