<template>
  <nav
    class="navbar navbar-expand-lg sticky-top align-items-center"
    id="nav"
    style="background-color: #ffffff"
  >
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/LogoTechW.jpg"
          alt=""
          style="width: 50px; "
          class="rounded"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse align-items-center" id="navbarNav">
        <div class="navbar-nav me-auto align-items-center">
          <router-link to="/" class="nav-item" style="text-decoration: none">
            <a
              class="nav-link active h3 text-dark fw-bold mt-3 animate__zoomOutLeft"
              aria-current="page"
              href="#"
              style="color: aliceblue"
              >TechWorld
            </a>
          </router-link>
        </div>
        <div class="d-flex align-items-center justify-content-between" style="gap: 20px">
          <p v-if="memName === null" class="m-0">
            <router-link to="/Login" style="text-decoration: none">
              <i class="bi bi-person-fill text-dark fw-bold h5"></i>
            </router-link>
          </p>
          <p v-else class="m-0">
            <a href="#" @click="memlogout" style="text-decoration: none">
              <div class="nav-link text-danger">ออกจากระบบ</div>
            </a>
          </p>
          <CardInfo />
          <router-link v-if="memName != null" to="/pagemember" style="text-decoration: none">
            <p class="nav-link m-0"><i class="bi bi-person-fill text-dark fw-bold h5"></i></p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>



<script>
import { EventBus } from "@/even-bus";
import axios from "axios";
import CardInfo from "./CardInfo.vue";
axios.defaults.withCredentials = true;

export default {
  name: "MainMenu",
  components: {
    CardInfo,
  },
  data() {
    return {
      memName: null,
      backendMessage: null,
    };
  },
  mounted() {
    // เมื่อเริ่ม mount ให้อ่านค่าจาก sessionStorage
    this.memName = sessionStorage.getItem("memName");
    // เมื่อ EventBus เกิดสัญญาณ loginok ให้อ่านข้อมูลจาก sessionStorage ใหม่
    EventBus.on("loginok", () => {
      this.memName = sessionStorage.getItem("memName");
    });
  },
  // เมื่อ Unmount ให้ปิดการเชื่อมต่อกับEventBus
  beforeUnmount() {
    EventBus.off("loginok");
  },
  methods: {
    async memlogout() {
      const cf = window.confirm("ต้องการออกจากระบบ?");
      EventBus.emit("memlogout");
      if (cf) {
        try {
          const response = await axios.get(
            `http://localhost:3000/members/logout`
          );
          this.backendMessage = response.data.messagelogout;
          if (this.backendMessage == "success") {
            // ลบเฉพาะ sessionStorage ที่ระบุ
            // sessionStorage.removeItem('memName');
            // ลบ sessionStorage ทั้งหมด
            sessionStorage.clear();
            this.memName = null;
            this.$router.push("/");
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style>
#nav {
  /* box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
