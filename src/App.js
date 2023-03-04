import logo from "./logo.svg";
import "./App.css";
import ShoppingList from "./component/shoppingList";

function App() {
  return (
    <div className="App">
      <h1>
        <ShoppingList></ShoppingList>
      </h1>
    </div>
  );
}

export default App;
