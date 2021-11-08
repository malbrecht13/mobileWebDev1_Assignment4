import { db, getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from './firebaseConfig.js';

window.addEventListener('DOMContentLoaded', () => {
    initApp();
})

const initApp = () => {
    showContacts().then(() => {
        addContactListener();
        deleteContactListener();
        updateContactListener();
    });
    
};

const getContacts = async db => {
    const c = collection(db, 'contacts');
    const querySnapshot = await getDocs(c);
    return querySnapshot;
}

const showContacts = async () => {
    const querySnapshot = await getContacts(db);
    querySnapshot.forEach(d => {
        const data = d.data();

        const main = document.querySelector('main');
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact_div');
        contactDiv.setAttribute('data_id', d.id);
        const container = document.createElement('div');
        container.classList.add('contact_container');
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('btn_div');
        const name = document.createElement('h2');
        const address1 = document.createElement('p');
        const address2 = document.createElement('p');
        const address3 = document.createElement('p');
        const phone = document.createElement('p');
        const deleteBtn = document.createElement('button');
        const updateBtn = document.createElement('button');
        deleteBtn.setAttribute('btn_id', d.id);
        deleteBtn.classList.add('delete_btn', 'btn', 'btn-danger');
        updateBtn.setAttribute('btn_id', d.id);
        updateBtn.classList.add('update_btn', 'btn', 'btn-info');
        name.textContent = data.name;
        address1.textContent = data.addressline1;
        address2.textContent = data.addressline2;
        address3.textContent = `${data.city}, ${data.state}  ${data.zip}`;
        phone.textContent = data.phone;
        deleteBtn.textContent = 'Delete';
        updateBtn.textContent = 'Update';
        container.appendChild(name);
        container.appendChild(address1);
        container.appendChild(address2);
        container.appendChild(address3);
        container.appendChild(phone);
        contactDiv.appendChild(container);
        btnDiv.appendChild(deleteBtn);
        btnDiv.appendChild(updateBtn);
        contactDiv.appendChild(btnDiv);
        main.appendChild(contactDiv);
        deleteContactListener();   
    });
};

const addContactListener = () => {
    const addContactForm = document.getElementById('add-contact-form');
    addContactForm.addEventListener('submit', addContact);
};

const addContact = (e) => {
    e.preventDefault();
    const c = collection(db, 'contacts');
    addDoc(c, {
        name: e.target.name.value,
        addressline1: e.target.address1.value,
        addressline2: e.target.address2.value,
        city: e.target.city.value,
        state: e.target.state.value,
        zip: e.target.zip.value,
        phone: e.target.phone.value
    });
    reset();

}

const updateContactListener = () => {
    const updateBtns = document.querySelectorAll('.update_btn');
    updateBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const formHeader = document.getElementById('form_header');
            const submitBtn = document.getElementById('submit_btn');
            formHeader.textContent = 'Update Contact';
            submitBtn.textContent = 'Update Contact';
            window.scroll(0,0); //scroll to top of screen
            const id = e.target.getAttribute('btn_id');
            getContacts(db).then((querySnapshot) => {
                querySnapshot.forEach(contact => {
                    if(contact.id === id) {
                        const data = contact.data();
                        const form = document.getElementById('add-contact-form');
                        form.removeEventListener('submit', addContact);
                        const nameField = document.getElementById('name');
                        const address1 = document.getElementById('address1');
                        const address2 = document.getElementById('address2');
                        const city = document.getElementById('city');
                        const state = document.getElementById('state');
                        const zip = document.getElementById('zip');
                        const phone = document.getElementById('phone');
                        nameField.value = data.name;
                        address1.value = data.addressline1;
                        address2.value = data.addressline2;
                        city.value = data.city;
                        state.value = data.state;
                        zip.value = data.zip;
                        phone.value = data.phone;
                        form.addEventListener('submit', (e) => updateContact(e, contact.id));
                        form.removeEventListener('submit', (e) => updateContact(e, contact.id));
                    }
                })
            })
        });
    });
};

const updateContact = (e, id) => {
    e.preventDefault();
    const docToUpdate = doc(db, 'contacts', id);
    updateDoc(docToUpdate, {
        name: e.target.name.value,
        addressline1: e.target.address1.value,
        addressline2: e.target.address2.value,
        city: e.target.city.value,
        state: e.target.state.value,
        zip: e.target.zip.value,
        phone: e.target.phone.value
    });
    const formHeader = document.getElementById('form_header');
    const submitBtn = document.getElementById('submit_btn');
    formHeader.textContent = 'Add Contact';
    submitBtn.textContent = 'Submit';
    reset();
};

const deleteContactListener = () => {
    const deleteBtns = document.querySelectorAll('.delete_btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const id = e.target.getAttribute('btn_id');
            const itemToDelete = doc(db, 'contacts', id);
            deleteDoc(itemToDelete);
            deleteElementAndBtn(id);
        });
    })
}

const deleteElementAndBtn = (id) => {
    const contactDivs = document.querySelectorAll('.contact_div');
    contactDivs.forEach(div => {
        const data_id = div.getAttribute('data_id');
        if(data_id === id) {
            while(div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }
    });
}

const reset = () => {
    const nameField = document.getElementById('name');
    const address1 = document.getElementById('address1');
    const address2 = document.getElementById('address2');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zip = document.getElementById('zip');
    const phone = document.getElementById('phone');
    nameField.value = '';
    address1.value = '';
    address2.value = '';
    city.value = '';
    state.value = '';
    zip.value = '';
    phone.value = '';
    // refresh the screen after half a second
    setTimeout(() => {
        location.reload();
    }, 500);
}









