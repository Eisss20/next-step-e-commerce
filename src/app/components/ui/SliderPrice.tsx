'use client';

import * as React from 'react';
import Slider from '@mui/material/Slider';

const CustomSlider = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof Slider>
>(({ className, ...props }, ref) => (
  <Slider
    ref={ref}
    className={`w-full ${className}`} // กำหนดให้เต็มความกว้าง
    sx={{
      color: 'black', // เปลี่ยนสีแถบ Slider เป็นสีดำ
      '& .MuiSlider-thumb': {
        backgroundColor: 'white', // ปรับให้ตัว Thumb เป็นสีขาว
        border: '1px solid gray',
      },
      '& .MuiSlider-track': {
        backgroundColor: 'black', // เปลี่ยนสีแถบ track เป็นสีดำ
      },
      '& .MuiSlider-rail': {
        backgroundColor: '#e5e7eb', // ปรับสี rail เป็นสีเทา (gray-200)
      },
    }}
    {...props}
  />
));

CustomSlider.displayName = 'CustomSlider';

export { CustomSlider };
