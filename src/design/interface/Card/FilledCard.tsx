import Card, { CardProps } from "./Card";
// import "./ElevatedCard.css";
import "./Card.css";

const FilledCard = (props: CardProps) => {
    return (
        <Card {...props} className={`card filled-card ${props.className}`} />
    );
};

export default FilledCard;
