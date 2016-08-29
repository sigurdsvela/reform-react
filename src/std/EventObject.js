export type Event = {

};

export type UIEvent = {
    detail: number;
    view: DOMAbstractView;
} & Event;

// onTouchStart onTouchEnd onTouchMove onTouchCancel
export type TouchEvent = {
    altKey: boolean;
    changedTouches: DOMTouchList;
    ctrlKey: boolean;
    getModifierState: (key: string) => boolean;
    metaKey: boolean;
    shiftKey: boolean;
    targetTouches: DOMTouchList;
    touches: DOMTouchList;
} & Event;


// onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
// onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp
export type MouseEvent = {
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
} & Event;

// onChange onInput onSubmit
export type FormEvent = {} & Event;

// onChange(c:text|<textarea>)
export type FormTextEvent = {
    value: string;
} & Event;

// onChange(c:checkbox|radio)
export type FormCheckBoxRadioEvent = {
    checked: bool;
} & Event;

// onChange(c:<option>)
export type FormOptionEvent = {
    selected: bool;
} & Event;

// onSelect
export type SelectionEvent = UIEvent | Event;

// onWheel
export type WheelEvent = {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
} & Event;

// onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
// onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
// onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
// onTimeUpdate onVolumeChange onWaiting
export type MediaEvent = {} & Event;

// onLoad onError
export type ImageEvent = {} & Event;

// onAnimationStart onAnimationEnd onAnimationIteration
export type AnimationEvent = {
    animationName: string;
    pseudoElement: string;
    elapsedTime: float;
} & Event;

// onTransitionEnd
export type TransitionEvent = {
    propertyName: string;
    pseudoElement: string;
    elapsedTime: float;
} & Event;
