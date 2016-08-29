Inputs are composed of 3 layer
The base ReformComponent class, which is extended by the Input implementation(Button, Text etc), which before exported is wrapped in an ReformInputContainer.

ReformInputContainer takes the props for the input, and a container as props.
The container is given automatically or resolved to the defule 'SingleInputContainer'.

When an Input is rendered inside a Form, it will be wrapped in a FormInputController instead. This allows for the input to behave differently depending on it's context.

## !!!!!

Inputs not in a form will be inside an implicit form wrapped around the root
of the component. This allows this like validation etc work even though
you might not need the ability to pass props though the form.

Using the actual `Form` tags just gives you the ability to pass props to multiple inputs (e.g. onClick), and it will namespace your inputs. So inputs inside one `Form` tag can not refer to the input in another form.
