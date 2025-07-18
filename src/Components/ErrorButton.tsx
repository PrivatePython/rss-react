import React from 'react';

class ErrorButton extends React.Component {
  state = {
    error: '',
  };
  handleClick = () => {
    this.setState({ error: 'This is the Error for testing ErrorBoundary' });
  };

  render() {
    if (this.state.error) throw new Error(this.state.error);
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className="cursor-pointer w-full rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Emit an error
      </button>
    );
  }
}

export default ErrorButton;
