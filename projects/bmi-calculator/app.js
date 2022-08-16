let results = document.getElementById('results');
let taille = document.getElementById('taille');
let poids = document.getElementById('poids');
let btnCalculate = document.getElementById('btnCalculate');

btnCalculate.addEventListener('click', calculer);
taille.addEventListener('keyup', (e)=>{
    if(e.key == "Enter") calculer();
});
poids.addEventListener('keyup', (e)=>{
    if(e.key == "Enter") calculer();
});

function calculer(){
    let valeurTaille = parseInt(taille.value);
    let valeurPoids = parseFloat(poids.value);
    if(!valeurTaille || !valeurPoids) return;
    let calcul = (valeurPoids / ((valeurTaille/100)**2));
    let resultat = "";
    if(calcul < 16.5) resultat = `Malnutrition`;
    else if(calcul >= 16.5 && calcul < 18.5) resultat = `Thinness`;
    else if(calcul >= 18.5 && calcul < 25) resultat = `Normal weight`;
    else if(calcul >= 25 && calcul < 30) resultat = `Overweight`;
    else if(calcul >= 30 && calcul < 35) resultat = `Moderate obesity`;
    else if(calcul >= 35 && calcul < 40) resultat = `Severe obesity`;
    else if(calcul >= 40) resultat = `Morbid obesity`;
    results.innerHTML = `<h3 class="subtitle has-text-centered">${resultat}</h3>`;
}