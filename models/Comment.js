const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `Users`,
                key: `id`
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `Posts`,
                key: `id`
            }
        }
    },
    {
        sequelize
    }
)

module.exports = Comment;