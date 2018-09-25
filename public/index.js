function send() {
    var toSend = $("#message").val();
    var author = $("#username").val();
    var time = $("#time").val();
    $.get("./api/send/messages/" + author + "/" + toSend + "/" + time, data => {})

    $("#message").val("");
}

console.log("hello");

window.setInterval(() => {
    $.get("./api/messages/messages", data => {
        var formattedData = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i] != "\n") {
                formattedData.push(data[i])
            } else {
                formattedData.push("</br>")
            }
        }
        $("p").html(formattedData.join(""));
    })
}, 100)