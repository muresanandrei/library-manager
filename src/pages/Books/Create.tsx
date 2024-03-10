import { Box, Button, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import { NavigateFunction } from "react-router-dom";
import { addBook } from "../../actions/books";
import { validate } from "../../validations/bookValidations";
import { IBook } from "../../interfaces/IBook";

interface CreateProps {
  navigate: NavigateFunction;
}

const initialValues: IBook = {
  id: 0,
  title: "",
  author: "",
  genre: "",
  description: "",
  createdAt: 0,
};

const Create: React.FC<CreateProps> = ({ navigate }) => {
  const generateUniqueId = () => {
    // Use Unix time and a random string to create a unique ID
    const currentTime = new Date().getTime();
    return currentTime;
  };

  const onSubmit = (values: IBook) => {
    // Generate a unique ID for the book
    const newBookData: IBook = {
      ...values,
      id: generateUniqueId(),
      createdAt: new Date().getTime(),
    };

    addBook(newBookData, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Failed to add book", error);
      },
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

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
        Add Book
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
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Create;
