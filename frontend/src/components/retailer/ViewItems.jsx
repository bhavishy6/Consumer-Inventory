import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import Stock from "../../contracts/Stock.json";
import ContractAddress from "../../contracts/contract-address.json";
import { Contract } from "@ethersproject/contracts";

const ViewItems = () => {
  const { active, library } = useWeb3React();
  const [itemId, setItemId] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const handleClick = async () => {
    if (active) {
      const contract = new Contract(
        ContractAddress.Stock,
        Stock.abi,
        library.getSigner()
      );
      const item = await contract.getItem(itemId);
      console.log(item[4]);
      let newRows = [...rows];
      newRows.push({
        name: item[0],
        description: item[1],
        category: item[2],
        price: item[3],
        stock: item[4],
      });
      setRows(newRows);
    } else {
      alert("Connect wallet to fetch item");
    }
  };

  return (
    <>
      <TextField
        name="itemId"
        value={itemId}
        placeholder="Enter item id"
        size="small"
        onChange={(e) => setItemId(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Get Item
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewItems;
