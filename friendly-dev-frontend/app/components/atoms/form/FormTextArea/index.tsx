interface FormTextAreaProps {
    label?: string;
    name: string;
    error?: string;
}

const FormTextArea = ({ label, name, error }: FormTextAreaProps) => {
    return (
        <div>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <textarea id={name} name={name} rows={4} className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
            {error && <p className='text-red-400 text-sm mt-1'>{error}</p>}
        </div>
    );
}

export default FormTextArea;