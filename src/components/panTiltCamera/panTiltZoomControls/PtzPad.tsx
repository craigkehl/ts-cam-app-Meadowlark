import React, {
  useReducer,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { move } from "../../../services/cam-http-requests";
import classes from "./PtzPad.module.css";

type TwoDimensionSliderProps = {
  className?: string;
  xMax: string;
  yMax: string;
  resolution: number;
};

type State = {
  x: number;
  y: number;
  isPointerDown: boolean;
}

type Action = {
  type: string;
  payload?: {
    x: number;
    y: number;
  }
}

function TwoDimensionSlider(props: TwoDimensionSliderProps) {
  const [state, dispatch] = useReducer((state: State, action: Action): State => {
    switch (action.type) {
      case "SET_POINTER_DOWN":
        return { ...state, isPointerDown: true }
      case "SET_POINTER_UP":
        return {
          ...state,
          isPointerDown: false,
          x: 0,
          y: 0,
        }
      case "SET_RATE":
        if (action && action.payload) {
        return {
          ...state,
          x: action.payload.x,
          y: action.payload.y,
          }
        }
        return state
      default:
        return state
    }
  }, {
    x: 0,
    y: 0,
    isPointerDown: false,
  })

  /**
   * Calculates the maximum value for the x-axis based on the given parameters.
   *
   * @param xMax - The maximum available velocity steps on the x-axis supported.
   * @param resolution - The percentage of the maximum values from 0 to 100.
   * @returns The an adjusted maximum value for the x-axis.
   */
  const xMaxSteps = (parseInt(props.xMax) * props.resolution) || 24;
  const yMaxSteps = (parseInt(props.yMax) * props.resolution) || 20;

  const divRef = useRef<HTMLDivElement>(null);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dispatch({ type: "SET_POINTER_DOWN" })
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dispatch({ type: "SET_POINTER_UP" })
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
   
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (state.isPointerDown) {
      // Calculate x and y coordinates based on the pointer position
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const xRange = xMaxSteps * 2; // including negative values
      const yRange = yMaxSteps * 2;
      const xScale = xRange / width;
      const yScale = yRange / height;
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      const centerX = width / 2;
      const centerY = height / 2;
      const xPosition = (mouseX - centerX) * xScale;
      const yPosition = (centerY - mouseY) * yScale
      const xValue = xPosition > 0 ? Math.floor(xPosition) : Math.ceil(xPosition);
      const yValue = yPosition > 0 ? Math.floor(yPosition) : Math.ceil(yPosition);
      console.log(` x-range: ${xRange}, y-range: ${yRange}, x-Scale: ${xScale}, y-scale: ${yScale} \n x-val: ${xValue}, y-val: ${yValue}`);

      // Check that the value is within the Max boundary
      const xValueBounded = (xValue > xMaxSteps) ? xMaxSteps :
        (xValue < xMaxSteps * -1) ? xMaxSteps * -1 : xValue;
      
      const yValueBounded = (yValue > yMaxSteps) ? yMaxSteps :
        (yValue < yMaxSteps * -1) ? yMaxSteps * -1 : yValue;
      
      if (state.x !== xValueBounded || state.y !== yValueBounded) {
        dispatch({
          type: "SET_RATE",
          payload: {
            x: Number(xValueBounded),
            y: Number(yValueBounded * -1),
          }
        })
      }
    }
  }, [state.isPointerDown, state.x, state.y, xMaxSteps, yMaxSteps]);

  useEffect(() => {
    move(
      (state.x / props.resolution).toFixed(0),
      (state.y / props.resolution).toFixed(0)
    );
  }, [state.x, state.y, props.resolution]);

  return (
    <React.StrictMode>
      <div
        className={classes.dblSlider}
        ref={divRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerUp}
      />
    </React.StrictMode>
  );
};

export default React.memo(TwoDimensionSlider);
