const Product = require('../models/Product')
const {uploadFile} = require('../aws')

const createProduct = async (req, res)=>{
    let data = req.body
    let { size , color} = data
    let image = req.files
    if(!image[0]) return res.status(400).send("please given image")
    data['img'] = await uploadFile(image[0])

    let Size = size.split('  ')
    const arr = Size.map(x=> x.trim()).filter(y=>y.length!=0).map(z=>z.toUpperCase())
     const result = [... new Set(arr)]
    data.size = result

    let Color = color.split('  ')
    const arr1 = Color.map(x=> x.trim()).filter(y=>y.length!=0).map(z=>z.toUpperCase())
    const result1 = [... new Set(arr1)]
    data.color = result1


    const newProduct = new Product(data)
    try{
       
  
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);


    }catch(err){
        return res.status(500).send(err.message)
    }
}


const updateProduct = async (req, res)=> {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
       return res.status(200).json(updatedProduct);


    }catch(err){
        return res.status(500).send(err.message)
    }
}

const deleteProduct = async (req, res)=>{
    try{
 
        await Product.findByIdAndDelete(req.params.id);
       return res.status(200).json("Product has been deleted...");

    }catch(err){
   return res.status(500).json(err.message);
    }
}

const getProduct = async (req, res)=>{
    try{
    const product = await Product.findById(req.params.id);
     return res.status(200).json(product);
    }catch(err){
   return  res.status(500).json(err);
    }
}

const getALLProduct = async (req, res)=>{
    try{
        const qNew = req.query.new;
        const qCategory = req.query.category;
        let products;

        if (qNew) {
          products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
          products = await Product.find({
            categories: {
              $in: [qCategory],
            },
          });
        } else {
          products = await Product.find();
        }
    
        return res.status(200).json(products);

    }catch(err){
        return res.status(500).send(err.message)
    }
}

module.exports = { createProduct , updateProduct , getProduct , getALLProduct , deleteProduct}