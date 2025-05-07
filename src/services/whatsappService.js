
//whatsappService.js
import twilio from 'twilio';
import 'dotenv/config';

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendScheduledWhatsApp = async (phone, message) => {
  try {
    console.log(`Sending WhatsApp message to ${phone} with message: ${message}`);
    const response = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phone}`,
      body: message,
    });
    console.log(`✅ WhatsApp message sent to ${phone} with SID: ${response.sid}`);
    return { success: true, sid: response.sid };
  } catch (error) {
    console.error(` Error sending WhatsApp message to ${phone}:`, error);
    throw new Error(`Failed to send WhatsApp message: ${error.message}`);
  }
};