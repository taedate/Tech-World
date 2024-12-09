<template>
  <div class="container d-flex justify-content-center" style="margin-top: 7rem; margin-bottom: 7rem;">
    <div class="card mb-3" style="max-width: 1200px" id="bg-card-login">
      <div class="row g-0 align-items-center">
        <div class="col-md-4">
          <img src="../assets/d91ad79a3f6b1075fc48d63fd5f71afb.gif" class="rounded" alt="..."
            style="width: 100%; height: 500px;" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h1 class="text-center fw-bold">Login to Your Account</h1>
            <form @submit.prevent="handleSubmit()" class="d-flex flex-column align-items-center">
              <div class="col-sm-12 col-md-10 col-lg-8">
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" id="loginname" v-model="loginname" autocomplete="off" required
                    autofocus placeholder="Email" />
                  <label for="loginname">Email</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-10 col-lg-8">
                <div class="form-floating mb-3">
                  <input class="form-control" type="password" id="password" v-model="password" required
                    placeholder="Password" />
                  <label for="password">Password</label>
                </div>
              </div>
              <div style="width: 67%">
                <button class="btn btn-primary w-100 btn-danger" type="submit" :disabled="loading">
                  &nbsp;เข้าสู่ระบบ
                  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
              </div>
              <div class="mt-5" style="text-align: center">
                <span>ไม่ใช่สมาชิก? </span>
                <router-link to="/register" style="text-decoration: none">
                  <span style="text-decoration: underline; color: #000;" class="fw-bold">สมัครสมาชิก</span>
                </router-link>
              </div>
            </form>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabelCart"
              aria-hidden="true" ref="exampleModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabelCart">Message notification</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {{ backendMessage === 'success' ? 'เข้าสู่ระบบสำเร็จ' : 'Email หรือ Password ไม่ถูกต้อง' }}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/even-bus"; // ตรวจสอบ path ของ EventBus ให้ถูกต้อง
import axios from "axios";
import { Modal } from 'bootstrap';

axios.defaults.withCredentials = true;

export default {
  name: "TheLogin",
  data() {
    return {
      loginname: null,
      password: null,
      backendMessage: null,
      memEmail: null,
      memName: null,
      dutyId: null,
      loading: false,
    };
  },
  mounted() {
    if (sessionStorage.getItem("memEmail")) {
      this.$router.push("/pagemember");
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      let members = {
        loginname: this.loginname,
        password: this.password,
      };

      try {
        const response = await axios.post(`http://localhost:3000/members/login`, members);
        this.backendMessage = response.data.messagelogin;
        if (this.backendMessage === "success") {
          console.log(response.data.role); // ตรวจสอบค่า role
          await this.chkSession();
          EventBus.emit("loginok");
          this.showModal();

          if (response.data.role === 'user') {
            this.$router.push("/");
          } else if (response.data.role === 'dev') {
            this.$router.push("/dev");
          }
        } else {
          console.log("Login failed");
          this.showModal(); // แสดง modal เมื่อ login ล้มเหลว
        }
      } catch (err) {
        console.error("Login failed:", err);
      } finally {
        this.loading = false;
      }
    },
    async chkSession() {
      try {
        const res = await axios.get(`http://localhost:3000/members/getss`);
        this.memEmail = res.data.email;
        this.memName = res.data.name;
        this.dutyId = res.data.duty;
        sessionStorage.setItem("memName", res.data.name);
      } catch (err) {
        console.error("Error fetching session data:", err);
      }
    },
    showModal() {
      const modal = new Modal(this.$refs.exampleModal);
      modal.show();
    },
  },
};
</script>

<style>
#bg-card-login {
  background-color: #ffff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
</style>
