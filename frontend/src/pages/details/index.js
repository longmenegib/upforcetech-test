import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "../../components/Sidebar";
import { connect, useDispatch } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { getOneArticle } from "../../redux/article/actions";
import { useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import frontendUrl from "../../urls/frontendUrl";
import {NavigateNext} from '@mui/icons-material'

function DetailPage({ loading, article }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneArticle({_id: id}));
  }, []);

  return (
    <div>
      <ResponsiveDrawer />
      <Box mt={10}>
        {loading ? (
          <Box
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"center"}
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
              <Link underline="hover" color="inherit" href={frontendUrl.HOME.SELF}>
                Articles
              </Link>
              <Link
                underline="hover"
                color="text.primary"
                aria-current="page"
              >
                {article?.title}
              </Link>
            </Breadcrumbs>
            <Box mt={5} px={2}>
                <h2 style={{fontWeight: 'bold'}}>{article?.title}</h2>
                <Box display={'flex'} maxWidth={500} justifyContent={'space-between'}>
                    <span style={{fontSize: 18}}>Author: {article?.author}</span>
                    <span>Published on: {new Date(article?.createdAt).toDateString()}</span>
                </Box>
                <Box mt={2}>
                    <p>
                        {article?.content}
                    </p>
                </Box>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

const mapStateToProps = ({ ArticleReducer }) => ({
  article: ArticleReducer.article,
  loading: ArticleReducer.loading,
});

export default connect(mapStateToProps)(DetailPage);
