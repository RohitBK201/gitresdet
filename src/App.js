import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantDetails } from './components/restaurantdetails';

function App() {

  const [loading,setLoading] = useState(true)

  const [error,setError] = useState(false)

  const [data,setData] = useState([])

  const [page,setPage] = useState(1)

  const [ratingOrd,setRatingOrd] = useState("asc")

  const [costOrd,setCostOrd] = useState("asc")

  const [filterRating,setFilterRating] = useState(0)

  const [text,setText] = useState("");

  const [q,setQ] = useState("")

  const [cash,setCash] = useState(null)

  const [card,setCard] = useState(null)

  const [upi,setUpi] = useState(null)


  useEffect( ()=>{
    
    setLoading(true)

    const paramsForPayment = {}

    if(cash!==null) paramsForPayment["paymentMethods.cash"] = cash;
    if(card!==null) paramsForPayment["paymentMethods.card"] = card;
    if(upi!==null)paramsForPayment["paymentMethods.upi"] = upi;

    axios.get("http://localhost:8080/food",{

    params : {

      _page : page,
      
      _limit : 5,

      _sort : "rating,cost",

      _order : `${ratingOrd},${costOrd}`,

      rating_gte : filterRating,

      q:q,

      ...paramsForPayment


    }

    })
    .then((res)=>{

      setData(res.data)
      setLoading(false)
      console.log("success")
    
    
    })
    .catch((e)=>{
      
      console.log("error",e)

      setError(true)
      setLoading(false)
    
    })

  },[page,ratingOrd,costOrd,filterRating,q,cash,card,upi])

  

  return (
    <div className="App">
     <h1>Restaurant Details</h1>

     {loading &&  <div>loading</div>}

     <div>
       <h3>search</h3>
       <input type="text" placeholder='enter keyword' onChange={(e)=>{setText(e.target.value)}} />
       <button onClick={()=>{setQ(text)}}>search</button>
       
     </div>

     <br/>

     <div>
       {/* DROP DOWN BETTER */}
       
       <button disabled={ratingOrd==="desc"} onClick={()=>{setRatingOrd("desc")}}>SORT BY DESC RATING</button>
       <button disabled={ratingOrd==="asc"} onClick={()=>{setRatingOrd("asc")}}>SORT BY ASC RATING</button>
     
     </div>

     <div>
       {/* DROP DOWN BETTER */}
       
       <button disabled={ratingOrd==="desc"} onClick={()=>{setCostOrd("desc")}}>SORT BY DESC COST</button>
       <button disabled={ratingOrd==="asc"} onClick={()=>{setCostOrd("asc")}}>SORT BY ASC COST</button>
     
     </div>

     <div>
       <h4>Filter rating</h4>

       <button onClick={()=>{setFilterRating(4)}}>greter than 4</button>
       <button onClick={()=>{setFilterRating(3)}}>greter than 3</button>
       <button onClick={()=>{setFilterRating(2)}}>greter than 2</button>
       <button onClick={()=>{setFilterRating(1)}}>greter than 1</button>
       <button onClick={()=>{setFilterRating(0)}}>all</button>


     </div>

      <div>

        <h4>Payments</h4>

            <button onClick={()=>{setCash(!cash)}}>CASH-{cash? "True":"False"}</button>
            <button onClick={()=>{setCard(!card)}}>CARD-{card? "True":"False"}</button>
            <button onClick={()=>{setUpi(!upi)}}>UPI-{upi? "True":"False"}</button>
            <button onClick={()=>{
              setCash(null)
              setCard(null)
              setUpi(null)
              }}>reset</button>

      </div>

     <div>
        {/* {pagination} */}

        <button disabled={page===1} onClick={()=>{if(page>=2){setPage(page-1)}}}>prev</button>
        <PaginationComponent currentPage={page} lastPage={5} onPageChange={setPage}/>
        <button onClick={()=>{setPage(page+1)}}>next</button>

     </div>

     <div>
       {data.map((item)=>(
         <RestaurantDetails key={item.id} {...item}/>
       ))}
     </div>
    </div>
  );
}

const PaginationComponent = ({currentPage,lastPage,onPageChange}) => {

  const arr = new Array(lastPage).fill(0);

  return(
    <div>
      {
        arr.map((item,page)=>( <button key={page} onClick={()=>{onPageChange(page+1)}} disabled={(page+1)===currentPage}>{page+1}</button>))
      }
    </div>
  );

}


export default App;
