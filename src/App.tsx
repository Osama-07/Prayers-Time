import { ReactElement } from "react";
import "./App.css";
import MainContent from "./componenets/MainContent";
import { Container } from "@mui/material";

function App(): ReactElement {
  return (
    <>
      <div className="flex justify-center w-100">
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
