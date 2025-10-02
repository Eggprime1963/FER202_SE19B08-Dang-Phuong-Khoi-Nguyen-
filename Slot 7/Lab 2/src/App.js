import Navbar from "./components/NavbarComponent.jsx";
import CarouselComponent from "./components/CarouselComponent.jsx";
import CardComponent from "./components/CardComponent.jsx";
import ReservationForm from "./components/ReservationForm.jsx";

function App() {
  return (
    <div className="bg-dark-subtle">
      <Navbar />
      <CarouselComponent />
      <CardComponent />
      <ReservationForm />
    </div>
  );
}

export default App;
