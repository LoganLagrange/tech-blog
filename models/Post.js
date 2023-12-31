const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `Users`,
                key: `id`
            }
        },
        nice_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue("nice_date").toLocaleDateString();
            }
        }
    },
    {
        sequelize
    }
)

module.exports = Post;