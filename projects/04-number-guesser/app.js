(function(){
    let nbToFind = 0;
    let nb = document.getElementById('nb');
    let btnSearch = document.getElementById('btnSearch');
    let results = document.getElementById('results');
    document.addEventListener('DOMContentLoaded',()=>{
        nbToFind = Math.floor(Math.random()*100);
    });
    nb.addEventListener('keyup', (e)=>{
        if(e.key == "Enter") search();
    });
    btnSearch.addEventListener('click', search);

    function search(){
        let search = parseInt(nb.value);
        if(search==nbToFind) results.innerHTML = `You won !`;
        else if(search<nbToFind) results.innerHTML = `Greater`;
        else if(search>nbToFind) results.innerHTML = `Lower`;
        else results.innerHTML = `Not a number`;
        nb.value = ``;
    }
})();