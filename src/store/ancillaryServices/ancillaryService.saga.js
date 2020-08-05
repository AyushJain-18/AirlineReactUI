import {takeLatest, all, call, put} from 'redux-saga/effects';
import ANCILLARY_TYPES from './ancilaryTypes';
import {
    fetchAllAncillaryServiceDataSuccess,
    fetchAllAncillaryServiceDataFailure,
    fetchAllAncillaryServiceDataStart,
    updateAncillaryServiceDataFailure,
    updateAncillaryServiceDataSuccess
} from './ancillaryService.actions'
import {getRequest, updateRequest} from '../../utils/api.calls'

function* fetchAncillarySrv(){
    try{
       let ancillaryServicesData =  yield getRequest('/flight');
        yield put(fetchAllAncillaryServiceDataSuccess(ancillaryServicesData.data))
    } catch(error){
        put(fetchAllAncillaryServiceDataFailure)
    }
}

function* updateAncillaryService(payloadData){
    console.log('payloadData', payloadData);
    const updatedData = payloadData.payload;
    const flightId = updatedData.id;
    try{
        yield updateRequest(`/flight/${flightId}`,updatedData);
        yield put(updateAncillaryServiceDataSuccess())
        yield put(fetchAllAncillaryServiceDataStart())
    } catch(error){
        console.log('error', error);
        yield put(updateAncillaryServiceDataFailure())
    }
}

function* fetchAncillaryServiceData(){
    yield takeLatest(ANCILLARY_TYPES.FETCH_ANCILLARY_SERVICE_START, fetchAncillarySrv);
}

function* updateAncillaryServiceData(){
    yield takeLatest(ANCILLARY_TYPES.UPDATE_ANCILLARY_SERVICE_START, updateAncillaryService);
}

export default function * ancillarySaga(){
    yield all([
        call(fetchAncillaryServiceData),
        call(updateAncillaryServiceData)
    ])
}
