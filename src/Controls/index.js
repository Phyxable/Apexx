import React from "react";
import styled from "styled-components";
import Mic from "../assets/icons/MIC_ON.svg";
import MicOff from "../assets/icons/MIC_OFF.svg";
import Video from "../assets/icons/VIDEO_ON.svg";
import VideoOff from "../assets/icons/VIDEO_OFF.svg";
import End from "../assets/icons/ENDCALL.svg";

const Controls = ({
  handleCallDisconnect,
  handleAudioToggle,
  handleVideoToggle,
  audio,
  video
}) => {
  return (
    <>
      <div className="control">
        <Circle className="column" onClick={handleAudioToggle}>
          <Image src={audio ? Mic : MicOff} />
        </Circle>
        <Circle className="column" onClick={handleCallDisconnect}>
          <Image style={{ width: "45px" }} src={End} />
        </Circle>
        <Circle className="column" onClick={handleVideoToggle}>
          <Image src={video ? Video : VideoOff} />
        </Circle>
      </div>
    </>
  );
};

export default Controls;

const 
  Circle = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    cursor: pointer;
    :not(:first-child) {
      margin-left: 20px;
    }
  `,
  Image = styled.img`
    max-width: 100%;
    width: 30px;
    margin: 0 auto;
  `;
