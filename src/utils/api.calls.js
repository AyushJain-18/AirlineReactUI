import axios from 'axios';

const serverUrl ='http://localhost:3001/';


export const getRequest =(endpoint)=>{
    return axios.get(serverUrl+endpoint)
}

export const postRequest =(endpoint, payload)=>{
    return axios.post(serverUrl+endpoint, {...payload})
}

export const deleteRequest =(endpoint, idForDeleteItem )=>{
    return axios.delete(serverUrl+endpoint/idForDeleteItem)
}
export const updateRequest =(endpoint, id, payload)=>{
    return axios.put(serverUrl+endpoint/id ,{...payload})
}