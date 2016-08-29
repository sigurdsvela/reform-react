/* @flow */
import React from 'react';


type DefaultProps = {

}

export type Props = {
    value: string;
    validation: null|Error[];
    onChange: (value: string) => void;
    onClick: () => void;
}


export
default
/* abstract */
class ReformInputComponent<DPT: DefaultProps, PT: Props, ST> extends React.Component<DPT, PT, ST> {
    static defaultProps: DPT = {};
    props: PT;
    state: ST;
}
