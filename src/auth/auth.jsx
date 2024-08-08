import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })

    const login = async (user) => {

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log('User already logged in');
            return;
        }

        console.log(user)
        const response = await fetch('https://ess-creativehr-backend.creativehr.co.zw/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.user_email,
                password: user.password
            }),
        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();
        console.log(data)

        localStorage.setItem('user', JSON.stringify(data.employee));

        // Here you might want to do something with the response data,
        // like storing the user's token or updating the user state.
        setUser(data.employee)
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}