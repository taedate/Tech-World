import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios';

const app = express();
dotenv.config()

// const SECRETCODE = process.env.SECRETCODE
const TOKEN = process.env.TOKEN
// const USERID = process.env.USERID

export async function sendLineMessage(req, res) {
    console.log(`POST /lineNotification is requested`);

    const prductList = req.body.cartDtl.map((item => `+ รหัสสินค้า: ${item.pdId} สินค้า: ${item.pdName}\nจำนวน: ${item.qty} ราคา: ${item.price}`)).join('\n\n');
    try {
      const response = await axios.post(
        'https://api.line.me/v2/bot/message/push',
        {
          to: "U582c888c5751f39dec77955cec9c606c",
          messages: [
            {
              type: 'text',
              text: `มีคำสั่งซื้อจาก OrderId: ${req.body.orderId}\n\n${prductList}\n\nชื่อผู้ใช้: ${req.body.customerName}\nเบอร์โทรศัทพ์: ${req.body.phone}\nยอดรวม: ${req.body.totalPrice}`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
  
      console.log('ส่งข้อความสำเร็จ:', response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error.response?.data || error.message);
    }
  }
  