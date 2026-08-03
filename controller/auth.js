// Add in the jsonwebtoken package
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// const signToken = (req,res) => {

//     const user = {
//         id:1,
//         usernam: 'test',
//         password: 'test'
//     }

//     //create a token
//     const token =jwt.sign({user}, process.env.JWT_SECRET)
//     res.json(token)
// }

// const verifyToken = (req, res) => {
//     const token = req.headers.authorization.split(' ')[1]
//     // res.json({ message: 'token is valid' })
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     res.json({ decoded })
// }

const signUp = async (req,res) => {
    try {

        // check if there ecst user
        const userInDatabase = await User.findOne({
            username: req.body.username
        })

        if (userInDatabase){
            return res.status(409).json({err:'Username already taken.'})
        }
        // for the password securety
        const hashedpassword = bcrypt.hashSync(req.body.password, 10)

        const userData = {
            username: req.body.username,
            password: hashedpassword
        }

        
        const user = await User.create(userData) 
        // create the payload
            const payload = {username: user.username, _id:user._id}
        // create the token+ secret
            const token = jwt.sign({payload}, process.env.JWT_SECRET)

        res.json({token})
        
    } catch (err) {
        res.json({ err: err.message })
    }
}

const signIn = async (req,res) => {
    try {
        // check if there user in database
        const userInDatabase = await User.findOne({
            username: req.body.username
        })

        if (userInDatabase){
            return res.status(404).json({err:'User dose not exit.'})
        }

        // check if password matched
        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
        
        if(!validPassword) {
            return res.status(401).json({ err: 'Login failed. Please try again.' })
        }
        
    } catch (err) {
        
    }
}

module.exports ={
    // signToken,
    // verifyToken
    signUp,
}