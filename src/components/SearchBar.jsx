import Dropdown from "./Dropdown";
import { useState, useEffect, useRef } from "react";
import Chip from "./Chip";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [backspaceActive, setBackspaceActive] = useState(false);
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const inputRef = useRef(null);

  const fetchData = async () => {
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

  const handleInputChange = (e) => {
    setBackspaceActive(false);
    setValue(e.target.value);
    const filteredUsers = users.filter(
      (user) =>
        !selectedUsers.some((selectedUser) => selectedUser.id === user.id) &&
        user?.name?.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setDisplayedUsers(filteredUsers);
    
  };
  const handleBackspace = (e) => {
    if (e.keyCode !== 8) {
      setBackspaceActive(false);
      inputRef.current.focus();
      return;
    }
    if (backspaceActive) {
      setBackspaceActive(false);
      handleRemovalFromSelectedList(selectedUsers[selectedUsers.length - 1]);
    } else if (value === "" && selectedUsers.length > 0) {
      setBackspaceActive(true);
    }
    inputRef.current.focus();
  };
  const handleRemovalFromSelectedList = (selectedUser) => {
    setBackspaceActive(false);
    const filteredUsers = users.filter(
      (user) =>
        !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
    )
    const newFilteredUsers = [...filteredUsers,selectedUser]
    setDisplayedUsers(newFilteredUsers);
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((item) => item.id !== selectedUser.id),
    );
    inputRef.current.focus();
   
  };
  const handleAdditionInSelectedList = (selectedUser) => {
    setBackspaceActive(false);
    const filteredUsers = users.filter(
      (user) =>
        !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
    ).filter((user) => user.id !== selectedUser.id);
    setDisplayedUsers(filteredUsers);
    setSelectedUsers((prevSelectedUsers) => [
      ...prevSelectedUsers,
      selectedUser,
    ]);
    inputRef.current.focus();
  };

  useEffect(() => {
    const fetchDataAndLog = async () => {
      const data = await fetchData();
      setUsers(data);
      const filteredUsers = data.filter(
        (user) =>
          !selectedUsers.some((selectedUser) => selectedUser.id === user.id),
      );
      setDisplayedUsers(filteredUsers);
    };
    fetchDataAndLog();
  }, []);

  return (
    <div className="w-full border-solid border-b-4 border-black">
      <div className="flex items-center flex-wrap w-fit my-2">
        <Chip
          users={selectedUsers}
          activeText={backspaceActive}
          onRemove={handleRemovalFromSelectedList}
        />
        <div>
          <input
            value={value}
            type="text"
            ref={inputRef}
            className="apperance-none outline-none"
            placeholder="Add User Here ..."
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e)=>handleBackspace(e)}
            onClick={() => setToggleDisplay(true)}
          />
          {toggleDisplay && displayedUsers.length > 0 && (
            <Dropdown
              users={displayedUsers}
              onAdd={handleAdditionInSelectedList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
