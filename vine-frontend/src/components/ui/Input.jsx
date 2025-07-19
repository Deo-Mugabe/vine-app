import React from 'react';

const Input = React.forwardRef(({ label, error, required, className = '', ...props }, ref) => {
    return (
        <div className="mb-4">
            <div className="flex items-center space-x-3">
                {label && (
                    <label className="text-sm font-medium text-gray-700 min-w-0 flex-shrink-0">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                        :
                    </label>
                )}
                <input
                    ref={ref}
                    {...props}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } ${className}`}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;