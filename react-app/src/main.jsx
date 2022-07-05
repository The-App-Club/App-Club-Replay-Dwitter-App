import {createRoot} from 'react-dom/client';
import {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {css, cx} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {range} from 'mathjs';
import {useDwitterFrame} from './hooks/useDwitterFrame';
import {MathUtils} from 'three';
import {wrap} from 'popmotion';
import {useTransition, animated} from 'react-spring';
import {transform} from 'framer-motion';

const App = () => {
  const [width, setWidth] = useState(350);
  const [pointList, setPointList] = useState([]);
  const [time, setTime] = useState(0);
  const xList = range(-5, 5, 1, true).toArray();

  const clampedX = useCallback(
    (x) => {
      return transform([-5, 5], [0, width])(x);
    },
    [width]
  );

  const cowboyList = xList.map((x) => {
    return useCallback(({t}) => {
      return {
        x: clampedX(x),
        y: 200 + 60 * MathUtils.smoothstep(Math.cos(x + t), 0, 0.9),
      };
    }, []);
  });

  const handleResize = useCallback((e) => {
    if (window.matchMedia(`max-width: 768px`)) {
      setWidth(window.innerWidth * 0.85);
    } else {
      setWidth(300);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTime = (e) => {
    setTime(Number(e.target.value));
  };

  useEffect(() => {
    console.log(time);
  }, [time]);

  return (
    <>
      <div
        className={css`
          max-width: 30rem;
          width: 100%;
          margin: 0 auto;
        `}
      >
        <div
          className={css`
            padding: 3rem;
          `}
        >
          <Slider
            min={0}
            max={60}
            step={0.0001}
            defaultValue={0}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleTime}
          />
        </div>
        <div
          className={css`
            position: relative;
            width: ${width}px;
            height: 100vh;
            margin: 0 auto;
          `}
        >
          {cowboyList.map((cowboy, index) => {
            const {x, y} = cowboy({t: time});
            return (
              <div
                key={index}
                className={css`
                  position: absolute;
                  top: ${y}px;
                  left: ${x}px;
                  transform: translate(-50%, -50%);
                  width: 10px;
                  height: 10px;
                  background-color: red;
                `}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
