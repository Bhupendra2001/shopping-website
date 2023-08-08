const Cart = require('../models/Cart')



const createCart = async (req,res)=>{
   const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateCart = async (req,res)=>{

  try{
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  return  res.status(200).json(updatedCart);

  }catch(err){
    return res.status(500).send(err.message)
  }
}

const deleteCart = async (req,res)=>{
  try{
    await Cart.findByIdAndDelete(req.params.id);
    return  res.status(200).json("Cart has been deleted...");
  }catch(err){
    return res.stutas(500).send(err.message)
  }
}

const userCart = async (req,res)=> {
  try{
    const cart = await Cart.findOne({ userId: req.params.userId });
     return  res.status(200).json(cart);

  }catch(err){
    return res.status(500).send(err.message)
  }
}

const getAllCart = async (req,res)=>{
  try{
    const carts = await Cart.find();
    return  res.status(200).json(carts);

  }catch(err){
    return res.status(500).send(err.message)
  }
}

module.exports = { createCart , getAllCart , userCart , updateCart ,deleteCart}