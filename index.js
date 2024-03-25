

const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT || 3200

const app = express()

let datas = null
const url = 'https://lereacteur-bootcamp-api.herokuapp.com/api/deliveroo/menu/paris/3eme-temple/sub-arc-subway-rambuteau?day=today&geohash=u09wj8rk5bqr&time=ASAP'

const initDatas = async () => {
  try{
    if(!datas){
      console.log(process.env.API_REACTEUR)
      datas = await axios.get( url, 
        { 
          headers: {
              'Authorization': `Bearer ${process.env.API_REACTEUR}`
          }
        }
      )
    }
  } catch(error){console.log(error.message)}
}

initDatas()

app.use(cors())

app.get('/', (req, res)=>{
  res.json(datas.data)
})

app.listen(PORT, ()=>{console.log(`serveur ok sur le port ${PORT}`)})