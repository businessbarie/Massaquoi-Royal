import React,{useEffect} from 'react';
import Buy from './Buy'
import Sale from "./Sales"
import NewPro from "./NewProduct"
import { makeStyles } from '@material-ui/core/styles';
 
import Table from './AnalysisT'
 
const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
    },
   
  }));

 
function App({f,a,itm,wf,type,stypes,buy, sales,sdata,hOpen, ms }) {
    const classes = useStyles();
 useEffect(()=>{
   f("Provision")
 })
  return (
    <div className={classes.root}> 
        <Buy itm={itm.i} options={wf} stypes={stypes} type={type} ms={ms} hOpen={hOpen} buy={buy}/>
        <Sale itm={itm.i} options={wf} type={type} stypes={stypes} ms={ms} hOpen={hOpen}  sales={sales}/>
        {/* <Analysis sdata={sdata}/> */}      
        <Table rows={sdata}/>  
        <NewPro a={a} hOpen={hOpen} ms={ms}  />
    </div>
  );
}

export default App;
