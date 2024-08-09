// @flow Copyright © 2022 G2 Tech, All Rights Reserved
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function navigateBack() {
    navigationRef.current?.goBack();
}
