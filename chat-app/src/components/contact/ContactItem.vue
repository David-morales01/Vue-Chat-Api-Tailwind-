<template>
<div  @click="contactClick(contact)" class="flex items-center mx-4 p-4 rounded-lg my-1 hover:bg-blue-700 hover:text-white cursor-pointer">
    <img class="inline-block h-10 w-10 rounded-full " src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <span class="mx-4 ">{{ contact.name  }}</span>
</div>
</template>

<script setup>
import {useContactsStore} from "../../stores/contacts";
import { useMessagesStore } from "../../stores/messages"; 
const storeMessage = useMessagesStore();
const contactStore = useContactsStore();

function contactClick(contact){
    contactStore.$patch({toogle:true}) ;
    contactStore.$patch({receiver:contact}); 


    
    
    storeMessage.messages=[];
    storeMessage.listMessages(contact.id) 
}

const props = defineProps({
  contact: {
    required: true,
    type: Object,
  },
});
</script>