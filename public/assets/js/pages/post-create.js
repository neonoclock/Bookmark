document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".post-form");
  const titleEl = document.getElementById("title");
  const contentEl = document.getElementById("content");
  const cancelBtn = document.querySelector(".btn.secondary");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleEl.value.trim();
    const content = contentEl.value.trim();

    console.log("[EVT] 게시글 작성 제출", { title, content });

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    alert("이벤트 처리 OK! (2-2 단계에서 실제 글쓰기 Fetch 붙일 예정)");
  });

  cancelBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("[EVT] 글쓰기 취소 클릭");
    history.back();
  });
});
