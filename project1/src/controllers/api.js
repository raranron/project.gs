const connection = require("../services/database");


const api1= async (req,res) => {
  const EX_TO = req.query.EX_TO
  const STORE_CD = req.query.STORE_CD
  const DATE = req.query.DATE

  const [rows] = await connection.query(`select distinct a.RATE_AMT from t_exchange_rate a where a.STORE_CD = "${STORE_CD}" 
  and a.EX_TO like "%${EX_TO}%" and "${DATE}" between a.start_dt and a.end_dt;`);
  console.log("Search Complete")
  res.status(200).send(rows);
  

}// "ไซน์"

const api1_2 = async (req,res) =>{
  const EX_TO = req.query.EX_TO;
  const STORE_CD = req.query.STORE_CD;
  const PROD_CD = req.query.PROD_CD;
  const DATE = req.query.DATE;

    const rows = await connection.query(`select distinct a.PROD_CD, b.PROD_NAME, a.PACKING_SIZE, a.PROD_RETAIL, 
    a.PROD_RETAIL*TRUNCATE(c.RATE_AMT, 0) as product_retail_thb, 
    a.PROD_RETAIL*TRUNCATE(d.RATE_AMT, 0) as product_retail_input, c.RATE_AMT as THB, d.RATE_AMT as INPUT
    from t_prod_retail_mast a left join t_prod_mast b on a.PROD_CD = b.PROD_CD join t_exchange_rate c on 1=1 
    and c.ex_to like "%THB%" and c.STORE_CD = "${STORE_CD}" and "${DATE}" between c.start_dt and c.end_dt
    join t_exchange_rate d on 1=1 
    and d.ex_to like "%${EX_TO}%" and d.STORE_CD = "${STORE_CD}" and "${DATE}" between d.start_dt and d.end_dt
    where a.PROD_CD like"%${PROD_CD}%" ;`);

    console.log("Search Complete")
    res.status(200).send(rows[0]);
    
}// "ไซน์"

const api3 = async (req, res) => {

  const EX_TO = req.query.EX_TO;
  const STORE_CD = req.query.STORE_CD;
  const PROD_CD = req.query.PROD_CD;
  const DATE = req.query.DATE
  
  const rows = await connection.query(`select distinct a.PROD_CD, b.PROD_NAME, a.PACKING_SIZE, a.PROD_RETAIL, a.PROD_RETAIL*TRUNCATE(c.RATE_AMT, 0) as product_retail_thb, a.PROD_RETAIL*TRUNCATE(d.RATE_AMT, 0)as product_retail_input, c.RATE_AMT as THB, d.RATE_AMT as INPUT,  DATE_FORMAT(e.CREATE_DATE, '%d/%m/%Y   %H:%i') as CREATE_DATE
    from t_prod_retail_mast a left join t_prod_mast b on a.PROD_CD = b.PROD_CD join t_exchange_rate c on 1=1 
    and c.ex_to like "%THB%" and c.STORE_CD = "${STORE_CD}" and "${DATE}" between c.start_dt and c.end_dt
    join t_exchange_rate d on 1=1 
    and d.ex_to like "%${EX_TO}%" and d.STORE_CD = "${STORE_CD}" and "${DATE}" between d.start_dt and d.end_dt
    join t_history e on 1=1 
    where a.PROD_CD like"%${PROD_CD}%" ;`);


  console.log("Search Complete")
  res.status(200).send(rows[0]);
  
}

const api4 = async (req, res) => {
  const EX_TO = req.query.EX_TO;
  const STORE_CD = req.query.STORE_CD;
  const PROD_CD = req.query.PROD_CD;
  const DATE = req.query.DATE;
  
        const rows = await connection.query(`insert into t_history (PRODUCT_CODE, PRODUCT_NAME, PACKAGE_SIZE, PRODUCT_RETAIL_USD, PRODUCT_RETAIL_THB, PRODUCT_RETAIL_KHR, RATE_1_USD_THB, RATE_1_USD_input, EX_TO)
        select distinct a.PROD_CD as PRODUCT_CODE, b.PROD_NAME as PROODUCT_NAME, a.PACKING_SIZE as PACKAGE_SIZE, a.PROD_RETAIL as PRODUCT_RETAIL_USD, a.PROD_RETAIL*c.RATE_AMT as PRODUCT_RETAIL_THB, a.PROD_RETAIL*d.RATE_AMT as PRODUCT_RETAIL_${EX_TO}, 
        f.RATE_AMT AS RATE_1_USD_THB, g.RATE_AMT AS RATE_1_USD_input, h.EX_TO as EX_TO
        from t_prod_retail_mast a left join t_prod_mast b on a.PROD_CD = b.PROD_CD join t_exchange_rate c on 1=1 
        and c.ex_to like "%THB%" and c.STORE_CD = "${STORE_CD}" and "${DATE}" between c.start_dt and c.end_dt
        join t_exchange_rate d on 1=1 
        and d.ex_to like "%${EX_TO}%" and d.STORE_CD = "${STORE_CD}" and "${DATE}" between d.start_dt and d.end_dt
        join t_exchange_rate f on 1=1 
        and f.ex_to like "%THB%" and f.STORE_CD = "${STORE_CD}" and "${DATE}" between f.start_dt and f.end_dt
        join t_exchange_rate g on 1=1 
        and g.ex_to like "%${EX_TO}%" and g.STORE_CD = "${STORE_CD}" and "${DATE}" between g.start_dt and g.end_dt
        join t_exchange_rate h on 1=1 and h.ex_to like "%${EX_TO}%"
        where a.PROD_CD like "%${PROD_CD}%";
        `)
        
        res.status(200).send(rows[0]);
        console.log("Insert Complete")

}



module.exports = {
  api1,
  api1_2,
  api3,
  api4,
}