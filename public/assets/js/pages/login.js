document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");
  const emailEl = document.getElementById("email");
  const pwEl = document.getElementById("password");
  const signupBtn = document.querySelector(".link-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailEl.value.trim();
    const password = pwEl.value.trim();

    console.log("[EVT] 로그인 제출 클릭", { email, password });

    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    alert("이벤트 처리 OK! (2-2에서 실제 로그인 API 붙일 예정)");
  });

  signupBtn?.addEventListener("click", () => {
    console.log("[EVT] 회원가입 버튼 클릭");
    location.href = "./signup.html";
  });

  emailEl.addEventListener("input", () => {
    console.log("[EVT] 이메일 input 변경:", emailEl.value);
  });
});
