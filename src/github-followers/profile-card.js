import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FollowersCard from "./followers-card";
import "./github.css";

const GitHubProfileCard = () => {
  const { profileId } = useParams();
  const [accountInfo, setAccountInfo] = useState({});
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  useEffect(() => {
    setFollowingData([]);
    setFollowersData([])

    axios
      .get(`https://api.github.com/users/${profileId}`)
      .then((res) => {
        setAccountInfo(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [profileId]);

  const fetchFollowers = () => {
    setFollowingData([]);
    axios
      .get(`https://api.github.com/users/${profileId}/followers`)
      .then((res) => {
        setFollowersData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const fetchFollowing = () => {
    setFollowersData([]);

    axios
      .get(`https://api.github.com/users/${profileId}/following`)
      .then((res) => {
        setFollowingData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <div className="github-profile-card-container">
      <div className="github-profile-card">
        <img
          className="github-profile-pic"
          src={accountInfo.avatar_url}
          alt={accountInfo.avatar_url}
        />
        <div style={{ fontSize: "25px", height: "70px" }}>
          {accountInfo.name}
        </div>
        <div style={{ color: "gray", paddingBottom: "15px" }}>
          @{accountInfo.login}
        </div>
        <div style={{ paddingBottom: "15px" }}>{accountInfo.bio}</div>
        <div className="detail-info-github-container">
          <div
            className="detail-info-github"
            style={{cursor: 'pointer'}}
            onClick={() => {
              fetchFollowers();
            }}
          >
            <div className="quantity-info">{accountInfo.followers}</div>{" "}
            <div className="text-info">Followers</div>
          </div>
          <div
            className="detail-info-github"
            style={{cursor: 'pointer'}}
            onClick={() => {
              fetchFollowing();
            }}
          >
            <div className="quantity-info">{accountInfo.following}</div>{" "}
            <div className="text-info">Following</div>
          </div>
          <div className="detail-info-github">
            <div className="quantity-info">{accountInfo.public_repos}</div>{" "}
            <div className="text-info">Repositories</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {followersData.map((accountInfo) => {
          return (
            <FollowersCard key={accountInfo.id} accountInfo={accountInfo} />
          );
        })}
        {followingData.map((accountInfo) => {
          return (
            <FollowersCard key={accountInfo.id} accountInfo={accountInfo} />
          )
        })}
      </div>
    </div>
  );
};

export default GitHubProfileCard;
