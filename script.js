
// Sélection des éléments

const btnAdd = document.getElementById('btnadd');
const formContainer = document.getElementById('formcontainer');
const unassignedList = document.getElementById('unassignedlist');
const simpleForm = formContainer.querySelector('form');


// Affichage / Masquage du formulaire

btnAdd.addEventListener('click', () => {
    formContainer.style.display =
        formContainer.style.display === 'block' ? 'none' : 'block';
});


// VALIDATION REGEX
const validators = {
    name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^0[5-7]\d{8}$/,  // Maroc
    url: /^https?:\/\/.+\..+/
};


// Soumission du formulaire

simpleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = simpleForm.querySelector('input[placeholder="ex:sarra"]').value.trim();
    const role = simpleForm.querySelector('select[name="role"]').value;
    const email = simpleForm.querySelector('input[placeholder="gmail.com"]').value.trim();
    const phone = simpleForm.querySelector('input[placeholder="0625883148"]').value.trim();
    const photo = simpleForm.querySelector('input[placeholder="image"]').value.trim();

    // Vérifications
    if (!validators.name.test(name)) return alert("Nom invalide");
    if (!validators.email.test(email)) return alert("Email invalide");
    if (!validators.phone.test(phone)) return alert("Téléphone invalide");
    if (photo && !validators.url.test(photo)) return alert("URL de photo invalide");

    // Création du Li
    const li = document.createElement('li');
    li.dataset.role = role;
    li.innerHTML = `
        <img src="${photo}" alt="${name}" width="40" height="40" style="border-radius:50%; margin-right:10px;">
        <span class="name">${name} (${role})</span>
        <button class="remove">X</button>
    `;

    unassignedList.appendChild(li);
    formContainer.style.display = 'none';
    simpleForm.reset();

    // Suppression
    li.querySelector('.remove').addEventListener('click', () => li.remove());
});


// Boutons + pour ajouter à une zone

document.querySelectorAll('.btn-add-to-zone').forEach(btn => {
    btn.addEventListener('click', () => {
        const zone = btn.dataset.zone;

        // Modal
        const modal = document.createElement('div');
        modal.className = 'modal-select';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Choisir un employé</h3>
                <ul class="modal-list"></ul>
                <button class="close-modal">Fermer</button>
            </div>
        `;
        document.body.appendChild(modal);

        const modalList = modal.querySelector('.modal-list');
        const employees = document.querySelectorAll("#unassignedlist li");

        employees.forEach(emp => {
            const role = emp.dataset.role;

            if (roleIsAllowed(role, zone)) {
                const liModal = document.createElement('li');
                liModal.textContent = emp.querySelector('.name').textContent;

                liModal.addEventListener('click', () => {
    const zoneList = btn.closest('.zone').querySelector('.zonelist');

    // Ajouter l'employé dans la zone
    zoneList.appendChild(emp);

    // Ajouter bouton Retirer seulment si non déjà présent
    if (!emp.querySelector('.remove-zone')) {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Retirer";
        removeBtn.className = "remove-zone";
        removeBtn.style.marginLeft = "10px";

        emp.appendChild(removeBtn);

        //  renvoyer vers la side-bar
        removeBtn.addEventListener('click', () => {
            unassignedList.appendChild(emp);
            removeBtn.remove(); 
        });
    }

    modal.remove();
});


                modalList.appendChild(liModal);
            }
        });

        modal.querySelector('.close-modal').onclick = () => modal.remove();
    });
});


//accès par rôle

function roleIsAllowed(role, zone) {
    const rules = {
        "zone-reception": ["réceptionniste", "Manager"],
        "zone-serveurs": ["technicien IT", "Manager"],
        "zone-securite": ["agent de sécurité", "Manager"],
        "zone-conference": ["all"],
        "zone-personnel": ["all"],
        "zone-archives": ["Manager"]
    };

    // Empêcher l'accès au Nettoyage aux archives
    if (zone === "zone-archives" && role === "Nettoyage") return false;

    const allowed = rules[zone];
    if (!allowed) return false;

    if (allowed.includes("all")) return true;

    return allowed.includes(role);
}

// Preview Photo

const photoInput = simpleForm.querySelector('input[placeholder="image"]');
const previewImg = document.createElement('img');
previewImg.style.cssText =
    "width:80px;height:80px;border-radius:50%;display:block;margin-bottom:10px;";
photoInput.parentNode.insertBefore(previewImg, photoInput.nextSibling);

photoInput.addEventListener('input', () => {
    previewImg.src = photoInput.value || '';
});


// Gestion des expériences
const addExpBtn = document.getElementById('addExperienceBtn');
const experiencesList = document.getElementById('experiencesList');

addExpBtn.addEventListener('click', () => {
    const expDiv = document.createElement('div');
    expDiv.className = 'experience-item';
    expDiv.style.marginBottom = '10px';

    expDiv.innerHTML = `
        <label>Poste: <input type="text" placeholder="Ex: Développeur" required></label>
        <label>Entreprise: <input type="text" placeholder="Ex: Google" required></label>
        <label>Date début: <input type="date" class="start-date" required></label>
        <label>Date fin: <input type="date" class="end-date" required></label>
        <button type="button" class="remove-exp">Supprimer</button>
        <hr>
    `;

    experiencesList.appendChild(expDiv);

    expDiv.querySelector('.remove-exp').onclick = () => expDiv.remove();
});
