const GetItem = <T>(key: string, defaultValue: T) => {
    return (localStorage.getItem(key) as T) || defaultValue;
};

const SetItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
};

class MyStorage {
    static GetItem = GetItem;
    static SetItem = SetItem;
}

export default MyStorage;
