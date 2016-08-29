/* @flow */
import ReformInputComponent from 'src/ReformInputComponent';

class TextInput extends ReformInputComponent {
    render() {
        return (
            <input
                type="text"
                onChange={e => this.props.onChange(e.target.value)}
            />
        );
    }
}
