<template>
  <div class="row align-items-center">

    <div class="card mt-5 rounded-circle" style="width: 18rem" v-if="imageExists">
      <!-- เมื่อมีการอัปโหลดภาพใหม่จะทำการอัปเดตค่า imageTimestamp
            พื่อเปลี่ยนแปลง URL ของภาพ และบังคับให้เบราว์เซอร์ดึงภาพใหม่จากเซิร์ฟเวอร์ (เพื่อหลีกเลี่ยงการดึงภาพที่แคชไว้) -->
      <img :src="`http://localhost:3000/img_mem/${memEmail}.png?timestamp=${imageTimestamp}`" :alt="memEmail"
        class="rounded-circle" />
    </div>
    <div class="card mt-5" style="width: 18rem" v-else>
      <img :src="`http://localhost:3000/img_mem/default.png`" :alt="memEmail" />
    </div>
    <form @submit.prevent="uploadFile" class="mt-3">
      <div class="row">
        <div class="col-sm-4" style="width: 280px;">
          <input class="form-control" type="file" id="formFile" @change="onFileChange" required />
        </div>
        <div class="col">
          <button class="btn btn-danger" type="submit">Upload</button>
        </div>
      </div>
      <div class="">
        <div class=""></div>
        <div class="">
          <div class="alert alert-success" v-if="fileMessage != 'fail' && fileMessage != null">
            {{ fileMessage }}
          </div>
        </div>
        <div class=""></div>
      </div>
    </form>
    <div class="mt-5">
      <h4>รายละเอียด PROFILE</h4>
      <div class="row mt-3">
        <div class="col">
          <div>
            <p class="h4 fw-bolder">ชื่อ-นามสกุล </p>
            <p class="border p-3 rounded">{{ memName }}</p>
          </div>
          <router-link to="/cartlist" style="text-decoration: none">
            <div class="btn btn-danger fw-bold">สินค้าที่เคยบันทึกลงตระกร้า</div>
          </router-link>
        </div>
        <div class="col">
          <div>
            <p class="h4 fw-bolder">ชื่อผู้ใช้</p>
            <p class="border p-3 rounded">{{ memEmail }}</p>
          </div>
          
        </div>

      </div>



      
    </div>
  </div>

</template>

<script>
import axios from "axios"; //1.import axios มาใช้งาน
axios.defaults.withCredentials = true;
export default {
  name: "PageMember",
  data() {
    return {
      memEmail: null,
      memName: null,
      dutyId: null,
      imageExists: false,
      fileMessage: null,
      file: null,
      imageTimestamp: Date.now(), // ใช้เป็น query parameter
    };
  },
  async mounted() {
    await this.chkSession();
    this.checkImage();
  },
  //แสดงข้อมูลที่อ่านได้จาก Session
  methods: {
    async chkSession() {
      await axios
        .get(`http://localhost:3000/members/getss`)
        .then((res) => {
          console.log(res.data);
          this.memEmail = res.data.email;
          this.memName = res.data.name;
          this.dutyId = res.data.duty;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    checkImage() {
      const image = new Image();
      image.src = `http://localhost:3000/img_mem/${this.memEmail}.png`;
      image.onload = () => {
        // รูปภาพโหลดสำเร็จ
        this.imageExists = true;
      };
      image.onerror = () => {
        // รูปภาพไม่สามารถโหลดได้
        this.imageExists = false;
      };
    },
    // อ่านค่าจาก input file เมื่อถูกเรียก
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    // ทำการ Uploadfile เมื่อถูกSubmit
    async uploadFile() {
      if (!this.file) {
        this.fileMessage = "เลือก File ก่อน";
        return;
      }
      // อ่านค่าจาก Form เพื่อ POST
      const formData = new FormData();
      formData.append("file", this.file);
      // กำหนด endpoint และกำหนด Header ว่าเป็นการส่ง file
      try {
        const response = await axios.post(
          "http://localhost:3000/members/uploadImg",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.fileMessage = response.data.message;
        // ให้ทำการตรวจสอบ image อีกครั้ง
        this.checkImage();
        // กำหนด imageTimestamp ใหม่เพื่อให้ vue เรียก image ใหม่
        this.imageTimestamp = Date.now();
      } catch (err) {
        this.fileMessage = "fail";
      }
    },
  },
};
</script>

<style></style>
