import ky from "ky";
import { defineStore } from "pinia"; 
export const useContactsStore = defineStore("contacts", {
  state: () => {
    return {
      contacts: [],
      status :false ,
      toogle:false,
      receiver:{},
    };
  },

  actions: {
    async listContacts() { 
      const accessToken = localStorage.getItem('access_token')
      const resp = await ky
        .get("http://localhost:8000/api/contacts", {
          headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }).json() .then((resp) => {
      
    this.contacts =resp.data; 
    this.status = true ;
    })
    .catch((err) => { 
      console.log('error al cargar los usuarios') 
      
      //router.push("/");
    })
    }, 
    cleanContacts(){
      this.contacts =[] 
      this.status = false ;

    }
  },

  getters: {
    getContacts: (state) => state.contacts,
  },
});
