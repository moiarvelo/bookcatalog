"use client";

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { AuthorResources } from "../resources/AuthorResources";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import ModalDeleteAuthor from "./ModalDeleteAuthor";


export default function DataTableAuthors() {
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [authorsList, setAuthorsList] = React.useState([]);

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
    router.push(`/author?id=${paramValue}`);
        
  };

    
  const getAuthors = async () => {
    try {
      const response = await AuthorResources.getAllAuthors("/authors");
      console.log("Response authors", response);
      
      const resp = response.result;
      const rows = resp.reverse().map((items: any) => ({
        id: items._id,
        author: items.firstname+' '+items.lastname,
      }));

      setAuthorsList(rows);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAuthors();
  }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={authorsList}
        columns={[
          { field: 'id', headerName: 'ID', width: 170 },
          { field: 'author', headerName: 'Author', width: 300 },
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
        <ModalDeleteAuthor open={open} onClose={handleClose} idAuthor={selectedRowId} />
      )}
    </div>
  );
}