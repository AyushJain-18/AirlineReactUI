import axios from 'axios';

//const serverUrl ='http://localhost:3000';
const serverUrl =  'https://pear-lovely-agouti.cyclic.app/';


export const getRequest =(endpoint)=>{
  return axios.get(serverUrl+endpoint)
}

export const postRequest =(endpoint, payload)=>{
  return axios.post(serverUrl+endpoint, {...payload})
}

export const deleteRequest =(endpoint, idForDeleteItem )=>{
  return axios.delete(serverUrl+endpoint+'/'+idForDeleteItem)
}
export const updateRequest =(endpoint, payload)=>{
  // console.log(serverUrl+endpoint);
  return axios.put(serverUrl+endpoint,{...payload})
}