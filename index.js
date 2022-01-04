const express = require('express');
const MercadoPago = require('mercadopago');

const app = express();

MercadoPago.configure({
    sandbox: false,
    access_token: 'TEST-8290989841389951-071215-f9f8f8f8f8f8f8f8f8f8f8f8f8f8f8-8290989841389951'
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pagar' , async (req, res) => {
    const preference = {
        items: [
            {
                id: "" + Date.now(),
                title: "Teste de pagamento",
                quantity: 1,
                currency_id: "BRL",
                unit_price: 10.00,
            }
        ],
        payer: {
            email: "teste@gmail.com"
        },
        external_reference: "" + Date.now()
    };

    try {
        let pagamento = await MercadoPago.preferences.create(preference);
        return res.redirect(pagamento.body.init_point);
    } catch (error) {
        return (error);
    }

})

app.post('/not', async (req, res) => {
    const { id } = req.body;
    try {
        setTimeout(async () => {
            let filtro = {
                'order.id': id
            }

            MercadoPago.payment.search({
                qs: filtro
            }).then(res => {
                let pagamento = res.data.results[0];

                if (pagamento != undefined){
                    console.log(res);
                    console.log(res.external_reference);
                    console.log(res.status);
                } else {
                    console.log('Pagamento não encontrado');
                }
            })
            .catch(err => {
                console.log(err);
            });
        }, 20000);

        return res.json(payment);
    } catch (error) {
        return res.json(error);
    }
})

app.listen(80, (req, res) => {
    console.log('Server is running');
})