import { Link } from '../models/index.js';

export interface LinkInput {
  linkName: string | null;
  url: string | null;
}

export type LinkInstance = InstanceType<typeof Link>;

export async function findAllLinks(): Promise<LinkInstance[]> {
  return Link.findAll({ order: [['id', 'ASC']] });
}

export async function findLinkById(id: number): Promise<LinkInstance | null> {
  return Link.findByPk(id);
}

export async function createLink(input: LinkInput): Promise<LinkInstance> {
  return Link.create(input);
}

export async function updateLinkById(id: number, input: LinkInput): Promise<LinkInstance> {
  const link = await findLinkById(id);

  if (!link) {
    const error = new Error(`Link with id ${id} not found`);
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  await link.update(input);
  return link;
}

export async function deleteLinkById(id: number): Promise<void> {
  const link = await findLinkById(id);

  if (!link) {
    const error = new Error(`Link with id ${id} not found`);
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  await link.destroy();
}
