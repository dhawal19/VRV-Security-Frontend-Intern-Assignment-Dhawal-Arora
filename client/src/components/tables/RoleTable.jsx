import  { useState, useRef, useEffect } from 'react';
import { FiEdit, FiTrash2, FiSave } from 'react-icons/fi';
import {fetchPermissions}  from '../../services/permissionServices';

const RoleTable = ({ data, columns, onEdit, onDelete }) => {
    const permissions = useRef([]);
    useEffect(() => {
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
                    {permissions.current.map((permission) => (
                        <label key={permission.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={editedRow.permissions.includes(permission.name)}
                            onChange={(e) => {
                            const newPermissions = e.target.checked
                                ? [...editedRow.permissions, permission.name]
                                : editedRow.permissions.filter((p) => p !== permission.name);
                            handleInputChange('permissions', newPermissions);
                            }}
                        />
                        <span>{permission.name}</span>
                        </label>
                    ))}
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
                    {item.permissions.join(', ')}
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

export default RoleTable;
