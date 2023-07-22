/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { BookResources } from "../resources/BookResources";
import ModalDelete from "./ModalDelete";
import Button from "@mui/material/Button";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useRouter } from "next/navigation";

export default function DataTableBooks() {
  
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [booksList, setBooksList] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 
  const handleRowClick = (params: any) => {
    setSelectedRowId(params.row.id);
  };

  const handleClick = (params: any) => {
    const paramValue = params.row.id; 
    router.push(`/book?id=${paramValue}`);
        
  };

  const getBooks = async () => {
    try {
      const response = await BookResources.getAllBooks("/books");
      console.log("Response", response.result);

      const resp = response.result;
      const rows = resp.reverse().map((items: any) => ({
        id: items._id,
        book: items.name,
      }));

      setBooksList(rows);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getBooks();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={booksList}
        columns={[
          { field: "id", headerName: "ID", width: 170 },
          { field: "book", headerName: "Book", width: 300 },
          {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: (params) => (
              <>
                <Button onClick={() => {
                    handleClick(params);                  
                  }} style={{minWidth:'4px'}}>
                  <VisibilityOutlinedIcon
                    fontSize="small"
                    style={{ color: "#5dade2" }}
                  />
                </Button>
                <Button
                  style={{minWidth:'4px'}}
                  onClick={() => {
                    handleRowClick(params);
                    handleOpen();
                  }}
                >
                  <RemoveCircleOutlineOutlinedIcon
                    sx={{ fontSize: 18 }}
                    style={{ color: "#f35257" }}
                  />
                </Button>
              </>
            ),
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {selectedRowId && (
        <ModalDelete open={open} onClose={handleClose} idBook={selectedRowId} />
      )}
    </div>
  );
}
