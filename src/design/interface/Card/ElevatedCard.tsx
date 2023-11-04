import Card, { CardProps } from "./Card";
import "./ElevatedCard.css";
import "./Card.css";

const ElevatedCard = (props: CardProps) => {
    return (
        <Card {...props} className={`card elevated-card ${props.className}`} />
    );
};

export default ElevatedCard;
