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

        employees.forEach(emp => {
            const role = emp.dataset.role;

            if (roleIsAllowed(role, zone)) {
                const li = document.createElement('li');
                li.textContent = emp.querySelector('.name').textContent;

                li.addEventListener('click', () => {
                    const zoneList = btn.closest('.zone').querySelector('.zonelist');
                    zoneList.appendChild(emp);
                    modal.remove();
                });

                modalList.appendChild(li);
            }
        });

        modal.querySelector('.close-modal').onclick = () => modal.remove();
    });
});

// --- Fonction de validation des rôles ---
function roleIsAllowed(role, zone) {
    const rules = {
        "zone-reception": ["réceptionniste", "Manager"],
        "zone-serveurs": ["technicien IT", "Manager"],
        "zone-securite": ["agent de sécurité", "Manager"],
        "zone-archives": ["all"], // nettoyage interdit
        "zone-personnel": ["all"],
        "zone-conference": ["all"]
    };

    if (zone === "zone-archives" && role === "Nettoyage") return false;
    const allowed = rules[zone];
    if (allowed.includes("all")) return true;
    return allowed.includes(role);
}
