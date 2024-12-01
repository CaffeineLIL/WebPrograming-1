document.addEventListener("DOMContentLoaded", () => {
    const rows = 10; // 행 개수
    const cols = 10; // 열 개수
    const mines = 10; // 지뢰 개수
    const board = []; // 게임 보드 데이터
    const gameScreen = document.querySelector(".game-screen");
    const nicknameElement = document.getElementById("nickname");
    const scoreElement = document.getElementById("score");
    const highScoreElement = document.getElementById("highScore");

    // 닉네임 표시 (localStorage 연동)
    const loggedInUser = localStorage.getItem("loggedInUser");
    nicknameElement.textContent = loggedInUser || "Guest"; // 닉네임 표시

    // 점수와 최고 점수 초기화
    let score = 0;
    const localStorageKey = `${loggedInUser || 'Guest'}_highscore`;

    // 최고 점수 표시 함수
    function displayHighScore() {
        const highScore = localStorage.getItem(localStorageKey) || 0;
        highScoreElement.textContent = highScore; // 최고 점수 표시
        scoreElement.textContent = score; // 현재 점수 표시
    }

    // 게임 초기화
    function initializeGame() {
        gameScreen.innerHTML = ""; // 기존 게임 화면 초기화

        // 점수 초기화
        score = 0; // 게임이 시작될 때 점수는 0으로 초기화
        displayHighScore(); // 점수 초기화 후 다시 표시

        // 보드 데이터 및 셀 생성
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = { mine: false, revealed: false, flagged: false };

                // 셀 생성
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;

                // 클릭 이벤트 추가
                cell.addEventListener("click", () => revealCell(i, j));
                cell.addEventListener("contextmenu", (e) => toggleFlag(e, i, j));
                gameScreen.appendChild(cell);
            }
        }

        // 게임 보드 스타일 적용
        gameScreen.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gameScreen.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        // 지뢰 배치
        placeMines();
        displayHighScore(); // 초기 점수 표시
    }

    // 지뢰 배치
    function placeMines() {
        let placedMines = 0;
        while (placedMines < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (!board[row][col].mine) {
                board[row][col].mine = true;
                placedMines++;
            }
        }
    }

    // 셀 공개
    function revealCell(row, col) {
        if (board[row][col].revealed || board[row][col].flagged) return;

        const cell = getCellElement(row, col);
        board[row][col].revealed = true;

        if (board[row][col].mine) {
            cell.classList.add("mine");
            cell.textContent = "💣";
            alert("게임 오버!");
            // 최고 점수 갱신
            updateHighScore();
            initializeGame(); // 게임 초기화
            return;
        }

        cell.classList.add("revealed");
        const mineCount = countAdjacentMines(row, col);
        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            revealAdjacentCells(row, col);
        }

        // 점수 증가
        score++;
        displayHighScore();
    }

    // 플래그 토글
    function toggleFlag(e, row, col) {
        e.preventDefault();
        const cell = getCellElement(row, col);
        if (board[row][col].revealed) return;

        board[row][col].flagged = !board[row][col].flagged;
        cell.classList.toggle("flagged");
    }

    // 인접 지뢰 카운트
    function countAdjacentMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < cols &&
                    board[newRow][newCol].mine
                ) {
                    count++;
                }
            }
        }
        return count;
    }

    // 인접 셀 공개
    function revealAdjacentCells(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < cols &&
                    !board[newRow][newCol].revealed &&
                    !board[newRow][newCol].mine
                ) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }

    // 셀 요소 가져오기
    function getCellElement(row, col) {
        return gameScreen.querySelector(
            `.cell[data-row='${row}'][data-col='${col}']`
        );
    }

    // 최고 점수 갱신
    function updateHighScore() {
        const highScore = localStorage.getItem(localStorageKey) || 0;
        if (score > highScore) {
            localStorage.setItem(localStorageKey, score); // 최고 점수 갱신
        }
    }

    // 초기화 실행
    initializeGame();
});
