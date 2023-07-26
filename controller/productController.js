const user = require("../models/user");
const jwt = require("jsonwebtoken");
const product = require("../models/product");

let deleteProduct = (req, res) => {
    console.log("delete product controller called!");
    
    let id = req.params.id;
    
    product.findByIdAndRemove(id)
        .then((product) => {
        res.status(200).send({ message: "product deleted successfully!" });
        })
        .catch((err) => {
        res
            .status(400)
            .send({ message: "Error occurred while deleting product", error: err });
        });
}
let updateProduct = (req, res) => {
    console.log("update product controller called!");
    let title = req.params.title;
    let updatedProduct = req.body;
    product.findOneAndUpdate({ title: title }, updatedProduct)
    .then((product) => {
        res.status(200).send({ message: "product updated successfully!" });
    })
    .catch((err) => {
        res.status(400).send({ message: "Error occurred while updating product", error: err });
    });
}
let addProduct = (req, res) => {
    console.log("add product controller called!");
    let product = new product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image,
    })
    product.save()
    .then((product) => {
        res.status(200).send({ message: "product added successfully!" });
    })
    .catch((err) => {
        res.status(400).send({ message: "Error occurred while adding product", error: err });
    });
}

module.exports = {
    deleteProduct,
    updateProduct,
    addProduct
}

