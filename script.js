alert("JavaScript は読み込まれました！");  // 確認済み

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bed").addEventListener("touchstart", function () {
        explore("ベッド");
    });
    document.getElementById("caster").addEventListener("touchstart", function () {
        explore("キャスター");
    });
});

function explore(item) {
    alert(item + " を調べた！");
    let messageBox = document.getElementById("message-box");
    messageBox.textContent = item + " を調べた！";
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 2000);
}

// 初期ログを表示（ボタンが設定されているか確認）
console.log("script.js は実行されました！");