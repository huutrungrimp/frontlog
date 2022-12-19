import * as React from 'react';

import Menu4Mobile from './Menu4Mobile';
import Menu4Desktop from './Menu4Desktop';
import { User } from '../../interface';

export default function MenuMain({ username }: User) {
    return (
        <div className='gx-0 position-fixed'>
            <div className='menu4Desktop gx-0'>
                <Menu4Mobile username={username}  />
            </div>
            <div className='menu4Mobile gx-0'>
                <Menu4Desktop username={username}  />
            </div>
        </div>

    );
}