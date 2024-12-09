//import database เข้ามา
import database from "../service/database.js";
import bodyParser from "body-parser";


// จะเป็นการอ่านข้อมูลจาก Product ย้ายให้มาอ่านไฟล์นี้
// GET!! ดึงข้อมูลเรียกดูข้อมูล
export async function getAllProduct(req, res) {
  console.log("GET /ALL Product Request!!");
  try {
    //const strQry = `SELECT * FROM products`
    const result = await database.query(`SELECT p.*, (
                                        SELECT row_to_json(brand_obj)
                                        FROM(
                                            SELECT "brandId", "brandName" FROM brand
                                            WHERE "brandId" = p."brandId"
                                        )brand_obj
                                        ) AS thebrand
                            FROM products p`);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
}

//GET BY ID WHERE ! ดึงข้อมูลเรียกดูข้อมูล
export async function getProductById(req, res) {
  console.log("GET /ProductById Request!!");
  try {
    //const strQry = `SELECT * FROM products`
    const result = await database.query({
      text: `SELECT p.*, (
                                        SELECT row_to_json(brand_obj)
                                        FROM(
                                            SELECT "brandId", "brandName" FROM brand
                                            WHERE "brandId" = p."brandId"
                                        )brand_obj
                                        ) AS thebrand
                            FROM products p WHERE p."pdId" = $1`,
      values: [req.params.id],
    });
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
}

// PUT!! แทนที่ข้อมูล เปลี่ยนแปลงข้อมูล
export async function putProduct(req, res) {
  console.log(`PUT /products ${req.params.id} requested`);
  const bodyData = req.body;

  try {
    const result = await database.query({
      text: `UPDATE "products" SET
                    "pdId" = $1, 
                    "pdName" = $2, 
                    "pdPrice" = $3,
                    "pdRemark" = $4,
                    "pdTypeId" = $5, 
                    "brandId" = $6
                    WHERE "pdId"=$7`,
      values: [
        req.body.pdId,
        req.body.pdName,
        req.body.pdPrice,
        req.body.pdRemark,
        req.body.pdTypeId,
        req.body.brandId,
        req.params.id,
      ],
    });
    const dateTime = new Date();
    bodyData.createDate = dateTime;
    res.status(200).json(bodyData);
  } catch (err) { }
}

// DELETE ลบ
export async function deleteProduct(req, res) {
  console.log(`DELETE /products ${req.params.id} requested`);
  try {
    const result = await database.query({
      text: `DELETE FROM products WHERE "pdId" = $1`,
      values: [req.params.id],
    });
    res.status(204).end();
  } catch (err) { }
}

// เลือกแสดงสินค้าที่มี brandid เท่านี้
export async function getProductByBrandId(req, res) {
  console.log("GET /Product Request!!");
  try {
    //const strQry = `SELECT * FROM products`
    const result = await database.query({
      text: `SELECT p.*, (
                                        SELECT row_to_json(brand_obj)
                                        FROM(
                                            SELECT "brandId", "brandName" FROM brand
                                            WHERE "brandId" = p."brandId"
                                        )brand_obj
                                        ) AS thebrand
                            FROM products p WHERE p."brandId" LIKE $1`,
      values: [req.params.id],
    });
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
}

export async function getTenProduct(req, res) {
  console.log("GET /TenProduct Request!!");
  try {
    //const strQry = `SELECT * FROM products`
    const result = await database.query(`SELECT p.*, (
                                        SELECT row_to_json(brand_obj)
                                        FROM(
                                            SELECT "brandId", "brandName" FROM brand
                                            WHERE "brandId" = p."brandId"
                                        )brand_obj
                                        ) AS thebrand
                            FROM products p LIMIT 10`);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
}

export async function getSearchProduct(req, res) {
  console.log("GET /SerchProduct Request!!");
  try {
    //const strQry = `SELECT * FROM products`
    const result = await database.query({
      text: `SELECT p.*, 
       row_to_json(brand_obj) AS thebrand
        FROM products p 
        LEFT JOIN (
            SELECT "brandId", "brandName" 
            FROM brand
        ) brand_obj ON brand_obj."brandId" = p."brandId"
        WHERE to_tsvector('english', p."pdName") @@ to_tsquery('english', $1) 
          OR to_tsvector('english', p."pdRemark") @@ to_tsquery('english', $1)
        LIMIT 10;
        `,
      //ค่า parameter ที่ส่งมา
      values: [`%${req.params.id}`],
    });
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
}
//Product Detail Laptop
export async function getProductDetail(req, res) {
  console.log("GET /ProductDetail Request!!");
  const pdType = req.params.pdType;
  console.log(pdType);
  try {
    if (pdType === "laptop") {
      const result = await database.query({
        text: `SELECT row_to_json(productDtl_obj) AS theProductDtl
                FROM (
                  SELECT * 
                  FROM "productDtl"
                  WHERE "pdId" = $1
                ) productDtl_obj`,
        values: [req.params.id],
      });
      return res.status(200).json(result.rows[0]);
    } else if (pdType === "computer") {
      const result = await database.query({
        text: `SELECT row_to_json(productDtl_obj) AS theProductDtlCom
                FROM (
                  SELECT * 
                  FROM "productDtlCom"
                  WHERE "pdId" = $1
                ) productDtl_obj`,
        values: [req.params.id],
      });
      return res.status(200).json(result.rows[0]);
    }
    else if (pdType === "vga") {
      console.log("VGA GET")
      const result = await database.query({
        text: `SELECT row_to_json(productDtl_obj) AS theproductDtlVGA
                FROM (
                  SELECT * 
                  FROM "productDtlVGA"
                  WHERE "pdId" = $1
                ) productDtl_obj`,
        values: [req.params.id],
      });
      return res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}
//Product Details Computer
export async function getProductDetailComputer(req, res) {
  console.log("GET /ProductDetail Request!!");
  try {
    const result = await database.query({
      text: `SELECT row_to_json(productDtl_obj) AS theProductDtl
        FROM (
          SELECT * 
          FROM "productDtlCom"
          WHERE "pdId" = $1
        ) productDtl_obj`,
      values: [req.params.id],
    });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message }); // แก้ไข 'massage' เป็น 'message'
  }
}

//type Laptop
export async function getTenProductLaptop(req, res) {
  console.log("GET /TenProductLaptop Request!!");
  try {
    const strQry = `SELECT p.*, (
                        SELECT row_to_json(brand_obj)
                        FROM (
                          SELECT "brandId", "brandName" 
                          FROM brand
                          WHERE "brandId" = p."brandId"
                        ) brand_obj
                      ) AS thebrand
                      FROM products p
                      WHERE "pdType" = 'laptop'
                      LIMIT 10;`;

    const result = await database.query(strQry);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message }); // แก้ไข 'massage' เป็น 'message'
  }
}

//type Computer
export async function getTenProductComputer(req, res) {
  console.log("GET /TenProductLaptop Request!!");
  try {
    const strQry = `SELECT p.*, (
                          SELECT row_to_json(brand_obj)
                          FROM (
                            SELECT "brandId", "brandName" 
                            FROM brand
                            WHERE "brandId" = p."brandId"
                          ) brand_obj
                        ) AS thebrand
                        FROM products p
                        WHERE "pdType" = 'computer'
                        LIMIT 10;`;

    const result = await database.query(strQry);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message }); // แก้ไข 'massage' เป็น 'message'
  }
}

//type VGA
export async function getTenProductVGA(req, res) {
  console.log("GET /TenProductLaptop Request!!");
  try {
    const strQry = `SELECT p.*, (
                        SELECT row_to_json(brand_obj)
                        FROM (
                          SELECT "brandId", "brandName" 
                          FROM brand
                          WHERE "brandId" = p."brandId"
                        ) brand_obj
                      ) AS thebrand
                      FROM products p
                      WHERE "pdType" = 'vga'
                      LIMIT 10;`;

    const result = await database.query(strQry);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message }); // แก้ไข 'massage' เป็น 'message'
  }
}