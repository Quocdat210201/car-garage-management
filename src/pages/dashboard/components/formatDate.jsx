import moment from 'moment';
import { DATE_FORMAT } from '../common/constant';

export const formatDateTime = (value, format = DATE_FORMAT) => {
    if (!value) return;
    return moment(value).format(format);
};