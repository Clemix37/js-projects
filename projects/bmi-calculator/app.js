// PROPERTIES
const results = document.getElementById('results');
const height = document.getElementById('taille');
const weight = document.getElementById('poids');
const btnCalculate = document.getElementById('btnCalculate');
const enterKey = "Enter";

// EVENTS
btnCalculate.addEventListener('click', calculate);
height.addEventListener('keyup', (e)=>{
    if(e.key == enterKey) calculate();
});
weight.addEventListener('keyup', (e)=>{
    if(e.key == enterKey) calculate();
});

// FUNCTIONS
function calculate(){
    const heightValue = +height.value;
    const weightValue = +weight.value;
    if(!heightValue || !weightValue) return;
    const calculation = weightValue / ((heightValue/100)**2);
    displayResultBasedOnCalculation(calculation);
}

/**
 * Display the result based on the calculation givent as argument
 * @param {number} calculation 
 */
function displayResultBasedOnCalculation(calculation){
    let result = "";
    if(calculation < 16.5) result = `Malnutrition`;
    else if(calculation >= 16.5 && calculation < 18.5) result = `Thinness`;
    else if(calculation >= 18.5 && calculation < 25) result = `Normal weight`;
    else if(calculation >= 25 && calculation < 30) result = `Overweight`;
    else if(calculation >= 30 && calculation < 35) result = `Moderate obesity`;
    else if(calculation >= 35 && calculation < 40) result = `Severe obesity`;
    else if(calculation >= 40) result = `Morbid obesity`;
    results.innerHTML = `<h3 class="subtitle has-text-centered">${result}</h3>`;
}