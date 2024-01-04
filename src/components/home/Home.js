import ProductList from "./ProductList";
import Subscription from "./Subscription";
import MainCarousel from "./MainCarousel";

function Home() {
  return (
    <div className="home">
      <MainCarousel />
      <ProductList />
      <Subscription />
    </div>
  );
}

export default Home;
