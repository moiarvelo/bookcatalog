/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";

import styles from "../page.module.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import NavAppBar from "../components/NavAppBar";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { BookResources } from "../resources/BookResources";
import { AuthorResources } from "../resources/AuthorResources";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";


export default function ShowAuthor() {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();
  const paramValue = useSearchParams();
  const idAuthor = paramValue.get("id");

  console.log("idAuthor", idAuthor);

  const [listBook, setlistBook] = React.useState([]);

  const [author, setAuthor] = React.useState({
    firstname: "",
    lastname: "",
    photo: "",
  });

  const getBooks = async () => {
    try {
      const response = await BookResources.getAllBooksByIdAuthor(
        "/books-by-author?author_id=" + `${idAuthor}`
      );

      console.log("Response list books", response);
      setlistBook(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorById = async () => {
    try {
      const response = await AuthorResources.getByIdAuthor(
        `/author/${idAuthor}`
      );
      console.log("Resp", response);
      setAuthor({
        ...author,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        photo: response.data.photo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getBooks();
    getAuthorById();
  }, []);

  return (
    <main className={styles.main}>
      <NavAppBar />
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Box mt={5}>
            <Box mb={2}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <div>
                    <h2 id="parent-modal-title">Books by Author</h2>
                </div>
                <div>
                    <Button onClick={() => {
                        router.back()                
                    }} style={{minWidth:'4px'}}>
                    <ArrowBackIcon
                        fontSize="small"
                        style={{ color: "#5dade2" }}
                    />
                    </Button>
                </div>
            </div>
            </Box>
            <Card sx={{ width: 600, height: 600 }}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" src={author.photo}></Avatar>}
                subheader={
                <div>
                    <p style={{ fontSize: 12, fontWeight: "bold" }}>
                    Autor: {`${author.firstname} ${author.lastname}`}
                    </p>
                    <p style={{ fontSize: 12 }}>Publicación: September 14, 2016</p>
                </div>
                }
            />
            <CardContent>
                <List
                sx={{ width: "100%", bgcolor: "background.paper"}}
                >
                
                {listBook.map((book: any) => (
                    <>
                    <ListItem alignItems="flex-start" key={book._id}>
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={book.imagen} />
                    </ListItemAvatar>
                    <ListItemText
                    primary={book.name}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Description
                        </Typography>
                        {`${book.description}`}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                </>
                ))}
                
                </List>
            </CardContent>
            </Card>
        </Box>
      </Box>
    </main>
  );
}
