import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-red-200 text-center shadow-sm my-6">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4 text-xl font-bold">
            !
          </div>
          <h3 className="text-base font-bold text-slate-800">Something went wrong rendering this view</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            {this.state.error?.message || "An unexpected error occurred while loading the video module."}
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all"
            >
              Refresh Application
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onReset) this.props.onReset();
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all"
            >
              Back to Safety
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
