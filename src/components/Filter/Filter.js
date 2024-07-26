import React, { useState, useEffect } from "react";
import books from "../../books.json";
import TagSelector from "../TagSelector/TagSelector";
import "./Filter.css";

export default function Filter({ onBooksSorted, onTagsSelected }) {
   const [sortAuthor, setsortAuthor] = useState("none");
   const [sortPrice, setsortPrice] = useState("none");
   const [sortDate, setsortDate] = useState("none");
   const [selectedTags, setSelectedTags] = useState([]);
   const [allTags, setAllTags] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      const tags = Array.from(new Set(books.flatMap((book) => book.tags)));
      setAllTags(tags);
   }, []);

   useEffect(() => {
      let sorted = [...books];

      if (selectedTags.length > 0) {
         sorted = sorted.filter((book) =>
            book.tags.some((tag) => selectedTags.includes(tag))
         );
      }

      if (sortPrice !== "none") {
         sorted.sort((a, b) => {
            if (sortPrice === "asc") {
               if (a.price === b.price) {
                  return getMainAuthorLastName(a).localeCompare(
                     getMainAuthorLastName(b)
                  );
               }
               return a.price - b.price;
            } else if (sortPrice === "desc") {
               if (a.price === b.price) {
                  return getMainAuthorLastName(b).localeCompare(
                     getMainAuthorLastName(a)
                  );
               }
               return b.price - a.price;
            }
            return 0;
         });
      }

      if (sortAuthor !== "none") {
         sorted.sort((a, b) => {
            const lastNameA = getMainAuthorLastName(a);
            const lastNameB = getMainAuthorLastName(b);
            if (sortAuthor === "asc") {
               return lastNameA.localeCompare(lastNameB);
            } else if (sortAuthor === "desc") {
               return lastNameB.localeCompare(lastNameA);
            }
            return 0;
         });
      }

      if (sortDate !== "none") {
         sorted.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            if (sortDate === "asc") {
               if (dateA.getTime() === dateB.getTime()) {
                  return getMainAuthorLastName(a).localeCompare(
                     getMainAuthorLastName(b)
                  );
               }
               return dateA - dateB;
            } else if (sortDate === "desc") {
               if (dateA.getTime() === dateB.getTime()) {
                  return getMainAuthorLastName(b).localeCompare(
                     getMainAuthorLastName(a)
                  );
               }
               return dateB - dateA;
            }
            return 0;
         });
      }

      onBooksSorted(sorted);
   }, [sortAuthor, sortPrice, sortDate, selectedTags, onBooksSorted]);

   const handleSortPrice = () => {
      setsortPrice((prev) => {
         setsortAuthor("none");
         setsortDate("none");
         return prev === "none" ? "asc" : prev === "asc" ? "desc" : "none";
      });
   };

   const handleSortAuthor = () => {
      setsortAuthor((prev) => {
         setsortPrice("none");
         setsortDate("none");
         return prev === "none" ? "asc" : prev === "asc" ? "desc" : "none";
      });
   };

   const handleSortDate = () => {
      setsortDate((prev) => {
         setsortPrice("none");
         setsortAuthor("none");
         return prev === "none" ? "asc" : prev === "asc" ? "desc" : "none";
      });
   };

   const handleReset = () => {
      setsortPrice("none");
      setsortAuthor("none");
      setsortDate("none");
      setSelectedTags([]);
      onTagsSelected([]);
   };

   const closeModal = () => setIsModalOpen(false);

   const handleTagsChange = (tags) => {
      setSelectedTags(tags);
      onTagsSelected(tags);
   };

   const getSortIndicatorClass = (sortOrder) => {
      if (sortOrder === "asc") return "sort__indicator sort__indicator--asc";
      if (sortOrder === "desc") return "sort__indicator sort__indicator--desc";
      return "sort__indicator sort__indicator--none";
   };

   return (
      <div className="filter">
         <div className="filter__sort">
            <button onClick={handleSortPrice}>
               price{" "}
               <span className={getSortIndicatorClass(sortPrice)}>&#8595;</span>
            </button>
            <button onClick={handleSortAuthor}>
               author{" "}
               <span className={getSortIndicatorClass(sortAuthor)}>
                  &#8595;
               </span>
            </button>
            <button onClick={handleSortDate}>
               date{" "}
               <span className={getSortIndicatorClass(sortDate)}>&#8595;</span>
            </button>
         </div>
         <div className="filter__buttons">
            <div className="filter__tags">
               <TagSelector
                  tags={allTags}
                  selectedTags={selectedTags}
                  onTagsChange={handleTagsChange}
                  onClose={closeModal}
               />
            </div>
            <div className="filter__reset">
               <button onClick={handleReset}>reset rules</button>
            </div>
         </div>
      </div>
   );
}

const getMainAuthorLastName = (book) => {
   const mainAuthor = book.author.split(" ")[0];
   return mainAuthor;
};

const parseDate = (dateStr) => {
   const [month, year] = dateStr.split(" ");
   return new Date(`${month} 1, ${year}`);
};
