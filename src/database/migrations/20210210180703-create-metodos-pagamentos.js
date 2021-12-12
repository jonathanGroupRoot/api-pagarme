'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

 
    await queryInterface.createTable('metodos-pagamentos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cardId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dinheiro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }   
    });
  
  },

  down: async (queryInterface, Sequelize) => {
 
    await queryInterface.dropTable('metodos-pagamentos');
    
  }
};
