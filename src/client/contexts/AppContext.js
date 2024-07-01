import { useContext,createContext } from "react"; 

export const AppContext = createContext({
    info: {} ,
    getInfo : ()=> {},
    updateInfo: (prop) => {}
})

export const useApp = ()=> {
    return useContext(AppContext)
}

export const AppProvider =  AppContext.Provider