document.addEventListener('DOMContentLoaded', () => {
    loadProfileSection();
});

function loadProfileSection() {
  fetch('./data/aboutMeData.json')
    .then(res => {
      if (!res.ok) throw new Error("About Me data not found.");
      return res.json();
    })
    .then(renderAboutMe)
    .catch(err => console.error("Unable to fetch profile data:", err));
}

function renderAboutMe(profile) {
  const aboutContainer = document.getElementById('aboutMe');
  if (!aboutContainer) return;

  const bio = document.createElement('p');
  bio.textContent = profile.aboutMe || "Biography is not available at the moment.";

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('headshotContainer');

  const photo = document.createElement('img');
  photo.src = profile.headshot || './images/default.jpg';
  photo.alt = 'Developer headshot';

  imageWrapper.appendChild(photo);
  aboutContainer.appendChild(bio);
  aboutContainer.appendChild(imageWrapper);

  const header = document.querySelector('header h1');
  if (header && profile.name) {
    header.textContent = profile.name;
  }
}