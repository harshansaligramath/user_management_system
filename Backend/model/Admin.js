const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true, 
    }
},{ collection: 'admin' })


// _id
// 64c2026d582ed61605116ca4
// name
// "deepthi"
// email
// "deepthi@gmail.com"
// password
// "$2a$10$0AOEXPkLu7XA4CIYXokLWuws0./WJA/nntlKjHoDxwMLp9kiid4YK"
// isDelete
// false
// __v
// 1



module.exports = mongoose.model('Admin',adminSchema);