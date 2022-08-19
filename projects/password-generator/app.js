// PROPERTIES
let btnGenerate = document.getElementById('btnGenerate');
let uppercase = document.getElementById('uppercase');
let symbols = document.getElementById('symbols');
let lengthPass = document.getElementById('lengthPass');
let copyBtn = document.getElementById('copyBtn');
let results = document.getElementById('results');
let numbers = document.getElementById('numbers');
let generated = "";
const LET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LET_LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMS = "!@#$%^&*()+";
// EVENTS
btnGenerate.addEventListener('click', generate);
copyBtn.addEventListener('click', copyToClipboard);
// FUNCTIONS
let randAlea = (tab)=> tab[Math.floor(Math.random()*tab.length)];
function generate(){
    copyBtn.innerHTML = "Copy";
    generated = "";
    let longueur = parseInt(lengthPass.value);
    let str = LET_LOWER + (uppercase.checked ? LET_UPPER : "") + (symbols.checked ? SYMS : "") + (numbers.checked ? DIGITS : "");
    for (let i = 0; i < longueur; i++) {
        generated += randAlea(str);
    }
    results.value = generated;
}
function copyToClipboard(){
    if(!generated) return;
    copyBtn.innerHTML = "Copied !";
    navigator.clipboard.writeText(generated);
    setTimeout(()=>{
        copyBtn.innerHTML = "Copy";
    }, 2000);
}