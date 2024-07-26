import Book from "../Book/Book";
import "./Books.css";

export default function Books({ sortedBooks }) {
   if (!sortedBooks || sortedBooks.length === 0) {
      return <div className="books">No Books available.</div>;
   }

   // Рассчитываем общую цену
   const totalPrice = sortedBooks.reduce((acc, book) => {
      const price = parseFloat(book.price);
      return !isNaN(price) ? acc + price : acc;
   }, 0);

   return (
      <div className="books">
         {sortedBooks.map((book, num) => {
            if (
               !book.title ||
               !book.author ||
               !book.date ||
               !book.price ||
               !book.tags
            ) {
               console.error(`Missing required data for book: ${book.title}`);
               return null;
            }
            return (
               <Book
                  key={book.title}
                  id={num + 1}
                  title={book.title}
                  author={book.author}
                  date={book.date}
                  price={book.price}
                  tags={book.tags}
                  illustrator={book.illustrator}
               />
            );
         })}
         <div className="total">
            <h3>
               Total: <span>{totalPrice.toFixed(2)}$</span>
            </h3>
         </div>
      </div>
   );
}
