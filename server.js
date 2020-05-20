const express =require('express');
const scholar=require('google-scholar');
const app=express();
const axios=require('axios');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');


const nit=require('./models/nit');
const iit=require('./models/iit');
const profBio=require('./models/profBio')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://m001-student:mBVI3SbOLiX22EPT@avinash-001-q92dl.mongodb.net/scraping?retryWrites=true&w=majority', {useNewUrlParser: true}).then(res=>console.log('connected'))
    .catch(e=>console.log(e));


app.post('/getProfs',(req,res)=>{
    let thisRes=res;

    let {type,college,interest} =req.body;
    if(type=='nit'){
        nit.find({name:college}).then((res)=>thisRes.send({res})).catch(e=>console.log(e));
    }
    if(type=='iit'){
        iit.find({name:college}).then((res)=>thisRes.send({res})).catch(e=>console.log(e));
    }
    if(type=='all'){
        iit.find({name:college}).then((res)=>{
            let responseArr=[];
            if(res!=null){
            responseArr=[...res];
            }
            nit.find({name:college}).then((res)=>{
                if(res!=null){
                    responseArr=[...responseArr,...res];
                }
                return thisRes.send({res:responseArr});
            }).catch(e=>console.log(e));
        });

    }
})

app.post('/getProfData',(req,res)=>{
    let {name}=req.body;
    console.log(name);
    let thisRes=res;
    profBio.find({name}).then((res)=>{
        if(res.length!=0){
        thisRes.send(res[0].data);
        }
        else{
            scholar.search(name).then((ress)=>{
                console.log(ress);
                // if(ress.data.results.length===0)return;
                let obj=new profBio({name,data:ress})
                obj.save().then(res=>thisRes.send(ress));
                
            })
        }
    }).catch(e=>console.log(e));
});

app.post('/getPdfSummary',(req,res)=>{
    let {url}=req.body;
    let thisRes=res;
    axios.get(`https://api.smmry.com?SM_API_KEY=2C8BF0B674&SM_URL=${url}`).then(res=>{
    thisRes.send(res.data);
})
})




// scholar.all('vipul kheraj').then((res)=>{
//     console.log(res);
// })

app.listen(3000,()=>{
    console.log('server listening on 3000');
})