import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { FormSelect } from '../form-ui/select';
import { Form } from './visitantes-styles';
import { NAME_REQUIRED_NOTIFICATION_LABEL, CPF_LABEL, CPF_REQUIRED_NOTIFICATION_LABEL, ROOM_LABEL, ROOM_REQUIRED_NOTIFICATION_LABEL, BIRTHDATE_LABEL, EMAIL_LABEL } from '../../constants/constants';

interface Sala {
    id: number;
    nome: string;
}

interface VisitantesFormProps {
    salas: Sala[];
    onSubmit: (data: any) => void;
    loading: boolean;
    isSubmitting: boolean;
    errors: FieldErrors;
    register: UseFormRegister<any>;
}

const VisitantesForm: React.FC<VisitantesFormProps> = ({
    salas,
    onSubmit,
    errors,
    register
}) => {
    return (
        <Form onSubmit={onSubmit}>
            <FormInput
                label="Nome"
                placeholder="Nome*"
                register={register("nome", { required: NAME_REQUIRED_NOTIFICATION_LABEL })}
                error={errors.nome as FieldError | undefined}
            />
            <FormInput
                label={CPF_LABEL}
                type="text"
                placeholder="000.000.000-00"
                register={register('cpf')}
                error={errors.cpf as FieldError | undefined}
                mask="cpf"
            />
            <FormSelect
                label={ROOM_LABEL}
                options={salas.map((s: any) => ({ value: s.id, label: s.nome }))}
                register={register("sala_destino_id", { required: ROOM_REQUIRED_NOTIFICATION_LABEL })}
                error={errors.sala_destino_id as FieldError | undefined}
            />
            <FormInput
                label={BIRTHDATE_LABEL}
                type="date"
                register={register("data_nascimento")}
                error={errors.data_nascimento as FieldError | undefined}
            />
            <FormInput
                label={EMAIL_LABEL}
                type="email"
                register={register("email")}
                error={errors.email as FieldError | undefined}
            />
        </Form>
    );
};

export default VisitantesForm;