// Add in the jsonwebtoken package
const jwt = require('jsonwebtoken')

const signToken = (req,res) => {

    const user = {
        id:1,
        usernam: 'test',
        password: 'test'
    }

    //create a token
    const token =jwt.sign({user}, process.env.JWT_SECRET)
    res.json(token)
}

const verifyToken = (req, res) => {
    const token = req.headers.authorization
    res.json({ message: 'token is valid' })

    res.json({ token })
}

module.exports ={
    signToken,
    verifyToken
}