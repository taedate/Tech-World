<template>
    <div v-for="(dv, dvId) in devInfo" :key="dvId" class="mt-5 d-flex justify-content-between">
      <div class="card bg-danger text-light" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">จำนวนสินค้าที่ถูกซื้อ</h5>
          <p class="card-text mt-5">
            {{ dv.total_qty }}
          </p>
        </div>
      </div>
      <div class="card bg-danger text-light" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">ยอดเงินทั้งหมด</h5>
          <p class="card-text mt-5">
            {{ dv.total_price }}
          </p>
        </div>
      </div>
      <div class="card bg-danger text-light" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">จำนวนตระกร้าที่สั่งสินค้าแล้ว</h5>
          <p class="card-text mt-5">
            {{ dv.total_cartcf }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "DevInfo",
    data() {
      return {
        devInfo: [], // แก้ไขโครงสร้าง data ให้ถูกต้อง
      };
    },
    async mounted() {
      // ลบ devInfo() และเรียกใช้ axios.get() ตรงๆ
      await axios
        .get(`http://localhost:3000/dev/info`)
        .then((res) => {
          this.devInfo = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  };
  </script>
  
  <style>
  </style>
  