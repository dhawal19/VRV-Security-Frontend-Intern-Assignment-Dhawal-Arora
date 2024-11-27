import {  useContext } from 'react'
import UserTable from '../tables/UserTable';
import {FaSpinner} from 'react-icons/fa'
import { UserContext } from '../contexts/ContextFile';

const Users = () => {
    let { users, columns, isLoaded, fetchUsers, editUser, deleteUser } = useContext(UserContext);
 
    const onEdit = async (id, user) => {
        try {
            const response = await editUser(id, user);
            if(response.status === 200){
                alert('User updated successfully');
            }
            else{
                alert('Error updating user');
            }
        }
        catch (error) {
            alert(error);
        }
    }

    const onDelete = async (id) => {
        try {
            if(window.confirm('Are you sure you want to delete this user?') === false){
                return;
            }
            
            const response = await deleteUser(id);
            if(response.status === 200 || response.status === 204){
                users = users.filter((user) => user._id !== id);
                alert('User deleted successfully');
            }
            else{
                alert('Error deleting user');
            }
            fetchUsers();
        }
        catch (error) {
            alert(error);
        }
    }

return (
    <div className="mx-6 flex flex-col justify-between">
            <h1 className="text-2xl text-gray-800 font-semibold my-2">Users</h1>
            {isLoaded ? (
                    <UserTable data={users} columns={columns} onEdit={onEdit} onDelete={onDelete}/>
            ) : (
                    <div className="flex justify-center items-center h-full">
                            <FaSpinner className="animate-spin w-10 h-10 text-gray-800"/>
                    </div>
            )}
    </div>
)
}

export default Users