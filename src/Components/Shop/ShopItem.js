import { BuyButton } from "../Buttons";
import { S3_BASE_URL } from "../../constants";
// import GardenAPI from "../../api";

function ShopItem({ buy, item }) {
  console.log('item',item);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src={`${S3_BASE_URL}/${item.seed_sprite}`} className="w-[35px]" alt={item.name} />
          <p className="capitalize">{item.name} seeds</p>

        </div>
        <div className="flex">
          <p className="mr-5">
            <span className="coin-symbol ms-4">{item.buy_price}</span>
          </p>
          <BuyButton event={() => buy(item.name)} />
        </div>
      </div>
    </div>
  );
}

export default ShopItem;
