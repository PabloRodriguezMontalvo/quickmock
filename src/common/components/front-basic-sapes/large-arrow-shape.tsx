import { Group, Path } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';

const LargeArrowShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 100,
};

const LARGE_ARROW_FIX_WIDTH = 100;
const LARGE_ARROW_FIX_HEIGHT = 100;

const pathData = `M10,35 L200,35 L200,15 L300,50 L200,85 L200,65 L10,65 Z`;

const shapeType: ShapeType = 'largeArrow';

export const getLargeArrowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  LargeArrowShapeSizeRestrictions;
export const LargeArrowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      LargeArrowShapeSizeRestrictions,
      width,
      height
    );

  const scaleX = useMemo(() => {
    return restrictedWidth / LARGE_ARROW_FIX_WIDTH;
  }, [restrictedWidth]);

  const scaleY = useMemo(() => {
    return restrictedHeight / LARGE_ARROW_FIX_HEIGHT;
  }, [restrictedHeight]);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, fill, strokeStyle } = useShapeProps(otherProps, BASIC_SHAPE);

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
      <Group
        width={LARGE_ARROW_FIX_WIDTH}
        height={LARGE_ARROW_FIX_HEIGHT}
        scaleX={scaleX}
        scaleY={scaleY}
      >
        <Path
          data={pathData}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
        />
      </Group>
    </Group>
  );
});
