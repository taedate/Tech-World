<template>
  <div>
    <!-- แสดง Modal เมื่อการสั่งซื้อสำเร็จ -->
    <div v-if="backendMessage == 'success'" class="modal-overlay">
      <div class="modal-content bg-light">
        <h3 class="text-dark">-ทางเราได้รับออเดอร์ของคุณแล้ว-</h3>
        <h1 class="mt-3"><i class="bi bi-check-lg text-danger"></i></h1>
        <h3 class="text-dark">ขอบคุณที่ซื้อสินค้ากับเรา</h3>
        <p class="text-secondary">เราได้ส่งรายละเอียดคำสั่งซื้อไปยัง email ของคุณแล้ว</p>
        <router-link to="/" @click="reCart" class="btn btn-danger">กลับหน้าหลัก</router-link>
      </div>
    </div>

    <!-- แสดง Modal เมื่อการสั่งซื้อไม่สำเร็จ -->
    <div v-if="backendMessage === 'fail'" class="alert alert-danger mt-3">
      สั่งซื้อไม่สำเร็จ
    </div>
    <div class="container mt-5">
      <div class="row">
        <!-- Section สำหรับแสดงสินค้าในตะกร้า (ฝั่งซ้าย) -->
        <div class="col-md-6 overflow-auto" style="max-height: 80vh">
          <div class="card mb-4" v-for="(pd, pdId) in cartDtl" :key="pdId">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img :src="`http://localhost:3000/img_pd/${pd.pdId}/${pd.pdId}-1.jpg`" class="img-fluid rounded"
                  alt="Product Image" style="max-width: 150px" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ pd.pdName }}</h5>
                  <p class="card-text">ราคา: {{ formattedPrice(pd.price) }} บาท</p>
                  <p class="card-text">จำนวน: {{ pd.qty }}</p>
                  <p class="card-text text-end h5">ยอดรวม: {{ formattedPrice(pd.price * pd.qty) }} บาท</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section ฟอร์มการจัดส่ง (ฝั่งขวา) -->
        <div class="col-md-6">
          <div class="card p-4">
            <h4>เพิ่มที่อยู่จัดส่ง</h4>
            <form @submit.prevent="orderItems">
              <div class="row">
                <div class="mb-3 col">
                  <label class="form-label">ชื่อ-นามสกุล</label>
                  <input type="text" class="form-control" v-model="customerName" required />
                </div>
                <div class="mb-3 col">
                  <label class="form-label">เบอร์โทรศัพท์</label>
                  <input type="tel" class="form-control" v-model="phone" required />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">ที่อยู่</label>
                <textarea class="form-control" v-model="address" rows="3" required></textarea>
              </div>
              <div class="row">
                <div class="mb-3 col">
                  <label class="form-label">ตำบล</label>
                  <input class="form-control" v-model="subDistrict" rows="3" required />
                </div>
                <div class="mb-3 col">
                  <label class="form-label">อำเภอ</label>
                  <input class="form-control" v-model="district" rows="3" required />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">จังหวัด</label>
                <input type="text" class="form-control" v-model="province" required />
              </div>
              <div class="mb-3">
                <label class="form-label">รหัสไปรษณีย์</label>
                <input type="text" class="form-control" v-model="postalCode" required />
              </div>
              <h4>เลือกวิธีชำระเงิน</h4>
              <BankingComponent />
              <div class="mb-3" style="width: 280px;">
                <input class="form-control" type="file" id="formFile" @change="onFileChange" required placeholder="อัพ"/>
              </div>
              <button type="submit" class="btn btn-danger w-100">สั่งซื้อสินค้า</button>
            </form>

            <!-- แสดงราคารวมใต้ฟอร์ม -->
            <div class="mt-4 row">
              <h5 class="text-center col">ยอดรวมสุทธิ</h5>
              <p class="text-center h4 text-success col">{{ formattedPrice(totalPrice) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BankingComponent from "@/contents/BankingComponent.vue";

export default {
  name: "theOrder",
  components: {
    BankingComponent
  },
  data() {
    return {
      cart: [],
      cartDtl: [],
      cartId: null,
      memEmail: null,
      customerName: "",
      district: "",
      subDistrict: "",
      phone: "",
      address: "",
      province: "",
      postalCode: "",
      backendMessage: "",
    };
  },
  async mounted() {
    await this.chkSession();
    this.cartId = this.$route.params.cartId;
    await this.getCartDtl();
    await this.getCart(); // ดึงข้อมูลราคารวม
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.sprice, 0);
    },
  },
  methods: {
    async getCartDtl() {
      try {
        const res = await axios.get(
          `http://localhost:3000/carts/getcartdtl/${this.cartId}`
        );
        this.cartDtl = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async chkSession() {
      try {
        const res = await axios.get(`http://localhost:3000/members/getss`);
        this.memEmail = res.data.email;
      } catch (err) {
        console.error(err);
      }
    },
    async getCart() {
      try {
        const res = await axios.get(
          `http://localhost:3000/carts/getcart/${this.cartId}`
        );
        this.cart = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    formattedPrice(price) {
      return price.toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
        minimumFractionDigits: 2,
      });
    },
    async orderItems() {
      if (this.cartDtl.length === 0) {
        alert("ไม่มีสินค้าในตะกร้า");
        return;
      }

      const orderId = uuidv4();
      const totalOrderPrice = this.totalPrice; // ใช้ computed property

      const orderData = {
        cartDtl: this.cartDtl,
        orderId,
        memEmail: this.memEmail,
        customerName: this.customerName,
        phone: this.phone,
        address: this.address,
        province: this.province,
        postalCode: this.postalCode,
        cartId: this.cartId,
        district: this.district,
        subDistrict: this.subDistrict,
        totalPrice: totalOrderPrice, // ส่งไป backend
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/orders",
          orderData
        );
        this.backendMessage = response.data.messageOrders;
        await this.updateInventory();
        await this.updateCartCf();
        await this.uploadFilePayment(orderId);
        await this.sendLineMessage(orderData);
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("Failed to submit order.");
      }
    },
    async updateCartCf() {
      try {
        await axios.post(`http://localhost:3000/orders/updateCart`, {
          id: this.cartId,
        });
      } catch (err) {
        console.error(err);
      }
    },
    async updateInventory() {
      try {
        console.log("UpdateInventory")
        for (const item of this.cartDtl) {
          await axios.post(`http://localhost:3000/orders/updateInventory`, {
            productId: item.pdId, // ใช้รหัสสินค้า
            quantity: item.qty, // ใช้จำนวนที่สั่งซื้อ
          });
        }
      } catch (err) {
        console.error("Error updating inventory:", err);
      }
    },
    async sendLineMessage(orderData) {
      const totalPrice = this.totalOrderPrice
      try {
        await axios.post(`http://localhost:3000/lineNotification`, orderData, totalPrice
        );
      } catch (err) {
        console.error(err);
      }
    },
    async addCart() {
      console.log("addCard");
      let customer = {
        cusId: this.memEmail,
      };
      try {
        const response = await axios.post(
          `http://localhost:3000/carts/addcart`,
          customer
        );
        this.backendMessage = response.data.messageAddCart;
        this.cartId = response.data.messageAddCart;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async reCart() {
      await this.addCart();
    },
    async uploadFilePayment(orderId) {
      if (!this.file) {
        this.fileMessage = "เลือก File ก่อน";
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file); // ใส่ไฟล์ลงใน FormData
      formData.append("orderId", orderId); // แนบ orderId
      formData.append("memEmail", this.memEmail); // แนบ email

      try {
        const response = await axios.post(
          "http://localhost:3000/members/uploadPayment",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        this.fileMessage = response.data.message;
      } catch (err) {
        console.error("Upload failed:", err);
        this.fileMessage = "fail";
      }
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file; // เก็บไฟล์ไว้ใน data
      }
    }


  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  /* ป้องกันไม่ให้ถูกปกปิดด้วยองค์ประกอบอื่น */
}

.modal-content {
  background-color: #333;
  z-index: 1000;
  color: white;
  width: 530px;
  height: 400px;
  padding: 60px;
  text-align: center;
  border-radius: 10px;
}
</style>
