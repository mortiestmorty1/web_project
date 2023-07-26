const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const userController = require('../controller/userController');
const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).send({ error: "You are not authorized to access this route" })
    }
    console.log("token is ", token)
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user= decoded
    console.log("the token is for:",req.user.email);
    if(req.user.role=="user")
    {
        next();
    }
    else{
        return res.status(401).send({message:"You are not authorized to access this route"})
    }
}

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/ getAllProducts', isAuthorized, userController.getAllProducts);
router.get('/getProductByTitle', isAuthorized, userController.getProductByTitle);
router.delete('/buyProductfromStock', isAuthorized, userController.buyProductfromStock);

module.exports = router;