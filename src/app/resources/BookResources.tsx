import axios from "axios";
import axiosFetch from "../http/Api";



const getAllBooks = async (path: any) => {
    try {
      const { data } = await axiosFetch(path);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unexpected error', error);
      }
    }
};

const createBook = async (path: any,payload: any) => {
  try {
    console.log("payload en resources:>> ", payload);
    const { data } = await axiosFetch.post(path, payload.body)
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
};

const deleteBook = async (path: any) => {
  try {
    console.log("idBook resources:>> ", path);
    const { data } = await axiosFetch.delete(path)
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
};

const getByIdBook = async (path: any) => {
  try {
    const { data } = await axiosFetch(path);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
};

export const BookResources = {
    getAllBooks,
    createBook,
    deleteBook,
    getByIdBook,
};