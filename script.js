document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript 読み込み完了");

  // ★ シーン管理用要素 ★
  const scenes = document.querySelectorAll('.scene');
  const titleScreen = document.getElementById("title-screen");
  const narrationScreen = document.getElementById("narration-screen");
  const narrationContent = document.getElementById("narration-content");
  const gameScreen = document.getElementById("game-screen");

  // シーンを一括で非表示にし、指定したシーンのみ表示する関数
  function showScene(sceneId) {
    scenes.forEach(scene => {
      scene.style.display = "none";
    });
    document.getElementById(sceneId).style.display = "block";
  }

  // 最初はタイトル画面を表示
  showScene("title-screen");

  // タイトル画面をタップしたらナレーション画面へ
  titleScreen.addEventListener("click", () => {
    showScene("narration-screen");
  });

  // ★ ナレーションシーンの進行 ★
  // ナレーションテキストの配列
  const narrationTexts = [
    "君は目を覚ますと、自分の部屋にいた…",
    "部屋から出ようとするが、鍵がかかっている…",
    "どうやらこの鍵を開けないと出られないようだ。"
  ];
  let narrationIndex = 0;
  // 初期表示
  narrationContent.innerHTML = `<p>${narrationTexts[narrationIndex]}</p><p>画面をタップして次へ</p>`;

  // ナレーション画面のタップでテキストを進行
  narrationScreen.addEventListener("click", () => {
    narrationIndex++;
    if(narrationIndex < narrationTexts.length){
      narrationContent.innerHTML = `<p>${narrationTexts[narrationIndex]}</p><p>画面をタップして次へ</p>`;
    } else {
      // 全文表示し終えたらゲーム画面へ
      showScene("game-screen");
    }
  });


  // ★ 以下は既存のゲーム進行部分 ★

  // ゲーム画面用要素
  const hintBox = document.getElementById("hint-box");
  const bedArea = document.getElementById("bed-area");
  const casterArea = document.getElementById("caster-area");
  const exitButton = document.getElementById("exit-button");

  // モーダル関連
  const hintModal = document.getElementById("hint-modal");
  const hintImage = document.getElementById("hint-image");
  const exitModal = document.getElementById("exit-modal");
  const passwordInput = document.getElementById("password-input");
  const passwordSubmit = document.getElementById("password-submit");

  // ベッド領域クリック：ヒント画像 bg1_hint1.jpg を表示
  bedArea.addEventListener("click", (e) => {
    e.stopPropagation();  // シーン切替のイベントに干渉しないように
    hintImage.src = "images/bg1_hint1.jpg";
    hintModal.style.display = "flex";
    hintBox.textContent = "ベッドには謎の紙片が残されている…";
  });

  // キャスター領域クリック：ヒント画像 bg1_hint2.jpg を表示
  casterArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint2.jpg";
    hintModal.style.display = "flex";
    hintBox.textContent = "キャスターに妙な跡がある…";
  });

  // ヒントモーダルをクリックすると閉じる
  hintModal.addEventListener("click", () => {
    hintModal.style.display = "none";
  });

  // 部屋から出るボタン：謎解きモーダルを表示
  exitButton.addEventListener("click", (e) => {
    e.stopPropagation();
    exitModal.style.display = "flex";
    hintBox.textContent = "";
    passwordInput.value = "";
  });

  // 謎解きモーダル外部をクリックすると閉じる（入力画面外ならモーダルを閉じる）
  exitModal.addEventListener("click", (event) => {
    if (event.target === exitModal) {
      exitModal.style.display = "none";
    }
  });

  // 「鍵を開ける」ボタンのパスワードチェック
  passwordSubmit.addEventListener("click", () => {
    const input = passwordInput.value.trim();
    const correctPassword = "4593";
    if (/^\d{4}$/.test(input)) {
      if (input === correctPassword) {
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