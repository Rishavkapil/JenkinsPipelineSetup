import React, { useState } from 'react'
import OtpInput from 'react-otp-input';

const OtpInputs = () => {
    const [otp, setOtp] = useState('');
    return (
        <>
            <div className='otp_inputs'>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
        </>
    )
}

export default OtpInputs
