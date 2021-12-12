const { Model, DataTypes } = require('sequelize');

class MetodoPagamento extends Model {
    static init(sequelize) {
        super.init({
            cardId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'metodos-pagamentos'
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'User'});
    }
}
module.exports = MetodoPagamento;