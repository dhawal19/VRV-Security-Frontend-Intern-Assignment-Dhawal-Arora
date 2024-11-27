import {useEffect, useRef, useContext, useState} from 'react';
import AddUserButton from './buttons/AddUserButton';
import AddRoleButton from './buttons/AddRoleButton';
import AddPermissionButton from './buttons/AddPermissionButton';
import { UserContext, RoleContext } from '../contexts/ContextFile';
import { fetchPermissions, addPermission } from '../../services/permissionServices';

const Sidebar = ({ isOpen, onClose }) => {
  const permissions = useRef([]);
  const {addUser} = useContext(UserContext);
  const {addRole, roles} = useContext(RoleContext);
  useEffect(() => {
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
    <aside
      className={`bg-gray-900 text-white w-64 h-full fixed top-0 left-0 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-xl font-semibold">Navigation</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav className="mt-4 space-y-2">
        <a
          href="/"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Dashboard
        </a>
        <a href="users" className="block px-4 py-2 hover:bg-gray-700 rounded">
          Users
        </a>
        <a href="roles" className="block px-4 py-2 hover:bg-gray-700 rounded">
          Roles
        </a>
        <a href="#logs" className="block px-4 py-2 hover:bg-gray-700 rounded">
          Audit Logs
        </a>
        <div className="md:hidden flex flex-col justify-center space-y-2 p-4">
          <AddUserButton roles={roles} handleSubmit={handleSubmit} isAddUserOpen={isAddUserOpen} setIsAddUserOpen={setIsAddUserOpen} />
          <AddRoleButton permissions={permissions.current} handleSubmit={handleSubmit} isAddRoleOpen={isAddRoleOpen} setIsAddRoleOpen={setIsAddRoleOpen} />
          <AddPermissionButton handleSubmit={handleSubmit} isAddPermissionOpen={isAddPermissionOpen} setIsAddPermissionOpen={setIsAddPermissionOpen} />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
