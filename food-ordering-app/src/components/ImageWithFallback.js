import { useState } from 'react';
import { PLACEHOLDER_IMAGE } from '../constants/swiggy';

const ImageWithFallback = ({ src, alt, className }) => {
    const [step, setStep] = useState(src ? 0 : 1);

    if (step >= 2) {
        return (
            <div className={`${className} img-fallback`} aria-hidden="true">
                {(alt || '?').charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <img
            className={className}
            src={step === 0 ? src : PLACEHOLDER_IMAGE}
            alt={alt}
            loading="lazy"
            onError={() => setStep((current) => current + 1)}
        />
    );
};

export default ImageWithFallback;
