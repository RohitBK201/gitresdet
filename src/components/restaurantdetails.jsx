export const RestaurantDetails = ({image,name : title,cost,rating,votes,reviews,cuisine,paymentMethods}) =>{




    return(
        <div style={{display:"flex", gap : "2rem" , border:"1px solid Black", padding: "1rem",margin:"0.5rem"}}>

            <div>
                <img width="50px" src={image} alt={title} />
            </div>

            <div>
                <div>{title}</div>
                <div>{cuisine}</div>
                <div>Cost ${cost} for one</div>
                <div>accepts {JSON.stringify(paymentMethods)}</div>
            </div>

            <div>
                <div>{rating}</div>
                <div>{votes} votes</div>
                <div>{reviews} reviews</div>
            </div>



        </div>
    );



} 