import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { next } from '../../reducers/main';
import styles from './styles.scoped.css';

export default function Main() {
  const dispatch = useDispatch();
  const { idx, subtitles } = useSelector(s => s.main);

  const onClick = () => {
    dispatch(next(idx + 1));
  };

  return (
    <main className={styles.root}>
      <div>
        <h1>Hello World</h1>
        <p>{subtitles[idx]}</p>
        <button onClick={onClick}>next</button>
      </div>
    </main>
  );
}
