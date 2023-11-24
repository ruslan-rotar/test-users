import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Box, Stack } from "@mui/material";
import { getUsers } from "../../api";
import useDebounce from "../../hooks/useDebounce";
import TableComponent from "../common/Table/Table";
import { ROUTES } from "../../constants/routes";

export default function Users() {
  const navigate = useNavigate();

  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users", order, orderBy, debouncedSearch],
    queryFn: () =>
      getUsers({ _order: order, _sort: orderBy, q: debouncedSearch }),
  });

  const columns = [
    {
      id: "id",
      label: "ID",
      sortable: true,
    },
    {
      id: "name",
      label: "Name",
      sortable: true,
    },
    {
      id: "email",
      label: "Email",
      sortable: true,
    },
    {
      id: "phone",
      label: "Phone",
      sortable: true,
    },
    {
      id: "website",
      label: "Website",
      sortable: true,
    },
    {
      id: "actions",
      label: "",
      sortable: false,
      align: "right",
      renderCell: (row) => (
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={2}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() =>
              navigate(ROUTES.USER_POSTS.replace(":userId", row.id))
            }
          >
            View posts
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              navigate(ROUTES.USER_ALBUMS.replace(":userId", row.id))
            }
          >
            View albums
          </Button>
        </Stack>
      ),
    },
  ];

  if (error) {
    return <Box> Oops, something went wrong </Box>;
  }

  return (
    <TableComponent
      title="Users"
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
  );
}
