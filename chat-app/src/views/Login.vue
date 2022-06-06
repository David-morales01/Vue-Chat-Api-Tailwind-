<template>
    <div class="h-full w-full flex justify-center absolute items-center bg-slate-800">  
        <div class=" w-1/2 h-auto m-auto bg-white  px-5 py-4 rounded-lg">
            <FormKit :actions="false" type="form" v-model="values"  @submit="handleSubmit"  
            :config="{ 
            classes: {
                outer: 'mb-5',
                label: 'block mb-1 font-bold text-sm',
                input: 'inline-block w-full py-4 px-6 mb-6 rounded-md border border-gray',
            // help: 'text-xs text-gray-500',
            // message: 'text-red-500 text-xs',
      },
    }">
            <h1 class="text-5xl text-center my-2 font-mono">Login</h1>
            <FormKit name="email" type="email" autocomplete="off"  label="Email"/>
            <FormKit name="password" type="password" autocomplete="off" label="Password"/>
            
            <button   class="inline-block w-full py-4 px-6  text-center rounded-full text-lg leading-6 text-white  bg-sky-600 hover:bg-sky-800 border-3 border-sky-800 mb-2 mb-6 rounded-full">Login</button>
            <router-link to="/register" class="inline-block w-full py-4 px-6  text-center rounded-full text-lg leading-6 text-white text-black border-2 border-red-800 hover:bg-red-800 border-3 hover:text-white border-red-800 mb-2 mb-6 rounded-full" >Register</router-link>

        </FormKit>
        </div>
    </div>
</template>
<script setup>
    import {ref } from "vue"; 
    import { useUserStore } from "../stores/user.js"; 
    import { onBeforeMount } from "vue";
    
    const userStore = useUserStore();

    onBeforeMount(()=>{
         userStore.existSesion();
    })
    const values = ref({});  
    

    function handleSubmit() {
        userStore.login({
            ...values.value
        }); 
    }
    /* <FormKit   type="submit" label="Login"  
            :classes="{
                input :' text-center text-lg leading-6 text-white rounded-full  bg-sky-600 hover:bg-sky-800 border-3 border-sky-800  '
            }" /> */
</script>

 