import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { BACKEND_URL } from '../utilities/contants';
import { CustomRequestInit } from '../utilities/hooks';
import { datesEqualOnDay } from '../utilities/utilities';

export interface freeDay {
  date: string;
  freeMinutes: number;
  assignedTime: number;
}

export interface plannedDate {
  date: string;
  minutes: number;
}
interface HomeworkCreating {
  name: string;
  subject: string;
  description: string;
  duration: number;
  timeToAssign: number;
  isAllTimeAssigned: false;
  expirationDate: string;
}
interface createHomeworkState {
  isLoading: boolean;
  freeDays: freeDay[];
  selectedDays: freeDay[];
  isChoosingFreeDay: boolean;
  homeworkCreating?: HomeworkCreating;
}

const initialState: createHomeworkState = {
  isLoading: false,
  isChoosingFreeDay: false,
  freeDays: [],
  selectedDays: [],
};
const createHomeworkSlice = createSlice({
  name: 'createHomework',
  initialState,
  reducers: {
    setFreeDays(state, action: PayloadAction<freeDay[]>) {
      const { selectedDays } = state;
      const freeDays = action.payload;
      const selectedDaysToDeleteIndexes = [];

      for (let i = 0; i < selectedDays.length; i++) {
        for (let j = 0; j < freeDays.length; j++) {
          if (datesEqualOnDay(selectedDays[i].date, freeDays[j].date)) {
            if (selectedDays[i].freeMinutes === freeDays[j].freeMinutes) {
              freeDays[j] = selectedDays[i];
            } else {
              selectedDaysToDeleteIndexes.push(i);
              freeDays[j].assignedTime = 0;
            }
          }
        }
      }

      selectedDaysToDeleteIndexes.forEach((i) => {
        selectedDays.splice(i, 1);
      });

      state.freeDays = freeDays;
    },
    setHomeworkCreating(state, action: PayloadAction<HomeworkCreating>) {
      state.isChoosingFreeDay = true;
      state.homeworkCreating = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsChoosingFreeDay(state, action: PayloadAction<boolean>) {
      state.isChoosingFreeDay = action.payload;
    },
    assignedTimeChange(
      state,
      action: PayloadAction<{
        assignedTime: number;
        freeDay: freeDay;
      }>
    ) {
      if (!state.homeworkCreating) {
        return;
      }
      const freeDayIndex = state.freeDays.findIndex((freeDay) =>
        datesEqualOnDay(action.payload.freeDay.date, freeDay.date)
      );
      const selectedDaysIndex = state.selectedDays.findIndex((freeDay) =>
        datesEqualOnDay(action.payload.freeDay.date, freeDay.date)
      );

      const existsOnSelectedDays = (i: number) => {
        if (i === -1) {
          return false;
        }
        return true;
      };

      if (freeDayIndex === -1) {
        console.error("can't find day");
        return;
      }
      const previousAssignedTime = state.freeDays[freeDayIndex].assignedTime;
      const assignedTimeDifference =
        action.payload.assignedTime - previousAssignedTime;
      let timeToAssign =
        state.homeworkCreating.timeToAssign - assignedTimeDifference;

      if (timeToAssign < 0) {
        action.payload.assignedTime += timeToAssign;
        timeToAssign = 0;
      }
      state.homeworkCreating.timeToAssign = timeToAssign;

      if (freeDayIndex === -1) {
        return console.error('free day not found');
      }

      state.freeDays[freeDayIndex].assignedTime = action.payload.assignedTime;

      const freeDayWithUpdatedAssignedTime = {
        ...action.payload.freeDay,
        assignedTime: action.payload.assignedTime,
      };
      if (!existsOnSelectedDays(selectedDaysIndex)) {
        state.selectedDays.push(freeDayWithUpdatedAssignedTime);
        return;
      }
      if (action.payload.assignedTime === 0) {
        state.selectedDays.splice(selectedDaysIndex, 1);
        return;
      }
      state.selectedDays[selectedDaysIndex] = freeDayWithUpdatedAssignedTime;
    },
  },
});

export const searchFreeDays = (
  options: {
    expirationDateValue: string;
    durationValue: number;
    page: number;
  },
  fetchAuthorized: () => (
    url: string,
    options?: CustomRequestInit | undefined
  ) => Promise<freeDay[]>
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createHomeworkActions.setLoading(true));

      const res = await fetchAuthorized()(
        BACKEND_URL + '/homework/freeDays/' + options.page,
        {
          method: 'POST',
          requestBody: {
            expirationDate: options.expirationDateValue,
            duration: options.durationValue,
          },
        }
      );
      const freeDays = res.map((freeDay) => {
        const freeDayModified = { ...freeDay, assignedTime: 0 };
        return freeDayModified;
      });
      dispatch(createHomeworkActions.setFreeDays(freeDays));
    } catch (err) {
      //TODO: handle err
    } finally {
      dispatch(createHomeworkActions.setLoading(false));
    }
  };
};

export default createHomeworkSlice;
export const createHomeworkActions = createHomeworkSlice.actions;
