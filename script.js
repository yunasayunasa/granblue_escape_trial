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

  // 初期シーン：タイトル画面
  showScene("title-screen");

  // タイトル画面タップでナレーションシーンへ（即時切替）
  titleScreen.addEventListener("click", () => {
    showScene("narration-screen");
  });

  // ★ ナレーションシーンの進行
  const narrationTexts = [
    "君は目を覚ますと、自分の部屋にいた…",
    "部屋から出ようとするが、鍵がかかっている…",
    "どうやらこの鍵を開けないと出られないようだ。"
  ];
  let narrationIndex = 0;
  narrationScreen.addEventListener("click", () => {
    narrationIndex++;
    if (narrationIndex < narrationTexts.length) {
      narrationContent.innerHTML = `<p>${narrationTexts[narrationIndex]}</p>`;
    } else {
      showScene("game-screen");
    }
  });

  // ★ ゲーム進行部分
  const hintBox = document.getElementById("hint-box");
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
    hintBox.textContent = "ベッドには謎の紙片が残されている…";
  });

  casterArea.addEventListener("click", (e) => {
    e.stopPropagation();
    hintImage.src = "images/bg1_hint2.jpg";
    hintModal.style.display = "flex";
    hintBox.textContent = "キャスターに妙な跡がある…";
  });

  hintModal.addEventListener("click", () => {
    hintModal.style.display = "none";
  });

  exitButton.addEventListener("click", (e) => {
    e.stopPropagation();
    exitModal.style.display = "flex";
    hintBox.textContent = "";
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

// CSS を JavaScript で追加
const style = document.createElement("style");
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        background-color: white;
        padding: 20px;
        border: 1px solid #888;
        text-align: center;
        border-radius: 10px;
    }
    .button {
        padding: 10px;
        margin: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
    .button:hover {
        background-color: #0056b3;
    }
`;
document.head.appendChild(style); // CSS を <head> に追加

// ヒントボタンを作成してページに追加
const hintButton = document.createElement("button");
hintButton.textContent = "ヒントを見る";
hintButton.id = "hint-area";
hintButton.classList.add("button");

// ヒントボタンをページの適当な場所に追加（body の最後に追加）
document.body.appendChild(hintButton);

// ヒントのモーダルを作成
const hintModal = document.createElement("div");
hintModal.id = "hintModal";
hintModal.classList.add("modal");
hintModal.style.display = "none"; // 初期状態では非表示

hintModal.innerHTML = `
    <div class="modal-content">
        <p id="hintBox">ここにヒントが表示されます</p>
    </div>
`;

// モーダルを body に追加
document.body.appendChild(hintModal);

// ヒントボタンの動作
hintButton.addEventListener("click", (e) => {
    e.stopPropagation();
    hintModal.style.display = "flex"; // モーダルを表示
    document.getElementById("hintBox").textContent = "ヒント内容: 机の中を調べてみよう！";
});

// モーダル外をクリックしたら閉じる
hintModal.addEventListener("click", (e) => {
    if (e.target === hintModal) {
        hintModal.style.display = "none";
    }
});