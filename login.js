var backendurl="https://hustissuewebapi.azurewebsites.net";
var jsondata={}
//修改這裡來改變api伺服器位置
function LoginSubmit(email,password){
    var arr=
    {
        Email:email,
        Password:password
    };

    $.ajax({
        url: backendurl+'/api/user',
        type: 'POST',
        data: JSON.stringify(arr),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data){
            if(data.loginsuccess)
            {
                $.cookie('session', data.session);
                window.location ="/account.html";
            }
            else
            {
                alert("密碼錯誤!");
            }
        }

    });    
 }
 $( document ).ready(function() {
    var arr=
    {
        Session: $.cookie('session')
    };
    var pathname = $(location).attr('pathname');
    $.ajax({
        url: backendurl+'/api/session',
        type: 'POST',
        data: JSON.stringify(arr),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data){
            if(data.loginsuccess)
            {
                document.getElementById('login-member-center').innerHTML ="會員中心";
                $( "#login-member-center").attr("href","/account.html");
                $( "#lnavbarliItems").append('<li class="nav-item"><a class="nav-link active" id="logout-li">登出</a></li>');
                $("#logout-li").click(function() {
                    $.cookie('session',null)
                    window.location ="/index.html";
                  });
                if(pathname=="/login.html")
                {
                    window.location ="/account.html";
                }
                if(pathname=="/account.html")
                {
                    if($.cookie('toorders'))
                    {
                        $.removeCookie('toorders');
                        $("#account-sidebar-list>li").removeClass("onSelected");
                        $("#account-sidebar-list>li").eq("1").addClass("onSelected");
                        setTimeout(function(){
                            orderInfo_ViewAllOrderInfo();
                            console.log("I am the third log after 0.2 seconds");
                        },200);
                        
                    }
                }
            }
            else
            {
                if(pathname=="/account.html")
                {
                    window.location ="/login.html";
                }
            }

        }

    });
});

function getmemberdata(){
    var arr=
    {
        Session: $.cookie('session')
    };

    $.ajax({
        url: backendurl+'/api/account',
        type: 'POST',
        data: JSON.stringify(arr),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data){

        }

    });    
 }
 function Postmemberdata(){
    var arr=
    {
        Session: $.cookie('session'),
        address: "測試用地址",
        email: "admin@gmail.com",
        name: "admin",
        phone: "0912345678"
    };

    $.ajax({
        url: backendurl+'/api/updateaccount',
        type: 'POST',
        data: JSON.stringify(arr),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data){

        }

    });    
 }

 function getordersdetail(){
    var arr=
    {
        Session: $.cookie('session')
    };

    $.ajax({
        url: backendurl+'/api/ordersdetail',
        type: 'POST',
        data: JSON.stringify(arr),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data){
            var res={Orders:data};
            $("#order-container").append(htmlOrder(res));
            console.log("success")
            return res;
        }

    });    
 }
