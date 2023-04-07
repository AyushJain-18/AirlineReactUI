/* eslint-disable no-undef */
import {shallow} from 'enzyme';
import React from 'react';
import PassengerGerenralInfoForAdmin from './passenger-info-admin.component'
import ConfigureMockStore from 'redux-mock-store';
import createSagaMiddelware from 'redux-saga';
import {Provider} from  'react-redux';

describe('PASSENGER INFO COMPONENT TESTING', ()=>{
  const sagaMiddelware = createSagaMiddelware();
  const createMockStore = ConfigureMockStore([sagaMiddelware]);
  const store = createMockStore();
  const componentWrapper =  shallow(<Provider store={store}><PassengerGerenralInfoForAdmin/></Provider>)
  it("should create snapshot", ()=>{
    expect(componentWrapper).toMatchSnapshot();
  })
})
