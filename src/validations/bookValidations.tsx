import { IBook } from '../interfaces/IBook';

export const validate = (values: IBook) => {
  const errors: Partial<IBook> = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!values.author) {
    errors.author = 'Required';
  }

  if (!values.genre) {
    errors.genre = 'Required';
  }

  if (!values.description) {
    errors.description = 'Required';
  }

  return errors;
};