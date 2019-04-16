import axios from 'axios'










export const setStorage = (username)=>{
  return window.localStorage.setItem('username',username)
}
export const getStorage = ()=>{
  return window.localStorage.getItem('username')
}
export const removeStorage = ()=>{
  return window.localStorage.removeItem('username')
}