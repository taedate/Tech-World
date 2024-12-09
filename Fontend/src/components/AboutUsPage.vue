<template>
    <div class="contain row align-items-center justify-content-center text-center">
      <div class="col-md-8">
        <h1 class="text-light">TechWorld</h1>
        <p class="text-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          praesentium nulla. Vel non accusamus consectetur perspiciatis magni ut
          facilis, fugiat itaque architecto officia dicta necessitatibus
          cupiditate doloremque molestiae. Eligendi, fugiat?
        </p>
      </div>
    </div>
  
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <img src="@/assets/sell-com.png" alt="Sell Com" width="100%" />
        </div>
        <div class="col-md-6">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel metus
            id ligula fringilla sagittis. Sed vel quam id justo tincidunt luctus
            non vel velit. Sed vel purus vel lectus lobortis fringilla. Nulla
            facilisi. Sed vel ex vel neque pulvinar ullamcorper. Sed vel dolor vel
            metus ultricies rutrum. Donec vel ipsum id nunc gravida faucibus.
          </p>
        </div>
      </div>
      <StrengthComponent />
    </div>
  </template>
  
  <script>
  import StrengthComponent from "@/contents/StrengthComponent.vue";
  export default {
    name: "AboutUsPage",
    components: { StrengthComponent },
  };
  </script>
  
  <style scoped>
  .contain {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 80vh; /* ให้สูง 80% ของ viewport */
    background-image: url("@/assets/bg-about.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  </style>
  