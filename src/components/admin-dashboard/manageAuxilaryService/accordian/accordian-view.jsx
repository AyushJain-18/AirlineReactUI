import React,{useState,useEffect,Fragment} from 'react';
import {connect} from 'react-redux'

import Spinner from '../../../CustumComponents/spinner/spinner.component';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './accordianView.styles.scss';

import {updateAncillaryServiceDataStart} from '../../../../store/ancillaryServices/ancillaryService.actions'
import {
  selectIsLoading
} from '../../../../store/ancillaryServices/ancillaryService.selectors'

 const  DetailedAccordion =({flightDetails,isExpandALL, update, isLoading})=> {
   console.log('Props are', flightDetails);
     const initialSwitchState ={
        luggage: false,
        'Pay-Per-View': false,
        meal: false,
        'In-Flight-Shopping': false
     }
   let  selectedAncillaryValues = flightDetails.ancillaryServiceSelectedValue;
 const [addOrRemoveValue, setaddOrRemoveValue] = useState(initialSwitchState);
 const formatTitle=(value)=>{
   if(value === 'luggage')      return  'Luggage';
   if(value === 'Pay-Per-View') return 'Pay-Per-View'
   if(value === 'meal')         return   'Meal' 
   if(value === 'In-Flight-Shopping') return  'In-Flight Shopping' 
 }
    useEffect(()=>{
        if(flightDetails.ancillaryServices){
            const{luggage,meal} = flightDetails.ancillaryServices;
            setaddOrRemoveValue({
                luggage: luggage,
                'Pay-Per-View': flightDetails.ancillaryServices['Pay-Per-View'],
                meal: meal,
                'In-Flight-Shopping': flightDetails.ancillaryServices['In-Flight-Shopping']
            })
        }
    },[])
    const handleChangeForSwitch = event => {
         setaddOrRemoveValue({ ...addOrRemoveValue, [event.target.name]: event.target.checked });
      };
    const updateSelectedAncillaryServices =(label, updatedValue)=>{
      selectedAncillaryValues = {
        ...selectedAncillaryValues,
        [label]: updatedValue
      }
    }
      const saveChanges =()=>{
        let data ={
           ...flightDetails,
            ancillaryServices: {...addOrRemoveValue},
            ancillaryServiceSelectedValue: {...selectedAncillaryValues}
        }
        console.log('final data to be saved is', data)
        update(data);
      }


        return (
          <Fragment>
              {isLoading? <Spinner/>: 
                <div style={{marginBottom: '1vw'}}>
                  <Accordion defaultExpanded={isExpandALL}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1c-content"
                                      id="panel1c-header">
                              <Typography className='ancSummary'>
                                  {flightDetails.airlineNumber}&nbsp;-&nbsp;{flightDetails.name}
                              </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                          <div className= 'ancDetailsContainer'>
                            <div className='ancDetails1'>
                                  <span className='ancHeading'> Ancillary Services </span>
                                  <span className='ancHeading'> REMOVE &nbsp;|&nbsp; ADD </span>
                            </div>
                                        
                                {Object.keys(flightDetails.ancillaryServices).map(forEachKeys=>{
                                    return (
                                      <div className='ancDetails1'> 
                                          <div className='ancText'> {formatTitle(forEachKeys)} </div>
                                          <div style={{marginRight: '2vw'}}>  
                                              <Switch checked={addOrRemoveValue[`${forEachKeys}`]}
                                                  size="small"
                                                  onChange={handleChangeForSwitch}
                                                  color="primary"
                                                  name={forEachKeys}
                                                  inputProps={{ 'aria-label': 'primary checkbox' }}
                                              />
                                          </div>
                                      </div>
                                      )
                                  })  
                                }
                            </div> 
                            <div className='ancDetails2'>
                                        <div className='ancHeading'> Edit</div>
                                        {
                                            Object.entries(flightDetails.ancillaryServiceSelectedValue).map(eachKeyValuePairArray=>{
                                              return (<TagPicker pooledValues={flightDetails.ancillaryServicePooledValue[eachKeyValuePairArray[0]]}
                                                                  initialValues= {eachKeyValuePairArray[1]}
                                                                  onUpateSelectedValue= {updateSelectedAncillaryServices}
                                                                  label ={eachKeyValuePairArray[0]}
                                                                  canEdit={addOrRemoveValue[eachKeyValuePairArray[0]]}/>)
                                            })
                                        }
                            </div>
                        
                    </AccordionDetails>
                    <Divider/>
                    <AccordionActions>
                      <Button size="small" color="secondary" className='ancButton' onClick={()=>saveChanges()}>  Save chnages</Button>
                    </AccordionActions>
                  </Accordion>
                </div>
              }
          </Fragment>
          );
    }

const mapStateToProps = state=>({
  isLoading: selectIsLoading(state)
})
const mapDispatchToProps = dispatch=>({
  update: (updatedData)=> dispatch(updateAncillaryServiceDataStart(updatedData))
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailedAccordion);



// Second component for Tag picker
const TagPicker =({initialValues, pooledValues, canEdit, onUpateSelectedValue, label})=>{
      const ITEM_HEIGHT = 48;
      function getStylesForMenu(name, selectedValues){
        return {
          fontWeight: selectedValues.indexOf(name) === -1? 'lighter': 'bolder',
        };
      }

      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const [selectedAncillaryServices, setselectedAncillaryServices] = useState(initialValues);
      const onClickMenuBar = (event) => setAnchorEl(event.currentTarget);
      const closeMenuBar = () => setAnchorEl(null);
      const onSelectMenuItem =name=>{
        closeMenuBar()
        if(!selectedAncillaryServices.includes(name)){
          let updateAncillaryServiceValue = [...selectedAncillaryServices];
          updateAncillaryServiceValue.push(name)
          setselectedAncillaryServices(updateAncillaryServiceValue);
        } 
      }
      useEffect(()=>onUpateSelectedValue(label,selectedAncillaryServices), [selectedAncillaryServices])

        const removeItem =(value)=>{
            let newSelectedAncSer = selectedAncillaryServices.filter(eachItem => eachItem!== value)
            setselectedAncillaryServices(newSelectedAncSer)
        }
        if(!canEdit){
          // setselectedAncillaryServices(initialValues);
          return <div className='cantEdit'> Can't Edit</div>
        }
        return(
          // <div>
                <div className='chipStyleContainer'>
                    {selectedAncillaryServices && selectedAncillaryServices.map((value) => (
                      <Chip key={value}  label={value} className='chipStyle' onDelete={()=>removeItem(value)}/>
                      ))}
                {/* </div> */}
                <div>
                      <div className='addSymbol' onClick={onClickMenuBar}>+</div>
                      <Menu id="long-menu" anchorEl={anchorEl} keepMounted  open={open} onClose={closeMenuBar}
                            PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5,width: '20ch',}}}>
                            {pooledValues && pooledValues.map((name) => (
                                <MenuItem key={name} onClick={()=>onSelectMenuItem(name)} value={name} style={getStylesForMenu(name, selectedAncillaryServices)}>
                                  {name}
                                </MenuItem>))}
                        </Menu>
                </div>
        </div>
  )};



