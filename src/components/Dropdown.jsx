import { VscAccount } from "react-icons/vsc";

const Dropdown = ({ users, onAdd }) => {
  return (
    <div className="cursor-pointer w-fit absolute my-10">
      <div
        className={`m-auto z-999 bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 max-h-48 overflow-y-scroll`}
      >
        <ul className="py-2 m-auto text-sm text-gray-700 dark:text-gray-200 items-center justify-center">
          {users?.map((user) => (
            <li
              key={user?.id}
              className="flex p-2 border-b-2"
              onClick={() => onAdd(user)}
            >
              <>
                <p className="m-1">
                  <VscAccount className="w-8 h-8" />
                </p>
              </>
              <h1 className="m-1 pt-1">{user?.name}</h1>
              <h5 className="mx-6 opacity-60 pt-2">{user?.email}</h5>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
