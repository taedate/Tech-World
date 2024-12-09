<template>
  <div >
    <div id="carouselExampleAutoplaying" class="carousel slide mt-4" data-bs-ride="carousel">
      <div class="carousel-inner" style="border-radius: 15px;">
        <div class="carousel-item active">
          <img :src="slide1" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img :src="slide2" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img :src="slide3" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div>
    <AdviceContent />
    <BrandImage />
  </div>
  <h4 class="mt-5 fw-bold">
    <i class="bi bi-grid-fill text-danger"></i> หมวดหมู่สินค้า
  </h4>
  <div class="d-flex justify-content-between mt-5" role="group">
    <router-link type="button" id="btn-cat" class="btn btn-light" to="/category/laptop"><i class="bi bi-laptop-fill"></i>
      โน๊ตบุ๊ค</router-link>
    <router-link type="button" id="btn-cat" class="btn btn-light" to="/category/computer"><i class="bi bi-pc"></i>
      คอมพิวเตอร์</router-link>
    <router-link type="button" id="btn-cat" class="btn btn-light" to="/category/vga">
      <i class="bi bi-gpu-card fw-bold"></i> การ์ดจอ</router-link>
    <router-link type="button" id="btn-cat" class="btn btn-light" to="#"><i class="bi bi-memory"></i>
      แรม</router-link>
    <router-link type="button" id="btn-cat" class="btn btn-light" to="#"><i class="bi bi-keyboard-fill"></i>
      คีย์บอร์ด</router-link>
    <router-link type="button" id="btn-cat" class="btn btn-light" to="#"><i class="bi bi-display-fill"></i> จอคอมพิวเตอร์</router-link>
    <router-link type="button" id="btn-cat" class="btn btn-light" to="#"><i class="bi bi-fan"></i>
      ระบายความร้อน</router-link>
  </div>
  <div class="">
    <div class="d-flex mt-5">
      <div class="h4 text-center me-auto fw-bold">
        <i class="bi bi-kanban-fill text-danger"></i> สินค้าทั้งหมด
      </div>
      <div class="me-3">
        <input type="text" v-model="stext" class="form-control" placeholder="ค้นหาสินค้าที่ต้องการที่นี่..." />
      </div>
      <div class="">
        <button class="btn btn-danger" @click="searchProduct()">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
    <div class="d-flex">
      <div class="" role="group" style="max-width: 200px; min-width: 200px; margin-top: 32px; margin-right: 15px;">
        <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked
          @change="Allproducts" />
        <label class="btn btn-danger w-100 mb-3" for="option1"><i class="bi bi-laptop"></i> สินค้าทั้งหมด</label>
        <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" @change="LaptopCategory" />
        <label class="btn btn-light w-100 mb-3" for="option2">โน๊ตบุ๊ค</label>
        <input type="radio" class="btn-check " name="options" id="option3" autocomplete="off"
          @change="ComputerCategory" />
        <label class="btn btn-light w-100 mb-3" for="option3">คอมพิวเตอร์</label>
        <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off"
          @change="VGACategory" />
        <label class="btn btn-light w-100" for="option4">การ์ดจอ</label>
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
    <YoutubeContent />
    <div style="height: 300px; border-radius: 20px;" class="mt-5">
      <video src="../assets/videoplayback.mp4" autoplay muted width="100%" height="100%" style="object-fit: cover; border-radius: 20px;"></video>
    </div>
    <StrengthComponent/>
  </div>

</template>

<script>
import axios from "axios";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/imgs-2.png";
import slide3 from "../assets/imgs-3.png";
import BrandImage from "../contents/BrandImage.vue";
import AdviceContent from "@/contents/AdviceContent.vue";
import StrengthComponent from "@/contents/StrengthComponent.vue";
import YoutubeContent from "@/contents/YoutubeContent.vue";


export default {
  components: { BrandImage, AdviceContent, StrengthComponent, YoutubeContent },
  name: "PageProduct",
  data() {
    return {
      products: [],
      stext: "",
      slide1,
      slide2,
      slide3
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/ten")
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
    searchProduct() {
      axios
        .get(`http://localhost:3000/products/search/${this.stext}`)
        .then((res) => {
          console.log(this.stext);
          this.products = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      if (this.stext === "") {
        axios
          .get("http://localhost:3000/products/ten")
          .then((res) => {
            this.products = res.data;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    async LaptopCategory() {
      this.products = []
      await axios
        .get(`http://localhost:3000/products/type/laptop`)
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async ComputerCategory() {
      this.products = []
      await axios
        .get(`http://localhost:3000/products/type/computer`)
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async VGACategory() {
      this.products = []
      await axios
        .get(`http://localhost:3000/products/type/vga`)
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async Allproducts() {
      this.products = []
      await axios
        .get(`http://localhost:3000/products/ten`)
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    }

  },
};
</script>

<style>
#card-sc .card:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease;
  overflow: hidden;
}

#btn-cat {
  padding: 10px;
  width: 10rem;
  background-color: #ffff;
  border: none;
  box-shadow: rgba(17, 12, 46, 0.15) 12px 48px 100px 12px;
}

#btn-cat:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}

.fs {
  font-size: smaller;
  width: 100%;
  height: 40px;
  overflow: hidden;
}

#fs-name {
  width: 100%;
  height: 60px;
  overflow: hidden;
}
</style>
