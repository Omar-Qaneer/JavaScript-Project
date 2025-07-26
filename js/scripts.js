document.addEventListener('DOMContentLoaded', () => {
    loadProfileSection();
    loadProjectGallery();
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

function loadProjectGallery() {
  fetch('./data/projectsData.json')
    .then(res => {
      if (!res.ok) throw new Error("Project data load failed.");
      return res.json();
    })
    .then(data => {
      displayProjects(data);
      enableGalleryScroll();
    })
    .catch(err => console.error("Error fetching projects:", err));
}

function displayProjects(projects) {
  const gallery = document.getElementById('projectList');
  if (!gallery) return;

  if (projects.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = "No projects to show right now.";
    gallery.appendChild(emptyMsg);
    return;
  }

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'projectCard';
    card.id = project.project_id;
    card.style.backgroundImage = `url('${project.card_image || "./images/card_placeholder_bg.webp"}')`;

    const title = document.createElement('h3');
    title.textContent = project.project_name || "Unnamed";

    const summary = document.createElement('p');
    summary.textContent = project.short_description || "No summary available.";

    card.append(title, summary);
    card.addEventListener('click', () => showInSpotlight(project));
    gallery.appendChild(card);
  });

  showInSpotlight(projects[0]); // default spotlight
}

function showInSpotlight(project) {
  const spotlight = document.getElementById('projectSpotlight');
  const contentHolder = document.getElementById('spotlightTitles');
  if (!spotlight || !contentHolder) return;

  spotlight.style.backgroundImage = `url('${project.spotlight_image || "./images/spotlight_placeholder_bg.webp"}')`;

  contentHolder.innerHTML = ''; // clear previous

  const title = document.createElement('h2');
  title.textContent = project.project_name || "Untitled";

  const details = document.createElement('p');
  details.textContent = project.long_description || "Description not available.";

  const anchor = document.createElement('a');
  anchor.href = project.url || "#";
  anchor.target = "_blank";
  anchor.textContent = "View Project";

  contentHolder.append(title, details, anchor);
}
