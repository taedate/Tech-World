import express from "express";
import multer from "multer";
import * as memberC from '../controllers/memberController.js'
// กำหนด storage สำหรับการอัปโหลดไฟล์
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/members/getss', memberC.getSession)
router.post('/members', memberC.postMember)
router.post('/members/login', memberC.loginMember)
router.get('/members/logout', memberC.logoutMember)
router.post('/members/uploadImg', memberC.uploadMember)
// ใช้ middleware upload.single() สำหรับรับไฟล์ที่ส่งมา
router.post("/members/uploadPayment", upload.single("file"), memberC.uploadPayment);

export default router