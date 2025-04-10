const showMenuTrigger = document.querySelector(`#js-triggers li:first-child a`);
const dropdownMenu = document.createElement(`div`);
dropdownMenu.classList.add(`dropdown-menu`);
const modalPanel = document.querySelector(`.modal-panel`);
const modalContent = document.querySelector(`.modal-content-pane`);
modalContent.style.width = `90%`;
modalContent.style.height = `80%`;
modalContent.style.maxWidth = `900px`;
modalContent.style.maxHeight = `700px`;

const modalTrigger = document.querySelector(`#js-triggers li:nth-child(2) a`);
const closeModal = document.createElement(`span`);

closeModal.innerHTML = `&times;`;
closeModal.style.cursor = `pointer`;
closeModal.style.position = `absolute`;
closeModal.style.top = `500px`;
closeModal.style.right = `20px`;
closeModal.style.fontSize = `24px`;

document.querySelector(`.modal-content-pane`).appendChild(closeModal);

modalTrigger.addEventListener(`click`, (e) => {
    e.preventDefault();
    modalPanel.style.display = `flex`;
});

closeModal.addEventListener(`click`, () => {
    modalPanel.style.display = `none`;
});

window.addEventListener(`click`, (e) => {
    if (e.target === modalPanel) {
        modalPanel.style.display = `none`;
    }
});

dropdownMenu.innerHTML = `
  <ul>
    <li><a href="#">Menu 1</a></li>
    <li><a href="#">Menu 2</a></li>
  </ul>
`;


showMenuTrigger.parentElement.appendChild(dropdownMenu);


showMenuTrigger.addEventListener(`click`, (e) => {
    e.preventDefault();
    const isVisible = dropdownMenu.style.display === `block`;
    dropdownMenu.style.display = isVisible ? `none` : `block`;
});


window.addEventListener(`click`, (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== showMenuTrigger) {
        dropdownMenu.style.display = `none`;
    }
});

