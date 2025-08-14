import { Form } from 'react-router';
import type { Route } from './+types';
import FormControl from '~/components/atoms/form/FormControl';
import FormTextArea from '~/components/atoms/form/FormTextArea';

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    console.log({ name, email, subject, message });

    const errors: Record<string, string> = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (!email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString())) {
        errors.email = "Email is invalid";
    }

    if (!subject) {
        errors.subject = "Subject is required";
    }

    if (!message) {
        errors.message = "Message is required";
    }

    if (Object.keys(errors).length > 0) {
         // Return the errors to be displayed in the form
        return { errors };
    }

    // Process the form data (e.g., send an email, save to a database, etc.)
    const data = {
        name,
        email,
        subject,
        message
    };

    return { message: "Form submitted successfully!", data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
    const errors = actionData?.errors || {};

    return (
        <div className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Contact Me
            </h2>

            {actionData?.message ? (
                    <p className='mb-6 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md p-4'>{actionData.message}</p>
                ) : null
            }

            <Form method='post' className="space-y-6">
                <FormControl
                    label="Full Name"
                    name="name"
                    type="text"
                    error={errors.name}
                />
                <FormControl
                    label="Email Address"
                    name="email"
                    type="email"
                    error={errors.email}
                />
                <FormControl
                    label="Subject"
                    name="subject"
                    type="text"
                    error={errors.subject}
                />
                <FormTextArea
                    label="Message"
                    name="message"
                    error={errors.message}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    Send Message
                </button>
            </Form>
        </div>
    );
}

export default ContactPage;