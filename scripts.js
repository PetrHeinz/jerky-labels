document.addEventListener('DOMContentLoaded', (event) => {
    loadLabels();
});

function addLabel() {
    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value;
    const date = document.getElementById('date').value;

    const label = {
        name: name,
        ingredients: ingredients,
        date: date
    };

    let labels = getLabels();
    labels.push(label);
    setLabels(labels);

    renderLabels();
}

function removeLabel(index) {
    let labels = getLabels();
    labels.splice(index, 1);
    setLabels(labels);

    renderLabels();
}

function printLabels() {
    window.print();
}

function getLabels() {
    const labels = localStorage.getItem('labels');
    return labels ? JSON.parse(labels) : [];
}

function setLabels(labels) {
    localStorage.setItem('labels', JSON.stringify(labels));
}

function loadLabels() {
    renderLabels();
}

function renderLabels() {
    const labelsContainer = document.getElementById('labels-container');
    labelsContainer.innerHTML = '';

    const labels = getLabels();
    labels.forEach((label, index) => {
        const labelContainer = document.createElement('div');
        labelContainer.classList.add('label-container');

        const labelHeader = document.createElement('div');
        labelHeader.classList.add('label-header');
        const logo = document.createElement('img');
        logo.src = 'https://images-assets.startupjobs.cz/LOGO/8333/abd8f2918cafe89ada050b3f670ba009.png';
        logo.alt = 'Logo';
        logo.classList.add('logo');
        labelHeader.appendChild(logo);

        const labelContent = document.createElement('div');
        labelContent.classList.add('label-content');

        const labelName = document.createElement('h2');
        labelName.innerText = label.name;

        const labelIngredients = document.createElement('p');
        labelIngredients.innerText = "Ingredients: " + label.ingredients;

        const labelDate = document.createElement('p');
        labelDate.innerText = "Date: " + label.date;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => removeLabel(index);

        labelContent.appendChild(labelName);
        labelContent.appendChild(labelIngredients);
        labelContent.appendChild(labelDate);

        labelContainer.appendChild(labelHeader);
        labelContainer.appendChild(labelContent);
        labelContainer.appendChild(deleteButton);

        labelsContainer.appendChild(labelContainer);
    });
}
