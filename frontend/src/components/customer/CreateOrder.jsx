import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useWeb3React } from "@web3-react/core";
import Retailer from "../../contracts/Retailer.json";
import ContractAddress from "../../contracts/contract-address.json";
import { Contract } from "@ethersproject/contracts";

const CreateOrder = () => {
  const { library, active } = useWeb3React();
  const [email, setEmail] = useState("");
  const [formValues, setFormValues] = useState([{ item: "", quantity: "" }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { item: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let itemArr = [],
      quantityArr = [];
    const contract = new Contract(
      ContractAddress.Retailer,
      Retailer.abi,
      library.getSigner()
    );

    formValues.forEach((value) => {
      itemArr.push(value.item);
      quantityArr.push(value.quantity);
    });

    await contract.createOrder(itemArr, quantityArr, email);

    console.log(email, JSON.stringify(formValues));
  };

  return (
    <Box
      component="div"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      // noValidate
      // autoComplete="off"
    >
      <TextField
        variant="outlined"
        label="Add Email"
        size="small"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" type="Button" onClick={() => addFormFields()}>
        Add Item
      </Button>
      {formValues.map((element, index) => (
        <Box
          component="div"
          style={{ width: "100%", textAlign: "center" }}
          key={index}
        >
          <TextField
            variant="outlined"
            label="Add Item"
            size="small"
            name="item"
            value={element.item || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <TextField
            variant="outlined"
            label="Add Quantity"
            size="small"
            name="quantity"
            value={element.quantity || ""}
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <Button
              variant="contained"
              type="Button"
              className="Button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </Button>
          ) : null}
        </Box>
      ))}
      <Button
        disabled={!active}
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateOrder;
