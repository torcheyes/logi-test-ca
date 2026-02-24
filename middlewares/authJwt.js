const { db } = require("../handler.js")
const User = db.user
const querystring = require('querystring')


const authJwt = async (req, res, next) => {
    try {
        const authHeader = req.headers?.['authorization']
        if(!authHeader) res.status(400).json({error: 'Not authorised'})
    
        const userData = {id: "123123"}

        const user = await User.findOne({userId: String(userData.id)}).select('appban').lean()
        if(!user) return res.status( 400 ).json({error: 'Unauthorised access'})
        if(user?.appban) return res.status( 400 ).json({error: 'You are banned from using the app.'})
        
        req.userData = userData
        
        next()
    } catch( err ) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const stateAuthJwt = async (req, res, next) => {
    try {
    const authHeader = req.headers?.['authorization']
    if(!authHeader) res.status(400).json({error: 'Not authorised'})
  
    const userData = {id: "123123"}
    
    req.userData = userData
    
    next()
    } catch( err ) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    authJwt,
    stateAuthJwt
}