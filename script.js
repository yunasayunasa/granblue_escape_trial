document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript 読み込み完了");

  const hintBox = document.getElementById("hint-box");
  const bedArea = document.getElementById("bed-area");
  const casterArea = document.getElementById("caster-area");
  const exitButton = document.getElementById("exit-button");

  // ベッドを調べたときのイベント
  bedArea.addEventListener("click", () => {
    hintBox.textContent = "ベッドには何かが隠されているようだ…";
  });

  // キャスターを調べたときのイベント
  casterArea.addEventListener("click", () => {
    hintBox.textContent = "キャスターに妙な跡がある…";
  });

  // 部屋から出るボタンを押したとき → 最後の謎解きへ
  exitButton.addEventListener("click", () => {
    hintBox.textContent = "最後の謎：ドアを開ける暗号を入力せよ！";
    // ここでモーダルを表示したり、別の画面に遷移させたりなど自由にアレンジ
  });
});