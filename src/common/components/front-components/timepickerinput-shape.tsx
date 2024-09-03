import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { BASIC_SHAPE, INPUT_SHAPE } from './shape.const';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

const shapeType: ShapeType = 'timepickerinput';

export const getTimepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => timepickerInputShapeRestrictions;

export const TimepickerInputShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
      props;
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        timepickerInputShapeRestrictions,
        width,
        height
      );

    const separatorPadding = 3; // Extra padding for spacers
    const separator1X = restrictedWidth / 3;
    const separator2X = (2 * restrictedWidth) / 3;

    const stroke = useMemo(
      () => otherProps?.stroke ?? 'black',
      [otherProps?.stroke]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );

    const strokeStyle = useMemo(
      () => otherProps?.strokeStyle ?? [],
      [otherProps?.strokeStyle]
    );

    const borderRadius = useMemo(() => {
      const radius = Number(otherProps?.borderRadius);
      return isNaN(radius) ? INPUT_SHAPE.DEFAULT_CORNER_RADIUS : radius;
    }, [otherProps?.borderRadius]);

    const { handleSelection } = useShapeComponentSelection(props, shapeType);

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={handleSelection}
      >
        {/* input frame */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
          fill={fill}
        />

        {/* Separators : */}
        <Text
          x={separator1X - 10}
          y={restrictedHeight / separatorPadding}
          text=":"
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={20}
          fill={stroke}
        />
        <Text
          x={separator2X - 10}
          y={restrictedHeight / separatorPadding}
          text=":"
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={20}
          fill={stroke}
        />
      </Group>
    );
  }
);
