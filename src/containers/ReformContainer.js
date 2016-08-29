/* @flow */
import React from 'react';
import HackUtils from "src/std/HackUtils";
import _ from 'lodash';

export type ReactTreePath = number[];

class ElementReferenceError extends Error {}

/**
 * Holds a reference to an element in the react tree.
 */
class ElementReference {
    root: React$Element<>;
    path: ReactTreePath;

    /**
     * Takes an element, and gets the child and the index given.
     *
     * If an element has only one child (not an array) it will be treaded
     * as an array with one element, and will throw "out of bounds" if the index given is not 0,
     *
     * @throw Error If the index is less than 0, or greater than the length
     *              of the `.children` prop of the element given.
     * @return The element
     */
    static follow(element: React$Element<>, index: number) : React$Element<> {
        const children = element.props.children;

        if (Array.isArray(children)) {
            if (!children[index]) {
                throw new Error("Out of bounds");
            } else {
                return children[index];
            }
        } else {
            if (!index !== 0 || !children) {
                throw new Error("Out of bounds");
            } else {
                return children;
            }
        }
    }

    /**
     * Create a new element reference
     *
     * @param root - The root element from where the path starts
     * @param path - The tree path to the element
     */
    constructor(root: React$Element<>, path: ReactTreePath) {
        this.root = root;
        this.path = path;
    }

    getParent() {
        const pathLeft = this.path.slice(0, this.path.length - 2);
        let curElement: React$Element<> = this.root;

        while (pathLeft.length !== 0) {
            const children = curElement.props.chilren;
            const index = pathLeft[0];
            curElement = ElementReference.follow(curElement, index);
            pathLeft.shift();
        }

        return curElement;
    }

    get() {
        const parent = this.getParent();
        return ElementReference.follow(parent, this.path[this.path.length - 1]);
    }

    /**
     * Overrite the element that this instance references.
     *
     * Remember that props are NOT mutable, so the root element
     * must have been deep cloned, if not, react will throw an exeption.
     *
     * @param element - The new element
     * @return void
     */
    set(element: React$Element<>) {
        const parent = this.getParent();
        const index = this.path[this.path.length - 1];

        if (Array.isArray(parent.props.chilren)) {
            if (!parent.props.chilren[index]) {
                throw new ElementReferenceError(
                    `Could not resolve reference ${this.path.toLocaleString()}`
                );
            } else {
                parent.props.children[index] = element;
            }
        } else {
            if (!index !== 0 || !parent.props.chilren) {
                throw new ElementReferenceError(
                    `Could not resolve reference ${this.path.toLocaleString()}`
                );
            } else {
                parent.props.children = element;
            }
        }
    }
}

type DefaultProps = void;
type Props = {
    /**
     * Contained components
     */
    children: React$Element<>|React$Element<>[];
}
type State = void;

class FormContainer extends React.Component<DefaultProps, Props, State> {
    __HOW_REFORM_CONTAINER_REGONIZES_SELF__ = 1;

    constructor() {
        super(props);
    }

    isInput(element: React$Element<>) {
        if (element.__HOW_REFORM_CONTAINER_REGONIZES_INPUS__ !== 1) {
            return false;
        }
        return true;
    }

    /**
     * Check if an element is "within scope" for this container
     *
     * @param element - The element to Check
     *
     * @return True if the element is within scope, false otherwise
     */
    isInScope(element: React$Element<>) {
        // Check if there are any children, if not, this element CANT be
        // in scope anyway
        if (!this.props.childen) return false;

        // Check if any random child has the same OWNER as the element
        // Mening they where created in the same component.
        const { children } = this.props;
        const child = Array.isArray(children) ? children[0] : children;
        const childOwnerInstance = HackUtils.getElementOwnerInstance(child);
        const elementOwnerInstance = HackUtils.getElementOwnerInstance(element);
        if (childOwnerInstance !== elementOwnerInstance) return false;

        // Find the closest FormContainer parent, if the closest is this one,
        // we have an element in scope.
        // If the closest is not this one, well, then this element is in
        // scope of that other form container.
        let closestFormContainer = child;
        while (!(HackUtils.getElementInstance(closestFormContainer) instanceof FormContainer)) {
            closestFormContainer = HackUtils.getElementParent(closestFormContainer);
        }

        if (HackUtils.getElementInstance(closestFormContainer) !== this) return false;

        return true;
    }

    /**
     * Finds the inputs in a React$Element 'tree'
     *
     * The root node(s) are|is passed as the parameters,
     * them, and their children, and so on are checked to
     * find all inputs in the scope of this reform container.
     *
     *
     */
    findInputElements(elements: null|React$Element<>|React$Element<>[] = null): React$Element[] {
        if (elements === null) {
            elements = this.props.children;
        }

        elements = Array.isArray(elements) ? elements : [elements];

        if (elements.length === 0) {
            return [];
        }

        const flatten = function flatten(items) {
          const flat = [];

          items.forEach(item => {
            if (Array.isArray(item)) {
              flat.push(...flatten(item));
            } else {
              flat.push(item);
            }
          });

          return flat;
        }

        // Filter any element not in scope
        elements = elements.filter(this.isInScope);

        // Find direct inputs
        const directInputs = elements.filter(element => this.isInput);

        // [Input1, Input2] List of sub(sub(sub(sub...))) inputs
        const subInputs = elements.map(element => this.findInputElements(element.props.children));

        // [ [ [...] Input ] ] List of arrays and string with array of any depth
        const allInputs = directInputs.concat(flatten(subInputs));

        return allInputs;
    }

    /**
     * Finds the "path" to all inputs in scope of this container
     *
     * A path is an array of numbers, where each number is it's
     * number in the child array of the current element.
     *
     * A
     */
    findInputPaths(elements: React$Element<>|React$Element<>[]): ReactTreePath {}

    /**
     * Returns the children, but where the props of inputs in
     * scopes have been mapped. This is how the form implements any and all feature.
     */
    getChildren() {
        const children = _.cloneDeep(this.props.children); //TODO: Only clone relevant part
        const inputs = this.findInputPaths(elements)
            .map((path) => new ElementReference(children, path));

        inputs.forEach(input => {
            //
        })

        return chilren;
    }

    mapInputProps(element, elements) {
        const newProps = _.cloneDeep(element.props);

        const wrappWith = (f1, f2) => {
            return function(...params) {
                f1.apply(element, params);
                if (f2) f2.apply(element, params);
            }
        }

        newProps.onClick = wrappWith(this.handleInputClick, newProps.onClick);

    }

    handleInputClick() {

    }

    render() {
        this.findInputs();
    }
}
