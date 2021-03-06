import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import '../assets/Catalog.css';
import arrow from '../assets/arrow.svg';
import Filter from './Filter';

const Catalog = ({ books }) => {
  const [bookFilter, setBookFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const listify = (list) => list.map((book) => (
    <Link
      to={`/details/${book.primary_isbn13}`}
      key={book.primary_isbn13}
    >
      <img src={arrow} alt="arrow" />
      <Book
        title={book.title}
        isbn={book.primary_isbn13}
      />
    </Link>
  ));

  const handleChange = (newValue) => {
    setBookFilter(newValue);
  };

  useEffect(() => {
    const filteredResult = books.filter(
      (book) => book.title.toLowerCase().includes(bookFilter.toLowerCase()),
    );
    setFilteredBooks(filteredResult);
  }, [bookFilter, books]);

  return (
    <section className="container">
      <Filter changeHandler={handleChange} value={bookFilter} />
      <div><h2>Hardcover Fiction Best Sellers</h2></div>
      <div className="catalog">
        {bookFilter ? listify(filteredBooks) : listify(books)}
      </div>
    </section>
  );
};

Catalog.propTypes = {
  books: PropTypes.instanceOf(Object).isRequired,
};

export default Catalog;
