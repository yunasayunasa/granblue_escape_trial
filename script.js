document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript 読み込み完了");

    document.getElementById("bed").addEventListener("click", function () {
        alert("ベッドを調べた！");
    });

    document.getElementById("caster").addEventListener("click", function () {
        alert("キャスターを調べた！");
    });
});