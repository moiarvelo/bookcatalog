"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Input } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { BookResources } from "../resources/BookResources";
import { AuthorResources } from "../resources/AuthorResources";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const theme = createTheme({
  components: {
    
    MuiOutlinedInput: {
      styleOverrides: {
        
        root: {
          width: "20em",
          height: "2.5em",
        },
      },
    },
  },
});

type Props = {
  id: any;
  setState: (val: boolean) => void;
};

export default function ModalAdd({ id, setState }:Props) {
  
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formBook, setFormBook] = React.useState({
    name: "",
    description: "",
    imagen: "",
    firstname: "",
    lastname: "",
  });

  const [formAuthor, setFormAuthor] = React.useState({
    firstname: "",
    lastname: "",
    photo: "",
  });
  
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const uploadImage = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormBook({
      ...formBook,
      [name]: value,
    });
    console.log("form-book: ", formBook);
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormAuthor({
      ...formAuthor,
      [name]: value,
    });
    console.log("form-author: ", formAuthor);
  };

  const handleSubmit = async (e: any) => {
    
    console.log("file", file);
    console.log("fileName", fileName);
    
    const formData = new FormData();
    formData.append("file", file || "");

    setLoading(true);

    if (file) {
      try {
        const response = await axios.post(
          "https://api.upload.io/v2/accounts/12a1ySj/uploads/form_data",
          formData,
          {
            headers: { 
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer public_12a1ySjfYcx1ecc3uMc1bf4WEdeS'
            },
          }
        );
       

        if(response.status === 200){
          const payload = {
            name: formBook.name,
            description: formBook.description,
            imagen: response.data.files[0].fileUrl,
            firstname: formBook.firstname,
            lastname: formBook.lastname,
          };
          // console.log("payload request:", payload);
          try {
            const response = await BookResources.createBook("/book", {
              method: "POST",
              body: payload,
            });

            console.log("Response:", response.message);

            if(response.message === 'OK'){
              setLoading(false);
              setState(true);
              handleClose();
              location.reload()
            }
            
          } catch (error) {
            setLoading(false);
          }

        }
      } catch (error) {
        setLoading(false);
      }
    }
    
  };

  const handleOnSubmit = async (e: any) => {

    console.log("file", file);
    console.log("fileName", fileName);
    
    const formData = new FormData();
    formData.append("file", file || "");

    setLoading(true);

    if (file) {
      try {
        const response = await axios.post(
          "https://api.upload.io/v2/accounts/12a1ySj/uploads/form_data",
          formData,
          {
            headers: { 
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer public_12a1ySjfYcx1ecc3uMc1bf4WEdeS'
            },
          }
        );
       

        if(response.status === 200){
          const payload = {
            firstname: formAuthor.firstname,
            lastname: formAuthor.lastname,
            photo: response.data.files[0].fileUrl,
           
          };
          
          try {
            const response = await AuthorResources.createAuthor("/author", {
              method: "POST",
              body: payload,
            });

            console.log("Response:", response.message);

            if(response.message === 'OK'){
              setLoading(false);
              handleClose();
              location.reload()
            }
            
          } catch (error) {
            setLoading(false);
          }

        }
      } catch (error) {
        setLoading(false);
      }
    }


  };
  
  return (
    <div>
      {id == "book" ? (
        <Button variant="outlined" onClick={handleOpen}>
          Add Book
        </Button>
      ) : null}
      {id == "author" ? (
        <Button variant="outlined" onClick={handleOpen}>
          Add Author
        </Button>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {loading ?
            <><h1>Loading...</h1></>
          :
          <>
            {id == "book" ? (
              <Box mb={2}>
                <h2 id="parent-modal-title">Add Book</h2>
              </Box>
            ) : null}
            {id == "author" ? (
              <Box mb={2}>
                <h2 id="parent-modal-title">Add Author</h2>
              </Box>
            ) : null}

            <ThemeProvider theme={theme}>
              {id == "book" ? (
                <>
                  <Box mb={2}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      focused
                      name="name"
                      onChange={handleChange}
                      value={formBook.name}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      id="outlined"
                      label="Description"
                      focused
                      name="description"
                      onChange={handleChange}
                      value={formBook.description}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      label="First Name Author"
                      variant="outlined"
                      focused
                      name="firstname"
                      onChange={handleChange}
                      value={formBook.firstname}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      label="Last Name Author"
                      variant="outlined"
                      focused
                      name="lastname"
                      onChange={handleChange}
                      value={formBook.lastname}
                    />
                  </Box>
                  <Box mb={2}>
                    <label htmlFor="imagen">
                      <Input
                        //accept="image/*"
                        id="imagen"
                        name="imagen"
                        type="file"
                        style={{ display: "none" }}
                        onChange={uploadImage}
                      />
                      <Button
                        style={{ marginBottom: "5px", width:"96%" }}
                        variant="outlined"
                        component="span"
                        size="large"
                        startIcon={<FileUploadIcon />}
                      >
                        Upload Imagen
                      </Button>
                    </label>
                    <span
                      style={{
                        marginRight: "8px",
                        fontSize: "14px",
                        color: "blue",
                      }}
                    >
                      {fileName}
                    </span>
                  </Box>
                  <Box ml={30}>
                    <Button
                      variant="contained"
                      size="medium"                    
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </Box>
                </>
              ) : null}
              {id == "author" ? (
                <>
                  <Box mb={2}>
                    <TextField 
                      label="First Name" 
                      variant="outlined" 
                      focused 
                      name="firstname"
                      onChange={handleOnChange}
                      value={formAuthor.firstname}/>
                  </Box>
                  <Box mb={2}>
                    <TextField 
                      label="Last Name" 
                      variant="outlined" 
                      focused 
                      name="lastname"
                      onChange={handleOnChange}
                      value={formAuthor.lastname}/>
                  </Box>
                  <Box mb={2}>
                    <label htmlFor="photo">
                      <Input
                        //accept="image/*"
                        id="photo"
                        name="photo"
                        type="file"
                        style={{ display: "none" }}
                        onChange={uploadImage}
                      />
                      <Button
                        style={{ marginBottom: "5px", width:"96%" }}
                        variant="outlined"
                        component="span"
                        size="large"
                        startIcon={<FileUploadIcon />}
                      >
                        Upload Photo
                      </Button>
                    </label>
                    <span
                      style={{
                        marginRight: "8px",
                        fontSize: "14px",
                        color: "blue",
                      }}
                    >
                      {fileName}
                    </span>
                  </Box>
                  <Box ml={30}>
                    <Button 
                     variant="contained" 
                     size="medium"
                     onClick={handleOnSubmit}>
                      Save
                    </Button>
                  </Box>
                </>
              ) : null}
            </ThemeProvider>
          </>}
        </Box>
      </Modal>
    </div>
  );
}
