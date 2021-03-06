import React, { useCallback, useState } from 'react';

const StepsProvider = (props) => {
  const { defaultActiveStep, children } = props;
  const [activeStep, setActiveStep] = useState(defaultActiveStep || 0);

  const nextStep = useCallback(() => {
    setActiveStep((prev) => prev + 1);
  }, []);

  const backStep = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  //! Render
  return <div className="step-container">{children({ activeStep, nextStep, backStep, setActiveStep })}</div>;
};

export default React.memo(StepsProvider);
