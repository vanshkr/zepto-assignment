import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import Chip from "./Chip";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUsers, setShowUsers] = useState([]);

  const fetchData = async (value) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();

      const results = data
        .filter((user) =>
          user?.name?.toLowerCase().includes(value.toLowerCase()),
        )
        .filter((user) => !selectedUsers.includes(user?.name));

      return results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDataAndLog = async () => {
      const data = await fetchData(value);
      setShowUsers(data);
    };

    if (value.length > 0) {
      fetchDataAndLog();
    }
  }, [value, selectedUsers]);

  return (
    <div className="flex">
      <Chip users={selectedUsers} />

      <div>
        <input
          value={value}
          type="text"
          placeholder="Add User Here ..."
          onChange={(e) => setValue(e.target.value)}
        />
        {value.length > 0 && showUsers.length > 0 && (
          <Dropdown
            users={showUsers}
            onAdd={(user) => {
              setSelectedUsers((prevSelectedUser) => [
                ...prevSelectedUser,
                user.name,
              ]);
              setValue("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
