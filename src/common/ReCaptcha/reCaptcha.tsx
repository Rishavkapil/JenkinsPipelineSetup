// "use client";

// import { useCallback } from "react";
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// import reCaptcha from "../../../public/assets/reCaptcha.png";
// import Image from "next/image";
// import "./ReCaptcha.scss";

// const ReCaptchaComponent = ({ setReCaptcha, isChecked, setChecked }: any) => {
//   const { executeRecaptcha } = useGoogleReCaptcha();

//   const handleReCaptchaVerify = useCallback(async () => {
//     if (!executeRecaptcha) {
//       return;
//     }
//     const token = await executeRecaptcha("submit");
//     setReCaptcha(token);
//   }, [executeRecaptcha, setReCaptcha]);

//   const handleCheckboxChange = async () => {
//     const newCheckedState = !isChecked;
//     setChecked(newCheckedState);
//     if (newCheckedState) {
//       await handleReCaptchaVerify();
//     } else {
//       setReCaptcha("");
//     }
//   };

//   return (
//     <div className="capcha_btn">
//       <input
//         id="not-robot"
//         type="checkbox"
//         checked={isChecked}
//         onChange={handleCheckboxChange}
//         className="check-input"
//       />
//       <label htmlFor="not-robot">I am not a robot</label>
//       <div className="capcha_img">
//         <Image src={reCaptcha} alt="capcha-img" />
//       </div>
//     </div>
//   );
// };

// export default ReCaptchaComponent;
