let btns = document.querySelectorAll('.button');
for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener('click', ()=>{
        let audio = document.getElementById(btn.innerHTML.toLowerCase());
        audio.play();
    });
}