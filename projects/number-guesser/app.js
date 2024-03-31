// PROPERTIES
let nbToFind = 0;
let nb = document.getElementById('nb');
let btnSearch = document.getElementById('btnSearch');
let results = document.getElementById('results');

// EVENTS
nb.addEventListener('keyup', (e)=>{
    if(e.key == "Enter") search();
});
btnSearch.addEventListener('click', search);

// FUNCTIONS
function search(){
    let search = +nb.value;
    if(search == nbToFind) {
        results.textContent = `You won ! A new number has been generated if you want to continue ;)`;
        // We regenerate a number to guess
        genNumberTofind();
    }
    else if(search < nbToFind) results.textContent = `Greater`;
    else if(search > nbToFind) results.textContent = `Lower`;
    else results.textContent = `Not a number`;
    nb.value = ``;
}

function genNumberTofind(){
    nbToFind = Math.floor(Math.random()*100);
}

// After loading, we generate a random number
genNumberTofind();