
<script setup>
    import { useUserStore } from "../stores/user.js";  
    import { onBeforeMount, onMounted } from "vue";
    import ListContact from '../components/contact/ListContacts.vue'
    import MessageList from '../components/message/MessageList.vue'
    import Loading from '../components/Loading.vue'
    import { useContactsStore } from "../stores/contacts"; 
    const storeContact = useContactsStore();
    
    const store = useUserStore();
       
    store.validateUser();     
</script>
<template>

    <div class=" absolute h-full w-full  bg-slate-800 flex px-10 py-10 justify-center items-center"> 
        
        <template v-if="storeContact.status==false">
            <Loading />
        </template>
        <template v-if="store.status ">
            <ListContact />
            <MessageList />
        </template>
        
    </div>
</template>