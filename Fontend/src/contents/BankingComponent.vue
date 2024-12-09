<template>
 <div class="accordion mb-3" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <img src="../assets/kasikorn.png" alt="" width="30px" height="30px" class="me-2"> ธนาคารกสิกรไทย
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body row">
        <strong>เลขที่บัญชี: 093-8-27114-3</strong> 
        <strong>ชื่อบัญชี: ณกรณ์ ตั้งประภาพร</strong> 
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <img src="../assets/SCB.BK-478d8e61.png" alt="" width="30px" height="30px" class="me-2 rounded-circle">ธนาคารไทยพาณิชย์
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body row">
        <strong>เลขที่บัญชี: 093-8-27114-3</strong> 
        <strong>ชื่อบัญชี: ณกรณ์ ตั้งประภาพร</strong> 
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <img src="../assets/PromptPay-logo.png" alt="" width="70px" height="40px" class="me-2 rounded"> พร้อมเพย์
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>เบอร์โทรศัพท์: 062-3541549</strong> <img src="" alt="">
        <div>
          <img src="../assets/payment.jpg" alt="" width="300px" height="400px">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BankingComponent'
}
</script>

<style scoped>
/* คุณสามารถเพิ่ม CSS ได้ตามต้องการ */
</style>
