// Async Validation
// Controll of validation.
//    - When, Might be required for validation involving the server)
//    - When to display
//    - Where to display | Custom 'ErrorOutlet tag or somethin'
// Statee Injection
//      - By not givign a value, the value of an input is handler in an internal state.
//      - By only giving a default value , the same is true but ....

/* @flow */
import React, { Component } from 'react';

type Dict<V> = { [key: string]: V };

type Parser<T> = (value: string) => T;
type Validator = (inputName: string, inputs: Dict<Input<any>>) => Error | null | Promise<Error|null>;

type EventHandler<EventType> = (event: EventType, inputName: string, inputs: Dict<Input<>>) => void;

// onScroll
type UIEvent = {
    detail: number;
    view: DOMAbstractView;
}

// onTouchStart onTouchEnd onTouchMove onTouchCancel
type TouchEvent = {
    altKey: boolean;
    changedTouches: DOMTouchList;
    ctrlKey: boolean;
    getModifierState: (key: string) => boolean;
    metaKey: boolean;
    shiftKey: boolean;
    targetTouches: DOMTouchList;
    touches: DOMTouchList;
}


// onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
// onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp
type MouseEvent = {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    getModifierState: (key: string) => boolean;
    metaKey: boolean;
    pageX: number;
    pageY: number;
    relatedTarget: DOMEventTarget;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
}

// onChange onInput onSubmit
type FormEvent = {}

// onChange(c:text|<textarea>)
type FormTextEvent = {
    value: string;
}

// onChange(c:checkbox|radio)
type FormCheckBoxRadioEvent = {
    checked: bool;
}

// onChange(c:<option>)
type FormOptionEvent = {
    selected: bool;
}

// onSelect
type SelectionEvent = {}

// onWheel
type WheelEvent = {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
}

// onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
// onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
// onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
// onTimeUpdate onVolumeChange onWaiting
type MediaEvent = {}

// onLoad onError
type ImageEvent = {}

// onAnimationStart onAnimationEnd onAnimationIteration
type AnimationEvent = {
    animationName: string;
    pseudoElement: string;
    elapsedTime: float;
}

// onTransitionEnd
type TransitionEvent = {
    propertyName: string;
    pseudoElement: string;
    elapsedTime: float;
}


type StdEvents = {
    // INPUT
    onChange?: EventHandler | EventHandler[];
    onFocus?: EventHandler | EventHandler[];
    onBlur?: EventHandler | EventHandler[];    // script	Fires the moment that the element loses focus
    onInput?: EventHandler | EventHandler[];   // script	Script to be run when an element gets user input
    onInvalid?: EventHandler | EventHandler[]; // script	Script to be run when an element is invalid
    onSelect?: EventHandler | EventHandler[];  // script	Fires after some text has been selected in an element

    // KEYBOARD
    onKeyUp?: EventHandler | EventHandler[];
    onKeyDown?: EventHandler | EventHandler[];

    // MOUSE
    onClick?: EventHandler | EventHandler[];
    onMouseDown?: EventHandler | EventHandler[];
    onMouseUp?: EventHandler | EventHandler[];
    onMouseDown?: EventHandler | EventHandler[];
    onMouseMove?: EventHandler | EventHandler[];
    onMouseOut?: EventHandler | EventHandler[];
    onMouseOver?: EventHandler | EventHandler[];
    onMouseUp?: EventHandler | EventHandler[];
    onMouseWheel?: EventHandler | EventHandler[];
    onScroll?: EventHandler | EventHandler[];
    onWheel?: EventHandler | EventHandler[];
    onDblClick?: EventHandler | EventHandler[];
    onDrag?: EventHandler | EventHandler[];
    onDragend?: EventHandler | EventHandler[];
    onDragenter?: EventHandler | EventHandler[];
    onDragleave?: EventHandler | EventHandler[];
    onDragover?: EventHandler | EventHandler[];
    onDragstart?: EventHandler | EventHandler[];
    onDrop?: EventHandler | EventHandler[];

    // TOUCH
    onTouchStart?: EventHandler | EventHandler[];
    onTouchMove?: EventHandler | EventHandler[];
    onTouchCancel?: EventHandler | EventHandler[];
    onTouchEnd?: EventHandler | EventHandler[];

    // CLIPBOARD
    onCopy?: EventHandler | EventHandler[];
    onCut?: EventHandler | EventHandler[];
    onPaste?: EventHandler | EventHandler[];
}


type InputProp<ValueType = string, InputType: InputComponent<ComponentStyles>> = {
    name: ValueType;
    type: InputType,
    value: string;
    validators: Validator[];
    runValidation?: bool; // = true
    displayValidationMessages: true;
    tabIndex?: number; // = -1;
    className?: string | null; // = null
    componentStyle: ComponentStyles;
    validationMessage: string;
} & StdEvents;

class InputData<ComponentStyles = any, InputType: InputComponent<ComponentStyles> = any> {
    _value: string;

    constructor(input: InputProp<InputType>) {}

    get value() : string { return this._value; }
    get isValid() : Promise<bool> {}

    get validation() : Promise<Error|null> {}
}

type State = void;
type DefaultProps = void;
type PropTypes = {
    onsubmit	script	Fires when a form is submitted
    onreset	script	Fires when the Reset button in a form is clicked
} & StdEvents;
class Form extends React.Component<DefaultProps, PropTypes, State> {
    /**
     * Returns a function taht can be given to the 'onChange' prop when rendering a form
     * to automatically update the values in to the state.
     *
     * ```
     * class FooView extends React.Component {
     *     render() {
     *         return (
     *             <Form onChange={Form.stateHandler({ component: this, stateField: myForm })}>
     *                 [...]
     *             </Form>
     *         );
     *     }
     * }
     * ```
     * > Notice that this will store the form data in the same way as Form.buildState(_:InputProp[])
     * > Does. In a object where the key is the input name, and the value is the value of the
     * > input.
     *
     * @prop params - The parameters
     * @prop params.component - The component where the state will be saved
     * @prop params.stateField - The field in the state where the state should be stored
     * @prop [params.ignore = []] - An array of the names of inputs that should not be saved
     *                              to the state by the returned function.
     *
     * @return {EventHandler} A event handler
     */
    static stateHandler({ component, stateField, ignore = [] } : { component: Component<any, any, any>, stateField: string, ignore?: string[] }) : EventHandler {
        const ignoreInputSet = new Set(ignore);

        return function(inputName: string, inputs: Dict<Input<any>>) {
            if (!ignoreInputSet.has(inputName)) return;

            component.setState({
                [stateField]: inputs[inputName].value
            });
        }
    }

    static createState(inputs: { [key: string] : InputProp<> }) {
        const state = {};
        Object.keys(inputs).forEach(key => state[key] = input.value);
        return state;
    }

    handleInputChange(inputName: string, newValue: string) {

    }

    renderInput(input: InputProp) {
        return React.renderComponent(input.type, {
            value: input.value,
            onChange: (newValue: string) => this.handleInputChange(input.name, newValue),
        }, )
    }

    render() {

    }
}

type FormInputProps<Style, InputType> = InputProp<Style, InputType>;

type InputComponentProps<ComponentStyles> = {
    value: string;
    onChange: (value: string) => {};
    componentStyles: ComponentStyles;
}

class InputContainer<ValueType> {
    props: InputProp<ValueType>;

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(props.type, {
            name: props.name,
            value: props.value,
            tabIndex: props.tabIndex,
            className: props.className,
            componentStyle: props.componentStyle,
            validationMessage: props.validationMessage,
        }, null);
    }
}

function reformContainer(component: InputComponent<>) : InputComponent<>> {
    return function(props) {
        return (<InputContainer type={component} {...props} />)
    }
}
class InputComponent<ComponentStyles = any> extends React.Component<void, InputComponentProps<ComponentStyles>, void> {}
class Button extends InputComponent {}
class TextArea extends InputComponent {}
class TextInput extends InputComponent {}
class Checkbox extends InputComponent {}

class MyForm extends React.Component<void, void, { form: Object }> {
    static form = {
        title: {
            name: 'title',
            validators: [
                (name: string, inputs: Dict<Input<any>>) => inputs[name].value ? null : new Error('Name is required'),
            ],
            componentStyles: {

            }
        },
        saveButton: {
            name: 'saveButton',
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            form: Form.createState(MyForm.form),
        }
    }

    render() {
        return (
            <Form onChange={Form.stateHandler({ component: this, stateField: 'form'})}>
                <Form.Input type={TextInput} {...form.title} />
                <Form.Input type={Button} {...form.saveButton} />
            </Form>
        );
    }
}
