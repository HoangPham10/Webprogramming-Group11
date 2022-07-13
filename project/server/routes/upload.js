const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin');
const Product = require('../models/product')
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,

})

router.post('/upload', auth, authAdmin, (req, res) => {
    try{
        if(!req.files || Object.keys(req.files).length === 0) return res.status(400).json({msg : "No files were uploaded"});

        const {file} =req.files;
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg: "Size too large"})
        }
        if(!['image/jpeg','image/png'].includes(file.mimetype))  {
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg:"File format is incorrect"});
        }
        cloudinary.v2.uploader.upload(file.tempFilePath,{folder: 'test'}, async(err, result) => {
            if(err) throw err;
            removeTmp(file.tempFilePath);
            res.json({publid_id: result.publid_id, url: result.secure_url})
        })
     }catch(err){
         return res.status(500).json({msg: err.message})
     }
})

router.post('/destroy', auth, authAdmin,(req, res) => {
    try{
        const {url} = req.body;
        if(!url) res.status(400).json({msg: 'No images selected'});
        cloudinary.v2.uploader.destroy(url, async(err, result) => {
            if (err) throw err;
            res.json({msg: 'Deleted Image'});
        })
     }catch(err){
         return res.status(500).json({msg: err.message})
     }
})

const removeTmp = path => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

router.post('/product', auth, authAdmin,async(req, res) => {
    try{
        const product = req.body;
        console.log(product)
        await Product.create(product);
        res.json({msg: 'Create product successfully',  products: await Product.findAll()})
     }catch(err){
         return res.status(500).json({msg: err.message})
     }
})

router.put('/product/:id', auth, authAdmin,async(req, res) => {
    try{
        const product = req.body;
        const {id} = req.params;

        await Product.update(product,{ 
            where:{
                id: id
        }});
        res.json({msg: 'Update product successfully', products: await Product.findAll() })
     }catch(err){
         return res.status(500).json({msg: err.message})
     }
})


module.exports = router