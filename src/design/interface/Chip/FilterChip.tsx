import "./FilterChip.css";

const FilterChip = (props: FilterChipProps) => {
    return (
        <div
            className={`filter-chip selected ${
                props.disabled ? "disabled" : ""
            }`}
        >
            <i className="filter-chip-icon ri-filter-3-line" />
            <span className="filter-chip-label">{props.label}</span>
            <i
                className="filter-chip-icon filter-chip-clear ri-close-line"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.onClear?.();
                }}
            />
        </div>
    );
};

export interface FilterChipProps {
    disabled?: boolean;
    label?: string;

    onClear?: () => void;
}

export default FilterChip;
