$(document).ready(function(){
    $("#sendBtn").click(sendMessage);
    $("#msginput").on('keyup', function (e) {
        if (e.keyCode == 13) sendMessage();
    });

    $("#infoSubmit").click(submitInfo);

    if($.cookie("user_id"))
    {
        ajax.id = $.cookie("user_id");
        setInterval(ajax.syncMsg,1000);
    }

});

function sendMessage()
{
    var msg = $("#msginput").val();
    
    if(msg !="")
    {
        var result = ajax.submitMsg(msg);

        var tag = '<div class="chat-msg"><div class="msg-user">'+msg+'</div></div>';
        $(".chat-area").append(tag);
        $("#msginput").val("");
        $("#msginput").focus();
    }
}

function submitInfo()
{
    var user = $("#user").val();
    var email = $("#email").val();

    if(!validateEmail(email)) {
        alert("Invalid Email !"); 
        return;
    }

    if(user !="" && email!=""){
        ajax.sendUserinfo(user,email);
    }

    $("#user").val("");
    $("#email").val();
}

var ajax = {
    id:0,
    user:"",
    last_msg:0,

    sendUserinfo: function(user,email){
        
        ajax.user = user;

        $.post("/php/submit_info.php",{ user: user,email: email},
            function(data, status){
                data = parseInt(data);
                if(status == 'success' && data !=0){
                    ajax.id = data;
                    $.cookie("user_id", data, { expires: 7 });
                    $(".user-infobox").hide();
                    $("#sendBtn").removeAttr('disabled');
                    $("#msginput").removeAttr('disabled').focus();
                }
                console.log(data+" "+status);
            });

    },
    submitMsg: function(msg){
        $.post("/php/submit_chat.php",{ id:ajax.id, msg:msg },
            function(data, status){
                data = parseInt(data);
                if(status == 'success' && data !=0){
                    ajax.last_msg = data;
                }
            });
    },
    syncMsg: function(){

        if(ajax.last_msg == 0)
        {
            $(".user-infobox").hide();
            $("#sendBtn").removeAttr('disabled');
            $("#msginput").removeAttr('disabled').focus();
        }

        $.post("/php/get_chat.php",{ id:ajax.id,last:ajax.last_msg},
            function(data, status){
                if(status == 'success' && data !=""){
                    json = JSON.parse(data);
                    ajax.last_msg = json.last_msgid;
                    for(var i=0; i<json.count; i++)
                    {
                        var msg = json.array[i].msg;
                        var from = "";

                        if(json.array[i].from == "user"){
                            from = "msg-user";
                        }
                        var tag = "<div class=\"chat-msg\"><div class=\""+from+"\">"+msg+"</div></div>";
                        $(".chat-area").append(tag);
                    }    
                }
                console.log(data+" "+status);
            });
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}