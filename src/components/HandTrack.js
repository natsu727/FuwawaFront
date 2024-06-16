import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const HandTracker = ({ onMoveLeft, onMoveRight }) => {
  const videoRef = useRef(null);
  const [handModel, setHandModel] = useState(null);
  const [prevCoords, setPrevCoords] = useState(null);
  const [handStatus,setHandStatus] = useState(false);
  const [startPos,setStartPos] = useState();

  useEffect(() => {
    const loadModel = async () => {
      const model = await handpose.load();
      setHandModel(model);
    };

    const setupCamera = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        videoRef.current.srcObject = stream;
      }
    };

    loadModel();
    setupCamera();
  }, []);

  useEffect(() => {
    const detectHands = async () => {
      if (handModel && videoRef.current) {
        const predictions = await handModel.estimateHands(videoRef.current);
        if (predictions.length > 0) {
          const hand = predictions[0];
          const coords = hand.landmarks[0]; // ここでは、手首の座標を使用
          const middle_Tip=hand.landmarks[12];
          const middle_Pip=hand.landmarks[10];
          if(middle_Tip[1]-middle_Pip[1]>0 && !handStatus){
            console.log("ON")
            setStartPos(coords);
            setHandStatus(true);
          }
          else if(middle_Tip[1]-middle_Pip[1]<0 && handStatus){
            console.log("OFF")
            console.log(startPos[0]-coords[0]>0 ? "Right":"Left")
            setHandStatus(false);
          }
          if (prevCoords && !handStatus) {
            const dx = coords[0] - prevCoords[0];
            const dy = coords[1] - prevCoords[1];
            const distance = Math.sqrt(dx**2 + dy**2);
            if (distance > 60) { // 移動差分の閾値を設定
              if (dx > 0) {
                // onMoveRight();
              } else {
                // onMoveLeft();
              }
            }
          }
          setPrevCoords(coords);
        }
      }
    };

    const interval = setInterval(detectHands, 200); // 0.1秒ごとに検出
    return () => clearInterval(interval);
  }, [handModel, prevCoords, onMoveLeft, onMoveRight]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay style={{display:"none"}}/>
      {/* <video ref={videoRef} width="640" height="480" autoPlay/> */}
    </div>
  );
};

export default HandTracker;
