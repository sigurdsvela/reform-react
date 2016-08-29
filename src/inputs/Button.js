import ReformInputComponent from 'src/ReformInputComponent';

class Button extends ReformInputComponent {
    render() {
        return (
            <button onClick={this.props.onClick}>{this.props.children}</button>
        )
    }
}
