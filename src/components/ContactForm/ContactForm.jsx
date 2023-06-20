import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { contactsCheking } from 'utils/contactsCheking';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import css from '../ContactForm/ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleCreateNewContact = e => {
    e.preventDefault();
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    const inContactList = contacts.filter(contact =>
      contactsCheking(contact, newContact)
    ).length;

    if (!inContactList) {
      dispatch(addContact(newContact));
    }
    setName('');
    setNumber('');
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  return (
    <form onSubmit={handleCreateNewContact} className={css.form}>
      <label className={css.label}>
        Name
        <input
          type="text"
          className={css.input}
          value={name}
          onChange={handleNameChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          className={css.input}
          value={number}
          onChange={handleNumberChange}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={css.inputBtn}>
        Add contact
      </button>
    </form>
  );
};
