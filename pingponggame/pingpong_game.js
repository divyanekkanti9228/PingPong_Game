let gameState = 'start';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect();
let a = Math.floor(Math.random() * 4) + 3;
let b = Math.floor(Math.random() * 4) + 3;
let c = Math.floor(Math.random() * 2);
let d = Math.floor(Math.random() * 2);
document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') 
  {
    gameState = gameState == 'start' ? 'play' : 'start';
    if (gameState == 'play') {
      message.innerHTML =  'Game Started ';
      message.style.left = 42 + 'vw';
      requestAnimationFrame(() => {
        a = Math.floor(Math.random() * 4) + 3;
        b = Math.floor(Math.random() * 4) + 3;
        c = Math.floor(Math.random() * 2);
        d = Math.floor(Math.random() * 2);
        moveBall(a,b,c,d);
        });
      }
    }
    if (gameState == 'play') {
      if (e.key == 'w') {
        paddle_1.style.top =Math.max(board_coord.top,
          paddle_1_coord.top - window.innerHeight * 0.06
          ) + 'px'; paddle_1_coord = paddle_1.getBoundingClientRect();
      }
      if (e.key == 's') {
        paddle_1.style.top =
          Math.min(
            board_coord.bottom - paddle_common.height,
            paddle_1_coord.top + window.innerHeight * 0.06
            ) + 'px';
          paddle_1_coord = paddle_1.getBoundingClientRect();
      }
      if (e.key == 'ArrowUp') {
        paddle_2.style.top =
            Math.max(
                  board_coord.top,
                  paddle_2_coord.top - window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
      }
      if (e.key == 'ArrowDown') {
              paddle_2.style.top =
                Math.min(
                  board_coord.bottom - paddle_common.height,
                  paddle_2_coord.top + window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
      }
    }
  });
        
      function moveBall(a,b,c,d) {
        if (ball_coord.top <= board_coord.top) {
          d = 1;
        }
        if (ball_coord.bottom >= board_coord.bottom) {
        d = 0;
      }
      if (ball_coord.left <= paddle_1_coord.right &&ball_coord.top >= paddle_1_coord.top &&ball_coord.bottom <= paddle_1_coord.bottom) 
      {
        c = 1;
        a = Math.floor(Math.random() * 4) + 3;
        b = Math.floor(Math.random() * 4) + 3;
      }
      if (ball_coord.right >= paddle_2_coord.left &&ball_coord.top >= paddle_2_coord.top &&ball_coord.bottom <= paddle_2_coord.bottom) 
      {
        c = 0;
        a = Math.floor(Math.random() * 4) + 3;
        b = Math.floor(Math.random() * 4) + 3;
      }
      if (ball_coord.left <= board_coord.left ||ball_coord.right >= board_coord.right) 
      {
        if (ball_coord.left <= board_coord.left) 
        {
          score_2.innerHTML = +score_2.innerHTML + 1;
        } 
        else {
        score_1.innerHTML = +score_1.innerHTML + 1;
      }
      gameState = 'start';
        
      ball_coord = initial_ball_coord;
      ball.style = initial_ball.style;
      message.innerHTML = 'Press Enter ';
      message.style.left = 38 + 'vw';
      return;
    }
    ball.style.top = ball_coord.top + b * (d == 0 ? -1 : 1) + 'px';
    ball.style.left = ball_coord.left + a * (c == 0 ? -1 : 1) + 'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
    moveBall(a,b,c,d);
  });
}