import axios from "axios";
import axiosFetch from "../http/Api";


const getAllAuthors = async (path: any) => {
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

const createAuthor = async (path: any,payload: any) => {
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

const deleteAuthor = async (path: any) => {
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

const getByIdAuthor = async (path: any) => {
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

export const AuthorResources = {
    getAllAuthors,
    createAuthor,
    deleteAuthor,
    getByIdAuthor,
};