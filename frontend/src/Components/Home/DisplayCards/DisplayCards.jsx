import CardDesign from "../Card/CardDesign.jsx";
import MobileDisplayCards from "./MobileDisplayCards.jsx";
import "./DisplayCards.css";
import * as React from "react";
import SinglePage from "../SinglePage/SinglePage.jsx";
import Coursel from "../Coursel/Coursel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, productData, singleItem, gotSingleItem } from "../../../features/product/productSlice.js";

const DisplayCards = () => {
  const [openSinglePage, setOpenSinglePage] = React.useState(false);
  const [singleData, updateSingleData] = React.useState(null)

  const dispatch = useDispatch()
  
  const items = useSelector((state) => productData(state.product));
  const sData = useSelector((state)=> gotSingleItem(state.product));

  React.useEffect(()=>{
    dispatch(getAllProducts())
  }, [])

  const handleClickOpen = (data) => {
    updateSingleData(data)
    setOpenSinglePage(true);
  };

  return (
    <>
      <Coursel />
      <div className="wafflaro-special">
      {Object.keys(items).map((category) => 
        { const idWithoutSpaces = category.replace(/\s+/g, '').toLowerCase();
          return (<div key={category}>
          <h2 id={idWithoutSpaces} style={{position: "relative", bottom : "20px"}}></h2>
          <h2 >{category}</h2>
          <hr className="hr"/>
          <div className="diplayItems" >
            {items[category].map((item) => (
              <div onClick={()=>{handleClickOpen(item); dispatch(singleItem(item._id)) }} key={item.name}>
              <CardDesign   name={item.itemName} description={item.description} url={item.itemImage.path} price={item.price}/>
              </div>
            ))}
          </div>
          <div className="diplayItemsMobile">
            {items[category].map((item) => (
              <div onClick={()=>{handleClickOpen(item); dispatch(singleItem(item._id))}} key={item.name}>
              <MobileDisplayCards name={item.itemName} description={item.description} url={item.itemImage.path} price={item.price}/>
              </div>
            ))}
          </div>
        </div>
      )})}
      </div>
      {singleData &&
       <SinglePage singleData={sData} setOpenSinglePage = {setOpenSinglePage} openSinglePage={openSinglePage}/>
      }
    </>
  );
};

export default DisplayCards;
