document.addEventListener("DOMContentLoaded", () => {
  const writeBtn = document.querySelector(".intro .btn.primary");

  writeBtn?.addEventListener("click", () => {
    console.log("[EVT] 게시글 작성 버튼 클릭");

    location.href = "./post-create.html";
  });

  const postCards = document.querySelectorAll(".board .post");

  postCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const postId = card.dataset.postId ?? String(index + 1);

      console.log("[EVT] 게시글 카드 클릭", { index, postId });

      location.href = `./post-detail.html?id=${encodeURIComponent(postId)}`;
    });
  });

  const avatarBtn = document.querySelector(".site-header .avatar");
  const menu = document.querySelector(".profile-menu");

  avatarBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("[EVT] 헤더 아바타 클릭");
    if (!menu) return;
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!menu || !menu.classList.contains("open")) return;

    if (e.target === avatarBtn || menu.contains(e.target)) return;
    menu.classList.remove("open");
  });

  if (menu) {
    menu.addEventListener("click", (e) => {
      const item = e.target.closest("[data-action]");
      if (!item) return;

      const action = item.dataset.action;
      console.log("[EVT] 프로필 메뉴 클릭", action);

      switch (action) {
        case "profile":
          location.href = "./profile-edit.html";
          break;
        case "password":
          location.href = "./password-edit.html";
          break;
        case "logout":
          alert("로그아웃 이벤트 발생! (나중에 API 연동)");
          break;
        default:
          break;
      }
    });
  }
});
