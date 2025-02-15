document.addEventListener("DOMContentLoaded", () => {
  // デバッグ用
  console.log("JavaScript 読み込み完了");

  // クリック領域を押したら
  const casterArea = document.getElementById("caster-area");
  casterArea.addEventListener("click", () => {
    alert("キャスターを調べた！");
  });
});