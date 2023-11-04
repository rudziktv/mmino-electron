import "./Avatar.css";

const Avatar = (props: AvatarProps) => {
    return (
        <div className="avatar">
            <i className="ri-user-line" />
        </div>
    );
};

export interface AvatarProps {}

export default Avatar;
