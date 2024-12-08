export const convertDateFormat = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options).replace(",", "");
};

export const extractAndFormatDate = (url: string): string => {
  const date = url?.split("-")?.[1]?.split(".")?.[0];
  if (date) {
    const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
    return convertDateFormat(formattedDate);
  }
  return " ";
};

export const parseDate = (dateString: string): Date => new Date(dateString);

export const addMonths = (dateStr: string, n: number) => {
  const dateObj = new Date(dateStr);
  dateObj.setMonth(dateObj.getMonth() + n);
  return dateObj.toISOString().split("T")[0];
};

export const getLatestYearQuarterOnAV = (
  fiscalDateEnding: string,
  yearEnding: string,
) => {
  const currentYear = new Date().getFullYear();
  const monthNumber = new Date(`${yearEnding} 1, ${currentYear}`).getMonth() + 1;
  const lastDay = new Date(currentYear, monthNumber, 0).getDate();
  const yearEndingDate = `${currentYear}-${String(monthNumber).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  const d1 = new Date(yearEndingDate);
  const d2 = new Date(fiscalDateEnding);
  const delta = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
  const thisYear = new Date().getFullYear();

  if (delta >= 260 && delta <= 280) {
    return [3, thisYear + 1];
  } else if (delta >= 170 && delta <= 190) {
    return [2, thisYear + 1];
  } else if (delta >= 80 && delta <= 100) {
    return [1, thisYear + 1];
  } else if (delta >= -10 && delta <= 10) {
    return [4, thisYear];
  } else if (delta >= -100 && delta <= -80) {
    return [3, thisYear];
  } else if (delta >= -190 && delta <= -170) {
    return [2, thisYear];
  } else if (delta >= -280 && delta <= -260) {
    return [1, thisYear];
  } else if (delta >= -370 && delta <= -350) {
    return [4, thisYear - 1];
  }
  throw new Error("Invalid date range");
};
