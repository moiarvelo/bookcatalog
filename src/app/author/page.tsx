/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";

import styles from "../page.module.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import NavAppBar from "../components/NavAppBar";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useSearchParams } from "next/navigation";
import { BookResources } from "../resources/BookResources";
import { AuthorResources } from "../resources/AuthorResources";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function ShowAuthor() {
  const [expanded, setExpanded] = React.useState(false);

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
        const response = await BookResources.getAllBooksByIdAuthor("/books?author_id="+`${idAuthor}`);

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
      <Box sx={{ width: 400 }} mt={5} ml={50}>
        <Box mb={2}>
          <h2 id="parent-modal-title">Books by Author</h2>
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
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Sandra Adams
                      </Typography>
                      {" — Do you have Paris recommendations? Have you ever…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </main>
  );
}
