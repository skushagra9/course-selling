
import { useState } from "react";
import { Card, TextField, Button } from "@mui/material";



export function AddCourse(props:{onclick: (title:string ,description:string, image:string, price:number) => void}){

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

//   const handleAddCourse = async () => {
//     try {
//       await axios.post(
//         `${BASE_URL}/admin/courses`,
//         {
//           title: title,
//           description: description,
//           imageLink: image,
//           published: true,
//           price: price,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       alert("Added course!");
//     } catch (error) {
//       console.error("Error adding course:", error);
      
//     }
//   };

  return (
    <div style={{ display: "flex", minHeight: "80vh", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}>
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth={true}
            label="Title"
            variant="outlined"
            value={title}
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            label="Description"
            variant="outlined"
            value={description}
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setImage(e.target.value)}
            fullWidth={true}
            label="Image link"
            variant="outlined"
            value={image}
            
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setPrice(Number(e.target.value))}
            fullWidth={true}
            label="Price"
            variant="outlined"
            value={price}
          />

          <Button 
          size="large" 
          variant="contained" 
          onClick={async() => {
            props.onclick(title, description, image, price)
         }}>
            Add course
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddCourse;
