document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript 読み込み完了");

  // ★ シーン管理用
  const scenes = document.querySelectorAll('.scene');
  const titleScreen = document.getElementById("title-screen");
  const narrationScreen = document.getElementById("narration-screen");
  const gameScreen = document.getElementById("game-screen");
  const narrationContent = document.getElementById("narration-content");

  // シーン表示関数：全シーン非表示→指定IDのみ表示
  function showScene(sceneId) {
    scenes.forEach(scene => scene.style.display = "none");
    document.getElementById(sceneId).style.display = "block";
  }

  // 初期はタイトル画面
  showScene("title-screen");

  // タイトル画面タップでナレーションシーンへ
  titleScreen.addEventListener("click", () => {
  transitionToScene("narration-screen");
});

  // ★ ナレーションシーンの進行
  const narrationTexts = [
    "君は目を覚ますと、自分の部屋にいた…",
    "部屋から出ようとするが、鍵がかかっている…",
    "どうやらこの鍵を開けないと出られないようだ。"
  ];
  let narrationIndex = 0;
  // 初回表示はすでにHTMLにあるので（最初の文）、次回以降で進める
  narrationScreen.addEventListener("click", () => {
    narrationIndex++;
    if(narrationIndex < narrationTexts.length) {
      narrationContent.innerHTML = `<p>${narrationTexts[narrationIndex]}</p>`;
    } else {
      showScene("game-screen");
    }
  });

  // ★ 以下は既存のゲーム進行部分 ★
  const hintBox = document.getElementById("hint-box");
  const bedArea = document.getElementById("bed-area");
  const casterArea = document.getElementById("caster-area");
  const exitButton = document.getElementById("exit-button");

  // モーダル要素
  const hintModal = document.getElementById("hint-modal");
  const hintImage = document.getElementById("hint-image");
  const exitModal = document.getElementById("exit-modal");
  const passwordInput = document.getElementById("password-input");
  const passwordSubmit = document.getElementById("password-submit");

  // ベッド領域クリック：ヒント画像 bg1_hint1.jpg 表示
  bedArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint1.jpg";
    hintModal.style.display = "flex";
    hintBox.textContent = "ベッドには謎の紙片が残されている…";
  });

  // キャスター領域クリック：ヒント画像 bg1_hint2.jpg 表示
  casterArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint2.jpg";
    hintModal.style.display = "flex";
    hintBox.textContent = "キャスターに妙な跡がある…";
  });

  // ヒントモーダルクリックで閉じる
  hintModal.addEventListener("click", () => {
    hintModal.style.display = "none";
  });

  // 部屋から出るボタンクリックで、謎解きモーダル表示
  exitButton.addEventListener("click", (e) => {
    e.stopPropagation();
    exitModal.style.display = "flex";
    hintBox.textContent = "";
    passwordInput.value = "";
  });

  // 謎解きモーダル外（オーバーレイ部分）クリックで閉じる
  exitModal.addEventListener("click", (event) => {
    if(event.target === exitModal) {
      exitModal.style.display = "none";
    }
  });

  // 「鍵を開ける」ボタン押下でパスワードチェック
  passwordSubmit.addEventListener("click", () => {
    const input = passwordInput.value.trim();
    const correctPassword = "4593";
    if (/^\d{4}$/.test(input)) {
      if(input === correctPassword) {
        console.log("鍵が開いた！本編は4/1実装予定！お楽しみに！");
        alert("鍵が開いた！\n本編は4/1実装予定！お楽しみに！");
        exitModal.style.display = "none";
      } else {
        console.log("間違っているようだ...");
        alert("間違っているようだ...");
        passwordInput.value = "";
      }
    } else {
      console.log("間違っているようだ...");
      alert("間違っているようだ...");
      passwordInput.value = "";
    }
  });
});

// シーン切替前に転換オーバーレイを表示してフェードアウトさせる関数
function transitionToScene(newSceneId) {
  const overlay = document.getElementById("transition-overlay");
  overlay.style.opacity = 1;  // オーバーレイを不透明に
  overlay.classList.add("fade-out");
  
  // フェードアウトのアニメーションが終わった後にシーンを切り替える
  overlay.addEventListener("animationend", function handler() {
    overlay.classList.remove("fade-out");
    showScene(newSceneId);  // 既存のシーン切替関数を呼び出す
    overlay.removeEventListener("animationend", handler);
  });
}

function transitionToScene(newSceneId) {
  const overlay = document.getElementById("transition-overlay");
  overlay.style.opacity = 1;  // オーバーレイを不透明に
  overlay.classList.add("fade-out");
  
  overlay.addEventListener("animationend", function handler() {
    overlay.classList.remove("fade-out");
    showScene(newSceneId);  // 既存のシーン切替関数を呼び出す
    overlay.removeEventListener("animationend", handler);
  });
}