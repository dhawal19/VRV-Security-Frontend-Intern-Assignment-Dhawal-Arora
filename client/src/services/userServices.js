const url = 'http://localhost:3000/users';

const fetchUsers = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const addUser = async(user) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if(response.status === 500){
            throw new Error('Server error');
        }
        else if(response.status === 400){
            throw new Error('User already exists');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

const editUser = async (id, user) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.status >= 400) {
            throw new Error(data.message);
        }
        return data;
    }
    catch (error) {
        alert(error);
    }
}

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.status >= 400) {
            throw new Error(data.message);
        }
        return data;
    }
    catch (error) {
        alert(error);
    }
}

export { fetchUsers, addUser, editUser, deleteUser };