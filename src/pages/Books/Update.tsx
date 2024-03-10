import { useRef, useEffect } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useFormik, FormikValues } from "formik";
import { NavigateFunction, Location } from "react-router-dom";
import { useBookSWR, updateBook } from "../../actions/books";
import { validate } from "../../validations/bookValidations";
import { IBook } from "../../interfaces/IBook";

interface UpdateProps {
  location: Location;
  navigate: NavigateFunction;
}

const Update: React.FC<UpdateProps> = ({ location, navigate }) => {
  const pathParts = location.pathname.split("/");
  const bookId = parseInt(pathParts.pop() || "", 10);
  const { book, isLoading, error } = useBookSWR(bookId);
  const formikRef = useRef<FormikValues | null>(null);

  useEffect(() => {
    if (book) {
      formikRef.current?.setValues(book);
    }
  }, [book]);

  const initialValues: IBook = {
    id: bookId,
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    description: book?.description || "",
    createdAt: book?.createdAt || 0,
  };

  const onSubmit = (values: IBook) => {
    updateBook(bookId, values, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Failed to update book", error);
      },
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  // Assign the formik instance to the ref
  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  return (
    <Box>
      <Button
        sx={{ width: "120px" }}
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
        Update Book
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" maxWidth="100%" mx="auto">
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps("title")}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            id="author"
            label="Author"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps("author")}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />

          <TextField
            id="genre"
            label="Genre"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps("genre")}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
          />

          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps("description")}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Update;
