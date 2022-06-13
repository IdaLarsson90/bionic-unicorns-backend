const { Router } = require('express');
const router = Router();
const { auth } = require('../auth')

const {addToMenu, removeFromMenu } = require('../modules/nedb')

router.post('/', auth, async (request, response) => {
    const credentials = request.body;
    const resObj = {}
    if (credentials.hasOwnProperty('id') && credentials.hasOwnProperty('title') && credentials.hasOwnProperty('desc') && credentials.hasOwnProperty('price')) { 
        const result = await addToMenu(credentials);
        if (result) {
            resObj.message = "success, item added to menu"
            resObj.item = result
        }
        else {
            resObj.message = "failed to add item. Already exists"
        }
        
    } else {
        resObj.message = "Failed to add to menu. Check credentials"
    }
    response.json(resObj)
})

router.delete('/', auth, async(request, response) => {
    const credentials = request.body;
    const resObj = {}
    if (credentials.hasOwnProperty('id')) {       
        const result = await removeFromMenu(credentials)
        if (result == 1 ) {
            resObj.message = "success, item deleted"
        }
        else {
            resObj.message = "failed to remove item. No ID found"
        }
    } else {
        resObj.message = "No ID found"
    }
    response.json(resObj)
})
module.exports = router;