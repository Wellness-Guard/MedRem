import {useState} from 'react';
export const useToggle = (): [boolean, () => void] => {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);
  return [visible, toggle];
};
