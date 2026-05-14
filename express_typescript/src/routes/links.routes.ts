import { Router } from 'express';
import {
  createLinkHandler,
  deleteLinkHandler,
  listLinks,
  updateLinkHandler
} from '../controllers/links.controller.js';

const router = Router();

router.get('/', listLinks);
router.post('/', createLinkHandler);
router.post('/:id', updateLinkHandler);
router.post('/:id/delete', deleteLinkHandler);

export default router;
