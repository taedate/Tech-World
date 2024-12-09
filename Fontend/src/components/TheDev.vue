<template>
    <DevInfo />
    <div class="card-body mt-5">
        <h3 class="fw-bold"><i class="bi bi-box-seam-fill"></i> เพิ่มสินค้า</h3>
        <form @submit.prevent="postProducts" class="d-flex flex-column align-items-center">
            <div class="w-100">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="pdId" autocomplete="off" required
                        placeholder="ProductId" v-model.trim="pdId" />
                    <label for="pdId">ProductId</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="pdName" autocomplete="off" required
                        placeholder="ProductName" v-model.trim="pdName" />
                    <label for="pdName">ProductName</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="pdRemark" autocomplete="off" required
                        placeholder="Product Remark" v-model.trim="pdRemark" />
                    <label for="pdRemark">Product Remark</label>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="form-floating mb-3 ">
                        <input type="number" class="form-control" id="pdPrice" autocomplete="off" required
                            placeholder="Price" v-model.number="pdPrice" />
                        <label for="pdPrice">Price</label>
                    </div>
                    <div class="form-floating mb-3 ">
                        <input type="text" class="form-control" id="pdTypeId" autocomplete="off" required
                            placeholder="TypeId" v-model.trim="pdTypeId" />
                        <label for="pdTypeId">TypeId</label>
                    </div>
                    <div class="form-floating mb-3 ">
                        <input type="text" class="form-control" id="brandId" autocomplete="off" required
                            placeholder="BrandId" v-model.trim="brandId" />
                        <label for="brandId">BrandId</label>
                    </div>
                    <div class="form-floating mb-3 ">
                        <input type="text" class="form-control" id="brandName" autocomplete="off" required
                            placeholder="Brand Name" v-model.trim="brandName" />
                        <label for="brandName">Brand Name</label>
                    </div>
                    <div class="form-floating mb-3 ">
                        <input type="text" class="form-control" id="pdType" autocomplete="off" required
                            placeholder="Product Type" v-model.trim="pdType" />
                        <label for="pdType">Product Type</label>
                    </div>
                    <div class="form-floating mb-3 ">
                        <input type="number" class="form-control" id="total" autocomplete="off" required
                            placeholder="Quantity" v-model.number="total" />
                        <label for="total">จำนวนสินค้า</label>
                    </div>
                </div>
            </div>
            <div style="width: 100%">
                <button class="btn btn-dark w-100" type="submit" :disabled="loading">
                    &nbsp;เพิ่มสินค้า
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                </button>
            </div>
        </form>
    </div>
    <h3 class="mt-5 fw-bold"><i class="bi bi-collection-fill"></i> รายการสินค้า</h3>
    <table class="table align-middle mt-3">
        <thead class="bg-danger-subtle">
            <tr class="bg-dark text-light">
                <td>รหัสสินค้า</td>
                <td class="text-center">ชื่อสินค้า</td>
                <td class="text-center">รายละเอียด</td>
                <td>ราคา</td>
                <td class="text-center">แบรนด์</td>
                <td class="text-end">จำนวน</td>
                <td>แก้ไข</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(pd, index) in products" :key="index" style="height: 30px">
                <td>
                    <span>
                        <router-link :to="{ name: 'ProductShow', params: { pdId: pd.pdId } }" id="hold-table"
                            style="text-decoration: none">
                            {{ pd.pdId }}
                        </router-link>
                    </span>
                </td>
                <td v-if="editingProduct !== pd">{{ pd.pdName }}</td>
                <td v-else class="align-bottom">
                    <p class="align-top">{{ pd.pdName }}</p>
                    <div>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="pd.pdName" />
                    </div>
                </td>

                <td v-if="editingProduct !== pd">{{ pd.pdRemark }}</td>
                <td v-else class="align-bottom">
                    <p>{{ pd.pdRemark }}</p>
                    <div>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="pd.pdRemark" />
                    </div>
                </td>

                <td v-if="editingProduct !== pd">{{ formattedPrice(pd.pdPrice) }}</td>
                <td v-else class="align-bottom">
                    <p>{{ formattedPrice(pd.pdPrice) }}</p>
                    <div>
                        <input class="form-control" placeholder="Username" aria-label="Username" v-model.number="pd.pdPrice" />
                    </div>
                </td>

                <td v-if="editingProduct !== pd">{{ pd.brandName }}</td>
                <td v-else class="align-bottom">
                    <p>{{ pd.brandName }}</p>
                    <div>
                        <input type="text" class="form-control" v-model="pd.brandName" />
                    </div>
                    
                </td>

                <td v-if="editingProduct !== pd">{{ pd.total }}</td>
                <td v-else class="align-bottom">
                    <p>{{ pd.total }}</p>
                    <input class="form-control" placeholder="Username" aria-label="Username" v-model.number="pd.total" type="number" />
                </td>

                <td>
                    <button v-if="editingProduct !== pd" @click="editProduct(pd)" class="btn"><i class="bi bi-pen-fill"></i></button>
                    <div v-else>
                        <button  @click="updateProduct(pd)" class="btn btn-dark"><i class="bi bi-save2-fill"></i></button>
                        <button  @click="editingProduct = null" class="btn btn-dark mt-2"><i class="bi bi-x-square-fill"></i></button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import DevInfo from "@/contents/DevInfo.vue";
import axios from "axios";

export default {
    name: "TheDev",
    data() {
        return {
            products: [],
            pdId: "",
            pdName: "",
            pdPrice: "",
            pdRemark: "",
            pdTypeId: "",
            brandId: "",
            brandName: "",
            pdType: "",
            total: "",
            loading: false,
            editingProduct: null
        };
    },
    components: {
        DevInfo,
    },
    async mounted() {
        await this.getProduct();
    },
    methods: {
        formattedPrice(price) {
            return new Intl.NumberFormat("th-TH").format(price);
        },
        async getProduct() {
            try {
                const res = await axios.get(`http://localhost:3000/dev/products`);
                this.products = res.data;
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Failed to load products.");
            }
        },
        async postProducts() {
            const productData = {
                pdId: this.pdId,
                pdName: this.pdName,
                pdRemark: this.pdRemark,
                pdPrice: this.pdPrice,
                pdTypeId: this.pdTypeId,
                brandId: this.brandId,
                brandName: this.brandName,
                pdType: this.pdType,
                total: this.total,
            };
            this.loading = true;
            try {
                await axios.post("http://localhost:3000/products/postProduct", productData);
                alert("สร้างรายการสินค้าสำเร็จ :D");
                this.getProduct();  // Refresh the product list
                this.resetForm() //reset the form
            } catch (error) {
                console.error("Error adding product:", error);
                alert("Failed to add product.");
            } finally {
                this.loading = false;
            }
        },
        async updateProduct(product) {
            try {
                await axios.put(`http://localhost:3000/products/edit/${product.pdId}`, product);
                alert("อัพเดทรายการสินค้าสำเร็จ :D");
                this.editingProduct = null;
                this.getProduct();  // Refresh the product list
            } catch (error) {
                console.error("Error updating product:", error);
                alert("Failed to update product.");
            }
        },
        resetForm() {
            this.pdId = '';
            this.pdName = '';
            this.pdRemark = '';
            this.pdPrice = '';
            this.pdTypeId = '';
            this.brandId = '';
            this.brandName = '';
            this.pdType = '';
            this.total = '';
        },
        async editProduct(product) {
            this.editingProduct = product;
        },
    },
};
</script>

<style>
/* Add any necessary styles here */
</style>
