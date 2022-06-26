import React, { useState, useEffect, Fragment, useRef } from "react";
import "./MainPage.scss";
import * as R from "ramda";
import OriginCake from "./../../images/original.jpg";
import TaroCake from "./../../images/taro.jpg";
import PandanCake from "./../../images/pandan.jpg";
import ChiliSource from "./../../images/chili_sauce.jpg";
import ChickenBreast from "./../../images/chicken_breast.jpg";
import ChickenJerky from "./../../images/chicken_jerky.jpg";
import ChickenLeg from "./../../images/chicken_leg.jpg";
import Egg from "./../../images/egg.jpg";
import ModalTool from "./../ModalTool/ModalTool";
import AddPanel from "./../AddPanel/AddPanel";
import ShopImage from "./../../images/calicoshop.png";
const MainPage = () => {
  const layerCakeData = [
    {
      name: "原味",
      price: 2,
      imageUrl: "./../../images/original.jpg",
      image: OriginCake,
    },
    {
      name: "芋頭",
      price: 2,
      imageUrl: "./../../images/taro.jpg",
      image: TaroCake,
    },
    {
      name: "七葉蘭",
      price: 2,
      imageUrl: "./../../images/pandan.jpg",
      image: PandanCake,
    },
  ];

  const relatedProduct = [
    {
      name: "雞胸肉",
      price: 100,
      image: ChickenBreast,
      sold: 50,
    },
    {
      name: "雞肉乾",
      price: 200,
      image: ChickenJerky,
      sold: 20,
    },
    {
      name: "糖心蛋",
      price: 60,
      image: Egg,
      sold: 65,
    },
    {
      name: "雞腿",
      price: 200,
      image: ChickenLeg,
      sold: 1,
    },
    {
      name: "辣椒醬",
      price: 160,
      image: ChiliSource,
      sold: 25,
    },
  ];
  const [selected, setSelected] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const cardListRef = useRef();
  const pickThisImage = (imageIndex) => {
    let imageBar = document.querySelector(".image_bar");
    imageBar.style.transform = `translateX(-${imageIndex * 100}%)`;
  };

  const addToCart = () => {
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
  };
  const renderAddPanel = () => {
    return (
      <ModalTool
        modalShow={showPanel}
        modalCloseFunction={closePanel}
        modalWidth={"100%"}
        modalHeight={"40vh"}
        backgroundOpacity={0.6}
        modalInnerBackground={`#fff`}
      >
        <AddPanel
          layerCakeData={layerCakeData}
          closeModal={closePanel}
          setShowPanel={setShowPanel}
          selected={selected}
          setSelected={setSelected}
        ></AddPanel>
      </ModalTool>
    );
  };

  return (
    <div className={`main_container`}>
      <div className="header">瑞比購物</div>
      <div className="image_area">
        <div className="image_bar">
          {layerCakeData.map((item, index) => {
            return (
              <img className="each_image" key={index} src={item.image}></img>
            );
          })}
        </div>
        <div className="image_picker">
          {layerCakeData.map((item, index) => {
            return (
              <img
                className={`each_thumbnail`}
                key={index}
                src={item.image}
                onClick={() => pickThisImage(index)}
              ></img>
            );
          })}
        </div>
      </div>
      <div className="product_name">九層糕 一週前預訂</div>

      <div className="delivery">
        <div className="delivery_icon"></div>
        免運費
        <div className="tip">滿$10，免運費</div>
      </div>
      <div className="model_picker">
        <div className="model_picker_tip">請選擇商品選項(3種口味)</div>
        <div className="picker_row">
          {layerCakeData.map((item, index) => {
            return (
              <img
                className={`each_thumbnail`}
                key={index}
                src={item.image}
                onClick={() => addToCart()}
              ></img>
            );
          })}
        </div>
      </div>

      <div className="desc">
        「九層堆疊」寓意吉祥
        <br />
        與「久」同音象徵長長久久、與天同壽之意
        <br />
        而一層層堆上去的做法
        <br />
        更象徵著步步高升、吉祥如意的寓意
        <br />
        <br />
        一盒六入，滿一盒出貨
        <br />
        依據訂單製作，請冷藏保存
        <br />
        常溫請當天食用完畢
        <br />
      </div>
      <div className="shop_info">
        <div className="top">
          <div className="shop_basic">
            <img className="shop_avatar" src={ShopImage}></img>
            <div className="shop_content">
              <div className="shop_name">revyShopping</div>
              <div className="shop_location">台北市 文山區 / 萬華區</div>
            </div>
          </div>
          <div className="shop_enter_btn">查看賣場</div>
        </div>
        <div className="bottom">
          <div className="product_count">
            <div className="number">5</div>樣商品
          </div>
          <div className="level">
            <div className="number">5.0</div>評價
          </div>
        </div>
      </div>
      <div className="recommendation">
        <div className="recom_tip">推薦賣場其他好物</div>
        <div className="product_wrap" ref={cardListRef}>
          {relatedProduct.map((item, index) => {
            return (
              <div className="product_card" key={index}>
                <img className="photo" src={item.image}></img>
                <div className="name">{item.name}</div>
                <div className="price">${item.price}</div>
                <div className="sold">已售出{item.sold}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <div className="footer_inner">
          <div className="btn" onClick={()=>addToCart()}>加入購物車</div>
          <div className="btn">立即結帳</div>
        </div>
        <div className="cart">
          <div className="cart_icon"></div>
          {selected.length ? <div className="cart_counter">{selected.length ? selected.length: null}</div>:null}
          購物車
        </div>
      </div>
      {/* {showPanel ? renderAddPanel() : null} */}
      {renderAddPanel()}
    </div>
  );
};
export default MainPage;
