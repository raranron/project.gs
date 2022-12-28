const postBtn = document.getElementById('Save')
const getBtn = document.getElementById('Search')
const getTableBtn = document.getElementById('GetTable3')
const inputStore2 = document.getElementById('STORE_CD')
const inputPROD2 = document.getElementById('PROD_CD')
const inputCurrent2 = document.getElementById("Currency3")

const tBody = document.getElementById("tbody")
const table = document.getElementById('clear')


var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1; // January is 0!
var day = now.getDate();

let inputDATE = year + '/' + month + '/' + day;
// postBtn.addEventListener('click',postInfo)
getTableBtn.addEventListener('click', getTable)

async function getTable(e) {
    e.preventDefault()
    var tcc = "";
    tcc += inputCurrent2.value;
    var rc = ""
    rc += inputCurrent2.value;
    var ta = "";
    var tb = "";
    tb += `<tr><th>Product Code</th><th>Product Name</th><th>Package Size</th><th>Product Retail (USD)</th><th> Product Retail (<a id='Cur'></a>)</th>
    <th>Product Retail (THB)</th><th>Rate 1 USD (<a id="rcc"></a>) </th><th>Rate 1 USD (THB)</th><th>Create Date</th></tr>`

    const res = await fetch(`http://localhost:3000/3?EX_TO=${inputCurrent2.value}&STORE_CD=${inputStore2.value}&PROD_CD=${inputPROD2.value}&DATE=${inputDATE}`)
        .then(res => { return res.json() })
        .then(data => {
            if (data.length > 0) {
                data.forEach((item) => {

                    console.log(parseFloat(item.product_retail_input))
                    ta += "<tr><td>";
                    ta += item.PROD_CD;
                    ta += "</td>";
                    ta += "<td>";
                    ta += item.PROD_NAME;
                    ta += "</td>"
                    ta += "<td>"
                    ta += item.PACKING_SIZE;
                    ta += "</td>"
                    ta += "<td>"
                    ta += item.PROD_RETAIL;
                    ta += "</td>"
                    ta += "<td>"
                    ta += parseFloat(item.product_retail_input).toLocaleString("en",{minimumFractionDigits:4})
                    ta += "</td>"
                    ta += "<td>"
                    ta += parseFloat(item.product_retail_thb).toLocaleString("en",{minimumFractionDigits:4})
                    ta += "</td>"
                    ta += "<td>"
                    ta += parseFloat(item.INPUT).toLocaleString("en",{minimumFractionDigits:4})
                    ta += "</td>"
                    ta += "<td>"
                    ta += parseFloat(item.THB).toLocaleString("en",{minimumFractionDigits:4})
                    ta += "</td>"
                    ta += "<td>"
                    ta += item.CREATE_DATE;
                    ta += "</td></tr>";
                })
                console.log(ta)

                document.getElementById("tbody2").innerHTML = ta;
                document.getElementById("tr").innerHTML = tb;
                document.getElementById("Cur").innerHTML = tcc;
                document.getElementById("rcc").innerHTML = rc;
            }
        })
    
}

function checkvalue2(){
    
    if (document.getElementById("STORE_CD").value == "") {
        alert ("กรุณากรอกข้อมูลStore code")
    } else if(document.getElementById("PROD_CD").value == "") {
        alert ("กรุณากรอกข้อมูลProduct Code")
    }

}