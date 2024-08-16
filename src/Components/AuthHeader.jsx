const authHeader = () => {
    
    const user = JSON.parse(loacalStorage.getItem('token'));

    if(getUser && getUser.token) {
        return { 'x-auth-token' : getUser.token }
    }
}