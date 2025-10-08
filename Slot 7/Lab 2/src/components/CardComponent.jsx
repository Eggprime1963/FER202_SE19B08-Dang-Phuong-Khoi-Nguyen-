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
          <div className="card mx-3 position-relative" style={{ width: "18rem" }} key={item.id}>
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
            <img src={item.img} className="card-img-top" alt={item.title} />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">
                {item.oldPrice ? (
                  <>
                    <span className="text-decoration-line-through text-muted me-2">${item.oldPrice}</span>
                    <span className="fw-bold text-danger">${item.price}</span>
                  </>
                ) : (
                  <>Price: ${item.price}</>
                )}
              </p>
              <button className="btn btn-dark w-100 text-center">Buy</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="modal fade" id="pizzaModal" aria-hidden="true">
          <div className="modal-header"></div>
          <div className="modal-dialog">
            <div className="modal-content bg-white">
              <p>Order details:</p>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-control" id="quantity" defaultValue={1} min={1} max={10}/>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">Close</button>
            <button type="button" className="btn btn-success">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;