import { Router } from 'express';
import {
  createLink,
  deleteLink,
  listLinks,
  updateLink
} from '../controllers/links.controller.js';

const router = Router();

router.get('/', listLinks);
router.post('/', createLink);
router.post('/:id', updateLink);
router.post('/:id/delete', deleteLink);

export default router;
