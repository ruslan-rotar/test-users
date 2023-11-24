import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { visuallyHidden } from "@mui/utils";

function TableHeadComponent(props) {
  const { order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableComponent({
  title,
  columns,
  data,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  search,
  setSearch,
  isLoading,
}) {
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Box sx={{ width: "80%", margin: "20px auto" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h4">{title}</Typography>
        <TextField
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{ minWidth: 300 }}
        />
      </Stack>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHeadComponent
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Stack
                      sx={{ minHeight: 500 }}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <CircularProgress />
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((row) => {
                  return (
                    <TableRow hover key={row.id}>
                      {columns?.map(({ id, renderCell, align }) => (
                        <TableCell align={align || "left"} key={row.id + id}>
                          {renderCell ? renderCell(row) : row[id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
