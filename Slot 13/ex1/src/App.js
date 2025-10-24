import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div>
      <ThemeProvider>
        <CounterComponent />
        <LightSwitch />
      </ThemeProvider>

      <AuthProvider>
        <div className="App">
          <LoginForm />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
