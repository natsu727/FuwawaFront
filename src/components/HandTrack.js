import React, { useRef, useEffect, useState } from 'react';
import '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const HandTrack = ({ onHandMove }) => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  // const [cameraState, setCameraState] = useState(status.waiting);

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

  let prevX = 325;
  
  useEffect(() => {
    const detectHands = async () => {
      if (videoRef.current && model) {
        const predictions = await model.estimateHands(videoRef.current);
        if (predictions.length > 0) {
          monitoringHands(predictions);
        } else {
          prevX = 325;
        }
      }
      requestAnimationFrame(detectHands);
    };

    const monitoringHands = (predictions) => {
      predictions.forEach(prediction => {
        const landmarks = prediction.landmarks;
        let sum_x = 0;
        landmarks.forEach(landmark => {
          const [x] = landmark;
          sum_x += x;
        });
        if (prevX - sum_x / 21 > 200) {
          if (onHandMove) onHandMove('next');
        } else if (prevX - sum_x / 21 < -200) {
          if (onHandMove) onHandMove('previous');
        }
        prevX = sum_x / 21;
      });
    };

    if (model) {
      detectHands();
      console.log("OK")
    }
  }, [model, onHandMove]);

  return (
    <>
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
    </>
  );
};

export default HandTrack;

// ハンドトラッキング導入までの流れ
// 1.使用したいファイルにHandTrackをインポートする
// 2.JS部分に以下のような関数を作成する
// 
// const handleHandMove = (direction) => {
// if (direction === 'next') {
//   console.log('次へ');
// } else if (direction === 'previous') {
//   console.log('前へ');
// }
// 
//3. HTML部分に<HandTrac onHandMove={handHandMove} />を追加する