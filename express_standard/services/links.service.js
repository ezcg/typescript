import Link from '../models/link.model.js';

export async function findAll() {
  return Link.findAll({ order: [['id', 'ASC']] });
}

export async function findById(id) {
  return Link.findByPk(id);
}

export async function create(data) {
  return Link.create(data);
}

export async function updateById(id, data) {
  const link = await findById(id);

  if (!link) {
    const error = new Error(`Link with id ${id} not found`);
    error.statusCode = 404;
    throw error;
  }

  return link.update(data);
}

export async function deleteById(id) {
  const link = await findById(id);

  if (!link) {
    const error = new Error(`Link with id ${id} not found`);
    error.statusCode = 404;
    throw error;
  }

  return link.destroy();
}
