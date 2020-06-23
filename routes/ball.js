const express =require('express')
const router=express.Router()
var fs = require('fs');
router.post('/',(req,res)=>{
    let {height,cor}=req.body 
    let arrayOfHeights=[height]
    let time= []
    let velocity=0
    let index=0
    var obj = {
        table: []
     };
    time[0]=Math.pow(2*height/10,1/2)
    for(i=1;height>0;i++){
        if(i%2!=0){
            arrayOfHeights=arrayOfHeights.concat(0)
            time=time.concat(Math.pow(2*height/10,1/2)/2,Math.pow(2*height/10,1/2)/2)
            velocity= Math.pow(2*10*height,1/2)
            velocity = cor*velocity
            height=(velocity*velocity)/20
        }
        if(i%2==0){arrayOfHeights=arrayOfHeights.concat(height)}
        index=i
    }
    console.log(time)
    let totalTime=0
    for(i=0;i<time.length;i++)
    {
        totalTime=totalTime+time[i]
    }
    obj.table.push({totalTime,numberOfBounces:index,arrayOfHeights});
    var json = JSON.stringify(obj);
    fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj.table.push({totalTime,numberOfBounces:index,arrayOfHeights}); 
        json = JSON.stringify(obj); 
        fs.writeFile('myjsonfile.json', json, 'utf8', ()=>console.log("Written to file !")); 
    }});
    res.send({totalTime,numberOfBounces:index,arrayOfHeights,time})
})
router.get('/',async (req,res)=>{
   await fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        res.send({obj,len:obj.table.length})
    }});
    
})
module.exports=router