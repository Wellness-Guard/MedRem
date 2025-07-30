import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import messaging from '@react-native-firebase/messaging';
const NotificationController = () => {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      messaging()
        .getToken()
        .then((token: string) => {
          console.log('Token', token);
        });
    }
  }, [isLoggedIn]);
};

export default NotificationController;
