import {  useContext } from 'react'
import {FaSpinner} from 'react-icons/fa'
import { RoleContext } from '../contexts/ContextFile';
import RoleTable from '../tables/RoleTable';

const Roles = () => {
    let { roles, columns, isLoaded, fetchRoles, editRole, deleteRole } = useContext(RoleContext);
 
    const onEdit = async (id, role) => {
        try {
            if(role.name === '') {
                alert('Role name cannot be empty');
                return;
            }
            if(role.permissions.length === 0) {
                alert('Role must have at least one permission');
                return;
            }
            if(role.permissions.length !== new Set(role.permissions).size){
                alert('Role cannot have duplicate permissions');
                return;
            }
            const response = await editRole(id, role);
            if(response.status === 200){
                alert('Role updated successfully');
            }
            else{
                alert('Error updating role');
            }
        }
        catch (error) {
            alert(error);
        }
    }

    const onDelete = async (id) => {
        try {
            if(window.confirm('Are you sure you want to delete this role?') === false){
                return;
            }
            
            const response = await deleteRole(id);
            if(response.status === 200 || response.status === 204){
                roles = roles.filter((role) => role._id !== id);
                alert('Role deleted successfully');
            }
            else{
                alert('Error deleting role');
            }
        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <div className="mx-6 flex flex-col justify-between">
                <h1 className="text-2xl text-gray-800 font-semibold my-2">Roles</h1>
                {isLoaded ? (
                        <RoleTable data={roles} columns={columns} onEdit={onEdit} onDelete={onDelete}/>
                ) : (
                        <div className="flex justify-center items-center h-full">
                                <FaSpinner className="animate-spin w-10 h-10 text-gray-800"/>
                        </div>
                )}
        </div>
    )
}

export default Roles;