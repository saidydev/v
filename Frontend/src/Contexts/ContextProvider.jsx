import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {

    // Chukua user kutoka localStorage wakati app inaanza
    const savedUser = localStorage.getItem("USER");

    const [user, _setUser] = useState(
        savedUser ? JSON.parse(savedUser) : null
    );

    // Chukua token kutoka localStorage
    const [token, _setToken] = useState(
        localStorage.getItem("ACCESS_TOKEN")
    );

    // Save user kwenye React state + localStorage
    const setUser = (user) => {
        _setUser(user);

        if (user) {
            localStorage.setItem("USER", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER");
        }
    };

    // Save token kwenye React state + localStorage
    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);