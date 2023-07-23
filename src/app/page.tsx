"use client";

import styles from "./page.module.css";
import NavAppBar from "./components/NavAppBar";
import DataTableBooks from "./components/DataTableBooks";
import Grid from '@mui/material/Grid';
import DataTableAuthors from "./components/DataTableAuthors";
import ModalAdd from "./components/ModalAdd";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <NavAppBar />
      <div className={styles.center}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ModalAdd id="book" setState={setOpen}/>
            <DataTableBooks />
          </Grid>
          <Grid item xs={6}>
            <ModalAdd id="author" setState={setOpen}/>
            <DataTableAuthors />
          </Grid>
        </Grid>
      </div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </main>
  );
}
