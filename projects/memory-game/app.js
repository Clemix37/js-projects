const btnJouer = document.getElementById('btnJouer');
const affiches = ["A", "B", "C"];
const generated = [];
const nbToGenerate = 6;

const getRandomAffiche = () => affiches[Math.floor(Math.random() * affiches.length)];

const jouer = () => {
    for(let i=0;i<nbToGenerate;i++){
        let affiche = null;
        // Infinite loop
        // while((generated.filter(a => a === affiche) ?? []).length == 2 || affiche === null){
        //     affiche = getRandomAffiche();
        // }
        generated.push(affiche);
    }
    console.log(generated);
};

btnJouer.addEventListener('click', jouer);