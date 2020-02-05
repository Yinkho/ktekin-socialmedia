import React from "react";
import Posts from "../post/Posts";
import bg from "../images/bg.jpg";

const Home = () => (
  <div>
    <div className="jumbotron">
      <h2>POSTEO</h2>
      <p className="lead">Postez votre actualité web au sein de la communauté</p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
