import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin:.5,
    marginTop:2
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    display:'flex',
    alignItems: 'center', 
    flexDirection:'column',
    flexWrap:'nowrap',
    justifyContent:'center',
    width:'100%'
  },
  column: {
    flexBasis: '33.33%',
  },
text:{
width:'80%'
} 
  
}));

export default function DetailedAccordion({a,hOpen,ms }) {
 const [n,sn] = useState({n:'',p:0,t:'',q:0,aic:'',gt:0,prp:0,pradz:0,prc:0})
 const [ins,sins] = useState('')
  const classes = useStyles();
const add = ()=>{ 

  if(n.n !=='' && n.aic !==''){
    a(n)
    sn({...n,n:'',aic:''})
  }else if(n.n===''){
    ms("Invalid product name")
    hOpen()
  }else if(n.aic===''){
    ms("You mush know how much piece is inside the carton")
    hOpen()
  }
  
}
//gt = grand total
// prdz = price for dozen
// prc = price for Carton
// prp = price for piece

const ad = (e)=>{
if(e.target.name!==''){
    if(e.target.name === 'n'){
    sn({...n,n:e.target.value})
    sins(e.target.value)
  }else{
    if(parseInt(e.target.value)){
      sn({...n,aic: parseInt(e.target.value)})
    }else{
      ms("Invalid product name")
      hOpen()
    }
    
  }
}

  
  
}
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>New Item</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>enter new item</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <TextField value = {n.n} className={classes.text} label="Item Name:" name='n' onChange={ad}  />
        <TextField value={n.aic} className={classes.text} name='aic' label={`How many ${ins} inside a carton`} onChange={ad}  />
        </AccordionDetails>
        <Divider />
        <AccordionActions >
          <Button size="small">Cancel</Button>
         
          <Button size="small" color="primary" onClick={add}>
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
