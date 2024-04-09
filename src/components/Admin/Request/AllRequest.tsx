import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import CustomLoader from "../../../components/global/CustomLoader";
import { format } from "timeago.js";
import Loading from "@/components/global/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useDeleteBlogRequestMutation,
  useGetAllBlogRequestsQuery,
} from "../../../../redux/features/blogRequest/blogRequestApi";
import toast from "react-hot-toast";

type Props = {};

const AllRequest = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error, refetch } = useGetAllBlogRequestsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [
    deleteBlogRequest,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteSuccess,
      error: deleteError,
    },
  ] = useDeleteBlogRequestMutation({});

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Successfully deleted the request!");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [deleteSuccess, deleteError, refetch]);

  console.log(data);

  const handleDeleteRequest = async (requestId: string) => {
    try {
      await deleteBlogRequest(requestId);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "created_at", headerName: "Requested At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="bg-transparent hover:bg-transparent">
                  <AiOutlineDelete
                    className="dark:text-white text-black"
                    size={20}
                  />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the user and remove their data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteRequest(params.row.id)}
                    className="bg-destructive/80 hover:bg-destructive text-white"
                  >
                    {deleteIsLoading ? <Loading /> : "Continue"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.blogRequests &&
      data.blogRequests.forEach((blog: any) => {
        rows.push({
          id: blog._id,
          email: blog.email,
          created_at: format(blog.createdAt),
        });
      });
  }

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="mt-[120px]">
          <Box m="20px">
            <Box
              m="40px 0 0 0"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #ffffff30 !important"
                      : "1px solid #ccc !important",
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column-cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  borderBottom: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  borderTop: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? "#b7ebde !important" : "#000 !important",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "#fff !important",
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default AllRequest;
