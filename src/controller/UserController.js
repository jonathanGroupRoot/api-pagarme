const User = require('../model/User');

module.exports = {
    async createUser(req,res) {
        try {
            const { nome, cpf } = req.body;
            const user = await User.create({ nome, cpf });
            return res.status(200).json({User: user});
        }catch(error) {
            return res.status(400).json({Erro: error});
        }
    }
}