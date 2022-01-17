import axios from 'axios'
import {PRODUCT_URL} from './Url'
import { USER_URL } from './Url';
let token=localStorage.getItem('_token');
export function getposts(){
    return axios.get(`${PRODUCT_URL}posts/fetchpost`,{headers:{"Authorization":`Bearer ${token}`}
    });
}
// export function getposts(){
//     return axios.get(`${PRODUCT_URL}posts/fetchpost`);
// }

export function register(data){
    return (console.log(data),axios.post(`${PRODUCT_URL}user/register`,data));
}
export function getProfile(email){
    return (console.log(email),axios.get(`${PRODUCT_URL}user/getprofile/${email}`));
}
export function regis(data){
    return axios.post(`${PRODUCT_URL}user/regis`,data);
}
export function login(data){
    return axios.post(`${PRODUCT_URL}user/login`,data);
}
export function cartAdd(pro,email){
    return axios.get(`${PRODUCT_URL}cart/addcart/${pro.pname}/${pro.prize}/${email}`);
}
export function getOrder(email){
    return axios.get(`${PRODUCT_URL}cart/orders/${email}`);
}
export function deleteOrder(id){
    return (console.log(id),axios.delete(`${PRODUCT_URL}cart/deleteOrder/${id}`));
}
export function finalCheckOut(email){
    return (console.log(email),axios.get(`${PRODUCT_URL}cart/finalcheckout/${email}`));
}
export function getAllorder(email){
    return (console.log(email),axios.get(`${PRODUCT_URL}cart/getallorder/${email}`));
}
