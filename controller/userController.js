const user = require('../models/user');
const jwt = require('jsonwebtoken');
const product = require('../models/product');

let signup = (req, res ) =>{
    console.log("signup usercontroller called!");
    user.findOne({email: req.body.email})
    .then((existingUser)=>{
        if(existingUser)
        {
            return res.status(400).send({message:"user account with this email already exists!"});
        }
        let user = new user({
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
        })

        user.save()
        .then((user) => {
            res.status(200).send({message: "user Account created successfully!", user: user})
        })
        .catch((err) => {
            res.status(400).send({message: "Error occurred while creating user Account", error: err})
        })
        
    })
}
let login = (req, res) => {
    console.log("Login method in user Controller called")

    let email = req.body.email
    let password = req.body.password
    let secretKey = process.env.SECRET_KEY
    user.findOne({email: email})
    .then((user) => {
        if (user)
        {
            if (user.password === password)
            {
                let token = jwt.sign({email: email, role: 'user'}, secretKey, {expiresIn: '1h'}) //the email is now included in the token as well as the role since login is successful
                res.status(200).send({message: "Login Successful", token: token}) 
            }

            else
            {
                res.status(401).send({message: "The password is incorrect"})
            }
        }

        else
        {
            res.status(404).send({message: "No user Account exists with this email"})
        }
        
    })
    .catch((err) => {
        res.status(404).send({message: "An error occurred during login", error: err.message})
    })

}
 let getAllProducts = (req, res) => {
        console.log("get all products method in user controller called")
        product.find()
        .then((products) => {
            res.status(200).send({message: "All products fetched successfully", products: products})
        })
        .catch((err) => {
            res.status(400).send({message: "An error occurred while fetching products", error: err.message})
        })
}
let getProductByTitle = (req, res) => {
    console.log("get product by title method in user controller called")
    let title = req.params.title
    product.findOne({title: title})
    .then((product) => {
        res.status(200).send({message: "Product fetched successfully", product: product})
    })
    .catch((err) => {
        res.status(400).send({message: "An error occurred while fetching product", error: err.message})
    })
}
let buyProductfromStock = (req, res) => {
    console.log("buy product from stock method in user controller called")
    let title = req.params.title
    product.findOne({title: title})
    .then((product) => {
        if(product.stock > 0)
        {
            product.stock = product.stock - 1
            product.save()
            .then((product) => {
                res.status(200).send({message: "Product bought successfully", product: product})
            })
            .catch((err) => {
                res.status(400).send({message: "An error occurred while buying product", error: err.message})
            })
        }

        else
        {
            res.status(400).send({message: "Product is out of stock"})
        }
    })
    .catch((err) => {
        res.status(400).send({message: "An error occurred while buying product", error: err.message})
    })
}
module.exports = {
    signup,
    login,
    getAllProducts,
    getProductByTitle,
    buyProductfromStock
}
