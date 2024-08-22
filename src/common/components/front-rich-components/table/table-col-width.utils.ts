/*
How this size calculation works {}:

If no width instructions {} are provided, all columns occupy the same space and scale equally.

If instructions are provided that sum to 100% {50,30,20}, each column takes up and scales by that percentage.

If instructions are provided that exceed 100% {80,30,20}: Now 100% is equivalent to 130%, and the columns behave the same as the previous example.

If instructions are provided that are less than 100% {50,20,15}: The remaining 15% is divided equally among the columns, adding 5% to each one.

Now let's talk about null values, which can be indicated with a 0, '', or .

If the values sum to 100% or more, any column with a 0 will not be displayed.

If the values are less than 100%, the number of columns with a null value is calculated, and the remaining percentage is divided among them {50,20,10,,}. Each would receive 10%.

* --> mean take all remaining space avialable
*/

const calculateTotalWidth = (widthRow: string[]): number => {
  return widthRow.reduce((acc, width) => acc + parseInt(width), 0);
};

const calculateColumnsWithZeroWidth = (widthRow: string[]): number => {
  return widthRow.filter(width => width === '0').length;
};

export const calculateCellWidths = (
  restrictedWidth: number,
  columnCount: number,
  widthRow: string[] | false
): number[] => {
  const cellWidths: number[] = [];
  if (widthRow) {
    const remainingWidth = 100 - calculateTotalWidth(widthRow);
    // The percentages sum to 100% or more
    if (remainingWidth <= 0) {
      for (let i = 0; i < columnCount; i++) {
        cellWidths.push((restrictedWidth * parseInt(widthRow[i])) / 100);
      }
    }
    // The percentages sum to less than 100%
    else if (remainingWidth > 0) {
      // No columns have a width of 0; the remaining width is divided among all columns
      if (calculateColumnsWithZeroWidth(widthRow) === 0) {
        const remainWidthCol =
          (remainingWidth * restrictedWidth) / 100 / columnCount; // Divide el ancho restante entre el número de columnas
        for (let i = 0; i < columnCount; i++) {
          cellWidths.push(
            (restrictedWidth * parseInt(widthRow[i])) / 100 + remainWidthCol
          );
        }
      }
      // There are columns with a width of 0; the remaining width is divided among those columns
      else {
        for (let i = 0; i < columnCount; i++) {
          if (widthRow[i] === '0') {
            cellWidths.push(
              (restrictedWidth * remainingWidth) /
                calculateColumnsWithZeroWidth(widthRow) /
                100
            );
          } else {
            cellWidths.push((restrictedWidth * parseInt(widthRow[i])) / 100);
          }
        }
      }
    }
  }
  // No width row present
  else {
    for (let i = 0; i < columnCount; i++) {
      cellWidths.push(restrictedWidth / columnCount);
    }
  }
  return cellWidths;
};
