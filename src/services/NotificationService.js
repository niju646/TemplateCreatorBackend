// import SibApiV3Sdk from 'sib-api-v3-sdk';
// import twilio from 'twilio';
// import 'dotenv/config';

// // Initialize Twilio client
// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // Initialize Sendinblue client
// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// export const sendNotificationService = async ({ channel, contact, message }) => {
//   try {
//     if (channel === 'email') {
//       // Send email via Sendinblue
//       const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//       sendSmtpEmail.sender = { name: 'Webinar Team', email: process.env.SENDER_EMAIL };
//       sendSmtpEmail.to = [{ email: contact }];
//       sendSmtpEmail.subject = 'Webinar Invitation';
//       sendSmtpEmail.textContent = message;

//       await apiInstance.sendTransacEmail(sendSmtpEmail);
//       return { success: true, message: 'Email sent successfully' };
//     } else if (channel === 'sms') {
//       // Send SMS via Twilio
//       await twilioClient.messages.create({
//         body: message,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: contact,
//       });
//       return { success: true, message: 'SMS sent successfully' };
//     } else if (channel === 'whatsapp') {
//       // Send WhatsApp message via Twilio
//       await twilioClient.messages.create({
//         body: message,
//         from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
//         to: `whatsapp:${contact}`,
//       });
//       return { success: true, message: 'WhatsApp message sent successfully' };
//     } else {
//       throw new Error('Invalid channel specified');
//     }
//   } catch (error) {
//     throw new Error(`Failed to send notification: ${error.message}`);
//   }
// };