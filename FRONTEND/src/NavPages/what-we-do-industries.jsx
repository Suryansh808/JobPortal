import React from "react";
import { Link } from "react-router-dom";
import pic from '../assets/dm.webp'
import NewNavbar from "../Components/Newnavbar";
import Footer from "../Components/Footer";


const WhatwedoIndustries = () => {
  return (
    <>
    <NewNavbar />
      <div id="mainpage">
        <h1>INDUSTRIES</h1>
        <div className="list">
          <h2>Industries1</h2>
          <img src={pic} alt="" />
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error obcaecati enim numquam maiores accusamus, fugit quaerat ratione optio, temporibus beatae quibusdam iure voluptatibus dolor facilis ullam, eum non consequatur hic eaque debitis doloremque neque iste. Exercitationem iusto ullam recusandae sapiente velit necessitatibus dolore error, quod facere eos deserunt repudiandae soluta excepturi, quibusdam maxime laborum voluptas quas, minus hic? Eos nihil consequatur at natus voluptas illum mollitia minus dolor aliquid perspiciatis et, delectus quas voluptatibus molestias, dolore temporibus sed, magni similique ipsum aperiam totam! Fuga possimus aut illum maxime pariatur ut, cupiditate voluptas suscipit quidem quibusdam deleniti quaerat quia. Harum itaque tempore saepe molestias, est debitis pariatur a accusamus aspernatur quidem asperiores minus provident! Iure cum minus unde, accusamus culpa ducimus eveniet asperiores alias magni voluptas quo aperiam inventore totam reiciendis ex veritatis? Delectus quibusdam, veritatis ratione ipsum nemo neque fugit voluptatem velit ad nesciunt quo commodi fuga! Modi, repudiandae quae.</p>
        </div>     


        
      </div>
      <Footer />

    </>
  );
};

export default WhatwedoIndustries;
