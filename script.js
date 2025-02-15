// クリックしたらメッセージを表示
function explore(item) {
    let messageBox = document.getElementById("message-box");
    messageBox.textContent = item + " を調べた！";
    messageBox.style.display = "block";

    // 2秒後にメッセージを消す
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 2000);
}