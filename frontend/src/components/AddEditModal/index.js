import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Stack, TextField } from "@mui/material";
import colors from "../../constants/colors";
import { useDispatch } from "react-redux";
import { postArticle, updateArticle } from "../../redux/article/actions";
import LoadingButton from "@mui/lab/LoadingButton"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 350,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddEditModal({
  open,
  setOpen,
  title,
  setFormValues,
  formValues,
  loading_action,
  type
}) {
  const [formErrors, setFormErrors] = React.useState({
    title: "",
    author: "",
    content: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = (values) => {
    let errors = {};

    // Validate each form field
    if (!values.title) {
      errors.title = "Publication title is required";
    }

    if (!values.author) {
      errors.author = "Author is required";
    }

    if (!values.content) {
      errors.content = "The content is required";
    }

    return errors;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const errors = validateForm(formValues);

    if (Object.keys(errors).length === 0) {
      console.log(formValues);
      if(type==='add'){
        dispatch(postArticle(formValues));
      }else{
        dispatch(updateArticle(formValues));
      }
      
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "80%", minHeight: 500 }}>
          <h2 id="parent-modal-title">{title}</h2>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50%" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box
              display={"flex"}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <TextField
                value={formValues.title}
                onChange={handleInputChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
                label="Title"
                name="title"
                placeholder="What is Frontend development"
                variant="filled"
              />
              <TextField
                value={formValues.author}
                onChange={handleInputChange}
                error={!!formErrors.author}
                helperText={formErrors.author}
                label="Author"
                name="author"
                placeholder="John Doe"
                variant="filled"
              />
            </Box>

            <Box width={"100%"}>
              <TextField
                style={{ width: "100%" }}
                label="Content"
                name="content"
                placeholder="Write content..."
                multiline
                rows={5}
                value={formValues.content}
                onChange={handleInputChange}
                error={!!formErrors.content}
                helperText={formErrors.content}
              />
            </Box>
          </Box>
          <Stack direction={"row"} justifyContent={"space-between"} mt={10}>
            <Button
              onClick={handleClose}
              sx={{
                mr: 1,
                color: colors.dark.black,
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={submitForm}
              sx={{
                mr: 1,
                color: colors.dark.black,
                backgroundColor: colors.dark.primary,
              }}
              variant="contained"
              loading={loading_action}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
