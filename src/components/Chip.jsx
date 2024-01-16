const Chip = ({users,onRemove})=>{
    return( <div className="flex flex-wrap">
    {users?.map((user)=> <ul key = {user?.id} className="bg-blue-500 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    <li>{user?.id}</li>
    <li>{user?.name}</li>
    <p className = "cursor-pointer"  onClick={()=>onRemove(user)}>remove</p>
    </ul>)}
    </div>)
}

export default Chip;