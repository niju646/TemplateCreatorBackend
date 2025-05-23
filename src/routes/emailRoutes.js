// routes/emailRoutes.js
import { Router } from 'express';
import { createEmailSettings, getEmailSettings, getAllEmailSettings, updateEmailSettings } from '../controllers/emailSetting.js';

const router = Router();

// Route to handle email settings creation
router.post('/email-settings', createEmailSettings);

// Route to fetch the most recent email settings
router.get('/email-settings', getEmailSettings);

// Route to fetch all email settings
router.get('/email-settings/all', getAllEmailSettings);

// Route to update email settings
router.put('/email-settings/:id', updateEmailSettings);

export default router;