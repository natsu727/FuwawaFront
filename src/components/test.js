import React, { useRef, useEffect, useState } from 'react';
import '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
const status={
  "waiting":"🔴",
  "watching":"🟢"
}
const Test = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [model, setModel] = useState(null);
  const [message,setMessage] = useState("waiting")
  const [cameraState,setCameraState] = useState(status.waiting) 
  useEffect(() => {
    const loadModel = async () => {
      const handposeModel = await handpose.load(60);
      setModel(handposeModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error('Error accessing the camera: ', err));
    };
    startVideo();
  }, []);
  let prevX=325;
  useEffect(() => {
      const detectHands = async () => {
        if (videoRef.current && model) {
          const predictions = await model.estimateHands(videoRef.current);
          if (predictions.length > 0) {
            setCameraState(status.watching)
            monitalingHands(predictions);
          }else{
            prevX=325;
            setMessage("waiting")
            setCameraState(status.waiting)
          }
        }
        requestAnimationFrame(detectHands);
      };
      const monitalingHands = (predictions) => {
        predictions.forEach(prediction => {
        const landmarks = prediction.landmarks;
        let sum_x=0;
        landmarks.forEach(landmark => {
          const [x] = landmark;
          sum_x+=x;
          });
          if(prevX-sum_x/21>100){
            setMessage("次！！")
            console.log("次")
          }
          else if(prevX-sum_x/21<-100){
            setMessage("前！！")
            console.log("前")
          }
          prevX=sum_x/21
        });
      };
    if (model) {
      detectHands();
    }
  // }
    }, [model]);
  

  return (
    <div>
      {cameraState}
      <h1>{message}</h1>
      <video ref={videoRef} autoPlay style={{display:"none"}} />
      {/* <canvas ref={canvasRef} width="640" height="480" style={{ border: '1px solid black' }} /> */}
    </div>
  );
};

export default Test;
