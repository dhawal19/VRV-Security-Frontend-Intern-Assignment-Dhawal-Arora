import  { useState, useRef, useEffect } from 'react';
import { FiEdit, FiTrash2, FiSave } from 'react-icons/fi';
import { fetchRoles } from '../../services/roleServices';
import {fetchPermissions}  from '../../services/permissionServices';

const UserTable = ({ data, columns, onEdit, onDelete }) => {
    const roles = useRef([]);
    const permissions = useRef([]);
    useEffect(() => {
        fetchRoles().then((data) => {
            roles.current = data;
        });
        fetchPermissions().then((data) => {
            permissions.current = data;
        });
    }, []);


    const [editRowId, setEditRowId] = useState(null);

    const [editedRow, setEditedRow] = useState({});

    const handleEditClick = (id, item) => {
        setEditRowId(id); 
        setEditedRow(item); 
    };

    const handleSaveClick = () => {
        onEdit(editRowId, editedRow); 
        setEditRowId(null); 
        setEditedRow({}); 
    };

    const handleInputChange = (field, value) => {
        if(field === 'roles'){
            value = value.split(',');
        }
        setEditedRow((prev) => ({ ...prev, [field]: value }));
    };

    return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
            <tr className="border-b hover:bg-gray-50">
            {columns.map((column, index) => (
                <th
                key={index}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                >
                {column}
                </th>
            ))}
            </tr>
        </thead>
        <tbody>
            {data === null ? <></> : data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
                {editRowId === item._id ? (
                <>
                    <td className="px-6 py-4 text-sm text-gray-800">
                    <input
                        type="text"
                        value={editedRow.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                    />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                    <input
                        type="text"
                        value={editedRow.email}
                        onChange={(e) =>
                        handleInputChange('email', e.target.value)
                        }
                        className="border px-2 py-1 rounded w-full"
                    />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        <select
                        className="border rounded w-full py-1 px-2 text-black"
                        multiple={false}
                        placeholder="Select status"
                        onChange={(e) =>
                            handleInputChange('status', e.target.value)
                        }

                        >
                            <option className='text-black'>Select status</option>
                            <option className='text-black'>Active</option>
                            <option className='text-black'>Inactive</option>
                        </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        <select
                        className="border rounded w-full py-1 px-2 text-black"
                        multiple={false}
                        placeholder="Select roles"
                        onChange={(e) =>
                            handleInputChange('roles', e.target.value)
                        }
                        >
                            {roles.current && roles.current.map((role, index) => (
                                <option key={index} className='text-black'>{role.name}</option>
                            ))}
                        </select>
                    </td>
                    <td className="px-6 py-4 text-sm flex space-x-3">
                    {/* Save Button */}
                    <button
                        onClick={handleSaveClick}
                        className="text-green-600 hover:text-green-800"
                    >
                        <FiSave className="w-5 h-5" />
                    </button>
                    </td>
                </>
                ) : (
                <>
                    <td className="px-6 py-4 text-sm text-gray-800">
                    {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                    {item.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {item.status.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                    {item.roles.join(', ')}
                    </td>
                    <td className="px-6 py-4 text-sm flex space-x-3">
                    {/* Edit Button */}
                    <button
                        onClick={() => handleEditClick(item._id, item)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <FiEdit className="w-5 h-5" />
                    </button>
                    {/* Delete Button */}
                    <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <FiTrash2 className="w-5 h-5" />
                    </button>
                    </td>
                </>
                )}
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};

export default UserTable;
