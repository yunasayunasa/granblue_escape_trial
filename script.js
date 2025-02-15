document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript 読み込み完了");

  // ベッド領域クリック時
  const bedArea = document.getElementById("bed-area");
  bedArea.addEventListener("click", () => {
    alert("ベッドを調べた！");
  });

  // キャスター領域クリック時
  const casterArea = document.getElementById("caster-area");
  casterArea.addEventListener("click", () => {
    alert("キャスターを調べた！");
  });
});