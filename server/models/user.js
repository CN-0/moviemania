const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
              throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:5
    },
    favoriteMovies:[{
        id : Number,
        name: String,
        overview: String,
        rating: Number,
        poster: String
    }],
    favoriteTvShows:[{
        id : Number,
        name: String,
        overview: String,
        rating: Number,
        poster: String
    }],
    watchlistMovies:[{
        id : Number,
        name: String,
        overview: String,
        rating: Number,
        poster: String
    }],
    watchlistTvShows:[{
        id : Number,
        name: String,
        overview: String,
        rating: Number,
        poster: String
    }],
    tokens: [{
        token: {
            type: String
        }
    }]
},{
    timestamps:true
},{ typeKey: '$type' })

userSchema.methods.toJSON = function(){
    user = this
    userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findUser = async (email,password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('there is no user by this email')
    }
    const isValid = await bcrypt.compare(password,user.password)
    if (!isValid){
        throw new Error('password doesnot match')
    }
    return user
}


userSchema.pre("save",async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()

})

const User = mongoose.model('User',userSchema)

module.exports=User