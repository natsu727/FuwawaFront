// import React, { useRef, useEffect } from 'react';

// const cv=window.cv
// const Test = () => {
//     const videoRef = useRef(null);
// 	// const canvas =document.getElementById("outputCanvas");
//     useEffect(() => {
//         const getVideoStream = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
// 					// const width = videoRef.current.clientWidth;
// 					// const height = videoRef.current.clientHeight;
// 					// const src =new cv.Mat(height,width,cv.CV_8UC4)
// 					// const dist =new cv.Mat(height,width,cv.CV_8UC1)
// 					// cv.cvtColor(src,dist,cv.COLOR_RGB2GRAY);
// 					// cv.imshow("outputCanvas",dist)
//                 }
//             } catch (error) {
//                 console.error('Error accessing media devices.', error);
//             }
//         };

//         getVideoStream();
//     }, []);
// 	// let cap = new cv.VideoCapture(videoRef)
// 	// cv.imshow("outputCanvas",cap)
//     return (
//         <div>
//             <video ref={videoRef} autoPlay hidden/>
// 			<canvas id="outputCanvas"/>
//         </div>
//     );
// };

// export default Test;

import React, { useRef, useEffect, useState } from 'react';
import '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const Test = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const handposeModel = await handpose.load();
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

  useEffect(() => {
    const detectHands = async () => {
      if (videoRef.current && model) {
        const predictions = await model.estimateHands(videoRef.current);
		// console.log(predictions)
        if (predictions.length > 0) {
          drawHands(predictions);
        }
      }
      requestAnimationFrame(detectHands);
    };

    const drawHands = (predictions) => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      predictions.forEach(prediction => {
		  const landmarks = prediction.landmarks;
		  let sum_x=0;
		  let sum_y=0;
		  landmarks.forEach(landmark => {
			  const [x, y ,z] = landmark;
			  sum_x+=x;
			  sum_y+=y;
			//   ctx.beginPath();
			//   ctx.arc(x, y, 5, 0, 2 * Math.PI);
			//   ctx.fillStyle = 'red';
			//   ctx.fill();
			  });
			ctx.beginPath();
			ctx.arc(sum_x/21, sum_y/21, 5, 0, 2 * Math.PI);
			ctx.fillStyle = 'red';
			ctx.fill();
		});
    };

    if (model) {
      detectHands();
    }
  }, [model]);

  return (
    <div>
      <video ref={videoRef} autoPlay/>
      <canvas ref={canvasRef} width="640" height="480" style={{ border: '1px solid black' }} />
    </div>
  );
};

export default Test;
