const $ = (sel, el = document) => el.querySelector(sel);

function setHelper(fieldEl, text = "", isError = false) {
  const helper = fieldEl?.querySelector(".helper");
  if (!helper) return;
  helper.textContent = text;
  helper.classList.toggle("error", !!isError);
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = $(".form");
  const emailEl = $("#email");
  const pwEl = $("#pw");
  const pw2El = $("#pw2");
  const nickEl = $("#nick");
  const avatarIn = $("#avatar");
  const avatarBox = $(".avatar-upload");
  const loginLink = $(".link-btn");
  const submitBtn = $(".btn.primary");

  avatarIn.addEventListener("change", () => {
    const file = avatarIn.files?.[0];
    console.log("[EVT] 아바타 선택됨", file);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      avatarBox.style.backgroundImage = `url('${e.target.result}')`;
      avatarBox.style.backgroundSize = "cover";
      avatarBox.style.backgroundPosition = "center";
      const plus = avatarBox.querySelector(".plus");
      if (plus) plus.style.opacity = "0";
      setHelper(avatarBox.closest(".field"), "");
    };
    reader.readAsDataURL(file);
  });

  emailEl.addEventListener("input", () => {
    const field = emailEl.closest(".field");
    const value = emailEl.value.trim();

    if (!value) {
      setHelper(field, "이메일을 입력하세요.", true);
    } else if (!isValidEmail(value)) {
      setHelper(field, "이메일 형식이 올바르지 않습니다.", true);
    } else {
      setHelper(field, "", false);
    }
  });

  const checkPasswordMatch = () => {
    const field = pw2El.closest(".field");
    const pw = pwEl.value.trim();
    const pw2 = pw2El.value.trim();

    if (!pw2) {
      setHelper(field, "비밀번호 확인을 입력하세요.", true);
      return;
    }
    if (pw !== pw2) {
      setHelper(field, "비밀번호가 일치하지 않습니다.", true);
    } else {
      setHelper(field, "비밀번호가 일치합니다.", false);
    }
  };

  pwEl.addEventListener("input", checkPasswordMatch);
  pw2El.addEventListener("input", checkPasswordMatch);

  nickEl.addEventListener("input", () => {
    const field = nickEl.closest(".field");
    const value = nickEl.value.trim();

    if (!value) {
      setHelper(field, "닉네임을 입력하세요.", true);
    } else {
      setHelper(field, "", false);
    }
  });

  loginLink.addEventListener("click", () => {
    console.log("[EVT] 로그인하러 가기 클릭");

    location.href = "./login.html";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailEl.value.trim();
    const password = pwEl.value.trim();
    const confirm = pw2El.value.trim();
    const nickname = nickEl.value.trim();
    const avatarFile = avatarIn.files?.[0] || null;

    console.log("[EVT] 회원가입 제출 클릭", {
      email,
      password,
      confirm,
      nickname,
      avatarFile,
    });

    let hasError = false;

    if (!email) {
      setHelper(emailEl.closest(".field"), "이메일을 입력하세요.", true);
      hasError = true;
    } else if (!isValidEmail(email)) {
      setHelper(
        emailEl.closest(".field"),
        "이메일 형식이 올바르지 않습니다.",
        true
      );
      hasError = true;
    }

    if (!password) {
      setHelper(pwEl.closest(".field"), "비밀번호를 입력하세요.", true);
      hasError = true;
    }
    if (!confirm) {
      setHelper(pw2El.closest(".field"), "비밀번호 확인을 입력하세요.", true);
      hasError = true;
    }
    if (password && confirm && password !== confirm) {
      setHelper(pw2El.closest(".field"), "비밀번호가 일치하지 않습니다.", true);
      hasError = true;
    }

    if (!nickname) {
      setHelper(nickEl.closest(".field"), "닉네임을 입력하세요.", true);
      hasError = true;
    }

    if (hasError) {
      alert("입력값을 다시 확인해 주세요.");
      return;
    }

    alert("이벤트 처리 OK! (2-2 단계에서 실제 회원가입 Fetch 붙일 예정)");
  });
});
