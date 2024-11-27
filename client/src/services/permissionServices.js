const url = 'http://localhost:3000/permissions';

const fetchPermissions = async() => {
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

const addPermission = async(permission) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(permission),
        });
        if(response.status === 500){
            throw new Error('Server error');
        }
        else if(response.status === 400){
            throw new Error('Permission already exists');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

export {fetchPermissions, addPermission};