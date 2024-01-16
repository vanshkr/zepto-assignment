const Chip = ({users})=>{
    return( <div className="flex">
    {users?.map((user)=> <p>{user}
    </p>)}
    </div>)
}

export default Chip;