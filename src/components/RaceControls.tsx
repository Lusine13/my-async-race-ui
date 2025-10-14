import React from 'react';
import { Button, Space } from 'antd';
import { RaceControlsProps } from '../types/raceControls';
import './RaceControls.css'; 

const RaceControls: React.FC<RaceControlsProps> = ({
  onStartRace,
  onResetRace,
  onGenerateCars,
}) => {
  return (
    <Space wrap size="middle">
      <Button type="primary" onClick={onStartRace}>
        Start Race
      </Button>
      <Button danger onClick={onResetRace}>
        Reset Race
      </Button>
      <Button onClick={onGenerateCars}>
        Generate 100 Cars
      </Button>
    </Space>
  );
};

export default RaceControls;
