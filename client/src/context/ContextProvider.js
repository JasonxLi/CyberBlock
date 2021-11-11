import React, { createContext,useState} from 'react';

export const Context = createContext({});

const ThemeContextProvider = ({children}) => {
    const [selectedDefenses, setSelectedDefenses]=useState([]);
    const [endBuyPhase, setEndBuyPhase] = useState(false);
    const[userEarnings, setUserEarnings]= useState(30);

    return(
        <Context.Provider
            value={{
                selectedDefenses,
                setSelectedDefenses,
                endBuyPhase,
                setEndBuyPhase,
                userEarnings,
                setUserEarnings}}
        >
            {children}
        </Context.Provider>
    )

}
export default ThemeContextProvider;