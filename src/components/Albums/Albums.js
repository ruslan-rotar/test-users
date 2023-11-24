import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button } from "@mui/material";
import { getUserAlbums } from "../../api";
import useDebounce from "../../hooks/useDebounce";
import TableComponent from "../common/Table/Table";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Albums() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { isLoading, error, data } = useQuery({
    queryKey: ["albums", order, orderBy, debouncedSearch],
    queryFn: () =>
      getUserAlbums(userId, {
        _order: order,
        _sort: orderBy,
        q: debouncedSearch,
      }),
  });

  const columns = [
    {
      id: "id",
      label: "ID",
      sortable: true,
    },
    {
      id: "title",
      label: "Title",
      sortable: true,
    },
  ];

  if (error) {
    return <Box> Oops, something went wrong </Box>;
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ ml: "10%" }}
      >
        Back
      </Button>
      <TableComponent
        title="Albums"
        columns={columns}
        data={data}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
      />
    </>
  );
}
