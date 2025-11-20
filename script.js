// --- Sélection des éléments ---
const btnAdd = document.getElementById('btnadd');
const formContainer = document.getElementById('formcontainer');
const unassignedList = document.getElementById('unassignedlist');

// --- Affichage / Masquage du formulaire ---
btnAdd.addEventListener('click', () => {
    formContainer.style.display = (formContainer.style.display === 'block') ? 'none' : 'block';
});

// --- Gestion du formulaire ---
const simpleForm = formContainer.querySelector('form');

simpleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = simpleForm.querySelector('input[placeholder="ex:sarra"]').value;
    const role = simpleForm.querySelector('select[name="role"]').value;
    const photo = simpleForm.querySelector('input[placeholder="image"]').value;
    

    // Création d'un élément li avec data-role et class pour le nom
    // --- VALIDATION REGEX ---
const validators = {
    name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^(?:(?:\+|00)33|0)[1-9](?:\d{8})$/,
    url: /^https?:\/\/.+\..+/
};

// Exemple de vérification avant création du li
const email = simpleForm.querySelector('input[placeholder="gmail.com"]').value;
const phone = simpleForm.querySelector('input[placeholder="0625883148"]').value;
const nameInput = simpleForm.querySelector('input[placeholder="ex:sarra"]').value;

if (!validators.name.test(nameInput)) { alert("Nom invalide"); return; }
if (!validators.email.test(email)) { alert("Email invalide"); return; }
if (!validators.phone.test(phone)) { alert("Téléphone invalide"); return; }
if (photo && !validators.url.test(photo)) { alert("URL de photo invalide"); return; }

    const li = document.createElement('li');
    li.dataset.role = role;
    li.innerHTML = `
        <img src="${photo}" alt="${name}" width="40" height="40" style="border-radius:50%; margin-right:10px;">
        <span class="name">${name} (${role})</span>
        <button class="remove">X</button>
    `;
    unassignedList.appendChild(li);
    simpleForm.reset();
    formContainer.style.display = 'none';

    li.querySelector('.remove').addEventListener('click', () => li.remove());
});


// --- Boutons + pour chaque zone ---
document.querySelectorAll('.btn-add-to-zone').forEach(btn => {
    btn.addEventListener('click', () => {
        const zone = btn.dataset.zone;
        const employees = document.querySelectorAll("#unassignedlist li");

        // Création du modal
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

   employees.forEach((emp, index) => {
    const role = emp.dataset.role;

    if (roleIsAllowed(role, zone)) {
        const liModal = document.createElement('li');
        liModal.textContent = emp.querySelector('.name').textContent;

        liModal.addEventListener('click', () => {
            const zoneList = btn.closest('.zone').querySelector('.zonelist');
            zoneList.appendChild(emp); // append li الأصلي
            modal.remove();
        });

        modalList.appendChild(liModal);
    }
});


        modal.querySelector('.close-modal').onclick = () => modal.remove();
    });
});


//fonction de roles
function roleIsAllowed(role, zone) {
    const rules = {
        "zone-reception": ["réceptionniste", "Manager"],
        "zone-serveurs": ["technicien IT", "Manager"],
        "zone-securite": ["agent de sécurité", "Manager"],
        "zone-conference": ["all"],   
        "zone-personnel": ["all"],      
        "zone-archives": ["Manager"]   
    };

    // l'expt de salle d'archive et nettoyage
    if (zone === "zone-archives" && role === "Nettoyage") return false;

    // regle d'accés pour tout 
    const allowed = rules[zone];
    if (allowed.includes("all")) return true;

    //  le role  exist ou bien non 
    return allowed.includes(role);
}
// --- Preview photo ---
const photoInput = simpleForm.querySelector('input[placeholder="image"]');
const previewImg = document.createElement('img');
previewImg.style.width = '80px';
previewImg.style.height = '80px';
previewImg.style.borderRadius = '50%';
previewImg.style.display = 'block';
previewImg.style.marginBottom = '10px';
photoInput.parentNode.insertBefore(previewImg, photoInput.nextSibling);

photoInput.addEventListener('input', () => {
    previewImg.src = photoInput.value || '';
});

const addExpBtn = document.getElementById('addExperienceBtn');
const experiencesList = document.getElementById('experiencesList');

addExpBtn.addEventListener('click', () => {
    // new div for ex
    const expDiv = document.createElement('div');
    expDiv.className = 'experience-item';
    expDiv.style.marginBottom = '10px';

    expDiv.innerHTML = `
        <label>
            Poste:
            <input type="text" placeholder="Ex: Développeur" required>
        </label>
        <label>
            Entreprise:
            <input type="text" placeholder="Ex: Google" required>
        </label>
        <label>
            Date début:
            <input type="date" class="start-date" required>
        </label>
        <label>
            Date fin:
            <input type="date" class="end-date" required>
        </label>
        <button type="button" class="remove-exp">Supprimer</button>
        <hr>
    `;

    //add form to th list  
    experiencesList.appendChild(expDiv);

    // remove ex
    expDiv.querySelector('.remove-exp').addEventListener('click', () => {
        expDiv.remove();
    });
});

