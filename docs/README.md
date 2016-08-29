```
+------+                         +-----------+
| Form |-------------------------| FormProps |
+------+                         +-----------+
  | |[1]    [n]+-------+
  | +----------| Nodes |
  | |          +-------+
  | |
  | |[n]  ReformInput(Wrapper)
+-+---------------------------------------+
| | +----------------+                    |
| | | InputComponent |                    |
| | +----------------+                    |
| |          ^                            |
| |          |                            |
| | +-----------------------------------+ |
| | | Button, TextField, Checkbox [...] | |
| | +-----------------------------------+ |
+-+---------------------------------------+
  |[1]
  |
  |[1]
+-------------------+
| ReformInput.props |
+-------------------+
```

## RefromInput<ValueType = string>

```javascript
class ReformInput<InputType = string> extends React.Component
```

A wrapper component that is wrapped around all input component when used

```js
import { createReformInput } from 'reform/utils';

class CustomTextInputComponent extends InputComponent {[...]}

// This line wraps the component in a ReformInput, so that, when used
// the comunication between <Form /> and the input will work properly
const CustomTextInput = createReformInput(CustomTextInputComponent);

render() {
	return (
		<Form>
			<CustomTextInput [... props] />
		</Form>
	);
}
```

### Props


name                      | type
--------------------------|---------------------------------
name                      | `string`
type                      | `ValueType`
validators                | `Validator[]`
runValidation             | `bool`
displayValidationMessages | `true`
tabIndex                  | `number`
className                 | `string|null`
componentStyle            | `ComponentStyles`
validationMessage         | `string`


## InputComponent

```javascript
abstract class InputComponent extends React.Component
```

This is the class all reform input components must extend.
It forces a certain prop interface for the sub component, with some extendable fields.

The sub-components are **NOT** rendered directly, and the prop interface you see here is not the actual interface for any reform input when in use.

All reform inputs are wrapped by the `ReformInput` component.
It's interface is the public interface for all refrom inputs.

### Props

| name  | type | description |
| value |

### Summary
```js
abstract class InputComponent extends React.Component
```

## ReformInput.props

This type is the type that is continously used to fully describe
any input.

### Fields


| name       | type                                             | description |
|------------|--------------------------------------------------|-------------|
| validators | `((value: string) => Promise<ValidationError|null>)[]` |             |
| name       | () =>                                           |             |
| value      | () =>                                           |             |
| parser     | () =>                                           |             |
