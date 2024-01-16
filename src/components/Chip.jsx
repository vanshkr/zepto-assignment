import { VscChromeClose } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
const Chip = ({ users, onRemove, activeText }) => {
  return (
    <>
      {users?.map((user, ind) => (
        <ul
          key={user?.id}
          className={`m-2 p-3 justify-center items-center  flex hover:bg-gray-700 bg-gray-500   font-bold rounded-full ${activeText && ind === users.length - 1 ? "text-orange-500" : "text-white"}`}
        >
          <li className={`mx-1 `}>
            <VscAccount className="w-8 h-8" />
          </li>
          <li className="mx-1">{user?.name}</li>
          <li className="mx-1">
            <VscChromeClose
              className="cursor-pointer text-white hover:text-red-500"
              onClick={() => onRemove(user)}
            />
          </li>
        </ul>
      ))}
    </>
  );
};

export default Chip;
