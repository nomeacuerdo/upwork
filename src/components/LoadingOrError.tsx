import type { ReactElement } from 'react';
import { Properties } from '../types';

export default function LoadingOrError({ error }: Properties): ReactElement {
  return (
    <div className='loading'>
      {
        error
          ? (
            <h1>{error.message}</h1>
          )
          : (
            <img src='/paku.gif' height={20} alt='waka waka waka' />
          )
      }
    </div>
  )
}
