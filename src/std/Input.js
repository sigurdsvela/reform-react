/* @flow */

import InputContainer from 'src/containers/input/InputContainer';

/**
 * The Validator type.
 * Describes a validator that can be use to validate fields in a form
 *
 * @param inputName - The name of the input to validate
 * @param inputs - An object with all inputs in the form,
 *                 in an object where the name of the input is the key.
 * @return A promise of either an Error object(if the value is not valid) or null
 *         (if the value was valid)
 */
export type Validator = (inputName: string, inputs: { [key: string]: Input })
    => Promise<Error|null>;

/**
 * The public prop interface that all Reform inputs conform to
 * @type {Object}
 */
export type InputProps = {
    name: string;
    value: string;
    validators: Validator[];
}

type InputSet = {[key: string]: InputProps};

/**
* A class used whenever an Input needs to be represented in any external code.
*
* It will allways represent an actual rendered input, although instances
* of this class will not reflect prop changes to the actual input once initilized.
*
* It takes an object conforming to the InputProps type and
* in return supplies some helper functions.
*/
class Input {
    _inputs: InputSet;
    _inputName: string;

    constructor(inputName: string, inputs: InputSet) {
        this._inputs = inputs;
        this._inputName = inputName;
    }

    get _inputProps() {
        return this._inputs[this._inputName];
    }

    get validators() {
        return this._inputProps.validators;
    }

    get name() {
        return this._inputProps.name;
    }

    get value() {
        return this._inputProps.value;
    }

    /**
     * Runs each validator, one at the time
     * and returns the first Error. If none of the validators
     * return an error, it will return null.
     *
     * @return Promise<Error|null>
     */
    async validate(): Promise<Error|null> {
        for (let i = 0; i < this.validators.length; i++) {
            const result = await this.validators[i](this._inputName, this._inputs);
            if (result !== null) {
                return result;
            }
        }

        return null;
    }
}
