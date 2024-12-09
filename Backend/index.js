import express from 'express';
import dotenv from 'dotenv'
//การรับข้อมูลที่ส่งผ่าน Form หรือส่วน Body ของ Request โปรแกรมส่วน Backend จะต้องติดตั้ง library body-parser เป็น  middleware
import bodyParser from 'body-parser';
import productRoute from './Routes/productRoute.js'
import memberRoute from './Routes/memberRoutes.js'
import cartRoute from './Routes/cartRoute.js'
import orderRoute from './Routes/orderRoute.js'
import lineRouter from './Routes/lineRoute.js'
import devRouter from './Routes/devRoute.js'
// ที่ Console ของ Backen จะเห็นว่ามีการ Get Request เข้ามาแต่ Frontend ไม่ได้แสดงอะไร
// เพราะตัว Node.js จะมีการป้องกันไม่ให้มีการยิง API ที่ Server ของเรา เป็นการโจมตีแบบ Cross-Site Scripting (XSS)
import cors from 'cors'
import session from 'express-session';
// import ส่วนที่ติดตั้งเข้ามา
import swaggerUI from "swagger-ui-express"
import yaml from "yaml"
// ใช้ File
import fs from "fs"


dotenv.config()
const app = express();
const port = process.env.PORT;

// เรียกใช้ bodyParsers
// cors ต้องถูกเรียกใช้ก่อน
app.use(bodyParser.json());
const theSecret = process.env.SECRET


app.use(session({
    secret:theSecret,
    resave:false,
    saveUninitialized:true
}))

app.use(cors({
    origin: 'http://localhost:8080',  // ระบุ origin ที่อนุญาต
    credentials: true,  // อนุญาตให้ส่งข้อมูลรับรอง (เช่น cookies) ได้
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));


app.use("/img_pd",express.static('img_pd'))
app.use("/img_mem", express.static('img_mem'))
app.use(express.json());

app.use(productRoute)
app.use(memberRoute)
app.use(cartRoute)
app.use(orderRoute)
app.use(lineRouter)
app.use(devRouter)

// swagger
const swaggerfile = fs.readFileSync('service/swagger.yaml','utf-8')
const swaggerDoc = yaml.parse(swaggerfile)
// กำหนด path ที่จะให้เรียกหน้า Document ขึ้นมา
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))

// app.get('/products', async (req, res) => {
//     console.log("GET /products requested");
//     try {
//         const strQry = 'SELECT * FROM products ORDER BY "pdName" DESC';
//         const result = await database.query(strQry);
//         res.status(200).json(result.rows); // Use result.rows to get the actual data
//         console.log(result)
//     } catch (error) {
//         console.error('Error executing query', error.stack);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/products',async (req,res)=> {
//     console.log("POST /products requested");
//     const bodyData = req.body
//     try{
//         // ทำการตรวจสอบก่อนที่จะใส่ว่ามัน ว่างไหม
//         if (req.body.pdId == null || req.body.pdName == null){
//             return res.status(422).json({error:"pdId and pdName is required!!!"})
//         }
//         // ตรวจสอบว่ามีค่านี้อยู่หรือยัง
//         const existsResult = await database.query({
//             text: `SELECT EXISTS (SELECT * FROM products WHERE "pdId" = $1)`,
//             values: [req.body.pdId]
//         })
//         // ถ้ามีค่าที่ Query มา
//         if(existsResult.rows[0].exists){
//             return res.status(409).json({error : `pdId ${req.body.pdId} is Exists!!!`})
//         }
//         const result = await database.query({
//             text: `INSERT INTO products ("pdId", "pdName", "pdPrice", "pdTypeId", "brandId")
//                     VALUES ($1,$2,$3,$4,$5)`,
//             values: [
//                 req.body.pdId,
//                 req.body.pdName,
//                 req.body.pdPrice,
//                 req.body.pdTypeId,
//                 req.body.brandId,
//             ]
//         })
//         // สร้างวันที่เผื่อส่งกลับไปให้ client
//         const dateTime = new Date()
//         bodyData.createDate=dateTime
//         res.status(200).json(bodyData)
//     }
//     catch(err){
//         return res.status(500).json({error:err.massage})
//     }
    
// })

// ตั้งค่า transporter


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
