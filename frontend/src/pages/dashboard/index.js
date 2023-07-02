import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "../../components/Sidebar";
import { connect, useDispatch } from "react-redux";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import colors from "../../constants/colors";
import AddEditModal from "../../components/AddEditModal";
import { listArticles, deleteArticle } from "../../redux/article/actions";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function DashboardPage({ loading, data }) {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modaltype, setModalType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // field definitions
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    content: "",
  });

  const handleOpenModal = (val) => {
    setModalTitle(val);
    setOpen(true);
  };

  const handleAction = (type, article) => {
    switch (type) {
      case "view":
        navigate(`article/${article._id}`);
        break;

      case "edit":
        setFormValues({
          title: article.title,
          content: article.content,
          author: article.author,
          _id: article._id,
        });
        setModalType("edit");
        handleOpenModal("Edit article");
        break;

      case "delete":
        dispatch(deleteArticle(article));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(listArticles());
  }, []);

  return (
    <div>
      <ResponsiveDrawer />
      <Box mt={10}>
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <h2>List of articles</h2>
          <Button
            onClick={() => {
              setModalType("add");
              handleOpenModal("Create new article");
            }}
            sx={{
              mr: 1,
              color: colors.dark.black,
              backgroundColor: colors.dark.primary,
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Add article
          </Button>
        </Stack>
        {loading ? (
          <Box
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"center"}
            width={"100%"}
            height={'100%'}
            alignItems={"center"}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="right">Author</StyledTableCell>
                  <StyledTableCell align="right">content</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data &&
                  data?.map((article, index) => (
                    <StyledTableRow key={article._id}>
                      <StyledTableCell component="th" scope="row">
                        {article.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {article.author}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {article.content.slice(0, 12)}...
                      </StyledTableCell>
                      <StyledTableCell width={150} align="right">
                        <Box
                          display={"flex"}
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <div>
                            <RemoveRedEye
                              color="primary"
                              style={{ cursor: "pointer" }}
                              titleAccess="view details"
                              onClick={() => handleAction('view', article)}
                            />
                          </div>
                          <div onClick={() => handleAction("edit", article)}>
                            <Edit
                              color="default"
                              style={{ cursor: "pointer" }}
                              titleAccess="edit"
                            />
                          </div>
                          <div onClick={() => handleAction("delete", article)}>
                            <Delete
                              color="error"
                              style={{ cursor: "pointer" }}
                              titleAccess="delete"
                            />
                          </div>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <AddEditModal
        open={open}
        setOpen={setOpen}
        title={modalTitle}
        formValues={formValues}
        setFormValues={setFormValues}
        loading={loading}
        type={modaltype}
      />
    </div>
  );
}

const mapStateToProps = ({ ArticleReducer }) => ({
  data: ArticleReducer.data,
  loading: ArticleReducer.loading,
});

export default connect(mapStateToProps)(DashboardPage);
