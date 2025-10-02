import { Card, Button } from "react-bootstrap";
import menu1 from "../assets/images/menu1.jpg";
import menu2 from "../assets/images/menu2.jpg";
import menu3 from "../assets/images/menu3.jpg";
import menu4 from "../assets/images/menu4.jpg";

function CardComponent() {
  const menuItems = [
    { id: 1, img: menu1, title: "Margenrita Pizza", price: 19.99, oldPrice: 24.99, label: "SALE" },
    { id: 2, img: menu2, title: "Mushroom Pizza", price: 19.99, oldPrice: null, label: "NEW" },
    { id: 3, img: menu3, title: "Hawaiian Pizza", price: 19.99, oldPrice: 22.99, label: "SALE" },
    { id: 4, img: menu4, title: "Pesto Pizza", price: 19.99, oldPrice: null, label: null },
  ];

  return (
    <div className="container p-5">
      <h1 className="text-left p-3">Our Menu</h1>
      <div className="d-flex">
        {menuItems.map((item) => (
          <Card style={{ width: "18rem" }} className="mx-3 position-relative" key={item.id}>
            {item.label && (
              <span 
                className="position-absolute badge rounded-0" 
                style={{ 
                  top: '10px', 
                  left: '10px', 
                  backgroundColor: item.label === 'SALE' ? '#dc3545' : '#198754',
                  zIndex: 1
                }}
              >
                {item.label}
              </span>
            )}
            <Card.Img variant="top" src={item.img} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.oldPrice ? (
                  <>
                    <span className="text-decoration-line-through text-muted me-2">${item.oldPrice}</span>
                    <span className="fw-bold text-danger">${item.price}</span>
                  </>
                ) : (
                  <>Price: ${item.price}</>
                )}
              </Card.Text>
              <Button variant="dark" className="w-100 text-center">Buy</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardComponent;
