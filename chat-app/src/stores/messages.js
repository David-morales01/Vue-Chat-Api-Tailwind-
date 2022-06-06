import ky from "ky";
import { defineStore } from "pinia"; 
 
export const useMessagesStore = defineStore("messages", {
  state: () => {
    return {
      messages: [],
    };
  },

  actions: {
    async listMessages(id) {
      
      const access_token = localStorage.getItem('access_token') 
      const resp = await ky.get(`http://localhost:8000/api/messages/${id}`, {
            headers: {
              Authorization: `Bearer ${access_token}`
            },

          })
          .json()
          .then((resp) => {   
            this.messages = resp.data;
          })
          .catch((err) => { 
           console.log(err)
          })
          .finally(() => {  
            
          }) 
    }, 

    
    async saveMessage(text,sender,receiver) {
      const resp = await ky
          .post("http://localhost:8000/api/messages", {
            json: { 
                sender_id: sender,
                receiver_id: receiver,
                text: text,
            }, 
          })
          .json()
          .then((resp) => {    
            //this.messages.push(resp.data);
          })
          .catch((err) => { 
           console.log("error")
          })
          .finally(() => {  
            
          }) 
    },
  },

  
});
