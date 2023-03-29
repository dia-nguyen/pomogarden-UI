import { DefaultButton } from "../Buttons";
import {S3_BASE_URL} from "../../constants"
import GardenAPI from "../../api";

function ShopItem({ buy, item}){
  return(
    <button type="button" onClick={() => buy(item.name)} key={item.name}>
      <img src={`${S3_BASE_URL}/${item.seed_sprite}`} alt={item.name}/>
      <p>{item.name}</p>
      <p>{item.buy_price}</p>
    </button>
  )
}

export default ShopItem;