document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript 読み込み完了");

  // ★ シーン管理
  const scenes = document.querySelectorAll('.scene');
  function showScene(sceneId) {
    scenes.forEach(scene => scene.style.display = "none");
    document.getElementById(sceneId).style.display = "block";
  }

  showScene("title-screen");

  document.getElementById("title-screen").addEventListener("click", () => {
    showScene("narration-screen");
  });

  const narrationTexts = [
    "君は目を覚ますと、自分の部屋にいた…",
    "部屋から出ようとするが、鍵がかかっている…",
    "どうやらこの鍵を開けないと出られないようだ。"
  ];
  let narrationIndex = 0;
  document.getElementById("narration-screen").addEventListener("click", () => {
    narrationIndex++;
    if (narrationIndex < narrationTexts.length) {
      document.getElementById("narration-content").innerHTML = `<p>${narrationTexts[narrationIndex]}</p>`;
    } else {
      showScene("game-screen");
    }
  });

  // ★ ゲーム進行部分
  const bedArea = document.getElementById("bed-area");
  const casterArea = document.getElementById("caster-area");
  const exitButton = document.getElementById("exit-button");

  const hintModal = document.getElementById("hint-modal");
  const hintImage = document.getElementById("hint-image");
  const exitModal = document.getElementById("exit-modal");
  const passwordInput = document.getElementById("password-input");
  const passwordSubmit = document.getElementById("password-submit");

  bedArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint1.jpg";
    hintModal.style.display = "flex";
    hintModal.innerHTML = `<div class="modal-content"><p>ベッドには謎の紙片が残されている…</p></div>`;
  });

  casterArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint2.jpg";
    hintModal.style.display = "flex";
    hintModal.innerHTML = `<div class="modal-content"><p>キャスターに妙な跡がある…</p></div>`;
  });

  hintModal.addEventListener("click", () => {
    hintModal.style.display = "none";
  });

  exitButton.addEventListener("click", (e) => {
    e.stopPropagation();
    exitModal.style.display = "flex";
    passwordInput.value = "";
  });

  exitModal.addEventListener("click", (event) => {
    if (event.target === exitModal) {
      exitModal.style.display = "none";
    }
  });

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

  // ★ ヒントボタンの追加（JSで動的に追加）
  const hintButton = document.createElement("button");
  hintButton.textContent = "ヒント";
  hintButton.id = "hint-button";
  hintButton.classList.add("button");
  document.getElementById("game-screen").appendChild(hintButton);

  // ヒントテキストエリアを追加
  const hintText = document.createElement("p");
  hintText.id = "hint-text";
  hintText.textContent = "";
  hintText.style.display = "none";
  document.getElementById("game-screen").appendChild(hintText);

  // ヒントボタンクリックでテキスト表示 & 3秒後に消える
  hintButton.addEventListener("click", () => {
    hintText.textContent = "くはっ！数字は別のヒントの色と連動しているよ！";
    hintText.style.display = "block";

    // 3秒後に自動で消える
    setTimeout(() => {
      hintText.style.display = "none";
    }, 3000);
  });

  // どこかをタップするとヒントが消える
  document.addEventListener("click", (event) => {
    if (event.target !== hintButton) {
      hintText.style.display = "none";
    }
  });
});