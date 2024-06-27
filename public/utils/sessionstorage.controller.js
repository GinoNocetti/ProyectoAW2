export const addSession = (user) => {
    console.log('Usuario', user)
    sessionStorage.setItem('user', JSON.stringify(user))
    
}

export const getSession = () =>{
    console.log('getSession')
    return JSON.parse(sessionStorage.getItem('user'))
}
