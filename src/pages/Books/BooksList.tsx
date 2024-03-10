import { FC, Fragment } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useBooksSWR, deleteBook } from "../../actions/books";
import { NavigateFunction } from "react-router-dom";

interface BooksListProps {
  navigate: NavigateFunction;
}

const BooksList: FC<BooksListProps> = ({ navigate }) => {
  const { data: books, error } = useBooksSWR();

  if (!books && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  const handleDeleteBook = async (bookId: number) => {
    await deleteBook(bookId);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Button
          sx={{ width: "120px" }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/add")}
        >
          Add Book
        </Button>
      </Box>
      {!books || books.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No books found
        </Typography>
      ) : (
        <List>
          {books
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((book, index) => (
              <Fragment key={index}>
                <ListItem>
                  <Stack
                    direction="column"
                    spacing={1}
                    justifyContent="flex-start"
                    width="100%"
                  >
                    <ListItemText primary={book.title} />
                    <Stack spacing={1}>
                      <Typography variant="subtitle2">{book.author}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {book.genre}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {book.description}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/book/${book.id}`)}
                        sx={{ width: "100px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteBook(book.id)}
                        sx={{ width: "100px" }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </ListItem>
                <Divider />
              </Fragment>
            ))}
        </List>
      )}
    </>
  );
};

export default BooksList;
