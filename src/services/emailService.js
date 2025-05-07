
//emailService.js
import SibApiV3Sdk from 'sib-api-v3-sdk';
import 'dotenv/config';

// Initialize Sendinblue client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const checkAndSendEmails = async (email, message) => {
  try {
    console.log(`Sending email to ${email} with message: ${message}`);
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { name: 'Webinar Team', email: process.env.SENDER_EMAIL };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = 'Webinar Invitation';
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; text-align: center;">
        <h2 style="color: #007bff;">📚 <b>Webinar Notification</b></h2>
        <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <p style="font-size: 16px; color: #333;">${message}</p>
        </div>
      </div>
    `;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email sent to ${email} with Message ID: ${response.messageId}`);
    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error(` Error sending email to ${email}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};