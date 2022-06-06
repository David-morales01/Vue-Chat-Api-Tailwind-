<template>
    <div v-if="message.receiver_id == storeContact.receiver.id" class=" mb-5 bg-slate-500 rounded-md px-5 py-5 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl  w-fit ml-auto">
        {{ message.text }}
    </div>
    <div v-else class=" mb-5 bg-white rounded-md px-5 py-5  rounded-bl-3xl rounded-tr-3xl rounded-br-3xl  w-fit">
        {{ message.text }}
    </div>
</template>
<script setup>

    import { useContactsStore } from "../../stores/contacts"; 
    const storeContact = useContactsStore(); 
    const props = defineProps({
    message: {
        required: true,
        type: Object,
    },
    });

     
</script>