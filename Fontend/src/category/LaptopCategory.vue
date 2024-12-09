<template>
  <div>
    <div>
      <img src="../assets/cat-laptop.png" alt="" class="w-100 rounded">
    </div>
    <div class="mt-3">
      <h4>ราคาโน๊ตบุ๊คทุกรุ่น อัปเดตล่าสุดผ่อนง่าย ผ่านบัตรเครดิต สเปคแรง</h4>
      <p>
ที่ TECHWORLD นั้นเราไม่ได้มีแค่ฮาร์ดแวร์ หรือการจัดสเปคคอมพิวเตอร์ตั้งโต๊ะเท่านั้น โน๊ตบุ๊คทุกแบรนด์เราก็มีพร้อมจำหน่ายให้คุณ ดังนั้นถ้าอยากเปรียบเทียบราคาโน๊ตบุ๊ค เพื่อหาตัวที่ใช่ที่สุดไปใช้แวะมาหาเราเพื่อเลือกหาโน๊ตบุ๊คกันได้เลย รับรองว่าเราคัดเฉพาะของดีมีคุณภาพเท่านั้นมาให้คุณ

</p>
    </div>
    <div class="mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/" href="#" class="text-danger">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Laptop</li>
        </ol>
      </nav>
    </div>
    <div class="d-flex">
      <div class="" role="group" style="max-width: 200px; min-width: 200px; margin-top: 32px; margin-right: 15px;">
        <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked />
        <label class="btn btn-danger w-100 mb-3" for="option1"><i class="bi bi-laptop"></i> สินค้าทั้งหมด</label>
        <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" @change="LaptopCategory" />
        <label class="btn btn-light w-100 mb-3" for="option2">ASUS</label>
        <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" />
        <label class="btn btn-light w-100 mb-3" for="option3">ACER</label>
        <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" />
        <label class="btn btn-light w-100 mb-3" for="option3">MSI</label>
        <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" />
        <label class="btn btn-light w-100 mb-3" for="option3">LENOVO</label>
      </div>

      <div class="row g-0 p-0" id="card-sc">
        <div v-for="(pd, pdId) in products" :key="pdId" class="col-lg-3 g-3">
          <router-link :to="{ name: 'ProductShow', params: { pdId: pd.pdId } }"
            style="text-decoration: none; color: #000">
            <div class="card mt-3" style="
                width: 100%;
                background-color: #ffff;
                border: none;
                box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
              ">
              <img :src="`http://localhost:3000/img_pd/${pd.pdId}/${pd.pdId}-1.jpg`"
                class="card-img-top img-fluid rounded" alt="" />
              <div class="card-body">
                <h5 class="card-title h6" id="fs-name">{{ pd.pdName }}</h5>
                <p class="fs">{{ pd.pdRemark }}</p>
                <p class="card-text h5 mt-4 fw-bold">
                  <!-- {{ pd.thebrand ? pd.thebrand.brandName : "No Brand" }} - Price -->
                  ฿{{ formattedPrice(pd.pdPrice) }}.00
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <StrengthComponent />
  </div>

</template>

<script>


import axios from 'axios';
import StrengthComponent from '@/contents/StrengthComponent.vue';
export default {
  name: "LaptopCategory",
  components: {
    StrengthComponent
  },
  data() {
    return {
      products: [],
      pdType: ""
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/type/laptop")
      .then((res) => {
        this.products = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    // ฟังก์ชันจัดรูปแบบราคา
    formattedPrice(price) {
      return new Intl.NumberFormat("th-TH").format(price);
    },
  }
}
</script>

<style></style>