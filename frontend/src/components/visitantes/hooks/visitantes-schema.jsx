import * as yup from 'yup';
import { isValidCPF } from '../../../helpers/validateCpf';
import { NAME_REQUIRED_NOTIFICATION_LABEL, CPF_REQUIRED_NOTIFICATION_LABEL, ROOM_REQUIRED_NOTIFICATION_LABEL, EMAIL_INVALID_NOTIFICATION_LABEL, CPF_INVALID_NOTIFICATION_LABEL } from '../../../constants/constants';

export const visitanteSchema = yup.object().shape({
    nome: yup.string().required(NAME_REQUIRED_NOTIFICATION_LABEL),
    cpf: yup.string()
        .required(CPF_REQUIRED_NOTIFICATION_LABEL)
        .test('valid-cpf', 'CPF inválido', value => isValidCPF(value || '')),
        sala_destino_id: yup.string().required(ROOM_REQUIRED_NOTIFICATION_LABEL),
    data_nascimento: yup.string(),
    email: yup.string().email(EMAIL_INVALID_NOTIFICATION_LABEL).nullable(),
});
