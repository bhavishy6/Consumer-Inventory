import React from "react";
import "./styles.css";
import RetailerTabs from "./components/RetailerTabs";
import CustomerTabs from "./components/CustomerTabs";
import Button from "@mui/material/Button";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";


export default function App() {
  const injectedConnector = new InjectedConnector();
  const { activate, chainId, account, library, active } = useWeb3React();

  const connect = () => {
    activate(injectedConnector);
  };

  return (
    <div className="App">
      <h1>Inventory Customer Portal</h1>
      <Button
        onClick={connect}
        variant="contained"
        color={active ? "secondary" : "primary"}
      >
        {active ? "Connected" : "Connect Wallet"}
      </Button>
      <h2>Retailer</h2>
      <RetailerTabs />
      <h2>Customer</h2>
      <CustomerTabs />
    </div>
  );
}
