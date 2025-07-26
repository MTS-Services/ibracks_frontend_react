import Availabestems from "../../../components/ProductsPage/Availabestems";
import ProductsHero from "../../../components/ProductsPage/ProductsHero";
import RelatedTracks from "../../../components/ProductsPage/Relatedtracks";

const ProductsView = () => {
  return (
    <div
      className="min-h-screen bg-neutral-900 py-10 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <ProductsHero />
      <Availabestems></Availabestems>
      <RelatedTracks />
    </div>
  );
};

export default ProductsView;
