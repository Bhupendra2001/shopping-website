const Order = require('../models/Order')


// CREATE ORDER DATA 
const createOrder = async (req,res)=> {
    try{
        const newOrder = new Order(req.body);

        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
    }catch(err){
        return res.status(500).send(err.message)
    }
}
//  UPDATE ORDER API
const updateOrder = async (req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body,
            },
            {new : true}
        )
        return res.status(200).send(updatedOrder);
    }catch(err){
        return res.status(500).send(err.message)
    }
}

//  DELETE ORDERS
const deleteOrder = async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
       return res.status(200).json("Order has been deleted...");

    }catch(err){
        return res.status(500).send(err.message)
    }
}

// GET USER ORDERS
const getUserOrder = async  (req,res)=>{
    try{
        const orders = await Order.find({ userId: req.params.userId });
        return res.status(200).json(orders);
    }catch(err){
        return  res.status(500).json(err.message);
    }
}

// GET All ORDERS

const getALLOrder = async (req,res)=>{
    try {
        const orders = await Order.find();
       return res.status(200).json(orders);
      } catch (err) {
       return  res.status(500).json(err.message);
      }
}


// get income 

const getincome = async (req , res)=>{

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
          { $match: { createdAt: { $gte: previousMonth } } },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$amount",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
            },
          },
        ]);
        res.status(200).json(income);
      } catch (err) {
        res.status(500).json(err);
      }
}

module.exports = {createOrder , updateOrder , getincome ,getALLOrder ,getUserOrder , deleteOrder}