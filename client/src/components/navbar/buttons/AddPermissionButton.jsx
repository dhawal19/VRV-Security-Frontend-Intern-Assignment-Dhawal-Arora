import Modal from '../../Modal'

const AddPermissionButton = ({handleSubmit, isAddPermissionOpen, setIsAddPermissionOpen}) => {
  return (
    <div>
        <button className="bg-teal-600 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => setIsAddPermissionOpen(true)}>
            Add Permission
        </button>
        <Modal isOpen={isAddPermissionOpen} onClose={() => setIsAddPermissionOpen(false)} title="Add Permission">
            <form onSubmit={handleSubmit} name='permissionForm'>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Permission Name</label>
                <input
                type="text"
                className="border rounded w-full py-2 px-3 text-black"
                placeholder="Enter permission name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                className="border rounded w-full py-2 px-3 text-black"
                placeholder="Enter description"
                ></textarea>
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

export default AddPermissionButton