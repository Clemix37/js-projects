const results = document.getElementById('results');
const taille = document.getElementById('taille');
const poids = document.getElementById('poids');
const btnCalculate = document.getElementById('btnCalculate');
const cleEntre = "Enter";

btnCalculate.addEventListener('click', calculer);
taille.addEventListener('keyup', (e)=>{
    if(e.key == cleEntre) calculer();
});
poids.addEventListener('keyup', (e)=>{
    if(e.key == cleEntre) calculer();
});

function calculer(){
    const valeurTaille = parseInt(taille.value);
    const valeurPoids = parseFloat(poids.value);
    if(!valeurTaille || !valeurPoids) return;
    const calcul = (valeurPoids / ((valeurTaille/100)**2));
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