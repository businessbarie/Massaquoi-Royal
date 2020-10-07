import React,{useEffect} from 'react';
import Appbar from './Appbar'
import Business from "./BusinessesMenus"
import  { useState } from "react";
import Confirmation from './Confirmation'
import Provison from "./Provision/FormandAnalysis"
import { BrowserRouter as R,   Route } from "react-router-dom";
import './App.css';
 
 

function App() {
  const [t, st] = React.useState("Massaquoi Royal");
  const [dt,setD] = useState({i:[],s:[],b:[],d:''})
  const [open, setOpen] = React.useState(false);
     const [type,stype] = useState("carton")
   const wf =  [{t:"carton"},{t:"dozen"},{t:"piece"}]
   const [sdata,setsdata] = React.useState([])
  
   const [msg,smsg] = useState('record')
  //  const [bi,sbi] = useState([])


 
useEffect(()=>{
 
    var arr = []
if(dt.b.length || dt.s.length || dt.i.length  ){

  
  for (let c = 0; c < dt.i.length; c++) {
    arr[c] = []
    arr[c].push(dt.i[c].n,(dt.i[c].ac*1||0), (dt.i[c].adz||0),(dt.i[c].piece||0))  

   
    arr[c][4] = 0
    arr[c][5] = 0
    arr[c][6] = 0
    arr[c][7] = 0
    arr[c][8] = 0
    arr[c][9] = (((dt.i[c].ac*1||0)*dt.i[c].prc)||0) + (((dt.i[c].adz||0)*dt.i[c].prdz)||0) + (((dt.i[c].piece||0)*dt.i[c].prp)||0)


    for (let s = 0; s < dt.s.length; s++) {
      if(arr[c][0] === dt.s[s].n){
           
           arr[c][4] = (dt.s[s].ac||0)
            arr[c][5] = (dt.s[s].adz||0)
            // prdz:0,prc:0,prp:0
            // prdz:0,prc:0,prp:0,
        arr[c][8] =  ((dt.s[s].prc-dt.i[c].prc)*arr[c][4]||0) + ((dt.s[s].prdz-dt.i[c].prdz)*arr[c][5]||0) +(dt.s[s].prp-dt.i[c].prp)*dt.s[s].apc


      }  
    }   
 
    for (let b = 0; b < dt.b.length; b++) {
      if(arr[c][0] === dt.b[b].n){
        arr[c][6] = (dt.b[b].ac||0)
        arr[c][7] = (dt.b[b].adz||0)
//  pt[`${arr[c][0]}`]={prc: parseInt(dt.b[b].prc),prdz:parseInt(dt.b[b].prdz),prp: parseInt(dt.b[b].prp)}
 
             }    
    }
     }
 
}

var rows = []
arr.forEach(e => {

  rows.push(createData(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9]))
});
setsdata(rows)

// console.log(sdata)
// console.log(dt.i)

  },[dt])




  const f=(v)=>{
    st(v)
  }




  function createData(name,ac,dz,piece,sac,sadz,bac,badz,pft,tm) {
return { name,ac,dz,piece,sac,sadz,bac,badz,pft,tm };
}



  const hOpen = () => {
    setOpen(!open);
  };

  // to select in what form bough
  const stypes = (e)=>{
    stype(e)
    
  }


  const add = (v)=>{
   
    var t = true

    dt.i.forEach(e => {
      if(v.n===e.n){
        t = false
      }
    });
      if(t){
      setD({...dt,i:[...dt.i,v]})
    }else{
      smsg('if you want to change this product ask admin. record exist')
      hOpen()  
    }
 
         
  }

  const sales =(v)=>{
  
    var b = dt.s
  var tt = true
    var i = dt.i
  var exit = true
    b.forEach(e => {
      if(e.n===v.n){
        exit = false
      }       
    });
    
    if(exit){     
      b.push(v)
    }

    for (let p = 0; p < i.length; p++) {
   
     if(i[p].n===v.n){
       
      if(v.t=== "carton" ){        
        if(i[p].ac -(v.q*1) >=0 ){

          i[p].ac = parseInt(i[p].ac)- parseInt(v.q)
          i[p].gt =  parseInt(i[p].gt) -  parseInt((i[p].aic) * v.q )   
        }else{
          smsg("Cartons are finished")
          hOpen()
          tt = false
        }
        
      }else{ 
        let dc =  0  
           if(v.t=== "dozen" ){
            dc =  (v.q *12)                   
           }else{
            dc = v.q *1 
           }
// console.log(i[p].gt)
           if(i[p].gt-dc>=0){
            i[p].gt -= dc 
            
            if(i[p].ac>0){
               i[p].ac= parseInt(i[p].gt/i[p].aic*1)             
            let cat = i[p].gt-((i[p].aic*1)*i[p].ac)
            i[p].adz = parseInt(cat/12)
            i[p].piece = parseInt(cat%12)
            }else{
              i[p].adz = parseInt(i[p].gt/12)
              i[p].piece = parseInt(i[p].gt%12)
            }
           
           }else{ 
             tt = false
            smsg("Both by dozen and carton are finish")
            hOpen()
           
           }       
        }
      }      

        


      if(tt){
         for (let q = 0; q <b.length; q++) {
     if(b[q].n===v.n){     
       if(v.t=== "carton" ){
         b[q].q =   (v.q*1)    
         b[q].prc = v.p   
         b[q].ac  =  (v.q*1) 
       }else  if(v.t=== "dozen" ){
        b[q].q = (v.q*1) 
        b[q].prdz = v.p
        b[q].adz = v.q*1
       }else{
        // b[q].ps =   (v.q*1) 
        b[q].prp = v.p
        b[q].apc = v.q
       }
      } 
      } 
      
      setD({...dt,i:i})
      setD({...dt,s:b}) 
      }else{
        smsg("this item is finished")
            hOpen()           
      } 
    }
      
    
  }


const buy =(v)=>{     

  var b = dt.b
  
    var i = dt.i
  var exit = true
    b.forEach(e => {
      if(e.n===v.n){
        exit = false
      }      
    });
    
    if(exit){
      b.push(v)
    }

    for (let p = 0; p < i.length; p++) {
     if(i[p].n===v.n){
      if(v.t=== "carton" ){
        i[p].gt =  (i[p].gt*1) +  ((i[p].aic*1) * v.q )          
        i[p].ac = parseInt((i[p].ac||0))+ parseInt(v.q)
        i[p].prp = v.p/(i[p].aic*1)
         i[p].prdz = i[p].prp*12
        i[p].prc = v.p
      }else  if(v.t=== "dozen" ){
        i[p].gt =  ((i[p].gt*1)||0) +   (v.q *12)    
        i[p].adz=  (i[p].adz||0)  + (v.q*1)  
        i[p].prdz = v.p
        i[p].prp = v.p/12
      }else{
        i[p].gt =  ((i[p].gt*1)||0) +   (v.q *1)        
        i[p].prp = v.p
         i[p].piece = v.q*1
      }
     }      
    }


 



    for (let q = 0; q <b.length; q++) {
     if(b[q].n===v.n){     
       if(v.t=== "carton" ){
         b[q].q =   (v.q*1)    
         b[q].prc = v.p 
         b[q].ac =  v.q
       }else  if(v.t=== "dozen" ){
        b[q].q = (v.q*1)  
        b[q].prdz = v.p
        b[q].adz =   v.q*1
       }else{
        b[q].q =   (v.q*1) 
        b[q].prp = v.p
       }
      } 

    }
    // {n:'',p:'',t:'',q:''}
    //gt = grand total
// prdz = price for dozen
// prc = price for Carton
// prp = price for piece


      setD({...dt,i:i})
      setD({...dt,b:b})

  
      
     }
      
    
    
  
  
  return (
    <div className="App"> 
     <Appbar t={t}/>  
      <R>
        <Route component={Business} exact path="/" />  
          <Route exact path="/provision" render={(props) => <Provison {...props} sdata={sdata} buy={buy} type={type} wf={wf} stypes={stypes}  a={add} itm={dt}  f={f} sales={sales} hOpen={hOpen} ms={smsg}/>} />   
      </R>
     
       <Confirmation hOpen={hOpen} msg={msg} open={open}/>
    </div>
  );
}

export default App;
