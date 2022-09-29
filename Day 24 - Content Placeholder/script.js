const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profile_img = document.getElementById('profile_img');
const name = document.getElementById('name');
const date = document.getElementById('date');

const animated_bgs = document.querySelectorAll('.animated-bg');
const animated_bg_texts = document.querySelectorAll('.animated-bg-text');

setTimeout(getData, 2000);

function getData() {
  header.innerHTML = '<img src="https://source.unsplash.com/random" alt="" />';
  title.innerHTML = 'Lorem ipsum dolor sit amet';
  excerpt.innerHTML =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis';
  profile_img.innerHTML = '<img src="assets/img/portraits.jpg" alt="">';
  name.innerHTML = 'Joseus';
  date.innerHTML = 'Sep, 29, 2022';

  animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'));

  animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'));
}
