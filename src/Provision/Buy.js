import React,{useState}  from 'react';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin:.5
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
    justifyContent:'center',
    flexDirection:'column',
    flexWrap:'nowrap'
  },
  column: {
    flexBasis: '33.33%',
  },
  div:{
    margin:2,
    width:`100%`
  },
  in:{
    width:  "100%"
  }
 
 
}));

export default function DetailedAccordion({itm,options,type,stypes,buy,ms,hOpen}) {
  const classes = useStyles();
  const [n,sn] = useState({n:'',p:'',t:'',q:'',prdz:0,prc:0,prp:0,ac:0,adz:0})



  // item names
  const defaultProps = {
    options: itm,
    getOptionLabel: (option) => option.n,
  };

  // item type
  const defaultProp = {
    options: options,
    getOptionLabel: (option) => option.t,
  };

const save = ()=>{ 

   if(n.n!=='' && n.p!=='' && n.t !== '' && n.q !== '' ){
      buy(n)
      sn ({...n,p:'',q:'',prdz:0,prc:0,prp:0,ac:0,adz:0})
   }else{
    ms("check input")
    hOpen()
   } 
 
}

const types = (e,r)=>{
 
  if(e!==null ){ 
    ad(e,r)
   r==='t' && stypes(e.t) 
  
  }
  
}



const ad = (e,r)=>{

  if(r!==undefined){
    if(r==='n'){
      sn({...n,n:e.n}) 
    }else{
      sn({...n,t:e.t}) 
    }
  }else{
     if( e.target.name === 'p'){
      sn({...n,p:e.target.value}) 

     }else if( e.target.name === 'q'){
      sn({...n,q:e.target.value})

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
            <Typography className={classes.heading}>Buy Entry</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>enter buy record</Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          {/* item */}
        <div className={classes.div}>
          <Autocomplete
           onChange={(event, value) =>  types(value,'n')} 
          {...defaultProps}   
          renderInput={(params) => <TextField  {...params} label="Item Name:" margin="normal" />}
          />
        </div>

        <div  className={classes.div}>
          <Autocomplete
         onChange={(event, value) =>  types(value,'t')} 
            {...defaultProp}          
            renderInput={(params) => <TextField  {...params}  label="What Form:" margin="normal" />}
          />
        </div>

      <div  className={classes.div}>
        <TextField  value={n.p}  className={classes.in} label={`How much for one ${type}`} name={'p'} onChange={ad}  />
       </div>


     <div  className={classes.div}>
      <TextField  value={n.q} className={classes.in} label={`How much ${type} you buy` } name={'q'} onChange={ad}  />
     </div>
{/* 
     <div  className={classes.div}>
        {type === "piece" && <TextField className={classes.in}  label={`Amount inside the ${type}`} name={'a'} onChange={ad}  /> }
      </div> */}




        
     
      
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary" onClick={save}>
            Save
          </Button>
        </AccordionActions>
      </Accordion>
      
    </div>
  );
}
