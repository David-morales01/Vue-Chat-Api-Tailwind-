<template>
    <template v-if="storeContact.status">
        <div class="h-full  flex flex-col w-1/2 rounded-r-lg overflow-hidden relative"> 
            <div v-if="storeContact.toogle" class="w-full  h-full absolute">
                <div class="bg-white w-100 h-[20%] p-4 flex relative">
                    <img class="inline-block h-10 w-10 rounded-full " src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                    {{storeContact.receiver.name}}
                </div>
                <div class="bg-slate-300 w-100 relative h-[60%]  p-4 overflow-y-auto overflow-y-auto"  ref="scroll">   
                    <MessageItem :key="message.id" :message="message" v-for="message in storeMessage.messages" />
                </div>
                <div class=" w-full h-[20%]   relative"> 
                    <FormKit :actions="false" type="form" v-model="values"  @submit="handleSubmit"  
                        :config="{ 
                        classes: { input: ' py-2 absolute w-full    border border-none focus:outline-none  focus:border-none'},}">
                        <div class="flex gap-10 bg-white absolute h-full w-full  items-center w-full px-4"> 
                        
                            <button class="bg-slate-300 px-2 py-2 rounded-full " ><IconEmoji/> </button> 
                            <div class="w-full relative "><FormKit name="text" type="text" autocomplete="off" placeholder="Write your text"  /></div>
                            <button class="bg-cyan-500 px-3 py-3 rounded-full flex justify-center " ><IconSend/> </button> 
                        </div>
                        
                    </FormKit> 

                </div>
            </div>
            <div v-else>
                <div class="bg-white flex justify-center absolute items-center  w-full h-full p-4">
                    GatraChat
                </div>
            </div>
        </div>
    </template>
</template> 
<script setup>

    import {ref,watchEffect,onUpdated } from "vue"; 
    import { useMessagesStore } from "../../stores/messages";
    import { useContactsStore } from "../../stores/contacts";
    import { useUserStore } from "../../stores/user";
    import MessageItem from './MessageItem.vue';
    import Echo from "laravel-echo";
    import Pusher from "pusher-js";
    import IconEmoji from '../icons/Emoji.vue';
    import IconSend from '../icons/Send.vue';
    const values = ref({});  
    const storeContact = useContactsStore();
    const storeMessage = useMessagesStore();
    const store = useUserStore();
        
    const scroll = ref(null);
      
    //window.Pusher= require('pusher-js');
    window.Echo = new Echo({
    broadcaster : "pusher",
    key : "425cb464445a991f099e", 
    cluster : "us2",
    forceTLS:true
    });


onUpdated(() => {
  
    window.requestAnimationFrame(() => {
      scroll.value.scroll({
        top: scroll.value.scrollHeight,
        behavior: "smooth",
      });
    }); 
    
});
watchEffect(() => {
  const eventName = `.chatsent-${[store.user.id, storeContact.receiver.id]
    .sort()
    .join("-")}`;
  const channel = window.Echo.channel("chat");
  channel.listen(eventName, (e) => {
    storeMessage.messages.push(e.message);
  });
  return () => {
    channel.stopListening("eventName");
    window.Echo.leaveChannel("chat");
  };

});
    function handleSubmit() { 
        storeMessage.saveMessage(values.value.text,store.user.id,storeContact.receiver.id); 
        values.value.text=""
    }
    
</script>