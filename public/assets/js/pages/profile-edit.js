document.addEventListener("DOMContentLoaded", () => {
  const nickInput = document.getElementById("nick");
  const nickSaveBtn = document.querySelector(".btn-save-nick");
  const avatarInput = document.querySelector(
    '.avatar-uploader input[type="file"]'
  );
  const avatarImg = document.querySelector(".avatar-uploader img");
  const doneBtn = document.querySelector(".btn.done");
  const pwLink = document.querySelector(".btn-password");

  nickInput?.addEventListener("input", () => {
    console.log("[EVT] 닉네임 입력 변경", nickInput.value);
  });

  nickSaveBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const nickname = nickInput.value.trim();
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    console.log("[EVT] 닉네임 저장 클릭", nickname);
    alert("이벤트 처리 OK! (2-2에서 프로필 수정 API 붙일 예정)");
  });

  avatarInput?.addEventListener("change", () => {
    const file = avatarInput.files?.[0];
    console.log("[EVT] 프로필 이미지 선택", file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (avatarImg) avatarImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  pwLink?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("[EVT] 비밀번호 변경 페이지 이동");
    location.href = "./password-edit.html";
  });

  doneBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("[EVT] 프로필 수정 완료 클릭");
    history.back();
  });
});
