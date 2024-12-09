<template>
    <div>
        <!-- <button  class="btn " @click="$router.push(`/cartshow/${cartId}`)">
            <i class="bi bi-bag-fill"></i>
            {{cartId}} [{{ qty }}] - {{ money }}฿
        </button> -->
        <button type="button" class="btn position-relative" @click="chkLogin()">
            <i class="bi bi-handbag-fill text-dark fw-bold h5"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ qty }}
            </span>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCart" tabindex="0" aria-labelledby="exampleModalLabelCart"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabelCart">Message notification</h1>
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

    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true
import { EventBus } from "../even-bus"
import { Modal } from 'bootstrap';
export default {
    name: "CartInfo",
    data() {
        return {
            memEmail: null,
            cartId: null,
            qty: 0,
            money: 0,
        }
    },
    async mounted() {
        await this.sumCart();
        EventBus.on('cartdtlOK', () => {
            this.sumCart();
        });
        EventBus.on('memlogout', () => {
            this.clearCart();
        });

        // Polling เพื่ออัพเดตจำนวนสินค้า
        setInterval(() => {
            this.sumCart();
        }, 2000); // อัพเดตทุก ๆ 2 วินาที
    },
    methods: {
        async sumCart() {
            console.log('sumCart')
            await axios.get(`http://localhost:3000/carts/sumcart`)
                .then(res => {
                    console.log("SumCart" + res.data)
                    this.cartId = res.data.id
                    this.qty = res.data.qty
                    this.money = res.data.money
                })
                .catch(err => {
                    console.error(err);
                });
        },
        clearCart() {
            console.log('Clear Cart')
            this.cartId = null
            this.qty = 0
            this.money = 0
        },
        async chkLogin() {
            console.log("chkLogin");
            await this.chkSession();
            if (this.memEmail == null) {
                // If the user is not logged in, show the modal
                const modal = new Modal(document.getElementById('exampleModalCart'), {
                    backdrop: false,  // ปิดพื้นหลัง Backdrop ชั่วคราว
                });
                modal.show();
            }
            else {
                this.$router.push(`/cartshow/${this.cartId}`);
            }
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
    }
}
</script>


<style>
.modal-backdrop {
    z-index: 1049 !important;  /* ต้องน้อยกว่า Modal (z-index 1050+) */
}
.modal {
    z-index: 1050 !important;  /* ให้ Modal อยู่ด้านบนสุด */
}

</style>
