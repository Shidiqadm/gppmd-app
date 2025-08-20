import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text } from '../atoms';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={error}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});

export default FormField;
