const { Router } = require('express');
const router = Router();


const {checkAccount, createAccount, loginAccount } = require('../modules/nedb')

// /api/account/signup	POST	Skapar ett användarkonto
//   UTFORMNING AV SIGNUP FRONTEND  {"email" : "", "username": "", "password": ""}
router.post('/signup', async (request, response)=> {
    const credentials = request.body
    const resObj = {};
    if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) {
        const result = await checkAccount(credentials);
        if (result.length < 1) {
            const result = await createAccount(credentials)
            resObj.message = "success";
            resObj.account = result;
        } else {
            resObj.message = "Account already exists";
        }
    } else {
        resObj.message = "No valid credentials " ;
    }
    response.json(resObj);
})

// /api/account/login	POST	Logga in
//   UTFORMNING AV LOGIN FRONTEND  {"username": "", "password": ""}
router.post('/login', async (request, response)=> {
    const credentials = request.body;
    const resObj = {};
    if (credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) {
        const result = await loginAccount(credentials);
        if (result.length > 0) {
            resObj.message = "Account successfully logged in!";
        } else  resObj.message = "Wrong username/password";
    } else {
        resObj.message = "No credentials BIFOGAT";
    }
    response.json(resObj);
})

module.exports = router;