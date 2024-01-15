import OTPInput from "react-otp-input";

const OtpComponent = ({ value, onChange }) => {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      numInputs={6}
      renderInput={(props) => <input {...props} />}
      inputType="text"
      inputStyle="input-otp"
      containerStyle="input-otp__container"
      shouldautoFocus={true}
    />
  );
};

export default OtpComponent;
