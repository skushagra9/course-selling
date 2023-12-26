import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Router from "next/router";
import {useSession} from "next-auth/react"

export default function Home() {
    const session = useSession();
    
    return <div>
    <Grid container style={{padding: "5vw"}}>
        <Grid item xs={12} md={6} lg={6}>
            <div style={{marginTop: 100}}>
                <Typography variant={"h2"}>
                    Coursera Admin
                </Typography>
                <Typography variant={"h5"}>
                    A place to learn, earn and grow
                </Typography>
                {session.data && <div style={{display: "flex", marginTop: 20}}>
                    <div style={{marginRight: 10}}>
                        <Button
                            size={"large"}
                            variant={"contained"}
                            onClick={() => {
                                Router.push("/courses")
                            }}
                        >Courses</Button>
                    </div>
                    <div>
                        <Button
                            size={"large"}
                            variant={"contained"}
                            onClick={() => {
                                Router.push("/addcourse")
                            }}
                        >AddCourse</Button>
                    </div>
                </div>}
            </div>
            <div>
            </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
            <img src={"/class.jpeg"} width={"100%"} />
        </Grid>
    </Grid>
</div>
}
