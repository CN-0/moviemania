const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router  = new express.Router()

router.post('/register',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token =await user.generateAuthToken()
        res.status(201).send({user:user.email,token})
    }catch(e){
        res.status(400).json({msg:e.message})
    }
    
})

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findUser(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user:user.email,token})
    }catch(e){
        res.status(409).json({msg:e.message})
    }
    
})

router.post('/additem', auth, async (req,res)=>{
    try{
        const isthere = req.user[req.body.type].find(item=>item.id === req.body.postData.id)
        if(isthere){
            throw new Error('item is already added!')
        }else{
            req.user[req.body.type] = req.user[req.body.type].concat(req.body.postData)
            await req.user.save()
        }
        res.status(200).send({msg:"Item Added Successfully!"})
    }catch(e){
        res.status(409).json({msg:e.message})
    }
    
})


router.get('/favorites', auth, async (req,res)=>{
    try{
        res.status(200).send({favoriteMovies: req.user.favoriteMovies, favoriteTvShows: req.user.favoriteTvShows})
    }catch(e){
        res.status(409).json({msg:e.message})
    }
    
})


router.get('/watchlist', auth, async (req,res)=>{
    try{
        res.status(200).send({watchlistMovies: req.user.watchlistMovies, watchlistTvShows: req.user.watchlistTvShows})
    }catch(e){
        res.status(409).json({msg:e.message})
    }
    
})

router.post('/logout',auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).json({msg:"you are successfully logged-out"})
    } catch (e) {
        res.status(500).json({msg:e.message})
    }
})

router.patch('/update',auth, async (req,res)=>{
    try {
        req.user["password"] = req.body["password"]
        await req.user.save()
        res.status(200).send("password changed successfully!")
    } catch (e) {
        res.status(400).json({msg:e.message})
    }
})

router.delete('/delete',auth, async(req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

