# 이승호 - 웹프로그래밍 과제 #1 보고서

## 0. 계층 설명 및 실행화면

### 메인 화면
![image](https://github.com/user-attachments/assets/501d9645-7a28-4a74-a907-fe6505391b85)
![image](https://github.com/user-attachments/assets/ebc3b85d-d121-4c23-9099-c57f4eaa057b)


### 로그인 화면
![image](https://github.com/user-attachments/assets/a328daf3-054a-40b8-8b01-d1ab18eb5e75)


### 게임 화면
![image](https://github.com/user-attachments/assets/da694513-a550-416b-8ee7-3982599f479b)
![image](https://github.com/user-attachments/assets/593469b2-6ae7-4d23-9c03-7e1a6c56b06f)
![image](https://github.com/user-attachments/assets/a4d8cb8c-5637-483e-9f28-058472dd54e9)


### 계층 설명
![image](https://github.com/user-attachments/assets/b25e8e63-8bb4-454c-812d-516fc21a9225)

- `assets`, `templates` 폴더와 다양한 하위 디렉토리를 사용하여 파일을 관리하였습니다. 이를 통해 사후 관리를 용이하게 하였습니다.
- CSS 파일을 일반 페이지 창, 게임 화면 창으로 나누어 디자인을 효율적으로 관리하였습니다.
- `href`를 적절히 연결하여 Live Server에서 정상적으로 구동되도록 하였습니다. 로컬 환경에서 CSS가 깨져 보이지만, Live Server를 사용하면 잘 작동하므로 그대로 진행하였습니다.

## 1. 메인 화면 - `index.html`

### 1-1: 헤드 부분
![image](https://github.com/user-attachments/assets/019436bd-55ac-4f8b-bc78-952488bfa9e0)

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>고전게임 페이지</title>
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
```
- 인코딩을 설정해 주고, <link rel="stylesheet" href="/assets/css/styles.css">를 통해 css 파일을 연결하여 줍니다.

### 1-2: 바디 부분

#### 네비게이션 바
![image](https://github.com/user-attachments/assets/edd9d9a0-b3df-43fa-9cbf-e3bbd22bb535)

```html
<header>
  <nav>
    <ul>
      <li><a href="/index.html">홈</a></li>
      <li><a href="/index.html#games">게임 선택</a></li>
      <li><a href="templates/login.html">로그인</a></li>
    </ul>
  </nav>
</header>
```

- ```<nav> ```태그를 사용하여 네비게이션 바를 만들고 href를 통해 각 메뉴에 맞는 하이퍼링크를 걸어줍니다. 홈을 누르면 메인 페이지로, 게임 선택을 누르면 index.html의 games id로 이동하여 빠르게 게임을 선택할 수 있도록 해줍니다.
- ![image](https://github.com/user-attachments/assets/b17bca57-b9cc-4d0a-99f5-146d5907f506)


#### 네비게이션 바 스타일 (`styles.css`)
```css
nav {
  background-color: #333;
  color: white;
  padding: 15px;
  text-align: center;
}
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
nav ul li {
  display: inline;
  margin: 0 15px;
}
nav ul li a {
  color: white;
  text-decoration: none;
}
```

#### 메인 화면
![image](https://github.com/user-attachments/assets/cc24afd3-98a6-47af-be7c-5f5dfe7d2759)

```html
<section class="section">
  <div class="game-banner">
    <div class="overlay">
      <div class="main-title">
        <h1><span style="color: aqua;">레트로 게임</span>에 빠져들 시간입니다.</h1>
        <h3>당장 시작하자</h3>
      </div>
    </div>
  </div>
</section>
```
- `section` 태그를 사용해 구조화하였고, CSS로 배경 색상을 지정하였습니다.

#### 배경 스타일 (`styles.css`)
```css
.game-banner {
  position: relative;
  background-color: #353b41;
  background-image: url(/assets/img/ClassicGame.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: white;
  padding: 300px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.main-title {
  z-index: 2;
  color: white;
  text-align: center;
  font-family: 'Arial', sans-serif;
}
.main-title h1 {
  font-size: 80px;
  font-weight: bold;
  font-family: 'pixel', sans-serif;
}
.main-title h3 {
  font-size: 24px;
}
```
- `@font-face` 선언을 통해 폰트를 로드하고 사용했습니다.


### 게임 선택 창
![image](https://github.com/user-attachments/assets/80f9bc8e-e067-4124-bb90-45762a65e158)

```html
<h2><span id="games">게임 선택</span></h2>
<div class="game-list">
  <div class="game-item">
    <h3><span class="game-title">지뢰 찾기</span></h3>
    <p>지뢰를 피해 안전한 블록을 모두 찾으세요!</p>
    <a class="game-title" href="/templates/games/findmine.html">게임 시작</a>
  </div>
  <div class="game-item">
    <h3><span class="game-title">벽돌 깨기</span></h3>
    <p>벽돌을 모두 부수고 점수를 높이세요!</p>
    <a class="game-title" href="/templates/games/brickcrash.html">게임 시작</a>
  </div>
  <div class="game-item">
    <h3><span class="game-title">갤러그</span></h3>
    <p>적의 공격을 피하고 모든 적을 무찌르세요!</p>
    <a class="game-title" href="/templates/games/galaga.html">게임 시작</a>
  </div>
</div>
```

### 게임 선택 스타일 (`styles.css`)

```css
#games {
  background-color: #e9ecef;
}
.game-list {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
.game-item {
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
  text-align: center;
}
.game-item a {
  display: inline-block;
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  margin-top: 10px;
}
.game-item a:hover {
  background-color: #0056b3;
}
.game-title {
  font-family: 'pixel', sans-serif;
}
```

#### 푸터
```html
<footer>
  <p>© 20234031 이승호 - 모든 권리 보유. 이건 제 홈페이지입니다. 제 마음대로 할 수 있는겁니다.</p>
  <p>@ 20234031 Lee Seungho - All right reserved</p>
</footer>
```

```css
footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}
```

## 2. `login.html` - 로그인 화면
![image](https://github.com/user-attachments/assets/1a9790ed-e885-4032-b1ae-a4054521ffb5)

### 2-1: 헤더
```html
<header>
  <nav>
    <ul>
      <li><a href="/index.html">홈</a></li>
      <li><a href="/index.html#games">게임 선택</a></li>
      <li><a href="/templates/login.html">로그인</a></li>
    </ul>
  </nav>
</header>
```

### 2-2: 로그인 폼
```html
<form method="post" action="/login">
  <div>
    <label for="id">아이디</label>
    <input type="text" id="id" name="id" required>
  </div>
  <div>
    <label for="passwd">비밀번호</label>
    <input type="password" id="passwd" name="passwd" required>
  </div>
  <div class="form-group">
    <input type="submit" value="로그인">
  </div>
</form>

<form method="post" action="/member">
  <div class="signup-link">
    아이디가 없나요? <a href="/member">계정을 만드세요!</a>
  </div>
</form>
```

## 3. 게임 화면
![image](https://github.com/user-attachments/assets/97ef63b6-9ca2-44cf-9c4d-56e9881d6e5f)

### `brickcrash.html` 
```html
<section id="games" class="section">
  <h1>벽돌깨기 게임</h1>
  <div class="game-container">
    <div class="game-screen"></div>
    <div class="game-info">
      <div><label>닉네임: <span id="nickname">Player1</span></label></div>
      <div><label>점수: <span id="score">99999999</span></label></div>
    </div>
  </div>
</section>
```

### 게임 화면 스타일 (`gamestyles.css`)
```css
.game-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-screen {
  width: 640px;
  height: 480px;
  background-color: #353b41;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.game-screen::before {
  content: '게임 실행 칸 (여기에 나중에 JS로 게임이 들어갈 예정)';
  color: gray;
  font-size: 1.2em;
}
.game-info {
  width: 640px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.game-info label {
  font-size: 1.2em;
}
.game-info span {
  font-weight: bold;
}
```

- 게임 화면을 별도의 `gamestyles.css`로 관리
