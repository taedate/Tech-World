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
            <h1 class="text-center fw-bold">Register Your Account</h1>
            <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
              <div class="col-sm-12 col-md-10 col-lg-8">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="memEmail" autocomplete="off" required placeholder="Email"
                    v-model.trim="memEmail">
                  <label for="memEmail">Email</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="password" autocomplete="off" required
                    placeholder="Password" v-model.trim="password">
                  <label for="password">Password</label>
                </div>
                <div class="d-flex">
                  <div class="form-floating mb-3 col" style="width: 5rem;">
                    <input type="text" class="form-control" id="memName" autocomplete="off" required placeholder="ชื่อ"
                      v-model.trim="memName">
                    <label for="memName">ชื่อ-นามสกุล</label>
                  </div>
                  <div class="form-floating mb-3 col">
                    <input type="text" class="form-control" id="memPhone" autocomplete="off" required
                      placeholder="phone" v-model.trim="memPhone">
                    <label for="memPhone">เบอร์โทรศัพท์</label>
                  </div>
                </div>
              </div>
              <div style="width: 67%">
                <button class="btn btn-primary w-100 btn-danger" type="submit" :disabled="loading">
                  &nbsp;สมัครสมาชิก
                  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
              </div>
              <div class="mt-5" style="text-align: center">
                <span>มีสมาชิกอยู่แล้ว </span>
                <router-link to="/login" style="text-decoration: none">
                  <span style="text-decoration: underline; color: #000;" class="fw-bold">เข้าสู่ระบบ</span>
                </router-link>
              </div>
            </form>

            <!-- Modal -->
            <div class="modal fade" id="exampleModalCart" tabindex="-1" aria-labelledby="exampleModalLabelCart" aria-hidden="true" ref="modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabelCart">Message notification</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {{ backendMessage === 'success' ? 'สมัครสมาชิกสำเร็จ' : 'เกิดข้อผิดพลาดในการสมัครสมาชิกมี Email ที่อาจซ้ำ' }}
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
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  name: 'TheRegister',
  data() {
    return {
      memEmail: '',
      memName: '',
      password: '',
      memPhone: '',
      backendMessage: null,
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      const members = {
        memEmail: this.memEmail,
        memName: this.memName,
        password: this.password,
        memPhone: this.memPhone,
        role: 'user'
      };
      this.loading = true;

      try {
        const response = await axios.post('http://localhost:3000/members', members);
        this.backendMessage = response.data.messageregister === 'success' ? 'success' : 'fail';
        this.resetForm();
        this.showModal();
      } catch (error) {
        console.error(error);
        this.backendMessage = 'fail';
        this.showModal();
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.memEmail = '';
      this.memName = '';
      this.password = '';
      this.memPhone = '';
    },
    showModal() {
      const modalElement = this.$refs.modal;
      const modal = new Modal(modalElement);
      modal.show();
    },
  },
};
</script>

<style>
/* เพิ่มสไตล์ตามที่ต้องการ */
</style>
