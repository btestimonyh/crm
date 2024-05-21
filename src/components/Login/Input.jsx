import React, { useEffect, useRef } from 'react';
import { Input } from "@mui/material";

const LoginInput = React.forwardRef(({ placeholder, type, error }, ref) => {
    const inputRef = useRef(null);
    useEffect(() => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(inputRef.current);
            } else {
                ref.current = inputRef.current;
            }
        }
    }, [ref]);

    return (
        <Input
            error={error}
            fullWidth
            placeholder={placeholder}
            type={type}
            className="bg-[#236797]/50 rounded-sm px-2 py-1"
            inputRef={inputRef}
        />
    );
});

LoginInput.displayName = 'LoginInput';

export default LoginInput;