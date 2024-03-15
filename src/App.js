import React, { useEffect, useRef, useState } from "react";
import Block from "./components/Block";
import "./style/style.scss"

function App() {

  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const[fromPrice, setFromPrice] = useState();
  const[toPrice, setToPrice] = useState(1);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then((resolve) => resolve.json())
    .then((json) => {
      setRates(json.Valute);
    })
    .catch((err) => {
      console.warn(err);
      alert("Не удалось получить информацию!");
    });
  }, []); 


  const onChangeFromPrice = (value) => {
    let price = 0;
    let result = 0;
    if(fromCurrency === "RUB"){
      if(toCurrency !== "RUB"){
        price = value;
        result = price / rates[toCurrency]['Value']
      }else{
        price = value;
        result = value;
      }
    }else{
      if(toCurrency !== "RUB"){
        price = value;
        result = price * rates[toCurrency]['Value'] / rates[fromCurrency]['Value'];
      }else{
        price = value;
        result = price * rates[fromCurrency]['Value'];
      }
      
    }
    setToPrice(result);
    setFromPrice(value);
  }


  const onChangeToPrice = (value) => {
    let price = 0;
    let result = 0;
    if(toCurrency === "RUB"){
      if(fromCurrency !== "RUB"){
        price = value;
        result = price / rates[fromCurrency]["Value"]
      }else{
        price = value;
        result = value;
      }
    }else{
      if(fromCurrency !== "RUB"){
        price = value;
        result = price * rates[fromCurrency]["Value"] / rates[toCurrency]["Value"];
      }else{
        price = value;
        result = price * rates[toCurrency]["Value"];
      }
      
    }
    setFromPrice(result);
    setToPrice(value);
  }

//   useEffect(() => {
//     onChangeFromPrice(fromPrice);
// }, [fromCurrency, fromPrice, onChangeFromPrice]);


  return (

    <div className="App">
      <Block
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
