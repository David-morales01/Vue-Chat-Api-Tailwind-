<template>

    <template v-if="storeContact.status">
        
    <div class="h-full w-1/2 rounded-l-lg bg-white"> 
        <div class="w-100 h-20 p-4 flex justify-between my-4" >
            <div class="flex items-center">
                <img class="mx-4 inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                <div class="flex flex-col">
                    <span>Good Morning </span>
                     <span>{{ store.user.name }}</span> 
                </div>
            </div>
            <button @click="Logout">o</button>
        </div>
        <ContactItem :key="contact.id" :contact="contact" v-for="contact in storeContact.contacts" />  
    </div>
    </template> 
</template>
<script setup>
    import { onBeforeMount } from "vue";
    import ContactItem from './ContactItem.vue';
    import { useUserStore } from "../../stores/user"; 
    import { useContactsStore } from "../../stores/contacts"; 
    import router from '../../router' ;
    
    import Loading from '../Loading.vue';
    
    const store = useUserStore();
    const storeContact = useContactsStore();
    storeContact.listContacts();
    
    function Logout() {
        storeContact.cleanContacts()
        store.Logout()
    } 


</script>