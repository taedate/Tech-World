import database from "../service/database.js";
import bcrypt from "bcrypt"
import multer from "multer";

// upload part
// กำหนดตำแหน่งที่จะเก็บ file ที่ upload --> img_mem
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img_mem')
    },
    // กำหนดชื่อ file
    filename: function (req, file, cb) {
        const filename = `${req.session.memEmail}.png`
        cb(null, filename)
    }
})
// จำกัดประเภทของไฟล์ที่อัปโหลด
const upload = multer({
    storage: storage,
}).single('file');

//อัพโหลดรูป
export async function uploadMember(req, res) {
    console.log('POST /uploadMember is requested')
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully!' });
    });
}

export async function uploadPayment(req, res) {
    console.log("POST /UPLOAD PAYMENT requested");
  
    try {
      const { orderId, memEmail } = req.body;
      const file = req.file; // ดึงไฟล์จาก multer
  
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      // บันทึกข้อมูลลงฐานข้อมูล (mock การใช้งาน)
      const result = await database.query({
        text: `INSERT INTO payment ("orderId", "cusName", "dataImg")
               VALUES ($1, $2, $3)`,
        values: [orderId, memEmail, file.buffer], // ใช้ buffer จาก multer
      });
  
      console.log("Upload success");
      res.json({ message: "success" });
    } catch (err) {
      console.error("Upload failed:", err);
      res.status(500).json({ message: "fail" });
    }
  }
  
// Register
export async function postMember(req,res){
    console.log("POST /Member requested");
    //req.body คือ ข้อมูลจากคำขอที่มาจาก HTTP POST, GET
    const bodyData = req.body
    try{
        // ทำการตรวจสอบก่อนที่จะใส่ว่ามัน ว่างไหม
        if (req.body.memEmail == null || req.body.memName == null){
            return res.json({messageregister:`fail`})
        }
        // ตรวจสอบว่ามีค่านี้อยู่หรือยัง
        const existsResult = await database.query({
            text: `SELECT EXISTS (SELECT * FROM members WHERE "memEmail" = $1)`,
            values: [req.body.memEmail]
        })
        // ถ้ามีค่าที่ Query มา
        if(existsResult.rows[0].exists){
            return res.json({messageregister:`fail`})
        }
        const thePwd = req.body.password
        const saltRound = 11
        const pwdHash = await bcrypt.hash(thePwd, saltRound)
        // database.query คือ เป็นฟังชั่นในการติดต่อกับฐานข้อมูล
        const result = await database.query({
            text: `INSERT INTO members ("memEmail", "memName", "memHash", "phone", "role")
                    VALUES ($1,$2,$3,$4,$5)`,
            values: [
                req.body.memEmail,
                req.body.memName,
                pwdHash,
                req.body.memPhone,
                req.body.role
            ]
        })
        // สร้างวันที่เผื่อส่งกลับไปให้ client
        console.log('success')
        return res.json({messageregister:`success`})
    }
    catch (err) {
        return res.json({messageregister:`fail`});
    }
}

// Login
export async function loginMember(req,res){
    console.log("POST /loginMember requested");
    //req.body คือ ข้อมูลจากคำขอที่มาจาก HTTP POST, GET
    const bodyData = req.body
    try{
        // ทำการตรวจสอบว่าใส่ หรือไม่
        if (req.body.loginname == null || req.body.password == null){
            console.log("fail have?")
            return res.json({messagelogin:"fail"})
        }
        // ตรวจสอบว่ามี loginName นี้มีอยู่หรือไม่
        const existsResult = await database.query({
            text: `SELECT EXISTS (SELECT * FROM members m WHERE m."memEmail" = $1)`,
            values: [req.body.loginname]
        })
        // ถ้าไม่มีบอก login ผิดพลาด
        if(!existsResult.rows[0].exists){
            console.log('fail not found')
            return res.json({messagelogin : `fail`})
        }
        // ถ้ามี login ทำการอ่าน record นั้นขึ้นมา
        const result = await database.query({
            text: `SELECT * FROM members m WHERE m."memEmail" = $1`, // ดึง Email จาก Database จาก Email ที่ใส่เข้ามา
            values: [
                req.body.loginname
            ]
        })
        const loginok = await bcrypt.compare(req.body.password, result.rows[0].memHash)
        // สร้างวันที่เผื่อส่งกลับไปให้ client
        if(loginok){
            console.log('OK')
            //กำหนดค่า session
            req.session.memEmail = result.rows[0].memEmail
            req.session.memName = result.rows[0].memName
            req.session.dutyId = result.rows[0].dutyId
            req.session.role = result.rows[0].role
            //ส่งต่าไป Fontend
            console.log(req.session)
            // ส่งค่า role กลับไปที่ frontend
            res.json({ messagelogin: 'success', role: req.session.role });
        }
        else{
            console.log('fail')
            console.log(req.session)
            res.json({messagelogin : `fail`})
        }
    }
    catch (err) {
        return res.status(500).json({error: err.message});
    }
}

export async function getSession(req,res) {
    console.log('GET / getSession')
    console.log(req.session)
    const thedata = {
        email:req.session.memEmail,
        name:req.session.memName,
        duty:req.session.dutyId
    }
    console.log(thedata)
    return res.json(thedata)
}

export async function logoutMember(req,res){
    console.log(`GET /logoutMembers is requested`)
    try{
        // ลบเฉพาะ key ที่ระบุ
        // delete req.session.someKey;
        // ล้าง Session ทั้งหมด
        req.session.destroy()
        // ลบ Cookie ด้วย
        res.clearCookie('connect.sid')
        return res.status(200).json({messagelogout:'success'})
    }catch(err)
    {
        return res.status(500).json({messagelogout:'fail'})
    }
}

