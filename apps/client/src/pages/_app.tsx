import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { userState } from "store"
import {RecoilRoot,useSetRecoilState} from 'recoil';
import axios from "axios";
import {useEffect} from "react";
import Appbar from '../components/Appbar';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <RecoilRoot>
        <SessionProvider session={pageProps.session}>
      <div style={{width: "100vw",height: "100vh",backgroundColor: "#eeeeee"}}>
      
        <Appbar/>
        {/* <InitUser /> */}
        <Component {...pageProps} />
      </div>
      </SessionProvider>
    </RecoilRoot>
    </div>
}

// function InitUser() {
//   const setUser = useSetRecoilState(userState);
//   const init = async() => {
//       try {
//           const response = await axios.get(`api/admin/me`, {
//               headers: {
//                   "Authorization": "Bearer " + localStorage.getItem("token")
//               }
//           })

//           if (response.data.username) {
//               setUser({
//                   isLoading: false,
//                   userEmail: response.data.username
//               })
//           } else {
//               setUser({
//                   isLoading: false,
//                   userEmail: null
//               })
//           }
//       } catch (e) {

//           setUser({
//               isLoading: false,
//               userEmail: null
//           })
//       }
//   };

//   useEffect(() => {
//       init();
//   }, []);

//   return <></>
// }


