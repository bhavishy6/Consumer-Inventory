import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useWeb3React } from "@web3-react/core";
import Stock from "../../contracts/Stock.json";
import ContractAddress from "../../contracts/contract-address.json";
import { Contract } from "@ethersproject/contracts";
import Container from "@mui/material/Container";

const CreateItem = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [category, setCategory] = React.useState("");
  const { library, active } = useWeb3React();

  const createItem = async () => {
    const contract = new Contract(
      ContractAddress.Stock,
      Stock.abi,
      library.getSigner()
    );

    if (name && description && category && stock && price) {
      await contract.createItem(name, description, category, price, stock);
    }
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          size="small"
          value={name}
          id="name"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          size="small"
          value={description}
          id="description"
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          size="small"
          value={category}
          id="category"
          label="Category"
          variant="outlined"
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          size="small"
          value={price}
          id="price"
          label="Price"
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          size="small"
          value={stock}
          id="stock"
          label="Stock"
          variant="outlined"
          onChange={(e) => setStock(e.target.value)}
        />
        <Button disabled={!active} variant="contained" onClick={createItem}>
          Create Item
        </Button>
      </Box>
    </Container>
  );
};

export default CreateItem;
