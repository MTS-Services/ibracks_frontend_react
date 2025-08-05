import Relatedtracks from "../public/products/components/sections/Relatedtracks";
import Availabestems from "../public/products/components/sections/Availabestems";
import ProductsHero from "../public/products/components/sections/ProductsHero";

const ProductsPage = () => {
  return (
    <div
      className="min-h-screen bg-neutral-900 py-10 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <ProductsHero />
      <Availabestems />
      <Relatedtracks />
    </div>
  );
};

export default ProductsPage;
