import {
  create,
  deleteById,
  findAll,
  updateById
} from '../services/links.service.js';

function normalizeLinkPayload(body) {
  const linkName = typeof body.linkName === 'string' ? body.linkName.trim() : null;
  const url = typeof body.url === 'string' ? body.url.trim() : null;

  return {
    linkName: linkName || null,
    url: url || null
  };
}

export async function listLinks(req, res, next) {
  try {
    const links = await findAll();
    res.render('links/index', { links });
  } catch (error) {
    next(error);
  }
}

export async function createLink(req, res, next) {
  try {
    const payload = normalizeLinkPayload(req.body);
    await create(payload);
    res.redirect('/links');
  } catch (error) {
    next(error);
  }
}

export async function updateLink(req, res, next) {
  try {
    const payload = normalizeLinkPayload(req.body);
    await updateById(req.params.id, payload);
    res.redirect('/links');
  } catch (error) {
    next(error);
  }
}

export async function deleteLink(req, res, next) {
  try {
    await deleteById(req.params.id);
    res.redirect('/links');
  } catch (error) {
    next(error);
  }
}
