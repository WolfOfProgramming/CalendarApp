import React, { Fragment } from 'react';
import clsx from 'clsx';

import AppointmentsItem from './AppointmentsItem';
import { getAppointmentsFor } from '../../utils/appointment';
import { useSelectedDayState } from '../../context/selected-day-context';
import { useAppointmentsState } from '../../context/appointments-context';
import { useIsLightTheme } from '../../context/theme-context';

export default function AppointmentsForSelectedDay() {
  const appointments = useAppointmentsState();
  const selectedDay = useSelectedDayState();
  const appointmentsForSelectedDay = getAppointmentsFor(
    appointments,
    selectedDay
  );
  const isLightTheme = useIsLightTheme();

  return (
    <Fragment>
      {appointmentsForSelectedDay.length > 0 ? (
        <ul
          className={clsx(
            'overflow-y-auto px-3 pt-1 pb-5 border-t-2',
            isLightTheme ? 'border-gray-200' : 'border-gray-700'
          )}
        >
          {appointmentsForSelectedDay.map((appointment) => (
            <AppointmentsItem key={appointment.id} appointment={appointment} />
          ))}
        </ul>
      ) : (
        <span
          className={clsx(
            'inline-block w-full px-3 py-5 text-center text-lg border-t-2',
            isLightTheme
              ? 'border-gray-200 text-gray-600'
              : 'border-gray-700 text-white'
          )}
        >
          You have no scheduled appointments
        </span>
      )}
    </Fragment>
  );
}
