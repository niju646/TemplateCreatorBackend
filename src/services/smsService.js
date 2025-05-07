//smsService.js
import twilio from 'twilio';
import 'dotenv/config';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const checkAndSendNotifications = async (phone, message) => {
  try {
    console.log(`Sending SMS to ${phone} with message: ${message}`);
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    console.log(`✅ SMS sent to ${phone} with SID: ${response.sid}`);
    return { success: true, sid: response.sid };
  } catch (error) {
    console.error(` Error sending SMS to ${phone}:`, error);
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
};