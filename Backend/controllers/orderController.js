import database from "../service/database.js";
import nodemailer from 'nodemailer'

export async function postOrders(req, res) {
    console.log("POST /PostOrder requested");
    //req.body คือ ข้อมูลจากคำขอที่มาจาก HTTP POST, GET
    try {
        // ทำการตรวจสอบก่อนที่จะใส่ว่ามัน ว่างไหม
        if (req.body.orderId == null || req.body.orderId == null) {
            return res.json({ messageregister: `fail` })
        }
        // ตรวจสอบว่ามีค่านี้อยู่หรือยัง
        const existsResult = await database.query({
            text: `SELECT EXISTS (SELECT * FROM orders WHERE "orderId" = $1)`,
            values: [req.body.orderId]
        })
        // const productList = req.body.cartId.map((item) => `<li>${item.pdName} - จำนวน ${item.qty} ชิ้น, ราคา: ${item.price} บาท</li>`).join('');
        const transporter = nodemailer.createTransport({
            service: 'gmail', // หรือบริการอีเมลที่คุณต้องการใช้
            auth: {
                user: 'datebklm@gmail.com', // อีเมลผู้ส่ง
                pass: 'ejsm dwks ellh elpw', // รหัสผ่านผู้ส่ง
            },
        });
        const productListHtml = req.body.cartDtl
            .map(
                (item) => `
      <tr>
        <td>${item.pdName}</td>
        <td>${item.qty} ชิ้น</td>
        <td>${item.price.toLocaleString('th-TH')} บาท</td>
      </tr>`
            )
            .join('');

        const mailOptions = {
            from: 'datebklm@gmail.com',
            to: req.body.memEmail,
            subject: 'รายละเอียดคำสั่งซื้อของคุณ',
            text: ``,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                <img src="https://raw.githubusercontent.com/taedate/DATACOM-ImageV2/refs/heads/main/TIik%20com.PNG?token=GHSAT0AAAAAACXF5QEULB2PYXQX22GU6NIMZZG4LQA" alt="">
                <h2>บริษัติ WorldTech ขอขอบคุณที่สั่งซื้อสินค้ากับเรา</h2>
                <p>หมายเลขคำสั่งซื้อ: <strong>${req.body.orderId}</strong></p>
                <p>ชื่อ: ${req.body.customerName}</p>
                <p>ที่อยู่: ${req.body.address}, ${req.body.province} , ${req.body.district}, ${req.body.subDistrict}, ${req.body.postalCode}</p>
                <h3>รายการสินค้า:</h3>
                <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                    <thead>
                    <tr>
                        <th>ชื่อสินค้า</th>
                        <th>จำนวน</th>
                        <th>ราคา</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${productListHtml}
                    </tbody>
                </table>
                <h3 style="color: green;">ราคารวมทั้งหมด: ${req.body.totalPrice.toLocaleString('th-TH')} บาท</h3>
                <p>ขอบคุณที่ใช้บริการ!</p>
                </div>
  `,
        };



        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // database.query คือ เป็นฟังชั่นในการติดต่อกับฐานข้อมูล
        const result = await database.query({
            text: `INSERT INTO orders ("orderId", "cartId", "cusName", "customerName", "phone", "address", "subDistrict", "district", "province", "postalCode", "totalProductPrice")
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
            values: [
                req.body.orderId,
                req.body.cartId,
                req.body.memEmail,
                req.body.customerName,
                req.body.phone,
                req.body.address,
                req.body.subDistrict,
                req.body.district,
                req.body.province,
                req.body.postalCode,
                req.body.totalPrice
            ]
        });
        // ส่งอีเมลหลังจากบันทึกคำสั่งซื้อ
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        // สร้างวันที่เผื่อส่งกลับไปให้ client
        console.log('success')
        return res.json({ messageOrders: `success` })
    }

    catch (err) {
        return res.json({ messageOrder: `fail` });
    }
}

export async function updateCartCf(req, res) {
    console.log(`UPDATE /updateCartCf is requested `);
    const cartId = req.body.id;
    console.log(cartId);
    try {
        await database.query({
            text: `UPDATE carts SET "cartCf" = true WHERE "cartId" = $1`,  // Correct case-sensitive column name
            values: [cartId]
        });

        console.log('success');
        return res.json({ messageOrdersUpdate: 'success' });
    } catch (err) {
        console.error(err);
        return res.json({ messageOrderUpdate: 'fail' });
    }
}

export async function updateInventory(req, res) {
    console.log(`UPDATE /updateInventory is requested`);
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
    try {
        await database.query({
            text: `UPDATE products SET "total" = total - $1 WHERE "pdId" = $2`,
            values: [quantity, productId]  
        });

        console.log('Inventory updated successfully');
        return res.json({ messageOrdersUpdate: 'success' });
    } catch (err) {
        console.error(err);
        return res.json({ messageOrderUpdate: 'fail' });
    }
}
