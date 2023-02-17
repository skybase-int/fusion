import CoreUnitCard from '@ses/components/core-unit-card/core-unit-card';
import React from 'react';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';

interface Props {
  coreUnit: CoreUnitDto;
}

const CardItemCoreUnitMobile = ({ coreUnit }: Props) => {
  if (!coreUnit) {
    return <CoreUnitCard coreUnit={{} as CoreUnitDto} isLoading />;
  }
  return <CoreUnitCard coreUnit={coreUnit as CoreUnitDto} />;
};

export default CardItemCoreUnitMobile;