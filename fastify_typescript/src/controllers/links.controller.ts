import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  createLink,
  deleteLinkById,
  findAllLinks,
  updateLinkById,
  type LinkInput
} from '../services/links.service.js';

type LinkParams = {
  id: string;
};

function normalizeLinkPayload(body: unknown): LinkInput {
  const candidate = body as Record<string, unknown>;
  const linkName = typeof candidate.linkName === 'string' ? candidate.linkName.trim() : '';
  const url = typeof candidate.url === 'string' ? candidate.url.trim() : '';

  return {
    linkName: linkName.length > 0 ? linkName : null,
    url: url.length > 0 ? url : null
  };
}

export async function listLinks(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const links = await findAllLinks();
  await reply.view('links/index.ejs', { links });
}

export async function createLinkHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  await createLink(normalizeLinkPayload(request.body));
  await reply.redirect('/links');
}

export async function updateLinkHandler(
  request: FastifyRequest<{ Params: LinkParams }>,
  reply: FastifyReply
): Promise<void> {
  await updateLinkById(Number(request.params.id), normalizeLinkPayload(request.body));
  await reply.redirect('/links');
}

export async function deleteLinkHandler(
  request: FastifyRequest<{ Params: LinkParams }>,
  reply: FastifyReply
): Promise<void> {
  await deleteLinkById(Number(request.params.id));
  await reply.redirect('/links');
}
