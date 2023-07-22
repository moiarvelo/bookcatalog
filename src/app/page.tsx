import Image from "next/image";
import styles from "./page.module.css";
import NavAppBar from "./components/NavAppBar";
import DataTableBooks from "./components/DataTableBooks";
import Grid from '@mui/material/Grid';
import DataTableAuthors from "./components/DataTableAuthors";
import ModalAdd from "./components/ModalAdd";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavAppBar />
      <div className={styles.center}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ModalAdd id="book"/>
            <DataTableBooks />
          </Grid>
          <Grid item xs={6}>
            <ModalAdd id="author"/>
            <DataTableAuthors />
          </Grid>
        </Grid>
        
      </div>
    </main>
  );
}
