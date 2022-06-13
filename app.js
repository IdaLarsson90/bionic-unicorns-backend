const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8000

const accountRouter = require('./routes/account')
const adminRouter = require('./routes/admin')
const menuRouter = require('./routes/menu')
const orderRouter = require('./routes/order')

app.use(express.json())

app.use('/api/account', accountRouter);
app.use('/api/admin', adminRouter);
app.use('/api/menu', menuRouter)
app.use('/api/order', orderRouter)

app.use((request, response) => {
    const resObj = {
        message: 'No endpoint found'
    }
    response.status(404).json(resObj);
})

app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
    console.log("Listening to orders");
})

