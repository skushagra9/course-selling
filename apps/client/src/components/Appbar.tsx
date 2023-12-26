import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

import {signIn, useSession, signOut} from "next-auth/react"

function Appbar() {
    const session = useSession();
    console.log(session.data?.user?.email)
    

    return (
        <div style={{height: 60, background: "white", padding: 10}}>
          {session.data && <div style={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"h4"} style={{color: "black"}}>
              {session.data.user?.email}
            </Typography>
            <div>
              <Button variant={"contained"} onClick={() => signOut()}>Logout</Button>
            </div>
            </div>}
          {!session.data && <div style={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"h4"} style={{color: "black"}}>
              Coursera
            </Typography>
            <div>
              <Button variant={"contained"} onClick={() => signIn()}>Sign up</Button>
            </div>
          </div>}
        </div>
      )

    
}

export default Appbar;