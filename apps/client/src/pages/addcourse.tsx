
import {AddCourse} from "@repo/ui"
import axios from "axios"
import {useSession} from "next-auth/react"

export default function Add() {
    const session = useSession();
    

  
    return session.data && (
      <>
        <AddCourse
          onclick={async (title, description, image, price) => {
            const response = await axios.post("/api/addcourse", {
              title: title,
              description: description,
              imageLink: image,
              published: true,
              price: price,
            });
            alert("Added course!");
            
            // Router.push("/courses")
          }}
        />
      </>
    );
  }
  