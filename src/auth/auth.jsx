import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    });

    const login = async (enteredUser) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.user_email === enteredUser.user_email && parsedUser.password === enteredUser.password) {
                console.log('User already logged in');
                return;
            }
        }
    
        const response = await fetch('https://payroll-dinson-backend.creativehr.co.zw/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: enteredUser.user_email,
                password: enteredUser.password
            }),
        });
    
        if (!response.ok) {
            throw new Error('Invalid username or password');
        }
    
        const data = await response.json();
    
        localStorage.setItem('user', JSON.stringify(data.employee));
    
        setUser(data.employee)
    }

    const signup = async (user) => {

        const response = await fetch('https://payroll-dinson-backend.creativehr.co.zw/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "employee_number": 0,
                "surname": "Admin",
                "name": "Super",
                "initials": "M",
                "email": "test@creativehr.co.zw",
                "password": "password",
                "payroll_number": "1",
            }),
        });

        if (!response.ok) {
            throw new Error(response.message);
        }
        const data = await response.json();
        console.log(data)
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}