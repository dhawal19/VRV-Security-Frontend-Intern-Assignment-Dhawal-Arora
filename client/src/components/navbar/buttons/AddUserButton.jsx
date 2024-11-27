import Modal from '../../Modal'
import { useState } from 'react';


const AddUserButton = ({roles, handleSubmit, isAddUserOpen, setIsAddUserOpen}) => {
    const Status = ['Active', 'Inactive'];
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
        setEmailError('Invalid email format');
    } else {
        setEmailError('');
    }
};

return (
    <div>
        <button className="bg-teal-600 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => setIsAddUserOpen(true)}>
            Add User
        </button>
        <Modal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} title="Add User">
            <form onSubmit={handleSubmit} name='userForm'>
                <div className="mb-4 text-black">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter name"
                    />
                </div>
                <div className="mb-4 text-black">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Roles</label>
                    <select
                        className="border rounded w-full py-2 px-3 text-black"
                        multiple={false}
                        placeholder="Select roles"
                    >
                        {roles && roles.map((role, index) => (
                            <option key={index} className='text-black'>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Status</label>
                    <select
                        className="border rounded w-full py-2 px-3 text-black"
                        multiple={false}
                        placeholder="Select status"
                    >
                        {Status.map((status) => (
                            <option key={status} className='text-black'>{status}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </Modal>
    </div>
)
}

export default AddUserButton