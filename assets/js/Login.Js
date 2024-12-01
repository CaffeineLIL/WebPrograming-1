// login.js

// 로컬 스토리지 초기화
function initializeStorage() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([])); // 빈 사용자 목록 초기화
    }
}

// 회원가입 또는 로그인 처리
function handleLoginOrRegister(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const usernameInput = document.getElementById("id").value.trim();
    const passwordInput = document.getElementById("passwd").value.trim();

    if (!usernameInput || !passwordInput) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const existingUser = storedUsers.find(user => user.username === usernameInput);

    if (existingUser) {
        // 로그인 시도
        if (existingUser.password === passwordInput) {
            alert("로그인 성공!");
            localStorage.setItem("loggedInUser", usernameInput); // 로그인된 사용자 저장
            window.location.href = "/index.html"; // 홈으로 이동
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    } else {
        // 회원가입 처리
        const newUser = { username: usernameInput, password: passwordInput };
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        alert("회원가입 완료!");
    }
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
    initializeStorage();
    const loginForm = document.querySelector("form[action='/login']");
    loginForm.addEventListener("submit", handleLoginOrRegister);
});
