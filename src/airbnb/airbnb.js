import React from "react";
import House from "./house";

const houses = [
    {
        pic: "https://a0.muscache.com/im/pictures/82c577ee-3422-4fda-ae09-6716d76e8bef.jpg?im_w=720",
        location: "Austing, Texas",
        distance: "730 miles away",
        date: "Nov 7 - 12",
        price: 254,
        rate: 4.6
    },
    {
        pic: "https://a0.muscache.com/im/pictures/da9516c7-04a3-4787-a82e-b58c3ac5e865.jpg?im_w=720",
        location: "Lumberton, Texas",
        distance: "902 miles away",
        date: "Jan 7 - 12",
        price: 348,
        rate: 4.89
    },
    {
        pic: "https://a0.muscache.com/im/pictures/ecd77529-567b-4ee6-b518-e21d1b28bf7b.jpg?im_w=720",
        location: "Lumberton, Texas",
        distance: "902 miles away",
        date: "Jan 7 - 12",
        price: 348,
        rate: 4.89
    },{
        pic: "https://a0.muscache.com/im/pictures/miso/Hosting-52288428/original/059cc00a-1c12-4531-a119-9eab7260d3d9.jpeg?im_w=720",
        location: "Lumberton, Texas",
        distance: "902 miles away",
        date: "Jan 7 - 12",
        price: 348,
        rate: 4.89
    },
    {
        pic: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-38932417/original/1de2db51-5bd7-4c8e-8142-42dec894176f.jpeg?im_w=720",
        location: "Lumberton, Texas",
        distance: "902 miles away",
        date: "Jan 7 - 12",
        price: 348,
        rate: 4.89
    }

  

]

const AirBnb = () => {

    return (
        <div className="main">
            {houses.map((house, id) =>{
                return(
                    <House key={id} date={house.date}price={house.price} distance={house.distance} rate={house.rate}pic={house.pic} location={house.location}/>
                )
            })}
            
        </div>
    )
}


export default AirBnb;

