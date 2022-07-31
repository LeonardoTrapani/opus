import { Request, Response, NextFunction } from 'express';
import {
  areThereExpressValidatorErrors,
  throwResponseError,
} from '../utilities';

import { prisma } from '../app';

export const createHomework = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (areThereExpressValidatorErrors(req, res)) {
    return;
  }
  const { userId } = req;
  let {
    name,
    subject,
    homeworkDuration,
    description,
    expirationDate,
    plannedDate,
  } = req.body;
  try {
    const homework = await prisma.homework.create({
      data: {
        duration: homeworkDuration,
        expirationDate,
        name,
        description,
        subject,
        plannedDate,
        userId: +userId!,
      },
      select: {
        name: true,
        completed: true,
        duration: true,
        plannedDate: true,
        description: true,
        expirationDate: true,
        subject: true,
      },
    });
    res.json(homework);
  } catch (err) {
    throwResponseError('unable to create homework', 500, res);
  }
};

export const getAllHomework = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = +req.userId!;
  const homework = await prisma.homework.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      subject: true,
      expirationDate: true,
      plannedDate: true,
      duration: true,
      completed: true,
    },
  });
  res.json(homework);
};

const DAYS_PER_PAGE = 7;
export const calculateFreeDays = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (areThereExpressValidatorErrors(req, res)) {
    return;
  }
  const { expirationDate, duration: homeworkDuration } = req.body;
  const { pageNumber } = req.params;
  const expirationDateDate = new Date(expirationDate);

  let currentDate = addDaysFromToday(
    +pageNumber * DAYS_PER_PAGE - DAYS_PER_PAGE
  );

  const { userId } = req;
  try {
    const week = await prisma.week.findUnique({
      where: {
        userId: +userId!,
      },
      select: {
        id: true,
        mondayFreeMinutes: true,
        tuesdayFreeMinutes: true,
        wednesdayFreeMinutes: true,
        thursdayFreeMinutes: true,
        fridayFreeMinutes: true,
        saturdayFreeMinutes: true,
        sundayFreeMinutes: true,
      },
    });
    if (!week) {
      return throwResponseError(
        'please define your usual week before creating any homework',
        400,
        res
      );
    }

    const freeDays = await prisma.user.findUnique({
      where: {
        id: +userId!,
      },
      select: {
        days: {
          select: {
            date: true,
            freeMinutes: true,
          },
          where: {
            freeMinutes: {
              gte: +homeworkDuration,
            },
          },
        },
      },
    });

    if (!freeDays) {
      return throwResponseError(
        "an error has occurred: can't find free days",
        400,
        res
      );
    }
    console.log('FREE DAYS: ', freeDays.days);
    const finalFreeDays: {
      date: Date;
      freeMinutes: number;
    }[] = [];

    while (
      finalFreeDays.length < DAYS_PER_PAGE &&
      currentDate < expirationDateDate
    ) {
      const freeMinutes = findfreeMinutesInDay(currentDate, week);
      const freeDayToPut = freeDays.days.find((day) => {
        return day.date.toDateString() === currentDate.toDateString();
      });
      if (freeDayToPut) {
        finalFreeDays.push(freeDayToPut);
      } else if (freeMinutes > homeworkDuration) {
        finalFreeDays.push({
          date: currentDate,
          freeMinutes,
        });
      }
      currentDate = addDays(currentDate, 1);
    }
    return res.json(finalFreeDays);
  } catch (err) {
    console.log(err);
    return throwResponseError(
      'an error has occurred finding the free hours',
      400,
      res
    );
  }
};

const findfreeMinutesInDay = (
  date: Date,
  week: {
    id: number;
    mondayFreeMinutes: number;
    tuesdayFreeMinutes: number;
    wednesdayFreeMinutes: number;
    thursdayFreeMinutes: number;
    fridayFreeMinutes: number;
    saturdayFreeMinutes: number;
    sundayFreeMinutes: number;
  }
) => {
  const dayOfTheWeek = date.getDay();
  switch (dayOfTheWeek) {
    case 0: {
      return week.sundayFreeMinutes;
    }
    case 1: {
      return week.mondayFreeMinutes;
    }
    case 2: {
      return week.tuesdayFreeMinutes;
    }
    case 3: {
      return week.wednesdayFreeMinutes;
    }
    case 4: {
      return week.thursdayFreeMinutes;
    }
    case 5: {
      return week.fridayFreeMinutes;
    }
    case 6: {
      return week.saturdayFreeMinutes;
    }
  }
  return 0;
};

const addDaysFromToday = (daysToAdd: number) => {
  return addDays(new Date(Date.now()), daysToAdd);
};

const addDays = (from: Date, daysToAdd: number) => {
  let result = new Date(from);
  result.setDate(result.getDate() + daysToAdd);
  return result;
};
