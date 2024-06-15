import React, { useRef, useEffect, useState } from 'react';
import '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
const status={
  "waiting":"🔴",
  "watching":"🟢"
}
const ClickStatus={
  "Touch":true,
  "Avoid":false
}
const Test = () => {
	const videoRef = useRef(null);
	const [model, setModel] = useState(null);
  const [cameraState,setCameraState] = useState(status.waiting)
  const [clickState,setClickState]=useState(ClickStatus.Avoid);
  useEffect(() => {
    const loadModel = async () => {
      const handposeModel = await handpose.load(40);
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

  let point1;
  let point2;
  useEffect(() => {
      const detectHands = async () => {
        if (videoRef.current && model) {
          const predictions = await model.estimateHands(videoRef.current);
          if (predictions.length > 0) {
            setCameraState(status.watching);
            monitalingHands(predictions);
          }else{
            // setClickState(ClickStatus.Avoid)
            setCameraState(status.waiting)
          }
        }
        requestAnimationFrame(detectHands);
      };

      const monitalingHands = (predictions) => {
        predictions.forEach(prediction => {
        const landmarks = prediction.landmarks;
        landmarks.forEach((landmark,index) => {
          const [x,y] = landmark;
          if(index==0||index==12){
            switch(index){
              case 0:
                point1=[x,y];
                break;
              case 12:
                point2=[x,y];
                break;
              default:
                break;
            }
          }
          });
        });
      };

    if (model) {
      detectHands();
      if(clickState===ClickStatus.Avoid && Math.sqrt((point1[0]-point2[0])**2+(point1[1]-point2[1])**2) < 150){
        setClickState(ClickStatus.Touch)
      }
      else if(clickState===ClickStatus.Touch && Math.sqrt((point1[0]-point2[0])**2+(point1[1]-point2[1])**2) > 150){
        setClickState(ClickStatus.Avoid)
      }
    }
  // }
    }, [model]);

    useEffect(()=>{
    },[clickState])
  return (
    <div>
      <h1>{clickState ? "Touch!":""}</h1>
      {cameraState}
      <video ref={videoRef} autoPlay style={{display:"none"}} />
      {/* <video ref={videoRef} autoPlay /> */}
    </div>
  );
};

export default Test;
