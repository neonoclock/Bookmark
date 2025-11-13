// public/assets/js/core/dom.js

// 기본 DOM 선택 헬퍼들
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

/**
 * target 기준으로 가장 가까운 "필드 컨테이너(.field, .form-field)"를 찾아줌
 * - <div class="field">...</div>
 * - <div class="form-field">...</div>
 * 이런 박스를 찾아서 반환
 */
export function getField(target) {
  const el = typeof target === "string" ? $(target) : target;
  if (!el) return null;

  // 이미 field/form-field라면 그대로 사용
  if (el.classList?.contains("field") || el.classList?.contains("form-field")) {
    return el;
  }

  // 아니라면 가장 가까운 부모 중에서 field/form-field 탐색
  return el.closest(".field, .form-field");
}

/**
 * 필드 내부의 .helper에 메시지를 세팅하고, 에러 여부에 따라 스타일을 토글
 *
 * 사용 예시)
 *  const emailInput = $("#email");
 *  setHelper(emailInput, "이메일 형식이 올바르지 않습니다.", true);
 *
 *  const pwField = $("#pw").closest(".field");
 *  setHelper(pwField, "비밀번호는 8자 이상이어야 합니다.", true);
 *
 *  // 메시지 지우기
 *  setHelper(pwField, "");
 */
export function setHelper(target, text = "", isError = false) {
  const fieldEl = getField(target);
  if (!fieldEl) return;

  const helper = fieldEl.querySelector(".helper");
  if (!helper) return;

  // 텍스트 세팅
  helper.textContent = text;

  // .error 클래스 토글 (auth.css / signup.css 등에서 스타일 줄 수 있음)
  helper.classList.toggle("error", !!isError);

  // 메시지가 없으면 안 보이게, 있으면 보이게
  if (text && text.trim().length > 0) {
    helper.style.display = "block";
  } else {
    helper.style.display = "none";
  }
}

/**
 * form(또는 루트 요소) 안의 모든 .helper를 초기화
 *
 * 사용 예시)
 *  const form = $(".form");
 *  clearFormHelpers(form);
 */
export function clearFormHelpers(root) {
  const el = typeof root === "string" ? $(root) : root;
  if (!el) return;

  const helpers = el.querySelectorAll(".helper");
  helpers.forEach((helper) => {
    helper.textContent = "";
    helper.classList.remove("error");
    helper.style.display = "none";
  });
}

/**
 * 버튼 비활성화/활성화 도우미
 *
 * 사용 예시)
 *  const submitBtn = $(".btn.primary", form);
 *  setDisabled(submitBtn, true);  // 클릭 막기 + 로딩 스타일 토글
 *  setDisabled(submitBtn, false);
 */
export function setDisabled(target, disabled = true) {
  const el = typeof target === "string" ? $(target) : target;
  if (!el) return;

  el.disabled = !!disabled;
  el.classList.toggle("is-loading", !!disabled);
}

/**
 * 이벤트 바인딩 헬퍼 (선택 사항)
 *
 * 사용 예시)
 *  on(".link-btn", "click", () => { ... });
 *  on("#email", "input", (e) => { ... });
 */
export function on(target, event, handler, root = document) {
  const el = typeof target === "string" ? $(target, root) : target;
  if (!el) return;
  el.addEventListener(event, handler);
}
