import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [data, setdata] = useState([]);
  // console.log(data)
  const [isLoading, setisLoading] = useState(true);
  try {
    const fetchData = async () => {
      setisLoading(true)
      const response = await fn();
      setdata(response)
    }
    useEffect(() => {

      fetchData()
    }, []);
  } catch (error) {
    Alert.alert(error)
  }


  const refetch = async () => { await fetchData() }

  return { data, isLoading, refetch }
}

export default useAppwrite