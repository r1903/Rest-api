const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({destination: function(req,file,cb){
                                    cb(null,'./uploads'); 
                                    },
                                    filename: function(req,file,cb){
                                    cb(null,file.originalname);
                                    }
                                    });
const upload = multer({storage:storage});
const Products = require('../models/products');

//seting the endpoint that listen to HTTP get request
router.get('/', async(req,res) => {
    try{
        const products = await Products.find();
        res.json(products);
    }catch(err){
        res.json({message:err});
    }
});


//seting the endpoint that listen to HTTP post request
router.post('/',upload.single('productImg'), (req,res)=>{
console.log(req.file);
    const product = new Products({
        title:req.body.title,
        price:req.body.price,
        productImg:req.file.path
    });
    product.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.json({message:err})
    })

});

//seting the endpoint that listen to HTTP  get request for particular product id.
router.get('/:productId', async(req,res) => {
    try{
        const product = await Products.findById(req.params.productId);
        res.json(product);
    }catch(err){
        res.json({message:err});
    }
 });


 //seting the endpoint that listen to HTTP delete request for particular product id.
 router.delete('/:productId', async(req,res) => {
    try{
        const product = await Products.remove({_id:req.params.productId});
        res.json(product);
    }catch(err){
        res.json({message:err});
    }
 });

//seting the endpoint that listen to HTTP update request for particular product id.
 router.patch('/:productId', async(req,res) => {
    try{
        const product = await Products.updateOne({_id:req.params.productId},
                        {$set :{title:req.body.title}});
        res.json(product);
    }catch(err){
        res.json({message:err});
    }
 });


module.exports = router;