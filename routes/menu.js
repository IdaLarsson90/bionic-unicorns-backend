const { Router } = require('express');
const router = Router();

const {menuResult} = require('../modules/nedb')

// /api/menu	GET	Returnerar en kaffemeny
router.get('/', async (request, response)=> {
    const menuResults = await menuResult();
    const resObj = {menu: menuResults};
    response.json(resObj);
})

module.exports = router;