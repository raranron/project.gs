const postBtn = document.getElementById('Save')
const getBtn = document.getElementById('Search')
const getTableBtn = document.getElementById('GetTable')
const inputStore = document.getElementById('STORE_CD')
const inputPROD = document.getElementById('PROD_CD')
const inputCurrent = document.getElementById("Currency")
const inputTime = document.getElementById('currentTime')
const inputStore2 = document.getElementById('STORE_CD3')
const inputPROD2 = document.getElementById('PROD_CD3')
const inputCurrent2 = document.getElementById("Currency3")

const tBody = document.getElementById("tbody")
const cTable = document.getElementById('clear')

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1; // January is 0!
var day = now.getDate();

let inputDATE = year + '/' + month + '/' + day;

getBtn.addEventListener('click', getInfo);

async function postInfo(e) {
    e.preventDefault()

    const res = await fetch(`http://localhost:3000/4?STORE_CD=${inputStore.value}&PROD_CD=${inputPROD.value}&EX_TO=${inputCurrent.value}&DATE=${inputDATE}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))

}
async function getInfo(e) {
    e.preventDefault()
    const a = inputStore.value
    var ta = "";
    var tb = "";
    tb += inputCurrent.value;
    var td = "";
    var tc = "";
    var tAA = "";
    var tUTHB = "";
    var tUCC = "";
    var tUU = "";
    tUU += inputCurrent.value;

    td += `<button onclick="SSave(), window.location.reload()"  id="Save" class="btn-sa">Save</button>`
    td += ''
    td += `<button onclick="window.location.reload()" class="btn-c">Cancel</button>`

    tc += "<tr><th>"
    tc += "Product Code"
    tc += "</th>"
    tc += "<th>"
    tc += "Product Name"
    tc += "</th>"
    tc += "<th>"
    tc += "Package Size"
    tc += "</th>"
    tc += "<th>"
    tc += "Product Retail (USD)"
    tc += "</th>"
    tc += "<th>"
    tc += "Product Retail (THB)"
    tc += "</th>"
    tc += "<th>"
    tc += `Product Retail (<a id="CC"></a>)`
    tc += "</th></tr>"

    tAA += `<div></div>`
    tAA += `<a>1 USD = <a id="UCC" > </a> <a id="UU"></a></a>`
    tAA += `<div></div>`
    tAA += `<a>1 USD = <a id="UTHB"></a> THB</a>`
    // var ta = "";
    fetch(`http://localhost:3000/2?EX_TO=${inputCurrent.value}&STORE_CD=${inputStore.value}&DATE=${inputDATE}&PROD_CD=${inputPROD.value}`)
        .then(res => { return res.json() })
        .then(data => {
            if (data.length > 0) {
                data.forEach((item) => {
                    console.log(parseFloat(item.product_retail_input))
                    ta += "<tr><td>"
                    ta += item.PROD_CD;
                    ta += "</td>"
                    ta += "<td>"
                    ta += item.PROD_NAME;
                    ta += "</td>"
                    ta += "<td>"
                    ta += item.PACKING_SIZE;
                    ta += "</td>"
                    ta += "<td>"
                    ta += item.PROD_RETAIL;
                    ta += "</td>"
                    ta += "<td>"
                    ta += parseFloat(item.product_retail_thb).toLocaleString("en",{minimumFractionDigits:4})
                    ta += "<td>"
                    ta += parseFloat(item.product_retail_input).toLocaleString("en",{minimumFractionDigits:4})
                    ta += "</td>"
                    ta += "</td></tr>";
                    tUTHB += parseFloat(item.THB).toLocaleString("en",{minimumFractionDigits:4})
                    tUCC += parseFloat(item.INPUT).toLocaleString("en",{minimumFractionDigits:4})

                    console.log(ta)
                    document.getElementById("bb").innerHTML = tc;
                    document.getElementById("CC").innerHTML = tb;
                    document.getElementById("tbody").innerHTML = ta;
                    document.getElementById("cc").innerHTML = td;
                    document.getElementById("AA").innerHTML = tAA;
                    document.getElementById("UTHB").innerHTML = tUTHB;
                    document.getElementById("UCC").innerHTML = tUCC;
                    document.getElementById("UU").innerHTML = tUU;
                    var postBtn = document.getElementById('Save');
                    if (postBtn) {
                        postBtn.addEventListener('click', postInfo, false);
                    }
                })

            }
        })

}

function checkvalue(){
    
    if (document.getElementById("STORE_CD").value == "") {
        alert ("กรุณากรอกข้อมูลStore code")
    } else if(document.getElementById("PROD_CD").value == "") {
        alert ("กรุณากรอกข้อมูลProduct Code")
    }
}
function SSave(){
    if(document.getElementById("Save").value == "") {
        alert ("คุณแน่ใจที่จะSave ?")
}
}
function checkCurrency(){
    if(document.getElementById("Currency").value == "") {
        alert ("กรุณาเลือกCurrencyที่ต้องการ")
}
}