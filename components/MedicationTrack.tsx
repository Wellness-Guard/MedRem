import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {verticalScale, scale} from 'react-native-size-matters';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  GREY,
  GREEN,
  YELLOW,
  DANGER,
  LIGHT_GREY,
  THEMED_BLUE_COLOR,
} from '../constants/colors';
import Heading from './Heading';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle, faExpand} from '@fortawesome/free-solid-svg-icons';
import CalenderTile from './CalenderTile';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {getTracks} from '../store/thunkActions/trackAction';
import {resetTrack} from '../store/features/trackSlice';
import {Track} from '../global/types';
import {getDaysString} from '../utils';
import {SkypeIndicator} from 'react-native-indicators';

type MedicationTrackProps = {
  style?: object;
  medication_id: string;
  routines?: number;
};

const MedicationTrack = ({
  style,
  medication_id,
  routines,
}: MedicationTrackProps) => {
  const {loading, data, mapTrack} = useSelector(
    (state: RootState) => state.track,
  );
  // const [track, setTrack] = useState(new Map());
  const dispatch = useDispatch<AppDispatch>();
  const marked = useRef<String[]>([]);

  const options = [
    {
      text: 'Taken',
      color: GREEN,
    },
    {
      text: 'Incomplete',
      color: YELLOW,
    },
    {
      text: 'Missed',
      color: DANGER,
    },
  ];

  const fetchTracks = async () => {
    await dispatch(getTracks(medication_id));
  };
  useEffect(() => {
    fetchTracks();
    return () => {
      dispatch(resetTrack());
    };
  }, []);

  return (
    <View style={[style, styles.medication_track]}>
      <View style={styles.header}>
        <Heading styles={styles.track_heading} text="Medication Track" />
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faExpand}
            size={scale(22)}
            style={styles.expand}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <View style={styles.option_container}>
            {options.map(({text, color}) => {
              return (
                <View style={styles.option_tile}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    size={scale(15)}
                    color={color}
                  />
                  <Text style={styles.option_text}>{text}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.row_flex}>
            {loading ? (
              <SkypeIndicator
                style={styles.loading}
                color={THEMED_BLUE_COLOR}
              />
            ) : data.length > 0 && mapTrack ? (
              data.map(({date, taken, id}: Track) => {
                let formated = new Date(date).toISOString().split('T')[0];
                if (
                  mapTrack?.has(formated) &&
                  !marked.current.includes(formated)
                ) {
                  let value = mapTrack.get(formated);
                  marked.current.push(formated);
                  return (
                    <CalenderTile
                      key={id}
                      date={new Date(date).getUTCDate()}
                      status={value > 0 ? 'Taken' : 'Missed'}
                      day={getDaysString()[new Date(date).getUTCDay()]}
                    />
                  );
                }
              })
            ) : (
              <Text style={styles.noContent}>No Track</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MedicationTrack;

const styles = StyleSheet.create({
  medication_track: {
    minHeight: verticalScale(250),
    height: 'auto',
    width: scale(320),
    backgroundColor: WHITE_COLOR,
    shadowColor: PRIMARY_COLOR,
    borderRadius: scale(15),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: GREY,
    padding: scale(10),
    margin: scale(15),
  },
  track_heading: {
    fontSize: verticalScale(22),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  expand: {
    marginTop: verticalScale(5),
    marginRight: scale(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: GREY,
    height: verticalScale(40),
  },
  option_container: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  option_tile: {
    flexDirection: 'row',
    margin: scale(5),
  },
  option_text: {
    marginTop: verticalScale(-3),
    marginLeft: scale(5),
    fontSize: verticalScale(13),
    fontFamily: 'Poppins-Medium',
    color: PRIMARY_COLOR,
  },
  noContent: {
    color: LIGHT_GREY,
    textAlign: 'center',
    fontSize: verticalScale(14),
    paddingTop: '20%',
  },
  loading: {
    paddingTop: '10%',
  },
  calendar_tile: {
    flexDirection: 'row',
  },
  row_flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
