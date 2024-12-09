<template>
    <div class="row align-items-center text-center mt-5 " >
        <div class="col" id="overlay" >
            <img :src="Advice1" alt="" class="w-100" style="border-radius: 10px;">
        </div>
        <div class="col" id="overlay" >
            <img :src="Advice2" alt="" class="w-100" style="border-radius: 10px;">
        </div>
        <div class="col" id="overlay" >
            <img :src="Advice3" alt="" class="w-100" style="border-radius: 10px;">
        </div>
    </div>
</template>

<script>
import Advice1 from '../assets/Advice1.jpg';
import Advice2 from '../assets/Advice2.jpg';
import Advice3 from '../assets/Advice3.jpeg';
export default {
    name:'AdviceContent',
    data() {
        return {
            Advice1,
            Advice2,
            Advice3
        }
    }
}
</script>

<style>
#overlay :hover{
    opacity: 0.4;
}

</style>