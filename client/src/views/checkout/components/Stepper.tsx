import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  DollarOutlined,
} from '@ant-design/icons';

export interface IStepsStatus {
  currentStep: number;
  steps: IStep[];
}

export interface IStep {
  index: number;
  status: 'wait' | 'process' | 'finish' | 'error' | undefined;
}

interface StepperProps {
  stepsStatus: IStepsStatus;
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ stepsStatus, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(stepsStatus.currentStep);
  }, [stepsStatus]);

  const onChange = (value: number) => {
    onStepChange(value);
    setCurrentStep(value);
  };

  return (
    <Steps
      current={currentStep}
      onChange={onChange}
      items={[
        {
          title: 'Your Order',
          status: stepsStatus.steps[0].status,
          icon:
            currentStep === 0 && stepsStatus.steps[0].status === 'wait' ? (
              <LoadingOutlined />
            ) : (
              <ShoppingCartOutlined />
            ),
        },
        {
          title: 'Delivery Address',
          status: stepsStatus.steps[1].status,
          icon:
            currentStep === 1 && stepsStatus.steps[1].status === 'wait' ? (
              <LoadingOutlined />
            ) : (
              <HomeOutlined />
            ),
        },
        {
          title: 'Payment Method',
          status: stepsStatus.steps[2].status,
          icon:
            currentStep === 2 && stepsStatus.steps[2].status === 'wait' ? (
              <LoadingOutlined />
            ) : (
              <DollarOutlined />
            ),
        },
        {
          title: 'Complete',
          status: stepsStatus.steps[3].status,
          icon:
            currentStep === 3 &&
            ['wait', 'process'].includes(
              stepsStatus.steps[3].status as string,
            ) ? (
              <InfoCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            ),
        },
      ]}
    />
  );
};

export default Stepper;

export const initialStepsStatus: IStepsStatus = {
  currentStep: 0,
  steps: [
    { index: 0, status: 'wait' },
    { index: 1, status: 'wait' },
    { index: 2, status: 'wait' },
    { index: 3, status: 'wait' },
  ],
};

export const pendingOrderStatus: IStepsStatus = {
  currentStep: 0,
  steps: [
    { index: 0, status: 'finish' },
    { index: 1, status: 'finish' },
    { index: 2, status: 'finish' },
    { index: 3, status: 'wait' },
  ],
};

export const completeOrderStatus: IStepsStatus = {
  currentStep: 0,
  steps: [
    { index: 0, status: 'finish' },
    { index: 1, status: 'finish' },
    { index: 2, status: 'finish' },
    { index: 3, status: 'finish' },
  ],
};
