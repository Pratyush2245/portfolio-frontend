import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FileEditIcon } from "lucide-react";
import {
  useDeleteProjectMutation,
  useGetAllProjectsLoginQuery,
} from "../../../../redux/features/projects/projectApi";
import CustomLoader from "../../../components/global/CustomLoader";
import { format } from "timeago.js";
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
import toast from "react-hot-toast";
import Loading from "@/components/global/Loader";
import Link from "next/link";

type Props = {};

const AllProjects = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error, refetch } = useGetAllProjectsLoginQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  console.log(data);

  const [
    deleteProject,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteSuccess,
      error: deleteError,
    },
  ] = useDeleteProjectMutation({});

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Successfully deleted the project!");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [deleteSuccess, deleteError, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Project Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    { field: "updated_at", headerName: "Updated At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-project/${params.row.id}`}>
              <FileEditIcon className="dark:text-white text-black" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>
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
                    the project and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteProject(params.row.id)}
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
      data.projects &&
      data.projects.forEach((project: any) => {
        rows.push({
          id: project._id,
          title: project.name,
          ratings: project.ratings,
          created_at: format(project.createdAt),
          updated_at: format(project.updatedAt),
        });
      });
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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

export default AllProjects;
