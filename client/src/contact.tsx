import React from 'react';
import type { Contact } from './global';

export default function HomeProducts(props: Contact): JSX.Element {
  return (
    <div>
      <div>
        <img src={props.img} />
        <h3>{props.title}</h3>
        <h3>{props.price}</h3>
      </div>
    </div>
  );
}
