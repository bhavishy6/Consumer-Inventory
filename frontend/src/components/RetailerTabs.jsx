import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stock from "../contracts/Stock.json";
import { useWeb3React } from "@web3-react/core";
import ContractAddress from "../contracts/contract-address.json";
import Container from "@mui/material/Container";

//import tab content
import CreateItem from "./retailer/CreateItem";
import ViewItems from "./retailer/ViewItems";
import ViewOrders from "./retailer/ViewOrders";

const ABIs = [[ContractAddress.Stock, Stock.abi]];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { active, library } = useWeb3React();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Box component="div" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Create Item" {...a11yProps(0)} />
          <Tab label="View Items" {...a11yProps(1)} />
          <Tab label="View Orders" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <CreateItem />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ViewItems />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ViewOrders />
      </TabPanel>
    </Box>
  );
}
