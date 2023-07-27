const Product = require("../models/inform");

async function addProduct(req, res) {
  try {
    const { imgUrl, firmaUrl } = req.body;

    const product = Product({
      imgUrl,
      firmaUrl,
    });

    if (req.file) {
      const { filename } = req.file;
      product.setImgUrl(filename);
    }

    if(req.file){
        const{filename} = req.file;
        product.setFirmaUrl(filename);
    }
    
    const productStored = await product.save();

    res.status(201).send({ productStored });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

module.exports = {
  addProduct,
};
