import type { NextFunction, Request, Response } from 'express';
import {
  createLink,
  deleteLinkById,
  findAllLinks,
  updateLinkById,
  type LinkInput
} from '../services/links.service.js';

function normalizeLinkPayload(body: Request['body']): LinkInput {
  const linkName = typeof body.linkName === 'string' ? body.linkName.trim() : '';
  const url = typeof body.url === 'string' ? body.url.trim() : '';

  return {
    linkName: linkName.length > 0 ? linkName : null,
    url: url.length > 0 ? url : null
  };
}

export async function listLinks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const links = await findAllLinks();
    res.render('links/index', { links });
  } catch (error) {
    next(error);
  }
}

export async function createLinkHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await createLink(normalizeLinkPayload(req.body));
    res.redirect('/links');
  } catch (error) {
    next(error);
  }
}

export async function updateLinkHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await updateLinkById(Number(req.params.id), normalizeLinkPayload(req.body));
    res.redirect('/links');
  } catch (error) {
    next(error);
  }
}

export async function deleteLinkHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await deleteLinkById(Number(req.params.id));
    res.redirect('/links');
  } catch (error) {
    next(error);
  }
}
