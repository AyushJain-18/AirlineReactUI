import React  from 'react';

import ToggleTab from '../../CustumComponents/Toggle-tab/ToggleTab.compoent';
import DisplayPassengersList from '../passenger-details/displayPassengerList.component';
import ManageAncillaryServices from '../manageAuxilaryService/ManageAncillary/manage-ancillary-services.component'




 class AdminToolbar extends React.Component {
         render(){
            return(
                    <div style= {{marginBottom: "1vw"}}>
                        <ToggleTab
                            componentsArray={[ManageAncillaryServices,DisplayPassengersList]}
                            propsArray = {[{},{}]}
                            labelArray ={[ 'Manage Ancillary Service','Manage Passenger']}
                            keyArray={['Manage Ancillary Service','Manage Passenger']} 
                        />
                    </div>
            )
        }
 }

 export default AdminToolbar