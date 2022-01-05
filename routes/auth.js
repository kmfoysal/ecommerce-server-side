const User = require('../models/User');

const router = require('express').Router();

const CryptoJS = require('crypto-js');
const jsonwebtoken = require('jsonwebtoken');

const jwt = require('jsonwebtoken')

// Register 

router.post('/register', async(req, res)=>{
    const newUser = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    })

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

// Login 

router.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({userName : req.body.userName});

        !user && res.status(401).json('Wrong Credentials');

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        userPassword !== req.body.password && res.status(401).json('Wrong Credentials');

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '3d'
            }
        )

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;