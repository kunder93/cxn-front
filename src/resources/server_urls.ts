export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://xadreznaron.es:4443/' : 'http://localhost:8080/'

export const COMPANIES_URL = BASE_URL + 'api/company'

export const LOGIN_URL = BASE_URL + 'api/auth/signinn'

export const SIGN_UP_URL = BASE_URL + 'api/auth/signup'

export const INVOICES_URL = BASE_URL + 'api/invoice'

export const LIBRARY_URL = BASE_URL + 'api/library'

export const PAYMENT_SHEET_URL = BASE_URL + 'api/paymentSheet'

export const GET_ALL_USERS_URL = BASE_URL + 'api/user/getAll'

export const GET_ALL_TOURNAMENT_PARTICIPANTS = BASE_URL + 'api/participants'

export const GET_ALL_COUNTRIES_URL = BASE_URL + 'api/address/getCountries'

export const GET_SUBCOUNTRIES_URL = BASE_URL + 'api/address/country'

export const CHANGE_KIND_MEMBER_URL = BASE_URL + 'api/user/changeKindOfMember'

export const CHANGE_MEMBER_ROLES_URL = BASE_URL + 'api/user/role'

export const CHANGE_MEMBER_EMAIL_URL = BASE_URL + 'api/user/changeEmail'

export const CHANGE_MEMBER_PASSWORD_URL = BASE_URL + 'api/user/changePassword'

export const CHESS_QUESTION_URL = BASE_URL + 'api/chessQuestion'

export const CHESS_QUESTION_CHANGE_SEEN_STATE = CHESS_QUESTION_URL + '/changeChessQuestionHasSeen'

export const CHESS_QUESTION_DELETE = CHESS_QUESTION_URL

export const TOURNAMENT_PARTICIPANTS_URL = BASE_URL + 'api/participants'

export const GET_USER_PROFILE_URL = BASE_URL + 'api/user'

export const GET_MY_LICHESS_PROFILE = BASE_URL + 'api/getMyLichessProfile'

export const GET_ALL_LICHESS_PROFILES = BASE_URL + 'api/getAllLichessProfiles'

export const UPDATE_PROFILE_IMAGE_URL = BASE_URL + 'api/user/uploadProfileImage'

export const UPDATE_LICHESS_PROFILE_URL = BASE_URL + 'api/updateLichessProfile'

export const OBTAIN_PROFILE_IMAGE_URL = BASE_URL + 'api/user/obtainProfileImage'

export const UPLOAD_PROFILE_IMAGE_FILE_URL = BASE_URL + 'api/user/uploadProfileImageFile'

export const FEDERATE_USER_URL = BASE_URL + 'api/user/federate'

export const GET_ALL_FEDERATE_STATE_MEMBERS = BASE_URL + 'api/user/federate/getAll'

export const UPLOAD_DNI_URL = BASE_URL + 'api/user/dni'

export const UPDATE_DNI_URL = BASE_URL + 'api/user/federate/updateDni'

export const CONFIR_CANCEL_FEDERATE_URL = BASE_URL + 'api/user/federate'

export const FEDERATE_CHANGE_AUTORENEW_URL = BASE_URL + 'api/user/federate/changeAutoRenew'

export const ACTIVITIES_URL = BASE_URL + 'api/activities'

export const UNSUBSCRIBE_URL = BASE_URL + 'api/auth/unsubscribe'

export const DELETE_USER_URL = BASE_URL + 'api/user'

export const GET_ALL_USERS_PAYMENTS_URL = BASE_URL + 'api/payments/getAll'

export const GET_USER_PAYMENTS_URL = BASE_URL + 'api/payments/user/'

export const CANCEL_PAYMENT_URL = BASE_URL + 'api/payments' //  /{paymentId}/cancel     @PatchMapping

export const MAKE_PYAMENT_URL = BASE_URL + 'api/payments' //   /{paymentId}/pay       @PatchMapping

export const CREATE_PAYMENT_URL = BASE_URL + 'api/payments' //   @PostMapping

export const PAYMENT_URL = BASE_URL + 'api/payments' //   @PostMapping
