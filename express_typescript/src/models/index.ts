import sequelize from '../config/sequelize.js';
import { initLinkModel } from './link.model.js';

const Link = initLinkModel(sequelize);

export { sequelize, Link };
