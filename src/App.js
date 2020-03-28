import React from 'react';
import { Paper, Typography, Button, Divider } from '@material-ui/core';
import './App.css';

class UX extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = { currentMessageValue: '', messagesList: [] };
  }

  handleFormChange(formValue) {
    this.setState({ currentMessageValue: formValue });
  }

  handleFormSubmit(formValue) {
    {
      this.state.currentMessageValue.length > 0 &&
        alert('You have submitted: ' + this.state.currentMessageValue);
      this.state.currentMessageValue.length > 0 &&
        this.setState({
          messagesList: this.state.messagesList.concat(
            this.state.currentMessageValue && this.state.currentMessageValue
          ),
          currentMessageValue: ''
        });
    }
  }

  render() {
    const formValue = this.state.currentMessageValue;
    return (
      <div className="Wrapper">
        <Paper elevation={16} className="Paper">
          <Form
            value={formValue}
            onFormChange={this.handleFormChange}
            onFormSubmit={this.handleFormSubmit}
          />
          {this.state.currentMessageValue && (
            <Preview messageContent={this.state.currentMessageValue} />
          )}
          <br />
          <Divider />
          <AllMessages allMessages={this.state.messagesList} />
        </Paper>
      </div>
    );
  }
}

function Preview(props) {
  return (
    <div>
      <br />
      <Typography variant="h4">Message preview:</Typography>
      <br />
      <Typography variant="body1">{props.messageContent}</Typography>
    </div>
  );
}

function AllMessages(props) {
  return (
    <div>
      {props.allMessages.length > 0 && (
        <div>
          <br />
          <Typography variant="h4">All messages:</Typography>
          <br />
          <Typography variant="body2">
            <ul>
              {props.allMessages
                .slice(0)
                .reverse()
                .map(messageText => {
                  return (
                    <div className="MessageBox">
                      <Paper variant="outlined" square elevation={0}>
                        <div className="Message">{messageText}</div>
                      </Paper>
                    </div>
                  );
                })}
            </ul>
          </Typography>
        </div>
      )}
    </div>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(event) {
    this.props.onFormChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(event.target.value);
    document.getElementById('message-form').reset();
  }

  keyPress(e) {
    if (e.keyCode == 13) {
      console.log('value', e.target.value);
    }
  }

  render() {
    const formValue = this.props.formValue;
    return (
      <div>
        <form id="message-form" onSubmit={this.handleSubmit}>
          <label>
            <Typography variant="h4">Your message:</Typography> <br />
            <input type="text" value={formValue} onChange={this.handleChange} />
          </label>
          <br />
          <div className="Button">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Submit the message
            </Button>
          </div>
        </form>
        <br />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <UX />
      </div>
    );
  }
}

export default App;
