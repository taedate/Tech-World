<template>
    <div>
        <img src="../assets/cat-com.jpg" alt="" class="w-100 rounded">
    </div>
    <div class="mt-3">
        <h4>การ์ดจอ (VGA) ของแท้ Graphic Card การ์ดจอคอม ราคาสุดพิเศษ</h4>
        <p>จำหน่ายสินค้า การ์ดจอคอม (Graphic Card หรือ Video Card) หลากหลายรุ่น ทั้ง การ์ดจอ AMD, การ์ดจอ intel และ
            การ์ดจอ NVIDIA ครอบคลุมทุกความต้องการ
            โดยการ์ดจอคอมเป็นอุปกรณ์คอมพิวเตอร์ที่สำคัญอย่างหนึ่งสำหรับการใช้งานด้านกราฟิก ไม่ว่าจะเป็นการเล่นเกม
            การดูภาพยนตร์ หรือการทำงานด้านการออกแบบและตัดต่อภาพและวิดีโอ ราคาการ์ดจอใน TECHWORLD ขึ้นอยู่กับรุ่นและยี่ห้อ
            เริ่มต้นตั้งแต่ประมาณ 2,000 บาท ไปจนถึงมากกว่า 100,000 บาท สามารถเลือกซื้อได้ตามความต้องการที่ TECHWORLD
            นอกจากนี้เรายังมีบริการหลังการขายที่ครบครัน ไม่ว่าจะเป็นการรับประกันสินค้า การบริการซ่อมแซม
            และบริการให้คำปรึกษาด้านเทคนิคที่จะคอยช่วยเหลือคุณตลอดเวลา เรื่องคอมไว้ใจเรา

        </p>
    </div>
    <div class="mt-5">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/" href="#" class="text-danger">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Computer</li>
            </ol>
        </nav>
    </div>
    <div class="d-flex">
        <div class="" role="group" style="max-width: 200px; min-width: 200px; margin-top: 32px; margin-right: 15px;">
            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked />
            <label class="btn btn-danger w-100 mb-3" for="option1"><i class="bi bi-laptop"></i> สินค้าทั้งหมด</label>
            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off"
                @change="LaptopCategory" />
            <label class="btn btn-light w-100 mb-3" for="option2">RTX</label>
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
    <StrengthComponent/>
</template>

<script>


import axios from 'axios';
import StrengthComponent from '@/contents/StrengthComponent.vue';
export default {
    name: "CoumputerCategory",
    components: {
        StrengthComponent
    },
    data() {
        return {
            products: []
        }
    },
    mounted() {
        axios
            .get("http://localhost:3000/products/type/computer")
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