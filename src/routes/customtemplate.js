import express from 'express';
import {
  getAllCustomTemplates,
  getCustomTemplateById,
  createCustomTemplate,
  updateCustomTemplate,
  deleteCustomTemplate,
} from '../controllers/customTemplateController.js';

const router = express.Router();

router.get('/', getAllCustomTemplates);
router.get('/:id', getCustomTemplateById);
router.post('/', createCustomTemplate);
router.put('/:id', updateCustomTemplate);
router.delete('/:id', deleteCustomTemplate);

export default router;