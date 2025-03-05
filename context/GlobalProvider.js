import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite"

const GlobalContext = createContext();

export const UseGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      getCurrentUser().then(
        (res) => {
          if (res) {
            setIsLoggedIn(true)
            setUser(res)
          }
          else {
            setIsLoggedIn(false)
            setUser(null)
          }
        }, (error) => {
          console.log(error)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        IsLoggedIn,
        setIsLoggedIn,
        user,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider