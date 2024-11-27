import Modal from "../../Modal"

const AddRoleButton = ({permissions, handleSubmit, isAddRoleOpen, setIsAddRoleOpen}) => {
  return (
    <div>
        <button className="bg-teal-600 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => setIsAddRoleOpen(true)}>
        Add Role
        </button>

        <Modal isOpen={isAddRoleOpen} onClose={() => setIsAddRoleOpen(false)} title="Add Role">
        <form onSubmit={handleSubmit} name='roleForm'>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role Name</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3 text-black"
              placeholder="Enter role name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="border rounded w-full py-2 px-3 text-black"
              placeholder="Enter description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Permissions</label>
           {permissions && permissions.map((permission, index) => (
               <div key={index} className="flex items-center text-gray-600">
                   <input type="checkbox" id={permission.name} name={permission.name} value={permission.name} className="mr-2"/>
                   <label htmlFor={permission.name}>{permission.name}</label>
               </div>
           ))}
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        </Modal>
    </div>
  )
}

export default AddRoleButton