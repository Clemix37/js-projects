const codes = document.getElementById("codes");

function getTemplate(event){
    return `
        <div class="key">
            ${event.key === " " ? "Space" : event.key}
            <small>event.key</small>
        </div>
        <div class="key">
            ${event.keyCode}
            <small>event.keyCode</small>
        </div>
        <div class="key">
            ${event.code}
            <small>event.code</small>
        </div>
    `;
}

window.addEventListener("keydown", (e) => {
    const tmpl = getTemplate(e);
    codes.innerHTML = tmpl;
});