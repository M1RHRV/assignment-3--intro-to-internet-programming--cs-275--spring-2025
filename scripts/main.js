const modalPanel = document.querySelector(`.modal-panel`);
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
