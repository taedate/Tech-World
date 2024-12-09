//import database เข้ามา
import database from "../service/database.js";

export async function devInfo(req, res) {
  console.log("GET /devInfo Request!!");
  try {
    //const strQry = `SELECT * FROM products`
    const result = await database.query(`SELECT 
    COUNT(Carts."cartCf") AS total_cartCf,  -- นับจำนวนที่ cartCf เป็น true
    SUM("cartDtl".qty) AS total_qty,
    TO_CHAR(SUM("cartDtl".price * "cartDtl".qty), 'FM999,999,999.00') AS total_price
FROM 
    "cartDtl"
JOIN 
    Carts ON "cartDtl"."cartId" = Carts."cartId"
WHERE 
    Carts."cartCf" = true;
`);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
}

export async function getAllProductDev(req, res) {
  console.log("GET /ALL Product Request!!");
  try {
    //const strQry = `SELECT * FROM products`
    const result = await database.query(`SELECT * FROM products
                                          ORDER BY "pdId" ASC `);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
}



//POST ! ส่งข้อมูลเพื่อสร้างข้อมูลใหม่
export async function postProuduct(req, res) {
  console.log("POST /products requested");
  //req.body คือ ข้อมูลจากคำขอที่มาจาก HTTP POST, GET
  const bodyData = req.body;
  try {
    // ทำการตรวจสอบก่อนที่จะใส่ว่ามัน ว่างไหม
    if (req.body.pdId == null || req.body.pdName == null) {
      return res.status(422).json({ error: "pdId and pdName is required!!!" });
    }
    // ตรวจสอบว่ามีค่านี้อยู่หรือยัง
    const existsResult = await database.query({
      text: `SELECT EXISTS (SELECT * FROM products WHERE "pdId" = $1)`,
      values: [req.body.pdId],
    });
    // ถ้ามีค่าที่ Query มา
    if (existsResult.rows[0].exists) {
      return res
        .status(409)
        .json({ error: `pdId ${req.body.pdId} is Exists!!!` });
    }
    // database.query คือ เป็นฟังชั่นในการติดต่อกับฐานข้อมูล
    const result = await database.query({
      text: `INSERT INTO products ("pdId", "pdName", "pdPrice", "pdRemark", "pdTypeId", "brandId", "brandName", "pdType", "total")
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      values: [
        req.body.pdId,
        req.body.pdName,
        req.body.pdPrice,
        req.body.pdRemark,
        req.body.pdTypeId,
        req.body.brandId,
        req.body.brandName,
        req.body.pdType,
        req.body.total,
      ],
    });
    // สร้างวันที่เผื่อส่งกลับไปให้ client
    const dateTime = new Date();
    bodyData.createDate = dateTime;
    res.status(200).json(bodyData);
  } catch (err) {
    return res.status(500).json({ error: err.massage });
  }
}

//PUT ! แก้ไขข้อมูล
export async function putProductEdit(req, res) {
  console.log("PUT /Edit products requested");

  try {
    // database.query คือฟังก์ชันในการติดต่อกับฐานข้อมูล
    const result = await database.query({
      text: `UPDATE products SET "pdName" = $1,
                                  "pdRemark" = $2,
                                  "pdPrice" = $3,
                                  "brandName" = $4,
                                  "total" = $5
                                  WHERE "pdId" = $6`,
      values: [
        req.body.pdName,
        req.body.pdRemark,
        req.body.pdPrice,
        req.body.brandName,
        req.body.total,
        req.params.id, // ใช้ req.params.id ในการค้นหา pdId
      ],
    });

    // สร้างข้อมูลวันที่เพื่อส่งกลับให้ client
    const dateTime = new Date();
    const bodyData = {
      message: "Product updated successfully",
      createDate: dateTime,
    };

    res.status(200).json(bodyData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
