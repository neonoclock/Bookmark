document.addEventListener("DOMContentLoaded", () => {
  const likeStat = document.querySelector(".stats .stat");
  const likeCountEl = likeStat?.querySelector("strong");

  const commentTextarea = document.querySelector(".comment-write textarea");
  const commentBtn = document.querySelector(".comment-write .btn.primary");
  const commentsList = document.querySelector(".comments");

  likeStat?.addEventListener("click", () => {
    console.log("[EVT] 좋아요 클릭");

    if (!likeCountEl) return;

    const current = Number(likeCountEl.textContent || "0");
    likeCountEl.textContent = String(current + 1);
  });

  commentBtn?.addEventListener("click", () => {
    const content = commentTextarea.value.trim();
    console.log("[EVT] 댓글 등록 클릭", content);

    if (!content) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const article = document.createElement("article");
    article.className = "comment";
    article.innerHTML = `
      <div class="c-left"><span class="dot"></span></div>
      <div class="c-body">
        <div class="c-head">
          <div class="who">
            <span class="name">나</span>
            <time class="date">${new Date().toLocaleString()}</time>
          </div>
        </div>
        <p class="c-text">${content}</p>
      </div>
    `;

    commentsList?.prepend(article);
    commentTextarea.value = "";
  });
});
