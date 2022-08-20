const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke)

function start() {
    generateJoke();
}

// USING ASYNC/AWAIT
async function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    }

    const jokeApi = 'https://icanhazdadjoke.com'

    const res = await fetch(jokeApi, config)

    const data = await res.json()
    jokeEl.innerHTML = data.joke;
}


// USING .then()
// function generateJoke() {
//     const config = {
//         headers: {
//             Accept: 'application/json',
//         },
//     }

//     const jokeApi = 'https://icanhazdadjoke.com'

//     fetch(jokeApi, config)
//         .then((res) => res.json())
//         .then((data) => {
//             jokeEl.innerHTML = data.joke
//         })
// }

start();