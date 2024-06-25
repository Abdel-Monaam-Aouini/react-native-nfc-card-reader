import React, {forwardRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {cn} from '../utils';

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  label: string;
  labelClasses?: string;
}

const Button = forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>((props, ref) => {
  const {label, labelClasses, className, ...rest} = props;

  return (
    <TouchableOpacity ref={ref} className={cn(className)} {...rest}>
      <Text className={cn(className, labelClasses)}>{label}</Text>
    </TouchableOpacity>
  );
});

export default Button;
