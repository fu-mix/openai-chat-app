import {
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Text,
  HStack,
  VStack,
  Tag,
  TagLabel,
  Stack,
  Spacer,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { useState, memo } from 'react';

interface CustomSliderProps {
  title: string;
  setParamter: (parameter: number) => void;
  min?: number;
  max?: number;
  default?: number;
}

export const CustomSlider: FC<CustomSliderProps> = memo(
  ({ title, setParamter, min = 0, max = 1, default: defaultValue = 1 }) => {
    const [sliderValue, setSliderValue] = useState(defaultValue);
    const handleOnChangeTrack = (value: number) => {
      setSliderValue(value);
      setParamter(value);
    };

    return (
      <Stack w="100%">
        <VStack spacing={3}>
          <HStack w="200px">
            <Text>{title}</Text>
            <Spacer />
            <Tag>
              <TagLabel>{sliderValue}</TagLabel>
            </Tag>
          </HStack>
          <Slider
            defaultValue={defaultValue}
            step={0.01}
            min={min}
            max={max}
            onChange={handleOnChangeTrack}
            colorScheme="green"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderMark
              value={sliderValue}
              textAlign={'center'}
              bg-color={'green.400'}
              m="-35px 0 0 -50px"
              w="100px"
            />

            <SliderThumb />
          </Slider>
        </VStack>
      </Stack>
    );
  }
);
