const btns = document.querySelectorAll('.button');
const getBtnFromKey = (key) => Array.from(btns).filter(btn => btn.dataset.key === key)?.[0] ?? null;
const getInstrumentFromEvent = (e) => e.currentTarget.dataset.instrument ?? null;

for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener('click', (e) => {
        const instrument = getInstrumentFromEvent(e);
        launch(instrument);
    });
}

function launch(idPlayer = null){
    if(!idPlayer) return;
    let audio = document.getElementById(idPlayer);
    audio.play();
}


document.addEventListener('keydown', (e) => {
    const instrument = getBtnFromKey(e.key)?.dataset.instrument;
    launch(instrument);
});
