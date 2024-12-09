<template>
  <div style="height: 100vw;" class="mt-5">
    <h3>สินค้าที่เคยซื้อแล้วทั้งหมด</h3>
  <table class="table align-middle mt-3">
    <thead>
      <tr class="bg-danger text-light  " >
        <td>เลขที่</td>
        <td>รหัสตระกร้า</td>
        <td>วันที่</td>
        <td class="text-center">จำนวน</td>
        <td class="text-end">ยอดเงิน</td>
        <td>CF</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(ct, cartId) in filteredCart"
        :key="cartId"
        style="height: 30px"
      >
        <td>{{ ct.row_number }}</td>
        <td>
          <span>
            <router-link :to="`/cartshow/${ct.cartId}`"
              style="text-decoration: none; padding: 10px;" id="hold-table"
            >
              {{ ct.cartId }}
            </router-link>
          </span>
        </td>
        <td>{{ formattedDate(ct.cartDate) }}</td>
        <td class="text-center">{{ ct.sqty }}</td>
        <td class="text-end">
          {{ ct.sprice ? ct.sprice.toLocaleString() : "0" }}
        </td>
        <td v-if="ct.cartCf == false" class="text-center">
          <i class="bi-x-lg text-danger"></i>
        </td>
        <td v-else-if="ct.cartCf == true" class="text-center">
          <i class="bi bi-check-lg text-success"></i>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "CartList",
  data() {
    return {
      memEmail: null,
      cart: [], //รับข้อมูลตะกร้า
    };
  },
  async mounted() {
    await this.chkSession(); //อ่านข้อมูลจาก Session
    await this.getCartList(); //อ่านข้อมูล Cart
  },
  methods: {
    formattedDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มต้นที่ 0, จึงต้อง +1
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async getCartList() {
      let customer = {
        id: this.memEmail,
      };
      console.log("Get CartLIST");
      await axios
        .post(`http://localhost:3000/carts/getcartbycus`, customer)
        .then((res) => {
          console.log("Cart \n" + res.data);
          this.cart = res.data;
          this.cusId = res.data[0].cusId;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async chkSession() {
      await axios
        .get(`http://localhost:3000/members/getss`)
        .then((res) => {
          console.log(res.data);
          this.memEmail = res.data.email;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    filteredCart() {
      return this.cart.filter((ct) => ct !== null && ct !== undefined);
    },
  },
};
</script>
<style>
#hold-table:hover{
  color: brown;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: box-shadow 0.3s ease-in-out;
  transition: color 0.3s ease-in-out;
  border-radius: 10px;
}
</style>
