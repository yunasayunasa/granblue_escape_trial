document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript 読み込み完了");

  // ================================
  //  シーン管理
  // ================================
  const scenes = document.querySelectorAll('.scene');
  function showScene(sceneId) {
    scenes.forEach(scene => scene.style.display = "none");
    document.getElementById(sceneId).style.display = "block";
  }

  // 最初はタイトル画面
  showScene("title-screen");

  // タイトル画面をクリック → ナレーションシーン
  document.getElementById("title-screen").addEventListener("click", () => {
    showScene("narration-screen");
  });

  // ================================
  //  ナレーション進行
  // ================================
  const narrationTexts = [
    "君は目を覚ますと、自分の部屋にいた…",
    "部屋から出ようとするが、鍵がかかっている…",
    "どうやらこの鍵を開けないと出られないようだ。"
  ];
  let narrationIndex = 0;

  document.getElementById("narration-screen").addEventListener("click", () => {
    narrationIndex++;
    if (narrationIndex < narrationTexts.length) {
      document.getElementById("narration-content").innerHTML =
        `<p>${narrationTexts[narrationIndex]}</p>`;
    } else {
      showScene("game-screen");
    }
  });

  // ================================
  //  ゲーム進行（ベッド・キャスターなど）
  // ================================
  const bedArea    = document.getElementById("bed-area");
  const casterArea = document.getElementById("caster-area");
  const exitButton = document.getElementById("exit-button");

  // ベッド/キャスター用モーダル
  const hintModal        = document.getElementById("hint-modal");
  const hintImage        = document.getElementById("hint-image");
  const hintTextInModal  = document.getElementById("hint-text-in-modal");

  // 4桁入力モーダル
  const exitModal        = document.getElementById("exit-modal");
  const passwordInput    = document.getElementById("password-input");
  const passwordSubmit   = document.getElementById("password-submit");

  // ベッドをタップ
  bedArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint1.jpg"; // ヒント画像を差し替え
    hintTextInModal.textContent = "ベッドには謎の紙片が残されている…";
    hintModal.style.display = "flex";       // モーダル表示
  });

  // キャスターをタップ
  casterArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint2.jpg";
    hintTextInModal.textContent = "キャスターに妙な跡がある…";
    hintModal.style.display = "flex";
  });

  // モーダルをクリック → 閉じる
  hintModal.addEventListener("click", () => {
    hintModal.style.display = "none";
  });

  // 「部屋から出る」ボタン → 4桁入力モーダルを開く
  exitButton.addEventListener("click", (e) => {
    e.stopPropagation();
    exitModal.style.display = "flex";
    passwordInput.value = "";
  });

  // 4桁入力モーダル外をクリック → 閉じる
  exitModal.addEventListener("click", (event) => {
    if (event.target === exitModal) {
      exitModal.style.display = "none";
    }
  });

  // 4桁入力の判定
  passwordSubmit.addEventListener("click", () => {
    const input = passwordInput.value.trim();
    const correctPassword = "4593";
    if (/^\d{4}$/.test(input)) {
      if (input === correctPassword) {
        alert("鍵が開いた！\n本編は4/1実装予定！お楽しみに！");
        exitModal.style.display = "none";
      } else {
        alert("間違っているようだ...");
        passwordInput.value = "";
      }
    } else {
      alert("間違っているようだ...");
      passwordInput.value = "";
    }
  });

  // ================================
  //  ヒントボタン（画面右上）と一時表示テキスト
  // ================================
  const hintButton = document.createElement("button");
  hintButton.textContent = "ヒント";
  hintButton.id = "hint-button";
  hintButton.classList.add("button");
  document.getElementById("game-screen").appendChild(hintButton);

  const hintText = document.createElement("p");
  hintText.id = "hint-text";
  hintText.textContent = "";
  hintText.style.display = "none";
  document.getElementById("game-screen").appendChild(hintText);

  // ヒントボタンを押す → テキスト表示、3秒後に消える
  hintButton.addEventListener("click", () => {
    hintText.textContent = "くはっ！数字は別のヒントの色と連動しているよ！";
    hintText.style.display = "block";

    // 3秒後に自動で消える
    setTimeout(() => {
      hintText.style.display = "none";
    }, 3000);
  });

  // 画面のどこかをタップするとヒントテキストを消す
  document.addEventListener("click", (event) => {
    // ヒントボタン自身をクリックした場合は除外
    if (event.target !== hintButton) {
      hintText.style.display = "none";
    }
  });
});