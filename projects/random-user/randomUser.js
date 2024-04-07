// PROPERTIES
const linkRandomUserApi = "https://randomuser.me/api/";
const btnGetUser = document.getElementById("btn-get-user");
const userContent = document.getElementById("user-content");
const gender = document.getElementById("gender");
const nameUser = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const nat = document.getElementById("nat");
const profile = document.getElementById("profile");

// EVENTS
btnGetUser.addEventListener("click", displayRandomUser);

// FUNCTIONS
/**
 * Get the random user from the random-user API and return the first one
 * @returns {object}
 */
async function getRandomUser(){
    const response = await fetch(linkRandomUserApi,  {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data.results[0];
}

/**
 * Get the random user, display it's data in the DOM
 */
async function displayRandomUser(){
    const user = await getRandomUser();
    userContent.style.display = "flex";
    gender.innerText = user.gender;
    nameUser.innerText = `${user.name.title} ${user.name.first} ${user.name.last}`;
    email.innerText = user.email;
    phone.innerText = user.phone;
    nat.innerText = user.nat;
    profile.src = user.picture.large;
}