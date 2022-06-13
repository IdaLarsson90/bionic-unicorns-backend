const { Router } = require('express');
const router = Router();
const { auth } = require('../auth')

const {menuResult, checkAccount, createAccount, loginAccount, createOrder, findOrders, checkIfDone, addPrices, addToMenu, removeFromMenu } = require('../modules/nedb')


// UTFORMNING AV FRONTEND REQUEST {"username": "", "password": "", "cart": {[ {ITEM}, {ITEM} ]}
router.post('/', async (request, response)=> {
    const credentials = request.body
    if (credentials.hasOwnProperty('cart')){
        const resObj = {}
        if (credentials.hasOwnProperty('username')) {
            const result = await checkAccount(credentials)
            if (result.length > 0) {
                const orderResults = await createOrder(credentials);
                resObj.order= orderResults
                addPrices(orderResults)
                resObj.order.ordernumber= orderResults._id
            } else {
                resObj.message = "Account does not exist!"
            }
            response.json(resObj)
        } else {
            credentials.username = "guest";
            const orderResults = await createOrder(credentials);
            addPrices(orderResults)
            resObj.order= orderResults
            resObj.order.ordernumber= orderResults._id
            response.json(resObj)
        }
    }
})

// /api/order/:id	GET	Returnerar orderhistorik för en specifik användare
router.get('/:id', async (request, response)=> {
    const username = request.params.id;
    const findOrder = await findOrders(username)
    for (let i = 0; i < findOrder.length; i++) {
        const singleOrder = findOrder[i];
        await checkIfDone(singleOrder);
    }
    response.json(findOrder);
})


module.exports = router;