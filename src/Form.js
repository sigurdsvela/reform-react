import React, { Component } from 'react';

type Theme = {
    props: Array<{
        /**
         * Name of the package where the input to
         * set default props for is located.
         */
        package: string;

        /**
         * The name of the input to set default props for
         */
        name: string;

        /**
         * Default props
         * @type {[type]}
         */
        props: Object;
    }>
}

type DefaultProps = {
    theme: null;
}

type Props = {
    theme: Theme|'global'|null;
}

/**
 *
 */
class Form extends Component<DefaultProps, Props, State> {
    static defaultProps = {
        theme: null,
    }

    construct(props) {

    }

    render() {

    }
}
