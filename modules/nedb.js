const nedb =  require('nedb-promise')
const userDatabase = new nedb({filename: 'userdatabase.db', autoload:true})
const orderDatabase = new nedb({filename: 'orderdatabase.db', autoload:true})
const menuDatabase = new nedb({filename: 'menudatabase.db', autoload:true})


function menuResult(){
    const result = menuDatabase.find({})
    return result
}

function checkAccount(credentials){
    const result = userDatabase.find({ $or: [ {email: credentials.email}, {username: credentials.username} ] })
    return result
}

function createAccount(credentials){
    const result = userDatabase.insert({ email: credentials.email , username: credentials.username, password: credentials.password })
    return result
}

function loginAccount(credentials){
    const result = userDatabase.find({$and: [{username: credentials.username}, {password: credentials.password}] })
    return result
}
function findOrders(credentials){
    const result = orderDatabase.find({username: credentials })
    return result
}

function createOrder(credentials){
    const orderTime = new Date().toLocaleTimeString();
    const orderTimeTemp = new Date()
    const ETAnumber = Math.floor(Math.random() * 10)
    ETAminutes = new Date ( orderTimeTemp );
    ETAminutes.setMinutes ( orderTimeTemp.getMinutes() + ETAnumber );
    const toLocaleETA =ETAminutes.toLocaleTimeString()

    const result = orderDatabase.insert({username: credentials.username, order: credentials.cart, orderTime: orderTime, ETA: toLocaleETA })
    return result
}
function addPrices(orderResults){
    orderResults.totalPrice= 0
    const orderResultsOrder = orderResults.order
    for (let i = 0; i < orderResultsOrder.length; i++) {
        const singleItem = orderResultsOrder[i];
        orderResults.totalPrice = parseInt( orderResults.totalPrice + singleItem.price) ;
    }
}

function checkIfDone(singleOrder) {
    const rightNow = new Date().toLocaleTimeString()
    singleOrder.totalPrice = 0;
    if (singleOrder.ETA < rightNow ) {
        singleOrder.done = "done";
    }
    const singleOrderCart = singleOrder.order;
    for (let i = 0; i < singleOrderCart.length; i++) {
        const singleItem = singleOrderCart[i];
        singleOrder.totalPrice = parseInt( singleOrder.totalPrice + singleItem.price) ;
    }
}

async function addToMenu (credentials) {
    const findResult = await menuDatabase.find({id: credentials.id})    
    
    if (findResult.length == 0) {
        const result = menuDatabase.insert({id: credentials.id, title: credentials.title, desc: credentials.desc, price: credentials.price})
        return result
    } else {
        console.log("Den finns redan")
    }
    
}

async function removeFromMenu (credentials) {
    const findResult = await menuDatabase.find({id: credentials.id})    
    if (findResult.length > 0) {
        const result = menuDatabase.remove({id: credentials.id })
        return result
    } 
    
    return findResult
}

module.exports = {menuResult, checkAccount, createAccount, loginAccount, createOrder, findOrders, checkIfDone, addPrices, addToMenu, removeFromMenu}
