'use client';

import * as React from 'react';
import Slider from '@mui/material/Slider';

const CustomSlider = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof Slider>
>(({ className, ...props }, ref) => (
  <Slider
    ref={ref}
    className={`w-full ${className}`}
    sx={{
      color: 'black',
      '& .MuiSlider-thumb': {
        backgroundColor: 'white',
        border: '1px solid gray',
      },
      '& .MuiSlider-track': {
        backgroundColor: 'black',
      },
      '& .MuiSlider-rail': {
        backgroundColor: '#e5e7eb',
      },
    }}
    {...props}
  />
));

CustomSlider.displayName = 'CustomSlider';

export { CustomSlider };
