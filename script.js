alert("JavaScript は読み込まれました！");  // 確認済み

// クリックしたらメッセージを表示
function explore(item) {
    alert(item + " を調べた！");  // クリック時の動作確認
    let messageBox = document.getElementById("message-box");
    messageBox.textContent = item + " を調べた！";
    messageBox.style.display = "block";

    // 2秒後にメッセージを消す
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 2000);
}

// 初期ログを表示（ボタンが設定されているか確認）
console.log("script.js は実行されました！");