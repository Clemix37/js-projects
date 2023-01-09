const btns = document.querySelectorAll('.button');
for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener('click', ()=>{
        launch(btn.innerHTML.toLowerCase());
    });
}

const launch = (idPlayer = null) => {
    if(!idPlayer)return;
    let audio = document.getElementById(idPlayer);
    audio.play();
};
