// localStorage 초기화
export function initializeStorage() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
    }
}

// 사용자 가져오기
export function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
}

// 로그인 상태 확인
export function isUserLoggedIn() {
    return !!getLoggedInUser();
}

// 닉네임 설정
export function setNickname(nicknameElementId) {
    const nicknameElement = document.getElementById(nicknameElementId);
    const user = getLoggedInUser();
    if (nicknameElement) {
        nicknameElement.textContent = user || "Guest";
    }
}
