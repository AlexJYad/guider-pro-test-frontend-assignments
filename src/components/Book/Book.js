import "./Book.css";

export default function Book(props) {
   return (
      <div className="book">
         <div className="book__info">
            <h4>
               <span>{props.id}</span> {props.title}
            </h4>
            <p>
               by {props.author}
               {props.illustrator && `, illustrated by ${props.illustrator}`}
            </p>
            <p>{props.date}</p>
            <p>{props.price}$</p>
         </div>
         <div className="book__tags">
            {props.tags.map((tag) => (
               <p key={tag}>{tag}</p>
            ))}
         </div>
      </div>
   );
}
