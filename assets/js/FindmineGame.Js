document.addEventListener("DOMContentLoaded", () => {
    const rows = 10; // 행 개수
    const cols = 10; // 열 개수
    const mines = 10; // 지뢰 개수
    const board = []; // 게임 보드 데이터
    const gameScreen = document.querySelector(".game-screen");
    const nicknameElement = document.getElementById("nickname");
    const scoreElement = document.getElementById("score");

    // 닉네임 표시 (localStorage 연동)
    const loggedInUser = localStorage.getItem("loggedInUser");
    nicknameElement.textContent = loggedInUser || "Guest";

    // 게임 초기화
    // 게임 초기화 함수 수정
function initializeGame() {
    gameScreen.innerHTML = ""; // 기존 게임 화면 초기화

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
            initializeGame();
            return;
        }

        cell.classList.add("revealed");
        const mineCount = countAdjacentMines(row, col);
        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            revealAdjacentCells(row, col);
        }
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

    // 초기화 실행
    initializeGame();
});
