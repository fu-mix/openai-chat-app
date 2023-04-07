import {
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Box,
  Text,
  HStack,
  VStack,
  Tag,
  TagLabel,
  Flex,
  Stack,
  Spacer,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { useState } from 'react';

interface CustomSliderProps {
  title: string;
  setParamter: (parameter: number) => void;
}

export const CustomSlider: FC<CustomSliderProps> = ({ title, setParamter }) => {
  const [sliderValue, setSliderValue] = useState(0.5);
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
          defaultValue={0.5}
          step={0.1}
          min={0.0}
          max={1.0}
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
};
