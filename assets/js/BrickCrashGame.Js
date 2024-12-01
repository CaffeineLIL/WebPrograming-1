document.addEventListener("DOMContentLoaded", () => {
    // localStorage에서 로그인된 사용자 가져오기
    const loggedInUser = localStorage.getItem("loggedInUser");

    // 닉네임 요소 업데이트
    const nicknameElement = document.getElementById("nickname");
    if (loggedInUser) {
        nicknameElement.textContent = loggedInUser; // 사용자 이름 표시
    } else {
        nicknameElement.textContent = "Guest"; // 기본값
    }

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const nickname = document.getElementById("nickname").textContent;
    const scoreDisplay = document.getElementById("score");
    const highScoreDisplay = document.getElementById("highScore");

    const localStorageKey = `${nickname}_highscore`;  // nickname에 따른 고유 키 생성

    let score = 0;
    let ball = { x: canvas.width / 2, y: canvas.height - 30, dx: 0.5, dy: -0.5, radius: 10 };
    let paddle = { x: (canvas.width - 75) / 2, width: 75, height: 10 };
    let bricks = [];
    let rows = 5;
    let cols = 7;
    let brickWidth = 60;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 35;
    let rightPressed = false;
    let leftPressed = false;
    let isGameRunning = false; // 게임 상태 변수
    let animationId;

    // 초기화된 벽돌 배열
    for (let c = 0; c < cols; c++) {
        bricks[c] = [];
        for (let r = 0; r < rows; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(e) {
        if (e.key === "d" || e.key === "ArrowRight") rightPressed = true;
        else if (e.key === "a" || e.key === "ArrowLeft") leftPressed = true;
    }

    function keyUpHandler(e) {
        if (e.key === "d" || e.key === "ArrowRight") rightPressed = false;
        else if (e.key === "a" || e.key === "ArrowLeft") leftPressed = false;
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                if (bricks[c][r].status === 1) {
                    let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function collisionDetection() {
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                let b = bricks[c][r];
                if (b.status === 1) {
                    if (
                        ball.x > b.x &&
                        ball.x < b.x + brickWidth &&
                        ball.y > b.y &&
                        ball.y < b.y + brickHeight
                    ) {
                        ball.dy = -ball.dy;
                        b.status = 0;
                        score++;
                        scoreDisplay.textContent = score;

                        // 최고 점수 갱신 및 localStorage에 저장
                        const highScore = Math.max(score, getHighScore());
                        localStorage.setItem(localStorageKey, highScore);
                    }
                }
            }
        }
    }

    function getHighScore() {
        return parseInt(localStorage.getItem(localStorageKey)) || 0; // localStorage에서 최고 점수 가져오기
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
        }

        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
            } else {
                // 게임 오버 처리
                const highScore = Math.max(score, getHighScore());
                localStorage.setItem(localStorageKey, highScore); // 최고 점수 갱신
                displayHighScore(); // 화면에 최고 점수 표시
                document.location.reload(); // 새로고침하여 게임 재시작
            }
        }

        if (rightPressed && paddle.x < canvas.width - paddle.width) paddle.x += 4;
        else if (leftPressed && paddle.x > 0) paddle.x -= 4;

        animationId = requestAnimationFrame(draw);
    }

    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
        if (isGameRunning) {
            cancelAnimationFrame(animationId); // 애니메이션 중단
            startButton.textContent = "게임 시작";
        } else {
            draw(); // 게임 시작
            startButton.textContent = "게임 종료";
        }
        isGameRunning = !isGameRunning;
    });

    // 최고 점수 표시
    function displayHighScore() {
        const highScore = getHighScore();
        highScoreDisplay.textContent = `최고 점수: ${highScore} (유저: ${nickname})`;
    }

    // 페이지 로딩 시 최고 점수 표시
    displayHighScore();
    scoreDisplay.textContent = score;
});
