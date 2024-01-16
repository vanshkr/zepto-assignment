import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import Chip from "./Chip";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUsers, setShowUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async (value) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchDataAndLog = async () => {
    const data = await fetchData(value);
    setUsers(data);
  };

  const handleAdditionInSelectedList = (selectedUser) => {
    setSelectedUsers((prevSelectedUser) => [...prevSelectedUser, selectedUser]);
    setShowUsers(() => users?.filter((user) => !selectedUsers.some(selectedUser => selectedUser.id === user.id)).filter((item) => !(item.id === selectedUser.id)));
    setValue("");
  };
  const handleInputChange = (e) => {
    setValue(e.target.value);
    setShowUsers(() => {
      const results = users
        ?.filter((user) => !selectedUsers.some(selectedUser => selectedUser.id === user.id))
        .filter((user) =>
          user?.name?.toLowerCase().includes(e.target.value.toLowerCase()),
        );
      return results;
    });
  };

  useEffect(() => {
    fetchDataAndLog();
  }, []);

  return (
    <div className="flex flex-wrap border-solid border-b-4 border-black">
      <Chip
        users={selectedUsers}
        onRemove={(user) => {
          setSelectedUsers((prevSelectedUser) => {
            return prevSelectedUser.filter((item) => item.id !== user.id);
          });
          setShowUsers((prevShowUsers) => [...prevShowUsers, user]);
        }}
      />

      <div>
        <input
          value={value}
          type="text"
          className="apperance-none outline-none"
          placeholder="Add User Here ..."
          onChange={(e) => handleInputChange(e)}
        />

        <Dropdown
          users={showUsers}
          onAdd={(user) => handleAdditionInSelectedList(user)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

/*
when add 
selected->add
show->remove*/
