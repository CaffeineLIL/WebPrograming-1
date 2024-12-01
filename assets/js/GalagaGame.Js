document.addEventListener("DOMContentLoaded", () => {
    const gameScreen = document.querySelector(".galaga-game-screen");
    const scoreElement = document.getElementById("score");
    const nicknameElement = document.getElementById("nickname");
    const gameWidth = 800;
    const gameHeight = 600;
    let score = 0;

    gameScreen.style.width = `${gameWidth}px`;
    gameScreen.style.height = `${gameHeight}px`;

    const player = {
        x: gameWidth / 2 - 25,
        y: gameHeight - 60,
        width: 50,
        height: 50,
        dx: 0,
        speed: 5,
        element: null
    };

    const bullets = [];
    const enemies = [];
    const enemySpeed = 2;

    // 닉네임 표시
    const loggedInUser = localStorage.getItem("loggedInUser");
    nicknameElement.textContent = loggedInUser || "Guest";

    // 게임 초기화
    function initializeGame() {
        gameScreen.innerHTML = ""; // 기존 게임 화면 초기화
        player.element = createPlayer();
        spawnEnemies();
        gameLoop();
    }

    // 플레이어 생성
    function createPlayer() {
        const playerElement = document.createElement("div");
        playerElement.style.position = "absolute";
        playerElement.style.left = `${player.x}px`;
        playerElement.style.bottom = `${player.y}px`;
        playerElement.style.width = `${player.width}px`;
        playerElement.style.height = `${player.height}px`;
        playerElement.style.backgroundColor = "green";
        gameScreen.appendChild(playerElement);
        return playerElement;
    }

    // 적 생성
    function spawnEnemies() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const enemy = {
                    x: 100 * j,
                    y: 50 + 100 * i,
                    width: 40,
                    height: 40,
                    element: null
                };
                const enemyElement = document.createElement("div");
                enemyElement.style.position = "absolute";
                enemyElement.style.left = `${enemy.x}px`;
                enemyElement.style.top = `${enemy.y}px`;
                enemyElement.style.width = `${enemy.width}px`;
                enemyElement.style.height = `${enemy.height}px`;
                enemyElement.style.backgroundColor = "red";
                gameScreen.appendChild(enemyElement);
                enemy.element = enemyElement;
                enemies.push(enemy);
            }
        }
    }

    // 총알 발사
    function shootBullet() {
        const bullet = {
            x: player.x + player.width / 2 - 5,
            y: player.y,
            width: 10,
            height: 20,
            element: null
        };

        const bulletElement = document.createElement("div");
        bulletElement.style.position = "absolute";
        bulletElement.style.left = `${bullet.x}px`;
        bulletElement.style.bottom = `${bullet.y}px`;
        bulletElement.style.width = `${bullet.width}px`;
        bulletElement.style.height = `${bullet.height}px`;
        bulletElement.style.backgroundColor = "yellow";
        gameScreen.appendChild(bulletElement);
        bullets.push(bullet);
    }

    // 총알 움직임
    function moveBullets() {
        bullets.forEach((bullet, index) => {
            bullet.y += 10;
            bullet.element.style.bottom = `${bullet.y}px`;
            if (bullet.y > gameHeight) {
                gameScreen.removeChild(bullet.element);
                bullets.splice(index, 1);
            }
        });
    }

    // 적 이동
    function moveEnemies() {
        enemies.forEach(enemy => {
            enemy.y += enemySpeed;
            enemy.element.style.top = `${enemy.y}px`;

            if (enemy.y > gameHeight) {
                enemy.y = 0;
            }
        });
    }

    // 충돌 검사
    function checkCollisions() {
        bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemy, enemyIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    // 적과 총알이 충돌한 경우
                    gameScreen.removeChild(bullet.element);
                    gameScreen.removeChild(enemy.element);
                    bullets.splice(bulletIndex, 1);
                    enemies.splice(enemyIndex, 1);
                    score += 10;
                    scoreElement.textContent = score;
                }
            });
        });
    }

    // 게임 루프
    function gameLoop() {
        moveBullets();
        moveEnemies();
        checkCollisions();
        requestAnimationFrame(gameLoop);
    }

    // 키 이벤트 처리
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            player.dx = -player.speed;
        } else if (e.key === "ArrowRight") {
            player.dx = player.speed;
        } else if (e.key === " ") {
            shootBullet();
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            player.dx = 0;
        }
    });

    // 플레이어 이동
    function movePlayer() {
        player.x += player.dx;
        if (player.x < 0) player.x = 0;
        if (player.x > gameWidth - player.width) player.x = gameWidth - player.width;
        player.element.style.left = `${player.x}px`;
    }

    // 게임 초기화 실행
    initializeGame();
    setInterval(movePlayer, 1000 / 60); // 60 FPS로 플레이어 이동 처리
});
