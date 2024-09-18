
export const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://xadreznaron.es:4443/' 
    : 'http://localhost:8080/';

export const COMPANIES_URL = BASE_URL  +  'api/company'

export const LOGIN_URL = 
BASE_URL + 'api/auth/signinn'

export const SIGN_UP_URL = 
BASE_URL + 'api/auth/signup'

export const INVOICES_URL = BASE_URL + 'api/invoice'

export const LIBRARY_URL = BASE_URL + 'api/library'

export const PAYMENT_SHEET_URL = BASE_URL + 'api/paymentSheet'

export const GET_ALL_USERS_URL = BASE_URL + 'api/user/getAll'

export const GET_ALL_TOURNAMENT_PARTICIPANTS = BASE_URL + 'api/participants'

export const GET_ALL_COUNTRIES_URL = BASE_URL + "api/address/getCountries"

export const GET_SUBCOUNTRIES_URL = BASE_URL + "api/address/country"

export const CHANGE_KIND_MEMBER_URL = BASE_URL + 'api/user/changeKindOfMember'

export const CHANGE_MEMBER_ROLES_URL = BASE_URL + 'api/user/role'

export const CHANGE_MEMBER_EMAIL_URL = BASE_URL + 'api/user/changeEmail'

export const CHANGE_MEMBER_PASSWORD_URL = BASE_URL + 'api/user/changePassword'

export const UNSUBSCRIBE_MEMBER_URL = BASE_URL + 'api/user/unsubscribe'

export const CHESS_QUESTION_URL = BASE_URL + 'api/chessQuestion'

export const CHESS_QUESTION_CHANGE_SEEN_STATE = CHESS_QUESTION_URL + '/changeChessQuestionHasSeen'

export const CHESS_QUESTION_DELETE = CHESS_QUESTION_URL;

export const TOURNAMENT_PARTICIPANTS_URL = BASE_URL +'api/participants'

export const GET_USER_PROFILE_URL = BASE_URL + 'api/user'