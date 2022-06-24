// fetch("data-test.json")
//     .then(response => {
//         return response.json();
//     })
//     .then(jsondata => {
//         $("#root").append(htmlOrder(jsondata));
//         // htmlOrder(jsondata);
//         return console.log(jsondata);
//     });
function addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
    return date;
  }

function htmlOrder(raw) {
    console.log(raw["Orders"]);
    let htmlItem = "";
    for (let i in raw["Orders"]) {
        let dataOrder = raw["Orders"][i];
        console.log(htmlOrderDetial(dataOrder["ordersDetail"]));
        let orderID = dataOrder["orderID"];
        let orderdate = dataOrder["orderdate"];
        let TaiwanDateTime=new Date(orderdate);
        TaiwanDateTime=addHours(8,TaiwanDateTime);
        console.log(TaiwanDateTime);
        let isshipped = dataOrder["isshipped"];
        let totalprice = dataOrder["totalprice"];
        htmlItem +=
            '<div class="order-item">' +
            '<div class="d-flex justify-content-between align-items-center header">' +
            '<h2>訂單編號#0000' + orderID + '</h2>' +
            '<div class="btn-coolest-">' + (isshipped?'已送達':'未送達') + '</div>' +
            '</div>' +
            htmlOrderDetial(dataOrder["ordersDetail"]) +
            '<div class="d-flex justify-content-between align-items-center bottom">' +
            '<span>訂單時間：' + $.format.date(TaiwanDateTime, 'yyyy/MM/dd HH:mm:ss') + '</span>' +
            '<div class="d-flex align-items-center">' +
            '<span>訂單金額</span>' +
            '<label>$' + totalprice + '</label>' +
            '</div>' +
            '</div>' +
            '</div>';
        // console.log(dataOrder["OrderDetail"][0]["color"]);
    }
    htmlItem = '<div class="list-group order">' + htmlItem + '</div>';
    return htmlItem;
}


function htmlOrderDetial(dataOrder) {

    var htmlItem = "";
    for (let i in dataOrder) {
        let dataOrderDetial = dataOrder[i];
        let color = dataOrderDetial["color"];
        let name = dataOrderDetial["productname"];
        let value = dataOrderDetial["value"];
        let price = dataOrderDetial["price"];
        let imgSrc = color2ImgSrc(color);
        htmlItem +=
            '<div class="order-detial-item list-group-item d-flex align-items-center flex-row">' +
            '<img src = "' + imgSrc + '" width = "130px" alt = "" >' +
            '<div class="text">' +
            '<h4>' + name + '</h4>' +
            '<small>x' + value + '</small>' +
            '</div>' +
            '<span>$' + price * value + '</span>' +
            '</div> ';
    }
    return htmlItem;
}

function color2ImgSrc(color) {
    let img = '';
    switch (color) {
        case "red":
            img = "/src/image/2_.png";
            break;
        case "org":
            img = "/src/image/1_.png";
            break;
        case "pink":
            img = "/src/image/6_.png";
            break;
        case "cyan":
            img = "/src/image/3_.png";
            break;
        case "green":
            img = "/src/image/5_.png";
            break;
        case "blue":
            img = "/src/image/4_.png";
            break;
        case "black":
            img = "/src/image/8_.png";
            break;
        case "white":
            img = "/src/image/7_.png";
            break;
        default:
            img = "/src/image/2_.png";
    };
    return img;
}