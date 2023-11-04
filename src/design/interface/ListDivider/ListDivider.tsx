import "./ListDivider.css";

const ListDivider = ({ items, ...props }: ListDividerProps) => {
    return (
        <div className="list-divider" style={props.style}>
            {items && items.length > 0 ? (
                items.map((item, index) => {
                    if (index > 0) {
                        return (
                            <div key={index} style={props.itemWrapperStyle}>
                                <hr className="divider" />
                                {item}
                            </div>
                        );
                    }

                    return <div key={index}>{item}</div>;
                })
            ) : (
                <span className="divider-list-empty">{props.empty}</span>
            )}
        </div>
    );
};

export interface ListDividerProps {
    items?: React.ReactNode[];

    style?: React.CSSProperties;
    itemWrapperStyle?: React.CSSProperties;
    empty?: React.ReactNode;
}

export default ListDivider;
