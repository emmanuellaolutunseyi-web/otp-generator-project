const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [otpText, setOtpText] = useState("Click 'Generate OTP' to get a code");
  const [secondsLeft, setSecondsLeft] = useState(null);
  const intervalRef = useRef(null);

  const handleButtonClick = () => {
    const generatedOtp = Math.floor(500000 + Math.random() * 900000);
    setOtpText(generatedOtp.toString());
    setSecondsLeft(5);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setOtpText("OTP expired. Click the button to generate a new OTP.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  let timerMessage = "";
  if (secondsLeft > 0) {
    timerMessage = `Expires in: ${secondsLeft} seconds`;
  } else if (secondsLeft === 0) {
    timerMessage = "OTP expired. Click the button to generate a new OTP.";
  }

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{otpText}</h2>
      <p id="otp-timer" aria-live="assertive">{timerMessage}</p>
      <button id="generate-otp-button" onClick={handleButtonClick} disabled={secondsLeft > 0}>
        Generate OTP
      </button>
    </div>
  );
};