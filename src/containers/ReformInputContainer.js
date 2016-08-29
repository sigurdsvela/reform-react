/* @flow */
import React, { Component } from 'react';
//import { Props as ReformComponentProps } from './ReformComponent'

type DefaultProps = void;
type State = void;
type Props = {
    inputProps: InputProps;
    wrapperInput: Class<Component<>>;
}

export class ReformInputContainer extends Component<DefaultProps, Props, State> {
    __HOW_REFORM_CONTAINER_REGONIZES_INPUS__ = 1;

    constructor(props) {
        super(props);
    }

    /**
     * Returns the closest FormContainer, which owns this input
     *
     * @return The form container
     */
    getFormContainer() {

    }

    componentDidMount() {

    }

    getProps() {

    }

    /**
     *
     */
    render() {
        const WrappedInput = this.props.wrapperInput;

        return (
            <WrappedInput {...this.getProps()} />
        )
    }
}

export const reformContainer = (Component: Class<Component<>>) => {
    return (props: InputProps) => {
        const Container = props.__refromContainer || ReformInputContainer;
        return (<Container
            inputProps={props}
            component={Component}
        />);
    };
};
