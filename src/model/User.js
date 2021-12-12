const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
    
            },
            cpf: {
                type: DataTypes.STRING,
                
            }
        }, {
            sequelize,
            tableName: 'users'
        })
    }
    static associate(models) {
        this.hasMany(models.MetodoPagamento, { foreignKey: 'userId', as: 'MetodoPagamento'});
    }
}

module.exports = User;