import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./AddPanel.scss";
import * as R from "ramda";

const AddPanel = (props) => {
  const { layerCakeData, closeModal, selected, setSelected } = props;
  console.log('selected', selected)
  const [targetItem, setTargetItem] = useState();
  const [countNumber, setCountNumber] = useState(1);

  const pickThisModel = (imageIndex, item) => {
    let imageBar = document.querySelector(".panel_image_bar");
    imageBar.style.transform = `translateX(-${imageIndex * 100}%)`;
    setTargetItem(item);
  };

  const handleCalc = (behavior) => {
    let tempCount = countNumber;
    switch (behavior) {
      case "add":
        tempCount++;
        setCountNumber(tempCount);
        break;
      case "minus":
          if(tempCount > 0) {
            tempCount--;
            setCountNumber(tempCount);
          }

        break;

      default:
        break;
    }
  };

  const innerAddToCart = () => {
    let newList = new Array(countNumber)
    .fill(0)     // 依序填0
    .map((item, key) => {
      return key;
    }); 
    let tempSelected = [...selected];
    console.log('newList',newList);
    newList.forEach((item)=>{
        tempSelected.push(targetItem);
    })
    console.log('tempSelected', tempSelected)
    setSelected(tempSelected);
    closeModal();
  }
  return (
    <div className={`add_panel_container`}>
      <div className="add_panel">
        <div className="close_icon" onClick={closeModal}></div>
        <div className="main_image_area">
          <div className="panel_image_bar">
            {layerCakeData.map((item, index) => {
              return (
                <img className="each_image" key={index} src={item.image}></img>
              );
            })}
          </div>
        </div>
        <div className="panel_image_picker">
          <div className="model_picker_tip">口味</div>
          <div className="picker_row">
            {layerCakeData.map((item, index) => {
              return (
                <div
                  className={`each_item ${
                    targetItem && targetItem.name === item.name ? "current" : ""
                  }`}
                  key={index}
                >
                  <img
                    className={`each_thumbnail`}
                    src={item.image}
                    onClick={() => pickThisModel(index, item)}
                  ></img>
                  <div className="item_name">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="count_area">
          <div className="count_tip">數量</div>
          <div className="counter_wrap">
            <div className="minus" onClick={() => handleCalc("minus")}>
              -
            </div>
            <div className="count_number">{countNumber}</div>
            <div className="add" onClick={() => handleCalc("add")}>
              +
            </div>
          </div>
        </div>
        <div className="bottom_area">
          <div className="add_to_cart_btn" onClick={()=>innerAddToCart()}>加入購物車</div>
        </div>
      </div>
    </div>
  );
};
export default AddPanel;
