const api = require('../api/api')
const api_key = require('../key/key.json').api_key

const MetodoPagamento = require('../model/MetodosPagamento');


module.exports = {
  async createCard(req, res) {
    try {

      const { card_number, card_cvv, card_expiration_date, card_holder_name } = req.body;
      const { data } = await api.post('/cards', {
        api_key,
        card_number,
        card_expiration_date,
        card_holder_name,
        card_cvv,
      });

      const { userId } = req.params
      await MetodoPagamento.create({
        cardId: data.id,
        userId
      })
      return res.json(data)

    } catch (error) {
      // console.log(error);
      return res.json(error)
    }
  },
  async indexCards(req, res) {
    try {

      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async createTransActions(req, res,) {
    try {
      const { 
        amount,
        card_number,
        card_cvv,
        card_expiration_date,
        card_holder_name,

        customer: {
          external_id,
          name,
          country,
          email,
          documents: [
            {
              number,
            
            },
          ],
          phone_numbers,
          birthday,

        },
        billing: {
          nome,
          address: {
            pais,
            estado,
            cidade,
            bairro,
            rua,
            rua_numero,
            cep
          }
        }

       

      } = req.body;



      const response = await api.post('/transactions', {
        api_key,
        amount,
        card_number,
        card_cvv,
        card_expiration_date,
        card_holder_name,
        customer: {
          external_id,
          name,
          type: "individual",
          country,
          email,
          documents: [
            {
              type: "cpf",
              number,
            },
          ],
          phone_numbers,
          birthday,
        },
        billing: {
          name: nome,
          address: {
            country: pais,
            state: estado,
            city: cidade,
            neighborhood: bairro,
            street: rua,
            street_number: rua_numero,
            zipcode: cep 
          }
        },
        "shipping": {
          "name": "Neo Reeves",
          "fee": 1000,
          "delivery_date": "2000-12-21",
          "expedited": true,
          "address": {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
          }
        },
        "items": [
          {
            "id": "r123",
            "title": "Red pill",
            "unit_price": 10000,
            "quantity": 1,
            "tangible": true
          },
          {
            "id": "b123",
            "title": "Blue pill",
            "unit_price": 10000,
            "quantity": 1,
            "tangible": true
          }
        ]
      })
      
      if (response.data.status === "refused") {
        return await res.json({ resposta: "Compra reprovada" })
      }
      if (response.data.status === "processing") {
        return await res.json({ resposta: "Transação está em processo de autorização." })
      }
      if (response.data.status === "authorized") {
        return await res.json({ resposta: "Transação foi autorizada." })
      }
      if (response.data.status === "paid") {
        return await res.json({ resposta: "Transação paga. Foi autorizada e capturada com sucesso." })
      }
      if (response.data.status === "refunded") {
        return await res.json({ resposta: "Transação estornada completamente." })
      }
      if (response.data.status === "pending_review") {
        return await res.json({ resposta: "Transação pendente de revisão manual por parte do lojista." })
      }

    } catch (err) {
      console.log(err)
      // return { error: true, message: err.message };
    }
  } 
  
}