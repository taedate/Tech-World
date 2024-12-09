<template>
    <div class="d-flex justify-content-between mt-5">
      <img :src="brandAcer" alt="Acer" height="40px">
      <img :src="brandAsus" alt="Asus" height="40px">
      <img :src="brandLenovo" alt="Lenovo" height="40px">
      <img :src="brandLogitech" alt="Logitech" height="40px">
      <img :src="brandMsi" alt="MSI" height="40px">
      <img :src="brandRazer" alt="Razer" height="40px">
    </div>
  </template>
  
  <script>
  import brandAcer from '../assets/brand-acer.png'
  import brandAsus from '../assets/brand-ausu.png'
  import brandLenovo from '../assets/brand-lenovo.png'
  import brandLogitech from '../assets/brand-logitect.png'
  import brandMsi from '../assets/brand-msi.png'
  import brandRazer from '../assets/brand-razer.png'
  
  export default {
      name: 'BrandImage',
      data(){
          return {
              brandAcer,
              brandAsus,
              brandLenovo,
              brandLogitech,
              brandMsi,
              brandRazer
          }
      }
  }
  </script>
  
  <style>
  
  </style>