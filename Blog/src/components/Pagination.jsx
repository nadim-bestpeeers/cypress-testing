import { Pagination as MUIPagination, Stack } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <MUIPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        siblingCount={1}
        boundaryCount={1}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            backgroundColor: "#ffffff", 
            color: "#6c5ce7", 
            border: "1px solid #ddd", 
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f3f3f3", 
            },
            "&.Mui-selected": {
              backgroundColor: "#6c5ce7",
              color: "#ffffff", 
              boxShadow: "0px 4px 10px rgba(108, 92, 231, 0.3)", 
              fontWeight: "bold", 
            },
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#6c5ce7", 
          },
        }}
      />
    </Stack>
  );
};

export default Pagination;
