
const btnAdd = document.getElementById('btnadd');
const formContainer = document.getElementById('formcontainer');
const unassignedList = document.getElementById('unassignedlist');

// Toggle formulaire
btnAdd.addEventListener('click', () => {
    if (formContainer.style.display === 'none') {
    } else {
        formContainer.style.display = 'block';
    }
});

// Gestion du formulaire 
const simpleForm = formContainer.querySelector('form');
simpleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = simpleForm.querySelector('input[placeholder="ex:sarra"]').value;
    const role = simpleForm.querySelector('select[name="role"]').value;
    const phone = simpleForm.querySelector('input[placeholder="0625883148"]').value;
    const email = simpleForm.querySelector('input[placeholder="gmail.com"]').value;
    const photo = simpleForm.querySelector('input[placeholder="image"]').value;

    // Création de l'élément
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${photo}" alt="${name}" width="40" height="40" style="border-radius:50%; margin-right:10px;">
        <span>${name} (${role})</span>
        <button class="remove">X</button>
    `;
    unassignedList.appendChild(li);


    simpleForm.reset();

    // Cacher le formulaire
    formContainer.style.display = 'none';

    // Supprimer un employé de la liste
    li.querySelector('.remove').addEventListener('click', () => {
        li.remove();
    });
});


const zoneButtons = document.querySelectorAll('.btn-add-to-zone');
zoneButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Ici on peut ajouter un employé depuis "Unassigned Staff" vers la zone : ' + button.dataset.zone);
    });
});
