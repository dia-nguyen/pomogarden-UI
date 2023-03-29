import Modal from "../Modal";
import { useEffect, useState, useContext } from "react";
import GardenAPI from "../../api";
import ShopItem from "./ShopItem";
import userContext from "../../userContext";

function Shop({closeModal}) {
  const { user, setUser } = useContext(userContext)
  const initalData = {
    items: null,
    isLoading: true
  }

  const [shop, setShop] = useState(initalData);

  async function buy(seed) {
    try{
      let res = await GardenAPI.buySeed(seed);
      setUser({
        data: {
          ...user,
          plants: res.plants,
        },
        isLoading: false,
      });
    } catch (err) {
      // handle err
    }
  }
  useEffect(
    function fetchShopItemsWhenMounted(){
      async function fetchShopItems(){
        try{
          let res = await GardenAPI.getShopItems();
          setShop({
            items: res.shop,
            isLoading: false
          })

        } catch(err){
          setShop((prev) => ({
            ...prev,
            isLoading: false
          }))
        }
      }
      fetchShopItems();
    }, []
  )

  if(shop.isLoading) return <h1>Loading</h1>

  return(
    <Modal title="Shop" closeModal={closeModal}>
      {shop.items.map((item, i) => (<ShopItem item={item} buy={buy} key={i} />))}
    </Modal>
  )
}

export default Shop;