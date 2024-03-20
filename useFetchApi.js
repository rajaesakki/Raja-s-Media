import { useEffect,useState } from "react";
import axios from "axios";

const useAxiosFetch = (dataURL) =>{
const [data,setData] = useState([])
const [isLoading,setisLoading] = useState(false)
const [fetchError,setFetchError] = useState(null)
 useEffect(() => {
    const isMounted = true
    const source = axios.CancelToken.source()
  const fetchData = async (url) =>{
    setisLoading(true)
 try {
    const response = await axios.get(url,{
        cancelToken : source.token
    })
    if(isMounted){
        setData(response.data)
        setFetchError(null)
    }
 } catch (error) {
    if (isMounted) {
        setFetchError(error.message)
        setData([])
        
 }
  }
  finally{
    isMounted &&  setTimeout(() =>setisLoading(false),2000)
  }
 }
   fetchData(dataURL)
 
 const cleanup = () => {
   isMounted = false
   source.cancel()
 }
   return cleanup
  },[dataURL])
 return {data,fetchError,isLoading}
}
export default useAxiosFetch
