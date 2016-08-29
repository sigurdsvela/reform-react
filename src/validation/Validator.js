type Validator = (
    inputName: string,
    inputs: { [key: string] : Input }
) => Error|null;

export default Validator;
