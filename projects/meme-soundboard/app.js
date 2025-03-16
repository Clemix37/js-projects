import memes from "./memes.json" with { type: "json" };

//#region Properties

/**
 * @type {{ title: string, src: string, }[]}
 */
const memeSounds = memes.all;
/**
 * @type {HTMLAudioElement}
 */
const audioFile = document.getElementById("audio-file");
const listMemes = document.getElementById("list-memes");

//#endregion

/**
 * Gets the title as an id
 * @param {string} title
 * @returns {string}
 */
function titleToId(title) {
	return title.toLowerCase().split(" ").join("-");
}

function playAudio(audioSrc) {
	if (!audioSrc) return;
	const src = `./sounds/${audioSrc}.mp3`;
	audioFile.src = src;
	audioFile.play();
}

/**
 * Attach click events on buttons for listening meme
 */
function attachEvents() {
	memeSounds.forEach((memeSound) => {
		const btn = document.getElementById(titleToId(memeSound.title));
		if (!btn) return;
		const play = () => playAudio(memeSound.src);
		btn.removeEventListener("click", play);
		btn.addEventListener("click", play);
	});
}

/**
 * Display a button for every meme sound we have
 */
function displayButtons() {
	listMemes.innerHTML = memeSounds.reduce(
		(acc, memeSound) =>
			acc +
			`<button 
                class="button btn-meme"
                id="${titleToId(memeSound.title)}" 
                data-src="./sounds/${memeSound.src}"
                title="${memeSound.title}">
                    ${memeSound.title}
            </button>`,
		"",
	);
}

function update() {
	displayButtons();
	attachEvents();
}

update();
