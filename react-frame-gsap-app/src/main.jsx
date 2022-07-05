import {createRoot} from 'react-dom/client';
import {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import gsap, {Linear} from 'gsap';
import {css, cx} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';
import {Button, Slider} from '@mui/material';
import * as d3 from 'd3';
import {range} from 'mathjs';
import {useDwitterFrame} from './hooks/useDwitterFrame';
import {MathUtils} from 'three';
import {wrap} from 'popmotion';
import {useTransition, animated} from 'react-spring';
import {transform} from 'framer-motion';

import {samples} from 'culori';

const frame = 60;

const xRange = [-100, 100];

const offsetX = Math.max(...xRange);

const xList = samples(30).map((t) => {
  return transform([0, 1], [...xRange])(t);
});

const cowboyList = xList.map((x) => {
  return ({t}) => {
    return {
      x: x,
      // y: 10 * MathUtils.smoothstep(Math.cos(x + t), 0, 0.9),
      y: 10 * Math.cos(x + t),
    };
  };
});

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [time, setTime] = useState(0);
  const [tik, setTik] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);

  const [pointList, setPointList] = useState([]);

  const cowboy = useCallback(
    (fList) => {
      const time = {t: 0};
      gsap.to(time, {
        t: frame,
        ease: Linear.easeInOut,
        duration,
        onUpdate: (instance) => {
          // const t = transform([0, frame], [0, duration])(time.t);
          // console.log(time.t);
          // setProgress(time.t);
          setPointList(
            fList.map((f) => {
              return f({t: time.t});
            })
          );
        },
      });
    },
    [duration]
  );

  useEffect(() => {
    if (!tik) {
      return;
    }
    cowboy(cowboyList);
  }, [tik]);

  const handleClick = (e) => {
    setTik(new Date());
  };

  const handleChange = (e) => {
    setDuration(e.target.value);
  };

  const handleResize = useCallback((e) => {
    if (window.matchMedia(`max-width: 768px`)) {
      setWidth(window.innerWidth * 0.65);
    } else {
      setWidth(400);
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
            margin: 0 auto;
            max-width: 30rem;
            width: 100%;
            display: flex;
            gap: 1rem;
            padding: 3rem;
            @media (max-width: 768px) {
              max-width: 100%;
            }
          `}
        >
          <Slider
            defaultValue={0}
            min={0}
            max={10}
            step={0.1}
            value={duration}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleChange}
          />
          <Button onClick={handleClick} variant={'outlined'}>
            {'Do'}
          </Button>
        </div>
      </div>
      <div
        className={css`
          position: relative;
          left: ${offsetX + 400}px;
        `}
      >
        {pointList.map((point, index) => {
          const {x, y} = point;
          return (
            <div
              key={index}
              className={css`
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                transform: translate(-50%, -50%);
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: red;
              `}
            />
          );
        })}
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
