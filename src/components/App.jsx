import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

const App = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitAddContact = ({ name, number }) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in your phonebook!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
  };

  const isFilterContact = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const filterContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filter ? filterContacts() : contacts;

  return (
    <div style={{ height: "100px", padding: "20px" }}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmitAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={isFilterContact} />
      <ContactList
        contacts={filteredContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;

