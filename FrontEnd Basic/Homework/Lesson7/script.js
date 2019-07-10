let wall = document.getElementById('wallAnim'),
    ball = document.getElementById('ballAnim'),
    player = document.getElementById('player'),
    btnStart = document.getElementById('btn-start');

let flag = false;

function startAnim() {
    if (flag) {
        alert('Wait until animation ends!');
        return;
    }
    flag = true;
    player.play();
    wall.classList.toggle('wallAnim');
    ball.classList.toggle('ballAnim');
    let timeout = setTimeout(clrAnim, 2000)
}

function clrAnim() {
    wall.classList.remove('wallAnim');
    ball.classList.remove('ballAnim');
    flag = false;
}

btnStart.addEventListener('click', startAnim);