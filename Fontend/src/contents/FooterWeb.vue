<template>
  <div class="footer_section" style="background-color: black; margin-top: auto;">
    <div class="container mt-5">
      <div class="row align-items-center" style="height: 400px;">
        <div class="col-lg-3 col-sm-6 my-5">
          <div class="d-flex">
            <h3 class="me-2 text-danger">TECH</h3>
            <h3 class="text-light">WORLD</h3>
          </div>
          <p class="mt-4 text-secondary">
            ถ้าคุณชอบคอมพิวเตอร์ เราคือเพื่อนกัน TECHWORLD ร้านจำหน่ายอุปกรณ์คอมพิวเตอร์ โน๊ตบุ๊ค อุปกรณ์ต่อพ่วง เกมมิ่งเกียร์ รับประกันทุกชิ้น บริการจัดสเปกคอมพิวเตอร์ ตามการใช้งานในงบประมาณที่ลูกค้าเลือกได้เอง
          </p>
        </div>
        <div class="col-lg-3 col-sm-6 my-5">
          <h4 class="text-light">เกี่ยวกับเรา</h4>
          <div class="mt-4">
            <ul id="list-st">
              <li><a href="#" class="text-decoration-none text-secondary" id="li-link"><span>ติดต่อเรา</span></a></li>
              <li><a href="#" class="text-decoration-none text-secondary" id="li-link"><span>เกี่ยวกับเรา</span></a></li>
              <li><a href="#" class="text-decoration-none text-secondary" id="li-link"><span>ข้อกำหนดและเงื่อนไข</span></a></li>
              <li><a href="#" class="text-decoration-none text-secondary" id="li-link"><span>นโยบายความเป็นส่วนตัว</span></a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 my-5 text-light">
          <h4>บริการลูกค้า</h4>
          <div class="mt-4">
            <ul id="list-st">
              <li>
                <a href="#" class="text-decoration-none text-secondary" id="li-link">
                  <span>การจัดส่งสินค้า</span>
                </a>
              </li>
              <li>
                <a href="#" class="text-decoration-none text-secondary" id="li-link">
                  <span>การรับประกันสินค้า</span>
                </a>
              </li>
              <li>
                <a href="#" class="text-decoration-none text-secondary" id="li-link">
                  <span>การยกเลิกการสั่งซื้อสินค้า</span>
                </a>
              </li>
              <li>
                <a href="#" class="text-decoration-none text-secondary" id="li-link">
                  <span>การคืนสินค้าและการคืนเงิน</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 text-light my-5">
          <h4>ติดต่อเรา</h4>
          <div class="mt-4">
            <ul id="list-st">
              <li><p href="#" class="text-decoration-none text-secondary">เลขที่ 199 ถ.สุขุมวิท ต.ทุ่งสุขลา อ.ศรีราชา จ.ชลบุรี 20230.</p></li>
              <li><p href="https://www.th-sl.com/" class="text-decoration-none text-secondary">โทรศัพท์: 062 354 1549</p></li>
              <li><p href="#" class="text-decoration-none text-secondary">อีเมล: nakorn.tu@ku.th</p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"FooterWeb"
}
</script>

<style>
#list-st {
  list-style: none;
  padding: 0; /* ลบ padding ของ ul */
  text-align: left; /* จัดข้อความให้ชิดซ้าย */
}

#list-st li {
  margin-bottom: 5px; /* เพิ่มระยะห่างระหว่างรายการ */
}

#li-link :hover{
  color: #fff;
}
</style>
