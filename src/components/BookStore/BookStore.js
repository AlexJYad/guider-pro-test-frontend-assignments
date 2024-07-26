import Books from "../Books/Books";
import Filter from "../Filter/Filter";
import Title from "../Title";
import { useState } from "react";
import books from "../../books.json";
import "./BookStore.css";

export default function BookStore() {
   const [sortedBooks, setSortedBooks] = useState([...books]);

   const handleBooksSorted = (sorted) => {
      setSortedBooks(sorted);
   };

   const handleTagsSelected = (selectedTags) => {
      const filteredBooks = books.filter((book) =>
         book.tags.some((tag) => selectedTags.includes(tag))
      );
      setSortedBooks(filteredBooks);
   };

   return (
      <div className="main">
         <Title />
         <Filter
            onBooksSorted={handleBooksSorted}
            onTagsSelected={handleTagsSelected}
         />
         <Books sortedBooks={sortedBooks} />
      </div>
   );
}
