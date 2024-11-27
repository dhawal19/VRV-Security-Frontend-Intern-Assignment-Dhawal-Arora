const url = 'http://localhost:3000/roles';

const fetchRoles = async() => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 500){
            throw new Error('Server error');
        }
        else if(response.status === 404){
            throw new Error('Resource not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

const addRole = async(role) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
        });
        if(response.status === 500){
            throw new Error('Server error');
        }
        else if(response.status === 400){
            throw new Error('Role already exists');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

export { fetchRoles, addRole };