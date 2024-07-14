import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const res = await axios.get(`http://localhost:8800/api/${path}`);
       
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path]); // Ensure the effect runs when `path` changes

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete =  async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/${path}/${id}`)
      setList(list.filter((item)=> item._id !== id))
    } catch (error) {
      console.log(error)
      
    }
  };
  console.log(columns)
  console.log(list)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
