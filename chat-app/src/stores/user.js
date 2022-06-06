import ky from "ky";
import { defineStore } from "pinia";
import router from '../router'  

import Swal from 'sweetalert2'
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {},
      status : false,
    };
  },

  actions: {
    async validateUser() {
      const accessToken = localStorage.getItem('access_token')

    const resp = await ky.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .json()
      .then((resp) => {
        this.user =resp; 
        this.status =true;  
         
      })
      .catch((err) => {
        localStorage.removeItem('access_token')  
        this.status =false; 
        console.log('error : ')
        console.log(err)
        router.push("login");  
      })
      .finally(() => {
         
      })
      
    },
    existSesion(){
      
      const accessToken = localStorage.getItem('access_token') 
      if(accessToken){
        
        router.push("/");
         
      }
    },
    async login(values) {
      const resp = await ky
          .post("http://localhost:8000/api/login", {
            json: { 
                email: values.email,
                password: values.password,
            }, 
          })
          .json()
          .then((resp) => {  
            localStorage.setItem('access_token', resp.access_token) 
            router.push("/");
          })
          .catch((err) => { 
            Swal.fire({
              title: 'Error!',
              text: 'Invalid email or password, please enter another',
              icon: 'error',
              cancelButtonText: 'Ok'
            })
          })
          .finally(() => {  
            
          }) 
    },
    async register(values) { 
        const resp = await ky
          .post("http://localhost:8000/api/register", {
            json: {
                name: values.name,
                email: values.email,
                password: values.password,
            }, 
          })
          .json()
          .then((resp) => {
            // todo piola :3 
            localStorage.setItem('access_token', resp.access_token)  
            router.push("/");
          })
          .catch((err) => {
            //localStorage.removeItem('access_token')
            //error
            console.log('error perrod') 
            Swal.fire({
              title: 'Error!',
              text: 'Invalid email, please enter another',
              icon: 'error',
              cancelButtonText: 'Ok'
            })
          })
          .finally(() => {
            //todo termino
          }) 
      },
      Logout(){
        
        this.user =[];  
        
        this.status =false; 
        
        localStorage.removeItem('access_token')
        router.push("login");
        console.log("close session ")
      }
  },

  getters: {
    userAuthenticated: (state) => state.user,
  },
});
