document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".pw-form");
  const currentEl = document.getElementById("current");
  const newEl = document.getElementById("new");
  const confirmEl = document.getElementById("confirm");
  const cancelBtn = document.querySelector(".btn.secondary");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const current = currentEl.value.trim();
    const pwNew = newEl.value.trim();
    const confirm = confirmEl.value.trim();

    console.log("[EVT] 비밀번호 변경 제출", { current, pwNew, confirm });

    if (!current || !pwNew || !confirm) {
      alert("모든 비밀번호 필드를 입력해주세요.");
      return;
    }
    if (pwNew !== confirm) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    alert("이벤트 처리 OK! (2-2 단계에서 비밀번호 변경 API 붙일 예정)");
  });

  cancelBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("[EVT] 비밀번호 변경 취소 클릭");
    history.back();
  });
});
