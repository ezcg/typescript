import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type Sequelize
} from 'sequelize';

export class Link extends Model<InferAttributes<Link>, InferCreationAttributes<Link>> {
  declare id: CreationOptional<number>;
  declare linkName: string | null;
  declare url: string | null;
}

export function initLinkModel(sequelize: Sequelize): typeof Link {
  Link.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      linkName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'links',
      timestamps: false
    }
  );

  return Link;
}
