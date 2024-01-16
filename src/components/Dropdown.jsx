
const Dropdown = ({ users,onAdd }) => {
    return (
      <div className="cursor-pointer border-4 border-sky-500 w-fit relative"
      >
<div className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 max-h-${users?.length > 4 ? '56' : 'fit'} overflow-y-${users?.length> 4 ? 'scroll' : 'none'}`}> 
   <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
    { users?.map((user) => (
            <li key={user?.id} className="flex border-b-4" onClick={() =>onAdd(user) }>
            <div>
            <svg className="w-12 h-12 z-1" data-jdenticon-value={user?.id}></svg>
            </div>
              <h1>{user?.name}</h1>
              <h3>{user?.email}</h3>
            </li>
          ))}
    </ul>
</div>
        
      </div>
    );
  };
  
  export default Dropdown;
  