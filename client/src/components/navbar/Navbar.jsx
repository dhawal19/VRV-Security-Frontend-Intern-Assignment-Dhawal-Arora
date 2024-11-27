import  { useRef } from 'react';
import { useState, useEffect } from 'react';
import {fetchPermissions, addPermission} from '../../services/permissionServices';
import { useContext } from 'react';
import { RoleContext, UserContext } from '../contexts/ContextFile';
import AddUserButton from './buttons/AddUserButton';
import AddRoleButton from './buttons/AddRoleButton';
import AddPermissionButton from './buttons/AddPermissionButton';

const Navbar = ({ onSidebarToggle }) => {
    const permissions = useRef([]);
    const {addUser, fetchUsers} = useContext(UserContext);
    const {addRole, fetchRoles, roles} = useContext(RoleContext);
    useEffect(() => {
        fetchRoles().then((data) => {
            roles.current = data;
        });
        fetchPermissions().then((data) => {
            permissions.current = data;
        });
    }, []);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
    const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if(e.target.name === 'roleForm'){
              const role = {
                  name: e.target[0].value,
                  description: e.target[1].value,
                  permissions: Array.from(e.target).filter((el) => el.type === 'checkbox' && el.checked).map((el) => el.value),
              };
              await addRole(role);
            }
            else if(e.target.name === 'permissionForm'){
              
              const permission = {
                  name: e.target[0].value,
                  description: e.target[1].value,
              };
             
              await addPermission(permission);
            }
            else{
              const user = {
                  name: e.target[0].value,
                  email: e.target[1].value,
                  roles: [e.target[2].value],
                  status: e.target[3].value.toLowerCase(),
              };
              await addUser(user); 
              fetchUsers();

            }
            e.target.reset();
            setIsAddUserOpen(false);
            setIsAddRoleOpen(false);
            setIsAddPermissionOpen(false);
            alert('Data submitted successfully');
        }
        catch(error){
            alert(error.message);
        }
        
    };

  return (
    <nav className="bg-gray-900 text-white shadow-md ">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Sidebar Button*/}
        <button
          className="text-gray-300 hover:text-white focus:outline-none"
          onClick={onSidebarToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="flex items-center justify-between w-half px-4 md:px-8">
            <h1 className="text-xl font-bold tracking-wide md:text-2xl flex-grow text-center md:text-left">
                Admin Dashboard
            </h1>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex space-x-4">
          <AddUserButton roles={roles} handleSubmit={handleSubmit} isAddUserOpen={isAddUserOpen}  setIsAddUserOpen={setIsAddUserOpen}/>
          <AddRoleButton permissions={permissions.current} handleSubmit={handleSubmit} isAddRoleOpen={isAddRoleOpen} setIsAddRoleOpen={setIsAddRoleOpen}/>
          <AddPermissionButton handleSubmit={handleSubmit} isAddPermissionOpen={isAddPermissionOpen} setIsAddPermissionOpen={setIsAddPermissionOpen}/>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
