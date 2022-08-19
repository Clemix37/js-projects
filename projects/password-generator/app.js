// PROPERTIES
let btnGenerate = document.getElementById('btnGenerate');
let uppercase = document.getElementById('uppercase');
let symbols = document.getElementById('symbols');
let lengthPass = document.getElementById('lengthPass');
let copyBtn = document.getElementById('copyBtn');
let results = document.getElementById('results');
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
    generated = "";
    let longueur = parseInt(lengthPass.value);
    let str = LET_LOWER + (uppercase.checked ? LET_UPPER : "") + (symbols.checked ? SYMS : "");
    for (let i = 0; i < longueur; i++) {
        generated += randAlea(str);
    }
    results.value = generated;
}
function copyToClipboard(){
    if(!generated) return;
    navigator.clipboard.writeText(generated);
}