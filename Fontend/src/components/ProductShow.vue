<template>
  <div v-for="(pd, pdId) in products" :key="pdId" class="mt-5">
    <div class="row">
      <div id="carouselExampleIndicators" class="carousel slide col carousel-dark" data-bs-ride="carousel"
        style="width: 400px;">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
            class="active bg-danger" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"
            class="bg-danger"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"
            class="bg-danger"></button>
        </div>
        <div class="carousel-inner rounded-2">
          <div class="carousel-item active">
            <img :src="`http://localhost:3000/img_pd/${id}/${id}-1.jpg`" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="`http://localhost:3000/img_pd/${id}/${id}-2.jpg`" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="`http://localhost:3000/img_pd/${id}/${id}-3.jpg`" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon  rounded-circle" aria-hidden="true"></span>
          <span class="visually-hidden text-danger">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon  rounded-circle" aria-hidden="true"></span>
          <span class="visually-hidden text-danger">Next</span>
        </button>
      </div>
      <div class="col-md-6 col-sm-12">
        <table class="table align-middle table-borderless">
          <tbody>
            <tr class="table">
              <td colspan="2" style="width: 100%">
                <h4 class="w-100">{{ pd.pdName }}</h4>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 100%">
                <h5 class="text-secondary h6 mt-2">
                  แบรนด์: {{ pd.brandName }} | รหัสสินค้า: {{ pd.pdId }}
                </h5>
              </td>
            </tr>
            <tr class="table">
              <td colspan="2" style="width: 100%">
                <p class="w-100 text-secondary">{{ pd.pdRemark }}</p>
              </td>
            </tr>
            <tr colspan="2" style="width: 100%">
              <td>
                <h3 class="fw-bold">฿{{ formattedPrice(pd.pdPrice) }}</h3>
              </td>
              <td>
                <p class="text-end text-secondary">จำนวนสินค้า {{ pd.total }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-danger w-100" @click="chkLogin()">
          <i class="bi bi-cart-fill fw-bold"></i> ใส่ตะกร้า&nbsp;
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Message notification</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                กรุณาล็อคอินเข้าสู่ระบบ
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <button class="btn btn-warning float-end">
          <i class="bi bi-pencil-fill lead"></i>
          แก้ไข&nbsp;&nbsp;
        </button> -->
      </div>
    </div>
  </div>

  <div>
    <div v-for="(dt, dtId) in details" :key="dtId" class="mt-5">
      <div>
        <h4><i class="bi bi-list-ul fw-bold text-danger"></i> คุณสมบัติสินค้า</h4>
        <div class="ms-5 p-3" v-if="this.pdType === 'laptop'">
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">แบรนด์:</p>
            <p class="">{{ dt.brandName }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">รุ่น:</p>
            <p>{{ dt.model }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">โปรเซสเซอร์:</p>
            <p>{{ dt.processors }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">ความเร็ว:</p>
            <p>{{ dt.pSpeed }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">กราฟิก:</p>
            <p>{{ dt.vGraphics }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">ขนาดหน้าจอ:</p>
            <p>{{ dt.ScreenSize }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">การแสดงผล:</p>
            <p>{{ dt.display }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">หน่วยความจำ:</p>
            <p>{{ dt.memory }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">ที่เก็บข้อมูล:</p>
            <p>{{ dt.storage }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">ระบบปฏิบัติการ:</p>
            <p>{{ dt.oSystem }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">กล้อง:</p>
            <p>{{ dt.camera }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">ไดรฟ์:</p>
            <p>{{ dt.opticalDrive }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">พอร์ตเชื่อมต่อ:</p>
            <p>{{ dt.ConnecPort }}</p>
          </div>
        </div>
        <div class="ms-5 p-3" v-if="this.pdType === 'computer'">
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">CPU:</p>
            <p class="">{{ dt.CPU }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Mainboard:</p>
            <p>{{ dt.mainboard }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Graphic card:</p>
            <p>{{ dt.graphicCard }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Memory:</p>
            <p>{{ dt.memory }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Storage:</p>
            <p>{{ dt.storage }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Power Supply:</p>
            <p>{{ dt.powerSupply }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Case:</p>
            <p>{{ dt.case }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Warranty:</p>
            <p>{{ dt.warranty }}</p>
          </div>
        </div>
        <div class="ms-5 p-3" v-if="this.pdType === 'vga'">
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Brands:</p>
            <p class="">{{ dt.brands }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">GPU Series:</p>
            <p>{{ dt.GPUSeries }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">GPU Model:</p>
            <p>{{ dt.GPUModel }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Memory Size:</p>
            <p>{{ dt.mSize }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Bus Standard:</p>
            <p>{{ dt.bStandard }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Memory Clock:</p>
            <p>{{ dt.mClock }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">HDMI Port:</p>
            <p>{{ dt.HDMIPort }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Display Port:</p>
            <p>{{ dt.DisplayPort }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Cooler Fan:</p>
            <p>{{ dt.CoolerFan }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Power Connector:</p>
            <p>{{ dt.PowerConnector }}</p>
          </div>
          <div class="d-flex mt-2" style="border-bottom: 1px solid #d3d3d3">
            <p class="fw-bold" style="width: 200px">Power Requirement:</p>
            <p>{{ dt.PowerRequirement }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <StrengthComponent />
</template>

<script>
import axios from "axios";
import { EventBus } from "../even-bus";
import StrengthComponent from "@/contents/StrengthComponent.vue";
import { Modal } from 'bootstrap';

axios.defaults.withCredentials = true;

export default {
  name: "ProductShow",
  data() {
    return {
      products: [],
      id: null,
      memEmail: null,
      cartId: null,
      details: [],
      pdType: ""
    };
  },
  components: { StrengthComponent },
  async mounted() {
    try {
      this.id = this.$route.params.pdId;
      console.log(this.id);

      // เรียกข้อมูลสินค้า และตั้งค่า pdType
      const productRes = await axios.get(`http://localhost:3000/products/${this.id}`);
      this.products = productRes.data;
      this.pdType = productRes.data[0].pdType;
      console.log("pd", this.products);
      console.log("Type", this.pdType);

      // ตรวจสอบว่ามี pdType ก่อนเรียก API
      if (this.pdType) {
        const detailRes = await axios.get(`http://localhost:3000/products/detail/${this.pdType}/${this.id}`);
        this.details = detailRes.data;
        console.log(this.details);
      } else {
        console.error("ไม่พบ pdType");
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    // ฟังก์ชันจัดรูปแบบราคา
    formattedPrice(price) {
      return new Intl.NumberFormat("th-TH").format(price);
    },
    async chkLogin() {
      console.log("chkLogin");
      await this.chkSession();
      if (this.memEmail == null) {
        // If the user is not logged in, show the modal
        const modal = new Modal(document.getElementById('exampleModal'));
        modal.show();
        return false;
      }
      await this.chkCart();
      if (this.cartId == null) {
        await this.addCart();
      }
      this.addCartDtl();
    },
    async chkSession() {
      await axios
        .get(`http://localhost:3000/members/getss`)
        .then((res) => {
          this.memEmail = res.data.email;
          console.log(this.memEmail);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async chkCart() {
      console.log("chkCart");
      await axios
        .get(`http://localhost:3000/carts/chkcart`)
        .then((res) => {
          console.log("Cart" + res.data);
          this.cartId = res.data.id;
        })
        .catch((err) => {
          console.error(err);
        });
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
    async addCartDtl() {
      console.log("addCartDtl");
      let cartdtl = {
        cartId: this.cartId,
        pdId: this.id,
        pdPrice: this.products[0].pdPrice,
      };
      try {
        const response = await axios.post(
          `http://localhost:3000/carts/addcartdtl`,
          cartdtl
        );
        EventBus.emit("cartdtlOK");
        this.backendMessage = response.data.messageAddCartDtl;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.img-fluid {
  max-width: 100%;
  height: auto;
}

.image-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* กำหนดให้มี 2 คอลัมน์ */
  gap: 10px;
  /* ระยะห่างระหว่างรูปภาพ */
  max-height: 20rem;
  /* กำหนดความสูงสูงสุดของการแสดงผล */
  overflow-y: auto;
  /* ทำให้มี scroll เมื่อเนื้อหามากเกินไป */
  /* box-shadow: rgba(17, 12, 46, 0.15) 12px 48px 100px 12px; */
}

.image-item {
  width: 100%;
  /* ปรับให้เต็มขนาด */
  height: auto;
  /* ปรับความสูงอัตโนมัติ */
}
</style>
