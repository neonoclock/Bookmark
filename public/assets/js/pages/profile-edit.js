import {
  $,
  setHelper,
  clearFormHelpers,
  setDisabled,
  on,
} from "../core/dom.js";
import { loadUserId, loadAuth, saveAuth, clearAuth } from "../core/storage.js";
import { UsersAPI } from "../api/users.js";

let currentProfileImage = null;

async function loadProfile() {
  const userId = loadUserId();
  if (!userId) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    window.location.href = "./login.html";
    return;
  }

  const emailEl = $(".field .readonly");
  const nickInput = $("#nick");
  const avatarImg = $(".avatar-uploader img");

  try {
    const user = await UsersAPI.getUser(userId);
    console.log("[PROFILE] loaded user:", user);

    if (emailEl && user.email) {
      emailEl.textContent = user.email;
    }

    if (nickInput) {
      nickInput.value = user.nickname || "";
    }

    if (user.profileImage) {
      avatarImg.src = user.profileImage;
      currentProfileImage = user.profileImage;
    } else {
      currentProfileImage = null;
    }
  } catch (e) {
    console.error(e);
    alert("회원 정보를 불러오지 못했습니다.");
  }
}

function validateForm() {
  const nickInput = $("#nick");
  const nickname = nickInput.value.trim();

  clearFormHelpers(document);

  if (!nickname) {
    setHelper(nickInput, "닉네임을 입력하세요.", true);
    nickInput.focus();
    return false;
  }

  return true;
}

async function handleUpdateProfile(e) {
  e.preventDefault();

  const userId = loadUserId();
  if (!userId) {
    alert("로그인이 필요합니다.");
    window.location.href = "./login.html";
    return;
  }

  if (!validateForm()) return;

  const nickInput = $("#nick");
  const submitBtn = $(".btn.primary.block") || $(".btn.primary.pill");

  const nickname = nickInput.value.trim();

  try {
    setDisabled(submitBtn, true);

    const result = await UsersAPI.updateProfile(userId, {
      nickname,
      profileImage: currentProfileImage,
    });

    console.log("[PROFILE] update result:", result);

    const auth = loadAuth();
    if (auth) {
      saveAuth({
        ...auth,
        nickname,
        profileImage: currentProfileImage,
      });
    }

    alert("프로필이 수정되었습니다.");
  } catch (e) {
    console.error(e);
    alert(e.message || "프로필 수정에 실패했습니다.");
  } finally {
    setDisabled(submitBtn, false);
  }
}

function setupAvatarUploader() {
  const fileInput = document.querySelector(".avatar-uploader input[type=file]");
  const avatarImg = document.querySelector(".avatar-uploader img");

  if (!fileInput || !avatarImg) return;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    console.log("[PROFILE] avatar selected:", file);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result;
      if (typeof base64 === "string") {
        avatarImg.src = base64;
        currentProfileImage = base64;
      }
    };
    reader.readAsDataURL(file);
  });
}

function setupAccountButtons() {
  const logoutBtn = document.querySelector(".menu-logout");
  const deleteBtn = document.querySelector(".link.danger");
  const submitBtn = $(".btn.primary.block") || $(".btn.primary.pill");

  const userId = loadUserId();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (!confirm("로그아웃 하시겠습니까?")) return;
      clearAuth();
      window.location.href = "./login.html";
    });
  }

  if (deleteBtn && userId) {
    deleteBtn.addEventListener("click", async () => {
      const ok = confirm(
        "정말 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      );
      if (!ok) return;

      try {
        setDisabled(deleteBtn, true);
        await UsersAPI.deleteUser(userId);
        alert("회원 탈퇴가 완료되었습니다.");
        clearAuth();
        window.location.href = "./login.html";
      } catch (e) {
        console.error(e);
        alert(e.message || "회원 탈퇴에 실패했습니다.");
      } finally {
        setDisabled(deleteBtn, false);
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", handleUpdateProfile);
  }

  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", handleUpdateProfile);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[PROFILE] profile-edit page init");
  const avatarHelper = document.querySelector(".section.profile .helper");
  if (avatarHelper) {
    avatarHelper.textContent = "";
    avatarHelper.style.display = "none";
  }

  setupAvatarUploader();
  setupAccountButtons();
  loadProfile();
});
