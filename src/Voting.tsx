import React from "react";

export default class VotingForm extends React.Component {
    constructor(props: any) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            status: "",
        };
    }

    render() {
        const { status } = this.state as any;
        return (
            <form
                onSubmit={this.submitForm}
                action="https://formspree.io/f/xrgoqoro"
                method="POST"
            >
                <label>Anna doggon nimi:</label>
                <input type="text" name="doggo_name" />
                <label>Perustelut:</label>
                <input type="text" name="reasoning" />
                {status === "SUCCESS" ? (
                    <p>Thanks!</p>
                ) : (
                    <button>Submit</button>
                )}
                {status === "ERROR" && <p>Ooops! There was an error.</p>}
            </form>
        );
    }

    submitForm(ev: any) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS" });
            } else {
                this.setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }
}
