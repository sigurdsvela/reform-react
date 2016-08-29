declare function reform() : { inputs: { [key: string] : Input } };

class MyFormExample {


    render() {
        return (
            <div>
                <div>
                    <Reform.TextInput name="input"/>
                    <Form name="myForm">
                        <Reform.TextInput name="input" />
                    </Form>
                </div>

                <div>
                    { reform().inputs['input1'].validation }
                    { reform('myForm').inputs['input1'].validation }
                </div>
            </div>
        )
    }
}
