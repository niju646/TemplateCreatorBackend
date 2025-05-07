//notificationController.js
import { checkAndSendEmails } from '../services/emailService.js';
import { checkAndSendNotifications } from '../services/smsService.js';
import { sendScheduledWhatsApp } from '../services/whatsappService.js';

export const sendNotification = async (req, res) => {
  const { channel, contact, message } = req.body;

  if (!channel || !contact || !message) {
    return res.status(400).json({ error: 'Missing required fields: channel, contact, or message' });
  }

  try {
    if (channel === 'email') {
      await checkAndSendEmails(contact, message);
      res.status(200).json({ message: 'Email sent successfully' });
    } else if (channel === 'sms') {
      await checkAndSendNotifications(contact, message);
      res.status(200).json({ message: 'SMS sent successfully' });
    } else if (channel === 'whatsapp') {
      await sendScheduledWhatsApp(contact, message);
      res.status(200).json({ message: 'WhatsApp message sent successfully' });
    } else {
      res.status(400).json({ error: 'Invalid channel specified' });
    }
  } catch (error) {
    console.error('Error in sendNotification controller:', error);
    res.status(500).json({ error: error.message || 'Failed to send notification' });
  }
};