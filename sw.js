const GH_PATH = "/js-projects";
const APP_PREFIX = "cwdjs_";
const VERSION = "version_002";
const URLS = [
	`${GH_PATH}/`,
	`${GH_PATH}/index.html`,
	`${GH_PATH}/favicon.ico`,
	// CSS
	`${GH_PATH}/styles/includes.css`,
	`${GH_PATH}/styles/index.css`,
	`${GH_PATH}/styles/FlexIt.css`,
	`${GH_PATH}/styles/calendar.css`,
	`${GH_PATH}/styles/navbar.css`,
	`${GH_PATH}/styles/windows.css`,
	// JS
	`${GH_PATH}/styles/fontawesome/js/all.min.js`,
	`${GH_PATH}/js/app.js`,
	`${GH_PATH}/js/confirmation.js`,
	`${GH_PATH}/js/projectsDisplay.js`,
	`${GH_PATH}/js/classes/Calendar.js`,
	`${GH_PATH}/js/classes/Project.js`,
	`${GH_PATH}/js/classes/SessionStore.js`,
	`${GH_PATH}/js/classes/Utils.js`,
	// PAGES
	`${GH_PATH}/pages/confirm-window.html`,
	`${GH_PATH}/pages/navbar.html`,

	// PROJECTS

	// BMI CALCULATOR
	`${GH_PATH}/bmi-calculator/index.html`,
	`${GH_PATH}/bmi-calculator/app.js`,

	// BUDGET PLANNER
	`${GH_PATH}/budget-planner/index.html`,
	`${GH_PATH}/budget-planner/budgetPlanner.js`,

	// CALCULATOR
	`${GH_PATH}/calculator/index.html`,
	`${GH_PATH}/calculator/app.js`,

	// CALENDAR
	`${GH_PATH}/calendar/index.html`,
	`${GH_PATH}/calendar/app.js`,

	//CHORE DOOR GAME
	`${GH_PATH}/chore-door-game/index.html`,
	`${GH_PATH}/chore-door-game/js/app.js`,

	// CIRCLES GAME
	`${GH_PATH}/circles-game/index.html`,
	`${GH_PATH}/circles-game/app.js`,
	`${GH_PATH}/circles-game/constants.js`,
	`${GH_PATH}/circles-game/utils.js`,
	`${GH_PATH}/circles-game/classes/Circle.js`,
	`${GH_PATH}/circles-game/classes/Cursor.js`,
	`${GH_PATH}/circles-game/classes/Vector2D.js`,
	`${GH_PATH}/circles-game/circle.png`,
	`${GH_PATH}/circles-game/heart v2 - 0.png`,
	`${GH_PATH}/circles-game/heart v2 - 1.png`,
	`${GH_PATH}/circles-game/heart v2 - 2.png`,
	`${GH_PATH}/circles-game/heart v2 - 3.png`,

	// CONTACT SAVER
	`${GH_PATH}/contact-saver/index.html`,
	`${GH_PATH}/contact-saver/app.js`,
	`${GH_PATH}/contact-saver/Contact.js`,

	// COUNTDOWN TIMER
	`${GH_PATH}/countdown-timer/index.html`,
	`${GH_PATH}/countdown-timer/js/app.js`,

	// COUNTER
	`${GH_PATH}/counter/index.html`,
	`${GH_PATH}/counter/app.js`,
	`${GH_PATH}/counter/Counter.js`,

	// DICE GAME
	`${GH_PATH}/dice-game/index.html`,
	`${GH_PATH}/dice-game/app.js`,
	`${GH_PATH}/dice-game/dices/dice1.png`,
	`${GH_PATH}/dice-game/dices/dice2.png`,
	`${GH_PATH}/dice-game/dices/dice3.png`,
	`${GH_PATH}/dice-game/dices/dice4.png`,
	`${GH_PATH}/dice-game/dices/dice5.png`,
	`${GH_PATH}/dice-game/dices/dice6.png`,

	// DRUM KIT
	`${GH_PATH}/drum-kit/index.html`,
	`${GH_PATH}/drum-kit/app.js`,
	`${GH_PATH}/drum-kit/sounds/boom.wav`,
	`${GH_PATH}/drum-kit/sounds/clap.wav`,
	`${GH_PATH}/drum-kit/sounds/hihat.wav`,
	`${GH_PATH}/drum-kit/sounds/kick.wav`,
	`${GH_PATH}/drum-kit/sounds/openhat.wav`,
	`${GH_PATH}/drum-kit/sounds/ride.wav`,
	`${GH_PATH}/drum-kit/sounds/snare.wav`,
	`${GH_PATH}/drum-kit/sounds/tink.wav`,
	`${GH_PATH}/drum-kit/sounds/tom.wav`,

	// GROCERY LIST
	`${GH_PATH}/grocery-list/index.html`,
	`${GH_PATH}/grocery-list/app.js`,
	`${GH_PATH}/grocery-list/GroceryItem.js`,
	`${GH_PATH}/grocery-list/GroceryList.js`,

	// ISOMETRIC CANVAS
	`${GH_PATH}/isometric-canvas/index.html`,
	`${GH_PATH}/isometric-canvas/app.js`,
	`${GH_PATH}/isometric-canvas/dirt.png`,

	// KEY CODES
	`${GH_PATH}/key-codes/index.html`,
	`${GH_PATH}/key-codes/app.js`,
	`${GH_PATH}/key-codes/styles.css`,

	// LIBRARY
	`${GH_PATH}/library/index.html`,
	`${GH_PATH}/library/js/app.js`,
	`${GH_PATH}/library/js/Book.js`,
	`${GH_PATH}/library/js/Library.js`,

	// MEMORY GAME
	`${GH_PATH}/memory-game/index.html`,
	`${GH_PATH}/memory-game/js/memoryGame.js`,
	`${GH_PATH}/memory-game/styles/memoryGame.css`,

	// NUMBER GUESSER
	`${GH_PATH}/number-guesser/index.html`,
	`${GH_PATH}/number-guesser/app.js`,

	// PASSWORD GENERATOR
	`${GH_PATH}/password-generator/index.html`,
	`${GH_PATH}/password-generator/app.js`,

	// POKE API
	`${GH_PATH}/poke-api/index.html`,
	`${GH_PATH}/poke-api/app.js`,
	`${GH_PATH}/poke-api/Pokemon.js`,
	`${GH_PATH}/poke-api/app.css`,

	// POLL
	`${GH_PATH}/poll/index.html`,
	`${GH_PATH}/poll/app.js`,
	`${GH_PATH}/poll/PollChoice.js`,
	`${GH_PATH}/poll/Poll.js`,

	// RANDOM COLOR
	`${GH_PATH}/random-color/index.html`,
	`${GH_PATH}/random-color/app.js`,
	`${GH_PATH}/random-color/Color.js`,

	// RANDOM USER
	`${GH_PATH}/random-user/index.html`,
	`${GH_PATH}/random-user/randomUser.js`,

	// STAR BATTLE
	`${GH_PATH}/star-battle/index.html`,
	`${GH_PATH}/star-battle/app.js`,
	`${GH_PATH}/star-battle/app.css`,

	// TASK MANAGER
	`${GH_PATH}/task-manager/index.html`,
	`${GH_PATH}/task-manager/js/app.js`,
	`${GH_PATH}/task-manager/js/classes/Display.js`,
	`${GH_PATH}/task-manager/js/classes/List.js`,
	`${GH_PATH}/task-manager/js/classes/Status.js`,
	`${GH_PATH}/task-manager/js/classes/Tag.js`,
	`${GH_PATH}/task-manager/js/classes/Task.js`,
	`${GH_PATH}/task-manager/styles/app.css`,
	`${GH_PATH}/task-manager/styles/dialog.css`,

	// TIC TAC TOE
	`${GH_PATH}/tic-tac-toe/index.html`,
	`${GH_PATH}/tic-tac-toe/js/app.js`,
	`${GH_PATH}/tic-tac-toe/styles/app.css`,

	// TODO LIST
	`${GH_PATH}/todo-list/index.html`,
	`${GH_PATH}/todo-list/app.js`,
	`${GH_PATH}/todo-list/Task.js`,
	`${GH_PATH}/todo-list/TodoApp.js`,

	// WATER SORT
	`${GH_PATH}/water-sort/index.html`,
	`${GH_PATH}/water-sort/app.js`,
	`${GH_PATH}/water-sort/classes/Tube.js`,
	`${GH_PATH}/water-sort/classes/WaterSort.js`,
	`${GH_PATH}/water-sort/Task.js`,
	`${GH_PATH}/water-sort/water-sort.css`,

	// WEREWOLF
	`${GH_PATH}/werewolf/index.html`,
	`${GH_PATH}/werewolf/app.js`,
	`${GH_PATH}/werewolf/js/Role.js`,

	// WORKOUT TRACKER
	`${GH_PATH}/workout-tracker/index.html`,
	`${GH_PATH}/workout-tracker/app.js`,
	`${GH_PATH}/workout-tracker/classes/Workout.js`,
	`${GH_PATH}/workout-tracker/classes/WorkoutCalendar.js`,
	`${GH_PATH}/workout-tracker/classes/WorkoutExercise.js`,
	`${GH_PATH}/workout-tracker/classes/WorkoutGoal.js`,
	`${GH_PATH}/workout-tracker/classes/WorkoutGoalList.js`,
	`${GH_PATH}/workout-tracker/app.css`,

	// MEME SOUNDBOARD
	`${GH_PATH}/meme-soundboard/index.html`,
	`${GH_PATH}/meme-soundboard/app.js`,
	`${GH_PATH}/meme-soundboard/app.css`,
	`${GH_PATH}/meme-soundboard/memes.json`,
	`${GH_PATH}/meme-soundboard/sounds/among-us-role-reveal.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/anime-wow.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/augh.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/bruh.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/ca-va-peter.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/fbi-open-up.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/musica-elevator.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/oof.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/quak.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/rat-dance.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/sexy-sax.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/short-augh.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/sncf.mp3`,
	`${GH_PATH}/meme-soundboard/sounds/vine-boom.mp3`,
	// TODO: add memes link sounds

	// NOTIF SYSTEM
	`${GH_PATH}/notif-system/index.html`,
	`${GH_PATH}/notif-system/css/toasts.css`,
	`${GH_PATH}/notif-system/js/app.js`,
	`${GH_PATH}/notif-system/js/config.js`,
	`${GH_PATH}/notif-system/js/Toast.js`,
	`${GH_PATH}/notif-system/js/ToastFactory.js`,

	// ELEVATOR PROJECT
	`${GH_PATH}/elevator/index.html`,
	`${GH_PATH}/elevator/app.js`,
];

const CACHE_NAME = APP_PREFIX + VERSION;
self.addEventListener("fetch", function (e) {
	e.respondWith(
		// Will get from cache if it exists, fetch request if not
		caches.match(e.request).then(function (request) {
			return request || fetch(e.request);
		}),
	);
});

self.addEventListener("install", function (e) {
	e.waitUntil(
		// On install, store for the cache name every urls
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(URLS);
		}),
	);
});

self.addEventListener("activate", function (e) {
	e.waitUntil(
		caches.keys().then(function (keyList) {
			const cacheWhitelist = keyList.filter(function (key) {
				return key.indexOf(APP_PREFIX);
			});
			cacheWhitelist.push(CACHE_NAME);
			return Promise.all(
				keyList.map(function (key, i) {
					if (cacheWhitelist.indexOf(key) === -1) {
						return caches.delete(keyList[i]);
					}
				}),
			);
		}),
	);
});
