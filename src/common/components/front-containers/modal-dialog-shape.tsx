import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const modalDialogShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 250,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 300,
};

export const getModalDialogShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  modalDialogShapeSizeRestrictions;

const shapeType: ShapeType = 'modalDialog';

export const ModalDialogContainer = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, ...shapeProps } = props;
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        modalDialogShapeSizeRestrictions,
        width,
        height
      );

    const titleBarHeight = 50;

    const { handleSelection } = useShapeComponentSelection(props, shapeType);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={handleSelection}
      >
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* HeaderBar */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={titleBarHeight}
          stroke="black"
          strokeWidth={2}
          fill="lightgray"
        />

        {/* (X) */}
        <Group x={restrictedWidth - 40} y={10}>
          <Rect
            width={30}
            height={30}
            fill="white"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={8}
            y={8}
            text="X"
            fontFamily="Arial"
            fontSize={18}
            fill="black"
          />
        </Group>
      </Group>
    );
  }
);

export default ModalDialogContainer;
