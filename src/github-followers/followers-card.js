import React from "react";
import { useNavigate } from "react-router-dom";


const FollowersCard = ({ accountInfo }) => {
    const navigate = useNavigate()
  return (
    <div className="followers-card-container"
    onClick={()=>{
        navigate(`/github-profile/${accountInfo.login}`)
    }} style={{ display: "flex", alignItems: 'center', cursor: 'pointer' }}>
      <img style={{borderRadius: "50%", objectFit: 'cover', width: '50px', height: '50px'}} src={accountInfo.avatar_url} alt={accountInfo.avatar_url} />

      <div style={{paddingLeft: '10px'}}>{accountInfo.login}</div>
 
 
    </div>
  );
};

export default FollowersCard;
