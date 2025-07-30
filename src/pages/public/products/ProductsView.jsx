import { useEffect, useState } from "react";

import Availabestems from "./components/sections/Availabestems";
import ProductsHero from "./components/sections/ProductsHero";
import ProductsHeroMobail from "./components/sections/ProductsHeroMobail";
import RelatedTracks from "./components/sections/Relatedtracks";

import { getAllSongs } from "../../../featured/song/trackService";

const ProductsView = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSongs();
        const limitedData = data.slice(0, 6);
        setSongs(limitedData);
      } catch (err) {
        console.error(err, "Could not load songs");
      }
    })();
  }, []);

  return (
    <div
      className="bg-neutral-900 py-10 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="hidden lg:block">
        <ProductsHero />
      </div>
      <div className="block lg:hidden">
        <ProductsHeroMobail />
      </div>

      <Availabestems songs={songs} />
      <RelatedTracks />
    </div>
  );
};

export default ProductsView;
