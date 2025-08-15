import { Form } from 'react-router';
import type { Route } from './+types';
import FormControl from '~/components/atoms/form/FormControl';
import FormTextArea from '~/components/atoms/form/FormTextArea';

const ContactPage = ({ actionData }: Route.ComponentProps) => {
    return (
        <div className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Contact Me
            </h2>

            <form 
                method='post'
                action='https://formspree.io/f/mnnzrllb'
                className="space-y-6"
            >
                <FormControl
                    label="Full Name"
                    name="name"
                    type="text"
                />
                <FormControl
                    label="Email Address"
                    name="email"
                    type="email"
                />
                <FormControl
                    label="Subject"
                    name="subject"
                    type="text"
                />
                <FormTextArea
                    label="Message"
                    name="message"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default ContactPage;