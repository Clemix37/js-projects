let main = document.querySelector('main');
let btnGenerate = document.getElementById('btnGenerate');
let colorContainer = document.getElementById('colorContainer');
btnGenerate.addEventListener('click', generate);
document.addEventListener('DOMContentLoaded', generate);

function generate(){
    let color = new Color();
    colorContainer.innerHTML = `Color: ${color.color}`;
    main.style.backgroundColor = color.color;
}