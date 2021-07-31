const express = require("express")
const app = express()
require('dotenv').config()
const {ApiClient} =require('twitch')
const { ClientCredentialsAuthProvider } = require('twitch-auth')
const cors = require('cors')

const authProvider = new ClientCredentialsAuthProvider(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
const apiClient = new ApiClient({ authProvider })


app.use(express.json())
app.use(cors())
app.get('/profile_img',async (req,res)=>{
    let id = req.query.id
    let user = await apiClient.helix.users.getUserById(id)
    res.json(user.profilePictureUrl)
})

app.listen(5000)
console.log('Server started at http://localhost:5000')