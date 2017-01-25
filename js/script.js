$(document).ready(function(){
    $("#sendBtn").click(sendMessage);
    $("#msginput").on('keyup', function (e) {
        if (e.keyCode == 13) sendMessage();
    });

});

function sendMessage()
{
    var msg = $("#msginput").val();
    
    if(msg !="")
    {
        var tag = "<div class=\"chat-msg msg-user\">"+msg+"</div>";
        $(".chat-area").append(tag)
        $("#msginput").val("");
    }
    
    $("#msginput").focus();
}