const router = require('express').Router()
const {register , login} = require('../controllers/auth')
const {Authentication, Authorization , CheckAdmin} = require('../middleware/authentication')
const {update, Delete , getUser , getAllUser, getStatus} = require('../controllers/user')
const {createProduct , updateProduct, getProduct, getALLProduct , deleteProduct} = require('../controllers/product')
const {createCart , getAllCart , userCart , updateCart ,deleteCart } = require('../controllers/cart')
const { createOrder , updateOrder , getUserOrder , getALLOrder , deleteOrder , getincome } = require('../controllers/Order')
const { SendMail, forgotPassword } = require('../controllers/email')


//----------Auth------------------//

router.post('/auth/register', register)
router.post('/auth/login', login)


//-----------Users----------------//

router.put('/users/:id' , Authentication, Authorization , update)
router.get('/users/:id', Authentication , getUser)
router.get('/users' ,CheckAdmin, getAllUser)
router.delete('/users/:id', CheckAdmin, Delete)
router.get('/users/status',CheckAdmin , getStatus )

//------------Products------------//

router.post('/products/add'  , createProduct)
router.put('/products/:id' , CheckAdmin, updateProduct)
router.get('/products/:id' ,  getProduct)
router.get('/products' , getALLProduct)
router.delete('/products/:id' , CheckAdmin , deleteProduct)

//----------------Carts---------------//

router.post('/carts/add',Authentication , createCart )
router.get('/carts/:id', Authentication , userCart)
router.get('/carts/getAll', CheckAdmin , getAllCart)
router.put('/carts/update', Authorization , updateCart)
router.delete('/carts/delete', Authorization , deleteCart)

//-----------------Orders---------------//

router.post('/orders/create', Authentication , createOrder)
router.get('/orders/get', Authorization ,  getUserOrder)
router.get('/orders/getAll', CheckAdmin , getALLOrder)
router.put('/orders/update', Authorization , updateOrder)
router.delete('/orders/delete', Authorization , deleteOrder)
router.get('/orders/income', CheckAdmin , getincome)


//-------------------Email----------//

router.post('/Email/:email', SendMail)
router.post('/forgotPassword/:username', forgotPassword)

router.get('/', (req, res)=>{
    return res.status(200).send('welcome to shopping page server')
})
router.all("/*",(req,res)=>{
    return res.status(400).send({status:false,msg:"your end point is wrong"})
})
module.exports = router