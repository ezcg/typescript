import type { FastifyInstance } from 'fastify';
import {
  createLinkHandler,
  deleteLinkHandler,
  listLinks,
  updateLinkHandler
} from '../controllers/links.controller.js';

export async function linksRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/', listLinks);
  fastify.post('/', createLinkHandler);
  fastify.post('/:id', updateLinkHandler);
  fastify.post('/:id/delete', deleteLinkHandler);
}
