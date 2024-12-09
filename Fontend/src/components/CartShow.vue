<template>
  <!-- Master -->
  <div v-if="memEmail == cusId" style="min-height: 100vh; margin-top: 30px;">
    <!-- Detail -->
    <div class="row">

      <table class="table align-middle mt-3 col">
        <thead class="">
          <tr class="bg-danger text-light  " style="border-radius: 100px;">
            <td></td>
            <!-- <td>สินค้า</td> -->
            <td>รายการสินค้า</td>
            <td class="text-end">ราคา</td>
            <td class="text-center">จำนวน</td>
            <td class="text-center">ยอดรวม</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ctd, pdId) in cartDtl" :key="pdId">
            <!-- <td class="">{{ ctd.row_number }}</td> -->
            <td class=""><img :src="`http://localhost:3000/img_pd/${ctd.pdId}/${ctd.pdId}-1.jpg`"
                class="img-fluid rounded" alt="" width="100" /></td>
            <td>{{ ctd.pdName }}</td>
            <td class="text-end">{{ formattedPrice(ctd.price) }}</td>
            <td class="text-center">{{ ctd.qty }}</td>
            <td class="text-end">{{ formattedPrice(ctd.price * ctd.qty) }}</td>
            <td class="text-center">
              <button class="btn bg-light" @click="deleteCartDlt(ctd.pdId)">
                <i class="bi bi-trash-fill fw-bold"></i>
              </button>
            </td>
          </tr>

        </tbody>
      </table>
      <div v-for="(ctd, ctId) in cart" :key="ctId" class="col-6 col-md-3">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <p class="card-text col">ยอดรวม</p>
              <p class="col text-end">฿{{ formattedPrice(ctd.sprice) }}</p>
            </div>
            <div class="row">
              <p class="card-text col">ส่วนลด</p>
              <p class="col text-end">- ฿0</p>
            </div>
            <div class="row">
              <p class="card-text col fw-bold">ยอดรวมสุทธิ</p>
              <p class="col text-end fw-bold">฿{{ formattedPrice(ctd.sprice) }}</p>
            </div>
            <div v-for="(ct, cartId) in cart" :key="cartId" class="mt-5">
            <a v-if="ct.cartCf == false" class="btn btn-danger fw-bold w-100 p-3"
              @click="$router.push(`/order/${ct.cartId}`)">
              ดำเนินการสั่งซื้อ
            </a>
            <div v-else class="fw-bold w-100 text-center text-danger">
              <h5>สินค้าได้ทำรายการสั่งซื้อแล้ว</h5>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </div>
    <StrengthComponent/>



  </div>
  <!--v-if-->
  <div v-else style="height: 44vh;">
    <div class="card">
      <div class="card-body">
        <p class="text-center">คุณยังไม่มีสินค้าในตระกร้า</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StrengthComponent from "@/contents/StrengthComponent.vue";
axios.defaults.withCredentials = true;

export default {
  name: "CartShow",
  components: {
    StrengthComponent
  },
  data() {
    return {
      cart: [], // รับข้อมูล Master
      cartDtl: [], // รับข้อมูล Detail
      cartId: null,
      memEmail: null,
      cusId: null,
    };
  },
  async mounted() {
    // ตรวจสอบว่าเป็นเจ้าของตะกร้าหรือไม่
    await this.chkSession();
    this.cartId = this.$route.params.cartId;
    // อ่านข้อมูล Master + อ่านข้อมูล Detail
    await this.getCart();
    await this.getCartDtl();
  },
  methods: {
    // แปลงรูปแบบวันที่
    formattedDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มต้นที่ 0, จึงต้อง +1
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // ฟังก์ชันจัดรูปแบบราคา
    formattedPrice(price) {
      return new Intl.NumberFormat('th-TH').format(price);
    },
    // Master
    async getCart() {
      console.log("Get Cart");
      await axios
        .get(`http://localhost:3000/carts/getcart/${this.cartId}`)
        .then((res) => {
          console.log("Cart \n", res.data);
          this.cart = res.data;
          if (res.data.length > 0) {
            this.cusId = res.data[0].cusId;
          } else {
            this.cusId = null;
          }
          console.log("Updated cusId:", this.cusId);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // Detail
    async getCartDtl() {
      console.log("Get CartCartDtl");
      await axios
        .get(`http://localhost:3000/carts/getcartdtl/${this.cartId}`)
        .then((res) => {
          console.log("CartDtl \n", res.data);
          this.cartDtl = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // ตรวจสอบ Session
    async chkSession() {
      await axios
        .get(`http://localhost:3000/members/getss`)
        .then((res) => {
          console.log("Session data:", res.data);
          this.memEmail = res.data.email;
          console.log("Updated memEmail:", this.memEmail);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // ลบตะกร้าสินค้า
    async deleteCart(cartId) {
      if (confirm("ยืนยันลบตะกร้า")) {
        try {
          await axios.delete(`http://localhost:3000/carts/deletecart/${cartId}`);
          alert("ลบตะกร้าสำเร็จ");

          // อัปเดตข้อมูลตะกร้าใหม่
          await this.getCart();
          await this.getCartDtl();
          await this.chkSession(); // เรียกตรวจสอบ session ใหม่เพื่อให้ memEmail ทันสมัย


          this.$router.push("/CartList");
        } catch (err) {
          console.error(err);
          alert("เกิดข้อผิดพลาดในการลบตะกร้า");
        }
      }
    },
    // ลบรายการสินค้าจากตะกร้า
    async deleteCartDlt(pdId) {
      if (confirm("ยืนยันลบสินค้า")) {
        try {
          await axios.delete(`http://localhost:3000/carts/deletecartDlt/${this.cartId}/${pdId}`);
          alert("ลบสินค้าสำเร็จ");

          // อัปเดตข้อมูลตะกร้าใหม่
          await this.getCart();
          await this.getCartDtl();

        } catch (err) {
          console.error(err);
          alert("เกิดข้อผิดพลาดในการลบสินค้า");
        }
      }
    },
  },
};
</script>

<style>
#bg-card-dlt {
  background-color: #ffff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
</style>
