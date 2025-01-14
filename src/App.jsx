import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ConditionalLayout from "@/config/conditionalLayout";
import AppRoutes from "@/route";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <ConditionalLayout>
            <AppRoutes />
          </ConditionalLayout>
        </Router>
      </Provider>
    </>
  );
}

export default App;
