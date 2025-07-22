import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { FieldError } from 'react-hook-form';
import { LOGIN_TITLE, EMAIL_LABEL, EMAIL_PLACEHOLDER, PASSWORD_LABEL, PASSWORD_PLACEHOLDER, EMAIL_REQUIRED_NOTIFICATION_LABEL, PASSWORD_REQUIRED_NOTIFICATION_LABEL, LOGIN_SUBMIT_LABEL, LOGIN_SUBMIT_LOADING_LABEL, INVALID_LOGIN_NOTIFICATION_LABEL } from '../../constants/constants';
import { LoginContainer, LoginButton, ErrorMsg } from './login-styles';

const LoginForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState('');

    const onSubmit = async (data: any) => {
        setError('');
        const ok = await login(data.email, data.senha);
        if (ok) {
            router.push('/');
        } else {
            setError(INVALID_LOGIN_NOTIFICATION_LABEL);
        }
    };
    return <LoginContainer>
        <h2>{LOGIN_TITLE}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                label={EMAIL_LABEL}
                type="email"
                placeholder={EMAIL_PLACEHOLDER}
                register={register("email", { required: EMAIL_REQUIRED_NOTIFICATION_LABEL })}
                error={errors.email as FieldError | undefined}
            />
            <FormInput
                label={PASSWORD_LABEL}
                type="password"
                placeholder={PASSWORD_PLACEHOLDER}
                register={register("senha", { required: PASSWORD_REQUIRED_NOTIFICATION_LABEL })}
                error={errors.senha as FieldError | undefined}
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <LoginButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? LOGIN_SUBMIT_LOADING_LABEL : LOGIN_SUBMIT_LABEL}
            </LoginButton>
        </form>
    </LoginContainer>
}

export default LoginForm