import React, { useState, useEffect, useRef } from "react";
import "./TagSelector.css";

const TagSelector = ({ tags, selectedTags, onTagsChange, onClose }) => {
   const [isOpen, setIsOpen] = useState(false);
   const containerRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
         ) {
            setIsOpen(false);
            onClose();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, [onClose]);

   const handleTagClick = (tag) => {
      const newSelectedTags = selectedTags.includes(tag)
         ? selectedTags.filter((t) => t !== tag)
         : [...selectedTags, tag];
      onTagsChange(newSelectedTags);
   };

   const getOpenClass = (open) => {
      if (open) return "tag__indicator tag__indicator--open";
      return "tag__indicator tag__indicator--close";
   };

   return (
      <div className="tag__selector" ref={containerRef}>
         <button className="toggle__button" onClick={() => setIsOpen(!isOpen)}>
            Tags <span className={getOpenClass(isOpen)}>&#9660;</span>
         </button>
         {isOpen && (
            <div className="tag__menu">
               <div className="tag__list">
                  {tags.length === 0 && <p>No tags available</p>}
                  {tags.map((tag) => (
                     <div
                        key={tag}
                        className={`tag__item ${
                           selectedTags.includes(tag)
                              ? "tag__item--selected"
                              : ""
                        }`}
                        onClick={() => handleTagClick(tag)}
                     >
                        {tag}
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default TagSelector;
