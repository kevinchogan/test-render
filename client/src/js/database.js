// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('contacts', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contacts already exists');
                return;
            }
            db.createObjectStore('contacts', {keyPath: 'id', autoIncrement: true});
            console.log('contacts created successfully');
        }
    })
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('Adding contact: ', name, home, cell, email);
    const contactsDb = await openDB('contacts', 1);
    const tx = contactsDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.add({name, home_phone: home, cell_phone: cell, email});
    const result = await request;
    console.log('Data saved to the database', result); 
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('GET all contacts from the database');
    const contactsDb = await openDB('contacts', 1);
    const tx = contactsDb.transaction('contacts', 'readonly');
    const store = tx.objectStore('contacts');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;  
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('Deleting contact with id: ', id);
    const contactsDb = await openDB('contacts', 1);
    const tx = contactsDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
    // return result?.value;
};

initdb();
