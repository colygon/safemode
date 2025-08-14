import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    agentName: '',
    agentUrl: '',
    description: '',
    category: '',
    email: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    window.close();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-md border border-cyan-400 rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-cyan-100 mb-2">Thank You!</h2>
          <p className="text-cyan-200/70 mb-6">Your agent submission has been received. We'll review it and get back to you soon.</p>
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-6 py-2 rounded transition-all duration-200"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/90 backdrop-blur-md border border-cyan-400 rounded-t-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            <span className="text-cyan-100 font-sans text-sm ml-2">Submit an AI Agent</span>
          </div>
          <button
            onClick={handleClose}
            className="text-cyan-100 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="bg-slate-900/95 backdrop-blur-md border-x border-b border-cyan-400 rounded-b-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="agentName" className="block text-cyan-100 text-sm font-medium mb-2">
                Agent Name *
              </label>
              <input
                type="text"
                id="agentName"
                name="agentName"
                value={formData.agentName}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-cyan-400/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:border-cyan-300"
                placeholder="e.g., SuperCoder AI"
              />
            </div>

            <div>
              <label htmlFor="agentUrl" className="block text-cyan-100 text-sm font-medium mb-2">
                Agent URL *
              </label>
              <input
                type="url"
                id="agentUrl"
                name="agentUrl"
                value={formData.agentUrl}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-cyan-400/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:border-cyan-300"
                placeholder="https://example.com/agent"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-cyan-100 text-sm font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-cyan-400/50 rounded px-3 py-2 text-cyan-100 focus:outline-none focus:border-cyan-300"
              >
                <option value="">Select a category</option>
                <option value="coding">Coding Assistant</option>
                <option value="terminal">Terminal/CLI Tool</option>
                <option value="productivity">Productivity</option>
                <option value="ai-chat">AI Chat/Conversation</option>
                <option value="development">Development Tool</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-cyan-100 text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-slate-700 border border-cyan-400/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:border-cyan-300"
                placeholder="Describe what this agent does and why it's useful..."
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-cyan-100 text-sm font-medium mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-cyan-400/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:border-cyan-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-cyan-100 text-sm font-medium mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-700 border border-cyan-400/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:border-cyan-300"
                placeholder="Any additional details, features, or requirements..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-cyan-400/50 text-cyan-100 rounded hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 disabled:opacity-50 text-white px-6 py-2 rounded transition-all duration-200 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Agent</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;